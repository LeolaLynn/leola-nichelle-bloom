// =====================================================================
// LEOLA NICHELLE — PRODUCT DATA
// Edit prices, scents, and PayPal links here.
// =====================================================================

export type CollectionKey = "everyday" | "gothic" | "limited";

export type Scent = { name: string; notes: string };

export const COLLECTIONS: Record<CollectionKey, { label: string; scents: Scent[] }> = {
  everyday: {
    label: "Everyday Signature Collection",
    scents: [
      { name: "Velvet", notes: "Powdery Vanilla Musk, Amber, Sandalwood" },
      { name: "Suede", notes: "Soft Leather, Woods, Golden Amber" },
      { name: "Skullz On The Beach", notes: "Leather, Vintage Denim, Sea Breeze, Sandalwood" },
      { name: "Chocolate Under A Cherry Moon", notes: "Dark Chocolate, Black Cherry, Warm Woods" },
      { name: "Decadence", notes: "Salted Caramel, Cocoa, Smooth Woods" },
      { name: "Truffles At This Hour", notes: "Chocolate, Caramel, Soft Woods" },
    ],
  },
  gothic: {
    label: "Gothic Romance Collection",
    scents: [
      { name: "Eternally Embraced", notes: "Amber, Vanilla, Sandalwood" },
      { name: "Ashes of Roses", notes: "Smoky Rose, Amber, Woods" },
      { name: "Whispers at Twilight", notes: "Soft Musk, Amber, Night Florals" },
      { name: "Forever Berried", notes: "Dark Berries, Vanilla, Amber" },
      { name: "Corvus", notes: "Dark Woods, Amber, Soft Smoke" },
    ],
  },
  limited: {
    label: "Limited / Special Occasion Collection",
    scents: [
      { name: "Bloom & Embrace", notes: "Peony, Rose, Vanilla, White Musk" },
      { name: "Petals & Promises", notes: "Rose, Jasmine, Sandalwood, Amber" },
      { name: "Soft Bloom", notes: "Powdery Floral, Soft Musk, Light Vanilla" },
      { name: "A Mother's Touch", notes: "Jasmine, White Musk, Amber, Vanilla" },
    ],
  },
};

// SIZES — edit prices here
export const SIZES = [
  { id: "4oz", label: "4 oz Tester", price: 14 },
  { id: "8oz", label: "8 oz Full Size", price: 24 },
] as const;

export type SizeId = (typeof SIZES)[number]["id"];

// =====================================================================
// PAYPAL LINKS
// ---------------------------------------------------------------------
// Paste your real PayPal.me or PayPal hosted button links below.
// Each scent has a "4 oz" and "8 oz" link.
// To add a new scent: add a new block following the same format.
// =====================================================================
export const paypalLinks: Record<string, Record<"4 oz" | "8 oz", string>> = {
  // ---- Everyday Signature Collection ----
  "Velvet": {
    "4 oz": "PASTE_LINK_HERE",
    "8 oz": "PASTE_LINK_HERE",
  },
  "Suede": {
    "4 oz": "PASTE_LINK_HERE",
    "8 oz": "PASTE_LINK_HERE",
  },
  "Skullz On The Beach": {
    "4 oz": "PASTE_LINK_HERE",
    "8 oz": "PASTE_LINK_HERE",
  },
  "Chocolate Under A Cherry Moon": {
    "4 oz": "PASTE_LINK_HERE",
    "8 oz": "PASTE_LINK_HERE",
  },
  "Decadence": {
    "4 oz": "PASTE_LINK_HERE",
    "8 oz": "PASTE_LINK_HERE",
  },
  "Truffles At This Hour": {
    "4 oz": "PASTE_LINK_HERE",
    "8 oz": "PASTE_LINK_HERE",
  },

  // ---- Gothic Romance Collection ----
  "Eternally Embraced": {
    "4 oz": "PASTE_LINK_HERE",
    "8 oz": "PASTE_LINK_HERE",
  },
  "Ashes of Roses": {
    "4 oz": "PASTE_LINK_HERE",
    "8 oz": "PASTE_LINK_HERE",
  },
  "Whispers at Twilight": {
    "4 oz": "PASTE_LINK_HERE",
    "8 oz": "PASTE_LINK_HERE",
  },
  "Forever Berried": {
    "4 oz": "PASTE_LINK_HERE",
    "8 oz": "PASTE_LINK_HERE",
  },
  "Corvus": {
    "4 oz": "PASTE_LINK_HERE",
    "8 oz": "PASTE_LINK_HERE",
  },

  // ---- Limited / Special Occasion Collection ----
  "Bloom & Embrace": {
    "4 oz": "PASTE_LINK_HERE",
    "8 oz": "PASTE_LINK_HERE",
  },
  "Petals & Promises": {
    "4 oz": "PASTE_LINK_HERE",
    "8 oz": "PASTE_LINK_HERE",
  },
  "Soft Bloom": {
    "4 oz": "PASTE_LINK_HERE",
    "8 oz": "PASTE_LINK_HERE",
  },
  "A Mother's Touch": {
    "4 oz": "PASTE_LINK_HERE",
    "8 oz": "PASTE_LINK_HERE",
  },
};

// Map internal size id ("4oz" / "8oz") to the human label used as the key above.
const SIZE_KEY: Record<SizeId, "4 oz" | "8 oz"> = {
  "4oz": "4 oz",
  "8oz": "8 oz",
};

/**
 * Returns the PayPal link for a given scent + size, or null if not found
 * or still set to the placeholder "PASTE_LINK_HERE".
 */
export const getPaypalLink = (scent: string, size: SizeId): string | null => {
  const sizeKey = SIZE_KEY[size];
  const link = paypalLinks[scent]?.[sizeKey];
  if (!link || link === "PASTE_LINK_HERE") return null;
  return link;
};
