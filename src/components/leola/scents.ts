// =====================================================================
// LEOLA NICHELLE — SCENT LIBRARY
// ---------------------------------------------------------------------
// Single source of truth for every scent.
// =====================================================================

export type Review = {
  name: string;
  stars: 3 | 4 | 5;
  quote: string;
};

export type CollectionId = "Core" | "Endless Summer" | "Gothic Romance" | "Holiday";

export type Scent = {
  slug: string;
  name: string;
  collection: CollectionId;
  tagline: string;
  story: string;
  whatItSmellsLike?: string;
  mood?: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  texture: string;
  reviews: Review[];
  availableIn: { body_butter: boolean; roll_on: boolean };
};

// =====================================================================
// PRODUCT TYPES
// =====================================================================
export type ProductTypeId = "body_butter" | "roll_on";
export type SizeOption = { id: string; label: string; priceCents: number };

export const PRODUCT_TYPES: Record<
  ProductTypeId,
  { id: ProductTypeId; label: string; description: string; sizes: SizeOption[] }
> = {
  body_butter: {
    id: "body_butter",
    label: "Mango + Kokum Whipped Body Butter",
    description:
      "A water-free whipped body butter of mango and kokum butters, blended with meadowfoam, jojoba, squalane, safflower and MCT for an airy, marshmallow-soft feel that leaves skin soft, conditioned and beautifully scented.",
    sizes: [
      { id: "4oz", label: "4 oz", priceCents: 1400 },
      { id: "8oz", label: "8 oz", priceCents: 2400 },
    ],
  },
  roll_on: {
    id: "roll_on",
    label: "Roll-On Perfume Oil",
    description:
      "A pulse-point ritual — slow, sensual scent that warms with the skin and lingers softly through the day.",
    sizes: [
      { id: "10ml", label: "10 ml", priceCents: 1400 },
      { id: "20ml", label: "20 ml", priceCents: 2400 },
    ],
  },
};

// =====================================================================
// BUNDLE DISCOUNTS
// =====================================================================
export const BUNDLE_TIERS = [
  { minItems: 4, percent: 20, label: "4+ items — 20% off your ritual" },
  { minItems: 3, percent: 15, label: "3 items — 15% off your ritual" },
  { minItems: 2, percent: 10, label: "2 items — 10% off your ritual" },
] as const;

export function bundleDiscountPercent(itemCount: number): number {
  for (const tier of BUNDLE_TIERS) if (itemCount >= tier.minItems) return tier.percent;
  return 0;
}

// =====================================================================
// SCENTS
// =====================================================================
export const SCENTS: Scent[] = [
  // ============== CORE COLLECTION ==============
  {
    slug: "velvet",
    name: "Velvet",
    collection: "Core",
    tagline: "Soft plush luxury. Golden comfort.",
    story:
      "Velvet is the scent of being held — powdery vanilla unfurls into golden amber and creamy sandalwood. Warm enough for daytime, intimate enough for the moments after.",
    whatItSmellsLike:
      "Creamy vanilla wrapped in glowing amber and soft sandalwood warmth.",
    mood: "Soft plush luxury. Warm skin. Golden comfort. Cozy elegance.",
    notes: {
      top: ["Vanilla"],
      heart: ["Amber"],
      base: ["Sandalwood"],
    },
    texture:
      "Whipped marshmallow-soft and smooths in the second it touches warm skin. Leaves a soft, glowing finish — never sticky, never heavy.",
    reviews: [
      { name: "Tasha M.", stars: 5, quote: "Smells warm, expensive, and comforting without being overpowering." },
      { name: "Danielle R.", stars: 5, quote: "This is one of those scents that makes people hug you longer lol." },
      { name: "Nia C.", stars: 5, quote: "Oooh I love how soft and smooth the texture is. This feels PERFECT." },
      { name: "Shanice W.", stars: 5, quote: "THIS IS THE TEXTURE I'VE BEEN LOOKING FOR — perfectly soft and creamy." },
    ],
    availableIn: { body_butter: true, roll_on: true },
  },
  {
    slug: "suede",
    name: "Suede",
    collection: "Core",
    tagline: "Dark smooth sophistication.",
    story:
      "A velvet jacket of a scent — smoky tobacco ebony folded into supple leather and warm amber. Rich, smooth, and unmistakably grown.",
    whatItSmellsLike:
      "Smooth worn leather softened by smoky amber and dark woods.",
    mood: "Dark sophistication. Rugged luxury. Mysterious warmth.",
    notes: {
      top: ["Tobacco Ebony"],
      heart: ["Leather"],
      base: ["Amber"],
    },
    texture:
      "Smooths on like silk and warms into the skin. Wears close — beautifully personal sillage.",
    reviews: [
      { name: "Brianna L.", stars: 5, quote: "Rich, smooth, and addictive. Feels like a luxury jacket at night." },
      { name: "Erica T.", stars: 5, quote: "My husband actually asked what fragrance I was wearing and he NEVER notices stuff like that." },
      { name: "Kelsey N.", stars: 4, quote: "I usually go for sweeter scents but this one surprised me. Very clean luxury vibes." },
    ],
    availableIn: { body_butter: true, roll_on: true },
  },
  {
    slug: "skullz-on-the-beach",
    name: "Skullz On The Beach",
    collection: "Core",
    tagline: "Dangerous coastal luxury.",
    story:
      "Salted ocean mist drifting over worn leather and aged woods — the scent of a stormy coastline, a weathered jacket, and the kind of cool that doesn't try.",
    whatItSmellsLike:
      "Salty ocean air drifting through weathered wood and soft leather.",
    mood: "Dangerous coastal luxury. Rebellious. Cool. Atmospheric.",
    notes: {
      top: ["Ocean Mist"],
      heart: ["Worn Leather"],
      base: ["Aged Woods"],
    },
    texture:
      "Airy whip with an easy, weightless finish. Never sticky, never overwhelming.",
    reviews: [
      { name: "Vanessa G.", stars: 5, quote: "Like a stormy beach bonfire with expensive cologne in the air." },
      { name: "Monique D.", stars: 5, quote: "This smells like warm skin, salty air, and somebody fine walking past you 😂" },
      { name: "Ashley P.", stars: 5, quote: "I love that it's lightweight for warmer temps. Doesn't feel sticky at ALL." },
      { name: "Renee H.", stars: 5, quote: "Definitely unisex in the best way." },
    ],
    availableIn: { body_butter: true, roll_on: true },
  },
  {
    slug: "decadence",
    name: "Decadence",
    collection: "Core",
    tagline: "Dark gourmand luxury.",
    story:
      "Salted caramel poured slowly over wood-kissed cocoa — a slow, edible indulgence. The dessert version of self-care, dressed in warm woods.",
    whatItSmellsLike:
      "Dark cocoa and melted caramel wrapped in warm sensual woods.",
    mood: "Edible luxury. Rich indulgence. Slow evenings. Sensual warmth.",
    notes: {
      top: ["Salted Caramel"],
      heart: ["Wood-Kissed Cocoa"],
      base: ["Smooth Woods"],
    },
    texture:
      "Rich, buttery whip that smooths into a long-wearing gourmand glow.",
    reviews: [
      { name: "Jasmine B.", stars: 5, quote: "Smells delicious without smelling childish or sugary." },
      { name: "Lori S.", stars: 5, quote: "Smells like warm gooey caramel and melted chocolate. Literally addictive." },
      { name: "Melissa K.", stars: 4, quote: "Very sweet and rich. A little goes a long way for me personally." },
    ],
    availableIn: { body_butter: true, roll_on: true },
  },
  {
    slug: "hush",
    name: "Hush",
    collection: "Core",
    tagline: "Soft emotional comfort.",
    story:
      "A calming evening fragrance built around chamomile, warm vanilla, soft amber, and a quiet trace of honeysuckle drifting through nighttime air. Hush is the scent of slowing down.",
    whatItSmellsLike:
      "Soft floral warmth blended with creamy vanilla and calming amber.",
    mood: "Nighttime comfort. Emotional softness. Warm candlelight. Relaxed luxury.",
    notes: {
      top: ["Chamomile", "Honeysuckle"],
      heart: ["Warm Vanilla"],
      base: ["Soft Amber"],
    },
    texture:
      "Pillowy whip that smooths into a warm, weightless glow — designed for nighttime rituals and quiet rooms.",
    reviews: [
      { name: "Amaya T.", stars: 5, quote: "Feels like being wrapped in a warm blanket before bed." },
      { name: "Sienna B.", stars: 5, quote: "Soft, golden, comforting — like being wrapped in a warm blanket." },
    ],
    availableIn: { body_butter: true, roll_on: true },
  },

  {
    slug: "golden-fizz",
    name: "Golden Fizz",
    collection: "Core",
    tagline: "Sparkling citrus. Golden bubbles. Soft vanilla warmth.",
    story:
      "Golden Fizz opens with a burst of sparkling tangerine, bright and juicy like sunlight caught in a glass. A bubbly champagne accord keeps it lively and celebratory before soft vanilla settles underneath, smoothing the citrus into a warm, softly creamy finish.",
    whatItSmellsLike:
      "Bright sparkling tangerine lifted by a bubbly champagne accord, softened with smooth vanilla.",
    mood: "Bright. Playful. Golden. Celebratory. Juicy with a soft creamy finish.",
    notes: {
      top: ["Tangerine"],
      heart: ["Champagne Accord"],
      base: ["Soft Vanilla"],
    },
    texture:
      "Airy, marshmallow-soft whip with a bright, silky finish that lets the sparkling citrus shine.",
    reviews: [],
    availableIn: { body_butter: true, roll_on: true },
  },

  // ============== ENDLESS SUMMER (Future) ==============
  {
    slug: "tropical-glow",
    name: "Tropical Glow",
    collection: "Endless Summer",
    tagline: "Happy in a jar.",
    story:
      "Sun-kissed coconut, creamy tiare, and a soft golden warmth. A getaway captured in a bottle — coming with the Endless Summer drop.",
    notes: {
      top: ["Coconut Water", "Pineapple Mist"],
      heart: ["Tiare Flower", "Frangipani"],
      base: ["Vanilla Sand", "White Musk"],
    },
    texture: "Light, juicy, glowy. Wears like vacation skin.",
    reviews: [
      { name: "Stephanie M.", stars: 5, quote: "Tropical Glow makes me think of my honeymoon in Tahiti." },
      { name: "Bianca T.", stars: 5, quote: "Tropical Glow is HAPPY in a jar." },
    ],
    availableIn: { body_butter: true, roll_on: true },
  },
  {
    slug: "mango-madness",
    name: "Mango Madness",
    collection: "Endless Summer",
    tagline: "Juicy & creamy summer ritual.",
    story:
      "Ripe mango spun into creamy tropical warmth — golden, real, never fake.",
    notes: {
      top: ["Ripe Mango"],
      heart: ["Cream", "Coconut Milk"],
      base: ["Vanilla", "Soft Musk"],
    },
    texture: "Buttery whip, lush sillage, perfect for hot afternoons.",
    reviews: [
      { name: "Cierra W.", stars: 5, quote: "Mango Madness smells juicy and creamy at the same time." },
    ],
    availableIn: { body_butter: true, roll_on: true },
  },
  {
    slug: "berried-treasure",
    name: "Berried Treasure",
    collection: "Endless Summer",
    tagline: "Edible in the best way.",
    story:
      "Wild berries lifted by a soft floral whisper and a luxurious base. Fruity, but grown.",
    notes: {
      top: ["Wild Berries", "Black Currant"],
      heart: ["Rose Petal"],
      base: ["Vanilla", "Amber"],
    },
    texture: "Smooth and weightless. Stays bright on the skin for hours.",
    reviews: [
      { name: "Courtney F.", stars: 5, quote: "Berried Treasure smells edible in the BEST way." },
    ],
    availableIn: { body_butter: true, roll_on: true },
  },
  {
    slug: "summer-muse",
    name: "Summer Muse",
    collection: "Endless Summer",
    tagline: "Feminine, confident, addictive.",
    story:
      "A scent for the version of you that walks into the room first — floral musk wrapped in golden warmth.",
    notes: {
      top: ["Pink Pepper"],
      heart: ["Tuberose", "Jasmine"],
      base: ["Amber", "Vanilla Musk"],
    },
    texture: "Sheer at first, then blooming — long-lasting on warm skin.",
    reviews: [
      { name: "Tiana S.", stars: 5, quote: "This smells feminine, confident, and kinda addictive honestly." },
    ],
    availableIn: { body_butter: true, roll_on: true },
  },

  // ============== GOTHIC ROMANCE (Future) ==============
  {
    slug: "eternally-embraced",
    name: "Eternally Embraced",
    collection: "Gothic Romance",
    tagline: "Candlelight and silk.",
    story:
      "Warm amber, soft vanilla, and grounding sandalwood — a slow, steady, golden hush. Romantic without being sweet.",
    notes: {
      top: ["Bergamot Hush"],
      heart: ["Amber", "Vanilla Silk"],
      base: ["Sandalwood", "Tonka"],
    },
    texture: "Velvety and warm. Wears close to the skin like candlelight.",
    reviews: [
      { name: "Raven L.", stars: 5, quote: "Eternally Embraced is my favorite from the gothic chapter." },
      { name: "Kiara M.", stars: 5, quote: "This smells like candlelight and silk." },
    ],
    availableIn: { body_butter: true, roll_on: true },
  },
  {
    slug: "ashes-of-roses",
    name: "Ashes of Roses",
    collection: "Gothic Romance",
    tagline: "Smoky rose, dark and beautiful.",
    story:
      "Smoky rose petals laid over amber and quiet woods. Romantic, brooding, beautifully worn-in.",
    notes: {
      top: ["Rose Petal", "Pink Pepper"],
      heart: ["Smoky Incense"],
      base: ["Amber", "Dark Woods"],
    },
    texture: "Velvet and shadow. Layers stunningly with Velvet.",
    reviews: [
      { name: "Celeste R.", stars: 5, quote: "If you like smoky rose scents you HAVE to try this one." },
    ],
    availableIn: { body_butter: true, roll_on: true },
  },
  {
    slug: "whispers-at-twilight",
    name: "Whispers at Twilight",
    collection: "Gothic Romance",
    tagline: "The hush between day and dream.",
    story:
      "Soft musk, warm amber, and night-blooming florals — calm and sensual at once.",
    notes: {
      top: ["Night Air"],
      heart: ["Jasmine Sambac", "Tuberose"],
      base: ["Amber", "Soft Musk"],
    },
    texture: "Soft, dreamy, like fresh skin after a warm shower.",
    reviews: [
      { name: "Amber J.", stars: 5, quote: "Whispers at Twilight smells dreamy and soft." },
    ],
    availableIn: { body_butter: true, roll_on: true },
  },
  {
    slug: "forever-berried",
    name: "Forever Berried",
    collection: "Gothic Romance",
    tagline: "Juicy, dark, and sensual.",
    story:
      "Dark, jeweled berries swirled with vanilla liqueur, amber, and a drift of patchouli. Lush, sensual, unforgettable.",
    notes: {
      top: ["Black Currant", "Plum"],
      heart: ["Vanilla Liqueur"],
      base: ["Amber", "Patchouli Drift"],
    },
    texture: "Bold and creamy. A statement on the skin.",
    reviews: [
      { name: "Tori D.", stars: 5, quote: "Forever Berried is juicy, dark, and sexy." },
    ],
    availableIn: { body_butter: true, roll_on: true },
  },

  // ============== HOLIDAY (Future) ==============
  {
    slug: "cashmere-glow",
    name: "Cashmere Glow",
    collection: "Holiday",
    tagline: "Comforting and expensive at once.",
    story:
      "Soft musk, warm vanilla, and a golden hush of amber — the scent of a cashmere robe and warm bath light. Coming with the Holiday drop.",
    notes: {
      top: ["Soft Musk"],
      heart: ["Vanilla Silk", "Cashmere"],
      base: ["Golden Amber"],
    },
    texture: "Pillowy and weightless, leaving skin glowing without any shimmer.",
    reviews: [
      { name: "Nicole A.", stars: 5, quote: "Cashmere Glow smells comforting and expensive at the same time." },
      { name: "Faith J.", stars: 5, quote: "Soft blankets, warm skin, and a luxury hotel robe." },
    ],
    availableIn: { body_butter: true, roll_on: true },
  },
];

export const CORE_SCENTS = SCENTS.filter((s) => s.collection === "Core");

export const COLLECTIONS_ORDER: CollectionId[] = [
  "Core",
  "Endless Summer",
  "Gothic Romance",
  "Holiday",
];

export const formatPrice = (cents: number) =>
  `$${(cents / 100).toFixed(2).replace(/\.00$/, "")}`;

export const FUTURE_COLLECTIONS = [
  {
    id: "endless-summer",
    name: "Endless Summer",
    eyebrow: "Coming Soon — Summer Drop",
    tagline: "Belize sunsets. Ocean horizons. Golden-hour skin.",
    description:
      "A future collection of warm tropical scents inspired by Belize beach sunsets and ocean horizons — including discovery sets and explorer kits.",
    href: "/collections/endless-summer",
  },
  {
    id: "gothic-romance",
    name: "Gothic Romance",
    eyebrow: "Coming Soon — Fall Drop",
    tagline: "Black roses, velvet, moonlight, smoky cathedrals.",
    description:
      "A darkly romantic fall collection — Edgar Allan Poe atmosphere, smoky florals, candlelight and shadow.",
    href: "/collections/gothic-romance",
  },
  {
    id: "holiday",
    name: "Holiday",
    eyebrow: "Coming Soon — Winter Drop",
    tagline: "Fireplace warmth, cashmere intimacy, holiday romance.",
    description:
      "A winter ritual of cashmere amber, soft vanilla, and firelit luxury — designed for cold nights and giftable rituals.",
    href: "/collections/holiday",
  },
];
