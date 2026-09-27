import { assertEquals, assertThrows } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { lookupUnitPriceCents, bundleDiscountPercent } from "../_shared/catalog.ts";
import {
  priceCart, computeTotals, buildLineItems, encodeItemsMeta,
  verifySessionAgainstCatalog, CheckoutValidationError,
} from "../_shared/checkout-pricing.ts";

const BB = "Mango + Kokum Whipped Body Butter";
const RO = "Roll-On Perfume Oil";

Deno.test("catalog lookups", () => {
  assertEquals(lookupUnitPriceCents(BB, "4 oz"), 1400);
  assertEquals(lookupUnitPriceCents(BB, "8 oz"), 2400);
  assertEquals(lookupUnitPriceCents(RO, "10 ml"), 1400);
  assertEquals(lookupUnitPriceCents(RO, "20 ml"), 2400);
  assertEquals(lookupUnitPriceCents(BB, "16 oz"), null);
  assertEquals(lookupUnitPriceCents("Fake", "4 oz"), null);
});

Deno.test("bundle tiers", () => {
  assertEquals([0, 1, 2, 3, 4, 10].map(bundleDiscountPercent), [0, 0, 10, 15, 20, 20]);
});

Deno.test("ignores client prices and builds authoritative line items", () => {
  const priced = priceCart([{ product_name: BB, size_label: "8 oz", scent: "Velvet", quantity: 2, unit_price_cents: 1 }]);
  const li = buildLineItems(priced);
  assertEquals(li[0].price_data.unit_amount, 2400);
  assertEquals(li[0].quantity, 2);
  assertEquals(li[0].price_data.product_data.name, `${BB} — Velvet`);
  assertEquals(computeTotals(priced), { totalQuantity: 2, subtotalCents: 4800, discountPercent: 10, discountCents: 480 });
});

Deno.test("discount tiers on mixed carts", () => {
  const p3 = priceCart([{ product_name: BB, size_label: "4 oz", quantity: 1 }, { product_name: RO, size_label: "20 ml", quantity: 2 }]);
  assertEquals(computeTotals(p3).discountCents, Math.round(6200 * 0.15));
  const p4 = priceCart([{ product_name: RO, size_label: "10 ml", quantity: 4 }]);
  assertEquals(computeTotals(p4).discountCents, 1120);
});

Deno.test("quantity caps and malformed input rejected", () => {
  const bad: unknown[] = [
    [{ product_name: BB, size_label: "4 oz", quantity: 0 }],
    [{ product_name: BB, size_label: "4 oz", quantity: 21 }],
    [{ product_name: BB, size_label: "4 oz", quantity: 1.5 }],
    [{ product_name: BB, size_label: "4 oz", quantity: "2" }],
    [{ product_name: BB, quantity: 1 }],
    [{ size_label: "4 oz", quantity: 1 }],
    [{ product_name: 5, size_label: "4 oz", quantity: 1 }],
    [{ product_name: "  ", size_label: "4 oz", quantity: 1 }],
    [{ product_name: "Fake", size_label: "4 oz", quantity: 1 }],
    [null], ["x"], [], "nope", Array(51).fill({ product_name: BB, size_label: "4 oz", quantity: 1 }),
  ];
  for (const b of bad) assertThrows(() => priceCart(b), CheckoutValidationError);
  priceCart([{ product_name: BB, size_label: "4 oz", quantity: 20 }]);
});

Deno.test("webhook verification against catalog", () => {
  const priced = priceCart([{ product_name: BB, size_label: "8 oz", quantity: 2 }]);
  const meta = JSON.parse(encodeItemsMeta(priced));
  assertEquals(verifySessionAgainstCatalog(meta, 4800, 480), null);
  assertEquals(verifySessionAgainstCatalog(meta, 100, 480), "subtotal_mismatch");
  assertEquals(verifySessionAgainstCatalog(meta, 4800, 0), "discount_mismatch");
  assertEquals(verifySessionAgainstCatalog([{ ...meta[0], p: 1 }], 4800, 480), "metadata_price_mismatch");
  assertEquals(verifySessionAgainstCatalog([], 0, 0), "missing_items_metadata");
});
