const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
import { createStripeClient, type StripeEnv } from "../_shared/stripe.ts";
import {
  priceCart, computeTotals, buildLineItems, encodeItemsMeta, CheckoutValidationError,
} from "../_shared/checkout-pricing.ts";

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const isHttpUrl = (u: unknown) => {
  if (typeof u !== "string" || u.length > 2000) return false;
  try { const p = new URL(u); return p.protocol === "https:" || p.protocol === "http:"; } catch { return false; }
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  let body: any;
  try { body = await req.json(); } catch {
    console.warn(JSON.stringify({ event: "checkout_rejected", reason: "invalid_json" }));
    return json({ error: "Invalid request body" }, 400);
  }
  if (!body || typeof body !== "object") return json({ error: "Invalid request body" }, 400);
  if (!isHttpUrl(body.returnUrl)) return json({ error: "Missing or invalid returnUrl" }, 400);

  let priced;
  try {
    priced = priceCart(body.items);
  } catch (e) {
    if (e instanceof CheckoutValidationError) {
      // Tamper monitoring — product/size/quantity only, no customer data.
      console.warn(JSON.stringify({ event: "checkout_rejected", reason: e.reason, ...e.detail }));
      return json({ error: e.message }, 400);
    }
    throw e;
  }

  try {
    const environment: StripeEnv = body.environment === "live" ? "live" : "sandbox";
    const { discountCents } = computeTotals(priced);
    const stripe = createStripeClient(environment);

    const sessionParams: any = {
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: body.returnUrl,
      line_items: buildLineItems(priced),
      automatic_tax: { enabled: false },
      shipping_address_collection: { allowed_countries: ["US"] },
      shipping_options: [{
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 600, currency: "usd" },
          display_name: "Standard Shipping",
          tax_behavior: "exclusive",
          tax_code: "txcd_92010001",
        },
      }],
      metadata: { items: encodeItemsMeta(priced).slice(0, 4900), discount_cents: String(discountCents) },
    };

    if (discountCents > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: discountCents, currency: "usd", duration: "once", name: "Ritual Bundle Discount",
      });
      sessionParams.discounts = [{ coupon: coupon.id }];
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return json({ clientSecret: session.client_secret });
  } catch (e) {
    console.error("create-checkout error:", (e as Error).message);
    return json({ error: "Could not start checkout" }, 500);
  }
});
