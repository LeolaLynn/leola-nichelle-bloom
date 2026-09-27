// Pure, testable checkout pricing + validation logic (no Stripe/network calls).
import {
  lookupUnitPriceCents,
  bundleDiscountPercent,
  MAX_LINE_QUANTITY,
} from "./catalog.ts";

export const MAX_CART_LINES = 50;
const MAX_FIELD_LEN = 120;

export class CheckoutValidationError extends Error {
  constructor(message: string, public reason: string, public detail: Record<string, unknown> = {}) {
    super(message);
  }
}

export type PricedItem = {
  product_name: string;
  scent: string;
  size_label: string;
  quantity: number;
  unitPriceCents: number;
};

function cleanString(v: unknown, field: string, index: number, required: boolean): string {
  if (v === undefined || v === null || v === "") {
    if (!required) return "";
    throw new CheckoutValidationError(`Line ${index + 1}: missing ${field}`, "missing_field", { index, field });
  }
  if (typeof v !== "string") {
    throw new CheckoutValidationError(`Line ${index + 1}: ${field} must be text`, "malformed_field", { index, field });
  }
  const s = v.trim();
  if ((required && !s) || s.length > MAX_FIELD_LEN) {
    throw new CheckoutValidationError(`Line ${index + 1}: invalid ${field}`, "malformed_field", { index, field });
  }
  return s;
}

/** Validates the raw cart array and prices it from the server catalog. Throws CheckoutValidationError. */
export function priceCart(rawItems: unknown): PricedItem[] {
  if (!Array.isArray(rawItems)) throw new CheckoutValidationError("Cart must be a list of items", "cart_not_array");
  if (rawItems.length === 0) throw new CheckoutValidationError("No items in checkout", "cart_empty");
  if (rawItems.length > MAX_CART_LINES) {
    throw new CheckoutValidationError("Too many cart lines", "cart_too_long", { lines: rawItems.length });
  }
  return rawItems.map((raw, index) => {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      throw new CheckoutValidationError(`Line ${index + 1}: malformed item`, "malformed_line", { index });
    }
    const i = raw as Record<string, unknown>;
    const product_name = cleanString(i.product_name, "product_name", index, true);
    const size_label = cleanString(i.size_label, "size_label", index, true);
    const scent = cleanString(i.scent, "scent", index, false);
    const quantity = i.quantity;
    if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1 || quantity > MAX_LINE_QUANTITY) {
      throw new CheckoutValidationError(
        `Invalid quantity for "${product_name}" (must be a whole number between 1 and ${MAX_LINE_QUANTITY})`,
        "invalid_quantity",
        { index, product_name, size_label, quantity: typeof quantity === "number" ? quantity : typeof quantity },
      );
    }
    const unitPriceCents = lookupUnitPriceCents(product_name, size_label);
    if (unitPriceCents === null) {
      throw new CheckoutValidationError(
        `Unknown product/size combination: "${product_name}" / "${size_label}"`,
        "unknown_product_size",
        { index, product_name, size_label },
      );
    }
    return { product_name, scent, size_label, quantity, unitPriceCents };
  });
}

export function computeTotals(items: { unitPriceCents: number; quantity: number }[]) {
  const totalQuantity = items.reduce((n, i) => n + i.quantity, 0);
  const subtotalCents = items.reduce((n, i) => n + i.unitPriceCents * i.quantity, 0);
  const discountPercent = bundleDiscountPercent(totalQuantity);
  const discountCents = Math.round((subtotalCents * discountPercent) / 100);
  return { totalQuantity, subtotalCents, discountPercent, discountCents };
}

export function buildLineItems(items: PricedItem[]) {
  return items.map((i) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: i.scent ? `${i.product_name} — ${i.scent}` : i.product_name,
        description: i.size_label || undefined,
        tax_code: "txcd_99999999",
      },
      unit_amount: i.unitPriceCents,
      tax_behavior: "exclusive" as const,
    },
    quantity: i.quantity,
  }));
}

export function encodeItemsMeta(items: PricedItem[]): string {
  return JSON.stringify(
    items.map((i) => ({ n: i.product_name, s: i.scent, z: i.size_label, p: i.unitPriceCents, q: i.quantity })),
  );
}

/**
 * Verifies a completed session's metadata + amounts against the catalog.
 * Returns null if valid, otherwise a short reason string (no PII).
 */
export function verifySessionAgainstCatalog(
  metaItems: unknown,
  amountSubtotal: number | null | undefined,
  amountDiscount: number | null | undefined,
): string | null {
  if (!Array.isArray(metaItems) || metaItems.length === 0) return "missing_items_metadata";
  const items: { unitPriceCents: number; quantity: number }[] = [];
  for (const m of metaItems as any[]) {
    const catalog = lookupUnitPriceCents(m?.n, m?.z);
    if (catalog === null) return "unknown_product_size";
    if (m.p !== catalog) return "metadata_price_mismatch";
    if (!Number.isInteger(m.q) || m.q < 1 || m.q > MAX_LINE_QUANTITY) return "invalid_quantity";
    items.push({ unitPriceCents: catalog, quantity: m.q });
  }
  const t = computeTotals(items);
  if ((amountSubtotal ?? -1) !== t.subtotalCents) return "subtotal_mismatch";
  if ((amountDiscount ?? 0) !== t.discountCents) return "discount_mismatch";
  return null;
}
