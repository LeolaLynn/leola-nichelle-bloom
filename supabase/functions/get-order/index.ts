import { corsHeaders } from "@supabase/supabase-js/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { createStripeClient, type StripeEnv } from "../_shared/stripe.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get("session_id");
    const environment: StripeEnv =
      url.searchParams.get("env") === "live" ? "live" : "sandbox";
    if (!sessionId) throw new Error("Missing session_id");

    // 1) Try DB first (webhook may have written it)
    let { data: order } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("stripe_session_id", sessionId)
      .maybeSingle();

    // 2) Fallback: pull from Stripe and persist (in case webhook is delayed)
    if (!order) {
      const stripe = createStripeClient(environment);
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items", "customer_details", "shipping_cost", "total_details"],
      });
      if (session.payment_status !== "paid" && session.status !== "complete") {
        return new Response(JSON.stringify({ pending: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const itemsMeta = (session.metadata as any)?.items;
      const parsedItems = itemsMeta ? JSON.parse(itemsMeta) : [];

      const insertOrder = {
        stripe_session_id: session.id,
        customer_email: session.customer_details?.email || null,
        customer_name: session.customer_details?.name || null,
        subtotal_cents: session.amount_subtotal || 0,
        discount_cents: session.total_details?.amount_discount || 0,
        shipping_cents: session.shipping_cost?.amount_total || 0,
        tax_cents: session.total_details?.amount_tax || 0,
        total_cents: session.amount_total || 0,
        currency: session.currency || "usd",
        status: "paid",
        shipping_address: session.customer_details?.address || null,
        environment,
      };

      const { data: newOrder, error: insErr } = await supabase
        .from("orders")
        .insert(insertOrder)
        .select()
        .single();
      if (insErr) throw insErr;

      if (parsedItems.length) {
        await supabase.from("order_items").insert(
          parsedItems.map((i: any) => ({
            order_id: newOrder.id,
            product_name: i.n,
            scent: i.s || null,
            size_label: i.z || null,
            unit_price_cents: i.p,
            quantity: i.q,
            line_total_cents: i.p * i.q,
          }))
        );
      }
      const { data: refetched } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("id", newOrder.id)
        .single();
      order = refetched;
    }

    return new Response(JSON.stringify({ order }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("get-order error:", e);
    return new Response(JSON.stringify({ error: String((e as Error).message) }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});