import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

/**
 * =====================================================================
 * LEOLA NICHELLE — SCENT COLLECTIONS
 * ---------------------------------------------------------------------
 * Each scent has TWO direct PayPal links: one for 4 oz and one for 8 oz.
 * To update a link, replace the string next to `oz4` or `oz8` below.
 * Use "PASTE_LINK_HERE" for any link you don't have yet — the button
 * will show a friendly "coming soon" message instead of opening.
 * =====================================================================
 */
type Scent = {
  name: string;
  description: string;
  oz4: string; // PAYPAL: paste 4 oz link here
  oz8: string; // PAYPAL: paste 8 oz link here
};

// ---------------- EVERYDAY COLLECTION ----------------
const EVERYDAY: Scent[] = [
  {
    name: "Velvet",
    description:
      "A powdery whisper of vanilla musk, warm amber, and creamy sandalwood — like cashmere on bare skin.",
    oz4: "PASTE_LINK_HERE", // Velvet — 4 oz
    oz8: "https://www.paypal.com/ncp/payment/2FH328VFMBHXS", // Velvet — 8 oz
  },
  {
    name: "Suede",
    description:
      "Soft tumbled leather wrapped in golden amber and quiet woods. Refined, intimate, unmistakably you.",
    oz4: "PASTE_LINK_HERE", // Suede — 4 oz
    oz8: "https://www.paypal.com/ncp/payment/2V66GQGDTS4Y8", // Suede — 8 oz
  },
  {
    name: "Skullz On The Beach",
    description:
      "Sun-warmed leather, vintage denim, and a salted sea breeze drifting through sandalwood. Effortlessly cool.",
    oz4: "PASTE_LINK_HERE", // Skullz On The Beach — 4 oz
    oz8: "https://www.paypal.com/ncp/payment/YFZMYNWTZZHSC", // Skullz On The Beach — 8 oz
  },
  {
    name: "Chocolate Under A Cherry Moon",
    description:
      "Dark chocolate melted into ripe black cherry, finished with warm woods. Decadent and a little dangerous.",
    oz4: "PASTE_LINK_HERE", // Chocolate Under A Cherry Moon — 4 oz
    oz8: "https://www.paypal.com/ncp/payment/TYPU3ESF4CZ2W", // Chocolate Under A Cherry Moon — 8 oz
  },
  {
    name: "Decadence",
    description:
      "Salted caramel folded into rich cocoa and smooth woods — pure, slow, delicious indulgence.",
    oz4: "PASTE_LINK_HERE", // Decadence — 4 oz
    oz8: "https://www.paypal.com/ncp/payment/FKD8PGA7BMHXA", // Decadence — 8 oz
  },
  {
    name: "Cashmere Glow",
    description:
      "Soft musk, warm vanilla, and a golden hush of amber — luminous comfort wrapped around the skin.",
    oz4: "PASTE_LINK_HERE", // Cashmere Glow — 4 oz
    oz8: "PASTE_LINK_HERE", // Cashmere Glow — 8 oz
  },
];

// ---------------- GOTHIC ROMANCE COLLECTION ----------------
const GOTHIC: Scent[] = [
  {
    name: "Eternally Embraced",
    description:
      "Warm amber, soft vanilla, and grounding sandalwood — a slow, steady, golden hush.",
    oz4: "PASTE_LINK_HERE", // Eternally Embraced — 4 oz
    oz8: "https://www.paypal.com/ncp/payment/5MA9FNQLX9LKY", // Eternally Embraced — 8 oz
  },
  {
    name: "Ashes of Roses",
    description:
      "Smoky rose petals laid over amber and quiet woods. Romantic, brooding, beautifully worn-in.",
    oz4: "PASTE_LINK_HERE", // Ashes of Roses — 4 oz
    oz8: "https://www.paypal.com/ncp/payment/VT7LJS2SU88MU", // Ashes of Roses — 8 oz
  },
  {
    name: "Whispers at Twilight",
    description:
      "Soft musk, warm amber, and night-blooming florals — the hush between day and dream.",
    oz4: "PASTE_LINK_HERE", // Whispers at Twilight — 4 oz
    oz8: "https://www.paypal.com/ncp/payment/RPNTNR6WXHAAJ", // Whispers at Twilight — 8 oz
  },
  {
    name: "Forever Berried",
    description:
      "Dark, jeweled berries swirled with vanilla and amber. Lush, sensual, unforgettable.",
    oz4: "PASTE_LINK_HERE", // Forever Berried — 4 oz
    oz8: "https://www.paypal.com/ncp/payment/P3KY7MVEF2VVW", // Forever Berried — 8 oz
  },
];

// ---------------- SUMMER COLLECTION (LIMITED) ----------------
const SUMMER: Scent[] = [
  {
    name: "Tropical Glow",
    description:
      "Sun-kissed coconut, creamy tiare, and a soft golden warmth — a getaway captured in a bottle.",
    oz4: "PASTE_LINK_HERE", // Tropical Glow — 4 oz
    oz8: "PASTE_LINK_HERE", // Tropical Glow — 8 oz
  },
];

// =====================================================================
// Buy Now click handler — opens PayPal in a new tab
// =====================================================================
const handleBuy = (url: string) => {
  if (!url || url === "PASTE_LINK_HERE") {
    toast.error("This size will be available very soon.");
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
};

const BuyButton = ({ label, url }: { label: string; url: string }) => (
  <Button
    onClick={() => handleBuy(url)}
    size="lg"
    className="w-full rounded-full bg-cocoa text-cream hover:bg-primary tracking-[0.2em] uppercase text-xs shadow-elegant hover:shadow-glow transition-smooth"
  >
    {label}
  </Button>
);

const ScentCard = ({ s }: { s: Scent }) => (
  <article className="group relative flex flex-col rounded-3xl p-7 md:p-8 bg-card border border-border/60 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth overflow-hidden">
    <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full gradient-gold opacity-20 group-hover:opacity-40 transition-smooth blur-3xl" />

    <header className="relative">
      <h3 className="font-serif text-2xl md:text-[1.7rem] text-primary leading-tight">
        {s.name}
      </h3>
      <p className="mt-3 text-sm text-foreground/75 leading-relaxed">
        {s.description}
      </p>
    </header>

    <div className="relative mt-6 pt-6 border-t border-border/60">
      <p className="text-[10px] uppercase tracking-[0.3em] text-rose-gold mb-1">
        Cloud Whip Body Oil
      </p>
      <p className="font-serif text-sm text-muted-foreground mb-4">
        Choose your size
      </p>
      <div className="flex flex-col gap-3">
        <BuyButton label="4 oz — Buy Now" url={s.oz4} />
        <BuyButton label="8 oz — Buy Now" url={s.oz8} />
      </div>
    </div>

    <div className="relative mt-6 rounded-2xl bg-cream/60 border border-border/40 px-5 py-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-3.5 w-3.5 text-rose-gold" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-rose-gold">
          Complete the Set — Coming Soon
        </p>
      </div>
      <ul className="space-y-1 text-sm text-foreground/70">
        <li className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-rose-gold" />
          Sugar Scrub
        </li>
        <li className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-rose-gold" />
          Roll-On Perfume Oil
        </li>
      </ul>
    </div>
  </article>
);

const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) => (
  <div className="text-center max-w-2xl mx-auto mb-14">
    <span className="text-xs uppercase tracking-[0.4em] text-rose-gold">
      {eyebrow}
    </span>
    <h2 className="font-serif text-4xl md:text-5xl text-primary mt-3">
      {title}
    </h2>
    <p className="mt-5 text-muted-foreground leading-relaxed">{subtitle}</p>
  </div>
);

export const CoreCollection = () => {
  return (
    <>
      {/* ============ EVERYDAY COLLECTION ============ */}
      <section id="core" className="py-20 md:py-28">
        <div className="container">
          <SectionHeader
            eyebrow="Shop By Scent"
            title="Everyday Collection"
            subtitle="Our signature daily-wear scents — hand-poured into the Cloud Whip Body Oil for a soft, comforting ritual."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {EVERYDAY.map((s) => (
              <ScentCard key={s.name} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ GOTHIC ROMANCE COLLECTION ============ */}
      <section id="gothic" className="py-20 md:py-28 bg-cream/40">
        <div className="container">
          <SectionHeader
            eyebrow="A Darker Chapter"
            title="Gothic Romance Collection"
            subtitle="Moody, sensual, and quietly dramatic — for the moments that ask for something deeper."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {GOTHIC.map((s) => (
              <ScentCard key={s.name} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ SUMMER COLLECTION (LIMITED) ============ */}
      <section id="summer" className="py-20 md:py-28">
        <div className="container">
          <SectionHeader
            eyebrow="Seasonal & Rare"
            title="Summer Collection (Limited)"
            subtitle="Warm-weather scents poured in small batches — here for the season, then gone."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {SUMMER.map((s) => (
              <ScentCard key={s.name} s={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
