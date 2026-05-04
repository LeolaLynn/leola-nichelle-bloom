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
// Replace each placeholder URL below with your real PayPal.me / hosted
// button link for that exact scent + size combination.
// Key format: `${scent}__${sizeId}`
// =====================================================================
export const PAYPAL_LINKS: Record<string, string> = {
  // ---- Everyday Signature ----
  "Velvet__4oz": "https://www.paypal.com/REPLACE_VELVET_4OZ",
  "Velvet__8oz": "https://www.paypal.com/REPLACE_VELVET_8OZ",
  "Suede__4oz": "https://www.paypal.com/REPLACE_SUEDE_4OZ",
  "Suede__8oz": "https://www.paypal.com/REPLACE_SUEDE_8OZ",
  "Skullz On The Beach__4oz": "https://www.paypal.com/REPLACE_SKULLZ_4OZ",
  "Skullz On The Beach__8oz": "https://www.paypal.com/REPLACE_SKULLZ_8OZ",
  "Chocolate Under A Cherry Moon__4oz": "https://www.paypal.com/REPLACE_CHOCCHERRY_4OZ",
  "Chocolate Under A Cherry Moon__8oz": "https://www.paypal.com/REPLACE_CHOCCHERRY_8OZ",
  "Decadence__4oz": "https://www.paypal.com/REPLACE_DECADENCE_4OZ",
  "Decadence__8oz": "https://www.paypal.com/REPLACE_DECADENCE_8OZ",
  "Truffles At This Hour__4oz": "https://www.paypal.com/REPLACE_TRUFFLES_4OZ",
  "Truffles At This Hour__8oz": "https://www.paypal.com/REPLACE_TRUFFLES_8OZ",
  // ---- Gothic Romance ----
  "Eternally Embraced__4oz": "https://www.paypal.com/REPLACE_ETERNALLY_4OZ",
  "Eternally Embraced__8oz": "https://www.paypal.com/REPLACE_ETERNALLY_8OZ",
  "Ashes of Roses__4oz": "https://www.paypal.com/REPLACE_ASHES_4OZ",
  "Ashes of Roses__8oz": "https://www.paypal.com/REPLACE_ASHES_8OZ",
  "Whispers at Twilight__4oz": "https://www.paypal.com/REPLACE_WHISPERS_4OZ",
  "Whispers at Twilight__8oz": "https://www.paypal.com/REPLACE_WHISPERS_8OZ",
  "Forever Berried__4oz": "https://www.paypal.com/REPLACE_BERRIED_4OZ",
  "Forever Berried__8oz": "https://www.paypal.com/REPLACE_BERRIED_8OZ",
  "Corvus__4oz": "https://www.paypal.com/REPLACE_CORVUS_4OZ",
  "Corvus__8oz": "https://www.paypal.com/REPLACE_CORVUS_8OZ",
  // ---- Limited / Mother's Day ----
  "Bloom & Embrace__4oz": "https://www.paypal.com/REPLACE_BLOOM_4OZ",
  "Bloom & Embrace__8oz": "https://www.paypal.com/REPLACE_BLOOM_8OZ",
  "Petals & Promises__4oz": "https://www.paypal.com/REPLACE_PETALS_4OZ",
  "Petals & Promises__8oz": "https://www.paypal.com/REPLACE_PETALS_8OZ",
  "Soft Bloom__4oz": "https://www.paypal.com/REPLACE_SOFTBLOOM_4OZ",
  "Soft Bloom__8oz": "https://www.paypal.com/REPLACE_SOFTBLOOM_8OZ",
  "A Mother's Touch__4oz": "https://www.paypal.com/REPLACE_MOTHERS_4OZ",
  "A Mother's Touch__8oz": "https://www.paypal.com/REPLACE_MOTHERS_8OZ",
};

export const getPaypalLink = (scent: string, size: SizeId) =>
  PAYPAL_LINKS[`${scent}__${size}`] ?? "https://www.paypal.com/";
