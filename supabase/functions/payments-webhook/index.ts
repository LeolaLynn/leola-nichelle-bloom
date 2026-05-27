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

  // Build item summary for emails / alert
  const itemSummary = parsedItems
    .map((i: any) => `• ${i.n}${i.s ? ` — ${i.s}` : ""}${i.z ? ` (${i.z})` : ""} × ${i.q}`)
    .join("\n");

  // In-dashboard owner alert
  await supabase.from("admin_alerts").insert({
    type: "purchase",
    title: `New order — ${(full.amount_total || 0) / 100} ${(full.currency || "usd").toUpperCase()}`,
    body: `${full.customer_details?.name || "A customer"} just placed an order.`,
    order_id: order.id,
    metadata: {
      total_cents: full.amount_total,
      currency: full.currency,
      customer_email: full.customer_details?.email,
    },
  });

  // Trigger transactional emails (owner alert + customer confirmation)
  const sendEmail = async (templateName: string, recipientEmail: string, templateData: any) => {
    try {
      const res = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-transactional-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
        },
        body: JSON.stringify({
          templateName,
          recipientEmail,
          idempotencyKey: `${full.id}:${templateName}`,
          templateData,
        }),
      });
      if (!res.ok) console.error(`Email ${templateName} failed`, await res.text());
    } catch (e) {
      console.error(`Email ${templateName} error`, e);
    }
  };

  const totals = {
    subtotal_cents: full.amount_subtotal || 0,
    discount_cents: full.total_details?.amount_discount || 0,
    shipping_cents: full.shipping_cost?.amount_total || 0,
    tax_cents: full.total_details?.amount_tax || 0,
    total_cents: full.amount_total || 0,
    currency: full.currency || "usd",
  };

  // Owner alert (template has fixed `to`)
  await sendEmail("owner-purchase-alert", "leolalynn8277@gmail.com", {
    customerName: full.customer_details?.name || "A customer",
    customerEmail: full.customer_details?.email || "",
    orderNumber: order.id,
    total_cents: totals.total_cents,
    currency: totals.currency,
    itemSummary,
  });

  // Customer confirmation
  if (full.customer_details?.email) {
    await sendEmail("order-confirmation", full.customer_details.email, {
      customerName: (full.customer_details.name || "").split(" ")[0] || "lovely",
      orderNumber: order.id,
      items: parsedItems.map((i: any) => ({
        product_name: i.n,
        scent: i.s || null,
        size_label: i.z || null,
        quantity: i.q,
        line_total_cents: (i.p || 0) * (i.q || 1),
      })),
      ...totals,
      shippingAddress: full.customer_details?.address || null,
    });
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