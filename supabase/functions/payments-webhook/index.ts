import { createClient } from "npm:@supabase/supabase-js@2";
import { createStripeClient, verifyWebhook, type StripeEnv } from "../_shared/stripe.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

async function handleSessionCompleted(session: any, env: StripeEnv) {
  // Re-fetch with expansions for shipping/tax/customer details
  const stripe = createStripeClient(env);
  const full = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["customer_details", "shipping_cost", "total_details"],
  });

  const itemsMeta = (full.metadata as any)?.items;
  const parsedItems = itemsMeta ? JSON.parse(itemsMeta) : [];

  const { data: existing } = await supabase
    .from("orders")
    .select("id")
    .eq("stripe_session_id", full.id)
    .maybeSingle();
  if (existing) return;

  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      stripe_session_id: full.id,
      customer_email: full.customer_details?.email || null,
      customer_name: full.customer_details?.name || null,
      subtotal_cents: full.amount_subtotal || 0,
      discount_cents: full.total_details?.amount_discount || 0,
      shipping_cents: full.shipping_cost?.amount_total || 0,
      tax_cents: full.total_details?.amount_tax || 0,
      total_cents: full.amount_total || 0,
      currency: full.currency || "usd",
      status: "paid",
      shipping_address: full.customer_details?.address || null,
      environment: env,
    })
    .select()
    .single();
  if (error) throw error;

  if (parsedItems.length) {
    await supabase.from("order_items").insert(
      parsedItems.map((i: any) => ({
        order_id: order.id,
        product_name: i.n,
        scent: i.s || null,
        size_label: i.z || null,
        unit_price_cents: i.p,
        quantity: i.q,
        line_total_cents: i.p * i.q,
      }))
    );
  }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const rawEnv = new URL(req.url).searchParams.get("env");
  if (rawEnv !== "sandbox" && rawEnv !== "live") {
    return new Response(JSON.stringify({ received: true, ignored: "invalid env" }), { status: 200 });
  }
  const env: StripeEnv = rawEnv;
  try {
    const event = await verifyWebhook(req, env);
    if (event.type === "checkout.session.completed") {
      await handleSessionCompleted(event.data.object, env);
    } else {
      console.log("Unhandled event:", event.type);
    }
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Webhook error:", e);
    return new Response("Webhook error", { status: 400 });
  }
});