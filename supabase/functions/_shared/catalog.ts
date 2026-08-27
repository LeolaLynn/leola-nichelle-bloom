// LEOLA NICHELLE — SERVER-AUTHORITATIVE CHECKOUT PRICING
// This file is the ONLY source of truth for prices used when creating a Stripe
// checkout session. Client-supplied prices/discounts are never trusted.
// Keep these values in sync with the storefront display prices
// (src/components/leola/scents.ts). Prices are in USD cents.

export const CATALOG_PRICES: Record<string, Record<string, number>> = {
  "Mango + Kokum Whipped Body Butter": {
    "4 oz": 1400,
    "8 oz": 2400,
  },
  "Roll-On Perfume Oil": {
    "10 ml": 1400,
    "20 ml": 2400,
  },
};

// Maximum quantity allowed per line item.
export const MAX_LINE_QUANTITY = 20;

/** Returns the authoritative unit price in cents, or null if unknown. */
export function lookupUnitPriceCents(
  productName: string,
  sizeLabel: string,
): number | null {
  const sizes = CATALOG_PRICES[(productName || "").trim()];
  if (!sizes) return null;
  const price = sizes[(sizeLabel || "").trim()];
  return typeof price === "number" ? price : null;
}

/**
 * Bundle discount tiers — must match the frontend rules exactly:
 * 2 items => 10%, 3 items => 15%, 4+ items => 20%, otherwise 0%.
 */
export function bundleDiscountPercent(totalQuantity: number): number {
  if (totalQuantity >= 4) return 20;
  if (totalQuantity === 3) return 15;
  if (totalQuantity === 2) return 10;
  return 0;
}
