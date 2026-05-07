const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
import { createStripeClient, type StripeEnv } from "../_shared/stripe.ts";

type Item = {
  product_name: string;
  scent?: string;
  size_label?: string;
  unit_price_cents: number;
  quantity: number;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const items: Item[] = body.items || [];
    const environment: StripeEnv = body.environment === "live" ? "live" : "sandbox";
    const returnUrl: string = body.returnUrl;
    const cancelUrl: string = body.cancelUrl;
    const discountCents: number = Math.max(0, Math.floor(body.discount_cents || 0));

    if (!items.length) throw new Error("No items in checkout");
    if (!returnUrl) throw new Error("Missing returnUrl");

    const stripe = createStripeClient(environment);

    const line_items = items.map((i) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: i.scent ? `${i.product_name} — ${i.scent}` : i.product_name,
          description: i.size_label || undefined,
          tax_code: "txcd_99999999", // General - Tangible Goods (physical skincare/body products)
        },
        unit_amount: i.unit_price_cents,
        tax_behavior: "exclusive" as const,
      },
      quantity: i.quantity,
    }));

    // Stash full item detail in metadata for the webhook (compact JSON)
    const itemsMeta = JSON.stringify(
      items.map((i) => ({
        n: i.product_name,
        s: i.scent || "",
        z: i.size_label || "",
        p: i.unit_price_cents,
        q: i.quantity,
      }))
    ).slice(0, 4900);

    const sessionParams: any = {
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: returnUrl,
      line_items,
      automatic_tax: { enabled: false },
      shipping_address_collection: { allowed_countries: ["US"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 600, currency: "usd" },
            display_name: "Standard Shipping",
            tax_behavior: "exclusive",
            tax_code: "txcd_92010001",
          },
        },
      ],
      metadata: { items: itemsMeta, discount_cents: String(discountCents) },
    };

    if (discountCents > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: discountCents,
        currency: "usd",
        duration: "once",
        name: "Ritual Bundle Discount",
      });
      sessionParams.discounts = [{ coupon: coupon.id }];
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("create-checkout error:", e);
    return new Response(JSON.stringify({ error: String((e as Error).message) }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});