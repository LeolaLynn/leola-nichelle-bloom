// =====================================================================
// LEOLA NICHELLE — SCENT LIBRARY
// ---------------------------------------------------------------------
// Single source of truth for every scent. Edit names, stories, notes,
// texture experience, reviews, and product availability here.
// Prices are set per PRODUCT TYPE below in PRODUCT_TYPES.
// =====================================================================

export type Review = {
  name: string;     // First name + last initial
  stars: 3 | 4 | 5;
  quote: string;
};

export type Scent = {
  slug: string;
  name: string;
  collection: "Everyday" | "Gothic Romance" | "Summer (Limited)";
  tagline: string;          // one-line poetic summary
  story: string;            // longer paragraph — the "why"
  notes: { top: string[]; heart: string[]; base: string[] };
  texture: string;          // texture / wear / sillage experience
  reviews: Review[];
  // Which products this scent is available in:
  availableIn: { body_oil: boolean; scrub: boolean; roll_on: boolean };
};

// =====================================================================
// PRODUCT TYPES — edit prices and sizes here
// =====================================================================
export type ProductTypeId = "body_oil" | "scrub" | "roll_on";
export type SizeOption = { id: string; label: string; priceCents: number };

export const PRODUCT_TYPES: Record<
  ProductTypeId,
  { id: ProductTypeId; label: string; sizes: SizeOption[] }
> = {
  body_oil: {
    id: "body_oil",
    label: "Cloud Whip Body Oil",
    sizes: [
      { id: "4oz", label: "4 oz", priceCents: 1400 },
      { id: "8oz", label: "8 oz", priceCents: 2400 },
    ],
  },
  scrub: {
    id: "scrub",
    label: "Sugar Scrub",
    sizes: [
      { id: "4oz", label: "4 oz", priceCents: 1400 },
      { id: "8oz", label: "8 oz", priceCents: 2400 },
    ],
  },
  roll_on: {
    id: "roll_on",
    label: "Roll-On Perfume Oil",
    sizes: [
      { id: "10ml", label: "10 ml", priceCents: 1400 },
      { id: "20ml", label: "20 ml", priceCents: 2400 },
    ],
  },
};

// =====================================================================
// BUNDLE DISCOUNTS — applied automatically by the Ritual Builder
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
// SCENTS — add/edit scents below
// =====================================================================
export const SCENTS: Scent[] = [
  {
    slug: "velvet",
    name: "Velvet",
    collection: "Everyday",
    tagline: "Cashmere on bare skin.",
    story:
      "Velvet is the scent of being held. Powdery vanilla unfurls into golden amber and sandalwood — soft enough for daytime, intimate enough for the moments after.",
    notes: {
      top: ["Powdered Vanilla", "Soft Musk"],
      heart: ["Warm Amber", "Cashmere Wood"],
      base: ["Sandalwood", "Skin Musk"],
    },
    texture:
      "Whips into a cloud and melts the second it touches warm skin. Leaves a soft, glowing finish — never sticky, never heavy.",
    reviews: [
      { name: "Tasha M.", stars: 5, quote: "VELVET smells AMAZING. Soft, creamy, cozy… like expensive vanilla cashmere." },
      { name: "Danielle R.", stars: 5, quote: "This is one of those scents that makes people hug you longer lol." },
      { name: "Nia C.", stars: 5, quote: "Oooh I love how soft and smooth the texture is. Other body butters I've used were hard or gritty… this feels PERFECT." },
      { name: "Shanice W.", stars: 5, quote: "THIS IS THE TEXTURE I'VE BEEN LOOKING FOR!!! THANK YOU!! perfectly soft and creamy." },
    ],
    availableIn: { body_oil: true, scrub: true, roll_on: true },
  },
  {
    slug: "suede",
    name: "Suede",
    collection: "Everyday",
    tagline: "Refined, intimate, unmistakably you.",
    story:
      "Soft tumbled leather wrapped in golden amber and quiet woods — a scent that whispers instead of shouts. Rich without ever being loud.",
    notes: {
      top: ["Soft Leather", "Bergamot Whisper"],
      heart: ["Golden Amber", "Iris"],
      base: ["Cedar", "Vanilla Drift"],
    },
    texture:
      "Slips on like silk and warms into the skin. Wears close — beautifully personal sillage.",
    reviews: [
      { name: "Brianna L.", stars: 5, quote: "Suede smells rich and expensive without being overpowering." },
      { name: "Erica T.", stars: 5, quote: "My husband actually asked what fragrance I was wearing and he NEVER notices stuff like that." },
      { name: "Kelsey N.", stars: 4, quote: "I usually go for sweeter scents but this one surprised me. Very clean luxury vibes." },
    ],
    availableIn: { body_oil: true, scrub: true, roll_on: true },
  },
  {
    slug: "skullz-on-the-beach",
    name: "Skullz On The Beach",
    collection: "Everyday",
    tagline: "Salt-air leather, effortlessly cool.",
    story:
      "Sun-warmed leather, vintage denim, and a salted breeze drifting through sandalwood. The scent of someone fine walking past you on the boardwalk.",
    notes: {
      top: ["Sea Breeze", "Citrus Salt"],
      heart: ["Vintage Leather", "Driftwood"],
      base: ["Sandalwood", "Warm Musk"],
    },
    texture:
      "Lightweight and airy — perfect for warmer temps. Never sticky, never overwhelming.",
    reviews: [
      { name: "Vanessa G.", stars: 5, quote: "Decadence was too caramel sweet for me but Skullz On The Beach is my FOREVER buy." },
      { name: "Monique D.", stars: 5, quote: "This smells like warm skin, salty air, and somebody fine walking past you at the beach 😂" },
      { name: "Ashley P.", stars: 5, quote: "I love that it's lightweight for warmer temps. Doesn't feel sticky at ALL." },
      { name: "Renee H.", stars: 5, quote: "Skullz On The Beach smells SOOO good omg. Definitely unisex in the best way." },
    ],
    availableIn: { body_oil: true, scrub: true, roll_on: true },
  },
  {
    slug: "decadence",
    name: "Decadence",
    collection: "Everyday",
    tagline: "Salted caramel & cocoa indulgence.",
    story:
      "Salted caramel folded into rich cocoa and smooth woods. Pure, slow, delicious indulgence — the dessert version of self-care.",
    notes: {
      top: ["Salted Caramel"],
      heart: ["Cocoa", "Brown Sugar"],
      base: ["Smooth Woods", "Vanilla"],
    },
    texture:
      "Rich, buttery whip that melts into a long-wearing gourmand glow.",
    reviews: [
      { name: "Jasmine B.", stars: 5, quote: "My favorite is Decadence. I've been looking for a caramel scent and THIS is THE one." },
      { name: "Lori S.", stars: 5, quote: "Smells like warm gooey caramel and melted chocolate. Literally addictive." },
      { name: "Melissa K.", stars: 4, quote: "Very sweet and rich. A little goes a long way for me personally." },
      { name: "Andrea T.", stars: 3, quote: "The texture is BEAUTIFUL but the caramel note was sweeter than what I normally wear." },
    ],
    availableIn: { body_oil: true, scrub: true, roll_on: true },
  },
  {
    slug: "cashmere-glow",
    name: "Cashmere Glow",
    collection: "Everyday",
    tagline: "Comforting and expensive at once.",
    story:
      "Soft musk, warm vanilla, and a golden hush of amber. Luminous comfort — the scent of a hotel robe and warm bath light.",
    notes: {
      top: ["Soft Musk"],
      heart: ["Vanilla Silk", "Cashmere"],
      base: ["Golden Amber"],
    },
    texture:
      "Pillowy and weightless, leaving skin glowing without any shimmer.",
    reviews: [
      { name: "Nicole A.", stars: 5, quote: "Cashmere Glow smells comforting and expensive at the same time." },
      { name: "Faith J.", stars: 5, quote: "This one feels like soft blankets, warm skin, and a luxury hotel robe." },
    ],
    availableIn: { body_oil: true, scrub: true, roll_on: true },
  },
  {
    slug: "tropical-glow",
    name: "Tropical Glow",
    collection: "Summer (Limited)",
    tagline: "Happy in a jar.",
    story:
      "Sun-kissed coconut, creamy tiare, and a soft golden warmth. A getaway captured in a bottle — small batch, here for the season.",
    notes: {
      top: ["Coconut Water", "Pineapple Mist"],
      heart: ["Tiare Flower", "Frangipani"],
      base: ["Vanilla Sand", "White Musk"],
    },
    texture:
      "Light, juicy, glowy. Wears like vacation skin.",
    reviews: [
      { name: "Stephanie M.", stars: 5, quote: "Tropical Glow makes me think of my honeymoon in Tahiti. EVEN my husband loves the way it smells." },
      { name: "Kayla R.", stars: 5, quote: "This smells like golden vacation skin and sunshine." },
      { name: "Bianca T.", stars: 5, quote: "Tropical Glow is HAPPY in a jar. I can't explain it better than that lol." },
      { name: "Marissa D.", stars: 5, quote: "I need this as a body mist IMMEDIATELY." },
    ],
    availableIn: { body_oil: true, scrub: true, roll_on: true },
  },
  {
    slug: "mango-madness",
    name: "Mango Madness",
    collection: "Summer (Limited)",
    tagline: "Juicy & creamy summer ritual.",
    story:
      "Ripe mango spun into creamy tropical warmth. Not fake — warm, golden, real.",
    notes: {
      top: ["Ripe Mango"],
      heart: ["Cream", "Coconut Milk"],
      base: ["Vanilla", "Soft Musk"],
    },
    texture: "Buttery whip, lush sillage, perfect for hot afternoons.",
    reviews: [
      { name: "Cierra W.", stars: 5, quote: "Mango Madness smells juicy and creamy at the same time. Perfect summer scent." },
      { name: "Leah P.", stars: 5, quote: "Not fake mango at all. Smells warm and tropical." },
    ],
    availableIn: { body_oil: true, scrub: true, roll_on: true },
  },
  {
    slug: "berried-treasure",
    name: "Berried Treasure",
    collection: "Summer (Limited)",
    tagline: "Edible in the best way.",
    story:
      "Wild berries lifted by a soft floral lift and a luxurious base. Fruity, but grown.",
    notes: {
      top: ["Wild Berries", "Black Currant"],
      heart: ["Rose Petal"],
      base: ["Vanilla", "Amber"],
    },
    texture: "Smooth and weightless. Stays bright on the skin for hours.",
    reviews: [
      { name: "Courtney F.", stars: 5, quote: "Berried Treasure smells edible in the BEST way." },
      { name: "Alyssa H.", stars: 5, quote: "It smells fruity but still grown and luxurious." },
    ],
    availableIn: { body_oil: true, scrub: true, roll_on: true },
  },
  {
    slug: "power-of-you",
    name: "Power of You Inspired",
    collection: "Everyday",
    tagline: "Feminine, confident, addictive.",
    story:
      "A scent for the version of you that walks into the room first. Floral musk wrapped in golden warmth.",
    notes: {
      top: ["Pink Pepper"],
      heart: ["Tuberose", "Jasmine"],
      base: ["Amber", "Vanilla Musk"],
    },
    texture: "Sheer at first, then blooming — long-lasting on warm skin.",
    reviews: [
      { name: "Tiana S.", stars: 5, quote: "This smells feminine, confident, and kinda addictive honestly." },
      { name: "Morgan C.", stars: 5, quote: "I kept smelling my own arm all day 😂" },
    ],
    availableIn: { body_oil: true, scrub: true, roll_on: true },
  },
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
      { name: "Raven L.", stars: 5, quote: "Gothic Romance collection is SO perfect. Eternally Embraced is my favorite." },
      { name: "Kiara M.", stars: 5, quote: "Warm amber vanilla perfection. This smells like candlelight and silk." },
      { name: "Denise P.", stars: 5, quote: "I'm not usually into perfume oils but THIS?? omg." },
    ],
    availableIn: { body_oil: true, scrub: true, roll_on: true },
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
      { name: "Celeste R.", stars: 5, quote: "Ashes of Roses?? If you like smoky rose scents you HAVE to try this one." },
      { name: "Brittany E.", stars: 5, quote: "This smells dark, romantic, and expensive." },
      { name: "Olivia N.", stars: 4, quote: "Smokier than I expected but really beautiful layered with Velvet." },
    ],
    availableIn: { body_oil: true, scrub: true, roll_on: true },
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
      { name: "Amber J.", stars: 5, quote: "Whispers at Twilight smells dreamy and soft… like nighttime after a warm shower." },
      { name: "Mia K.", stars: 5, quote: "This one feels calming and sensual at the same time." },
    ],
    availableIn: { body_oil: true, scrub: true, roll_on: true },
  },
  {
    slug: "forever-berried",
    name: "Forever Berried",
    collection: "Gothic Romance",
    tagline: "Juicy, dark, and sexy.",
    story:
      "Dark, jeweled berries swirled with vanilla and amber. Lush, sensual, unforgettable.",
    notes: {
      top: ["Black Currant", "Plum"],
      heart: ["Vanilla Liqueur"],
      base: ["Amber", "Patchouli Drift"],
    },
    texture: "Bold and creamy. A statement on the skin.",
    reviews: [
      { name: "Tori D.", stars: 5, quote: "Forever Berried is juicy, dark, and sexy." },
      { name: "Haley S.", stars: 5, quote: "I usually hate berry scents but this one is DIFFERENT." },
    ],
    availableIn: { body_oil: true, scrub: true, roll_on: true },
  },
];

export const COLLECTIONS_ORDER: Scent["collection"][] = [
  "Everyday",
  "Gothic Romance",
  "Summer (Limited)",
];

export const formatPrice = (cents: number) =>
  `$${(cents / 100).toFixed(2).replace(/\.00$/, "")}`;