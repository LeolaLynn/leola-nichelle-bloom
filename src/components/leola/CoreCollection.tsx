import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

/**
 * COLLECTIONS
 * -------------------------------------------------------------------
 * Three separate scent collections. Each scent has ONE PayPal link
 * for the Cloud Whip Body Oil. To swap a link, edit the `paypal`
 * field below. Use "PASTE_LINK_HERE" for scents without a link yet.
 * -------------------------------------------------------------------
 */
type Scent = { name: string; description: string; paypal: string };

const EVERYDAY: Scent[] = [
  {
    name: "Velvet",
    description:
      "A powdery whisper of vanilla musk, warm amber, and creamy sandalwood — like cashmere on bare skin.",
    paypal: "https://www.paypal.com/ncp/payment/2FH328VFMBHXS",
  },
  {
    name: "Suede",
    description:
      "Soft tumbled leather wrapped in golden amber and quiet woods. Refined, intimate, unmistakably you.",
    paypal: "https://www.paypal.com/ncp/payment/2V66GQGDTS4Y8",
  },
  {
    name: "Skullz On The Beach",
    description:
      "Sun-warmed leather, vintage denim, and a salted sea breeze drifting through sandalwood. Effortlessly cool.",
    paypal: "https://www.paypal.com/ncp/payment/YFZMYNWTZZHSC",
  },
  {
    name: "Chocolate Under A Cherry Moon",
    description:
      "Dark chocolate melted into ripe black cherry, finished with warm woods. Decadent and a little dangerous.",
    paypal: "https://www.paypal.com/ncp/payment/TYPU3ESF4CZ2W",
  },
  {
    name: "Decadence",
    description:
      "Salted caramel folded into rich cocoa and smooth woods — pure, slow, delicious indulgence.",
    paypal: "https://www.paypal.com/ncp/payment/FKD8PGA7BMHXA",
  },
  {
    name: "Cashmere Glow",
    description:
      "Soft musk, warm vanilla, and a golden hush of amber — luminous comfort wrapped around the skin.",
    // PAYPAL: paste the Cashmere Glow link below
    paypal: "PASTE_LINK_HERE",
  },
];

const GOTHIC: Scent[] = [
  {
    name: "Eternally Embraced",
    description:
      "Warm amber, soft vanilla, and grounding sandalwood — a slow, steady, golden hush.",
    paypal: "https://www.paypal.com/ncp/payment/5MA9FNQLX9LKY",
  },
  {
    name: "Ashes of Roses",
    description:
      "Smoky rose petals laid over amber and quiet woods. Romantic, brooding, beautifully worn-in.",
    paypal: "https://www.paypal.com/ncp/payment/VT7LJS2SU88MU",
  },
  {
    name: "Whispers at Twilight",
    description:
      "Soft musk, warm amber, and night-blooming florals — the hush between day and dream.",
    paypal: "https://www.paypal.com/ncp/payment/RPNTNR6WXHAAJ",
  },
  {
    name: "Forever Berried",
    description:
      "Dark, jeweled berries swirled with vanilla and amber. Lush, sensual, unforgettable.",
    paypal: "https://www.paypal.com/ncp/payment/P3KY7MVEF2VVW",
  },
];

const handleBuy = (url: string) => {
  if (!url || url === "PASTE_LINK_HERE") {
    toast.error("This scent will be available very soon.");
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
};

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
        Primary Product
      </p>
      <p className="font-serif text-lg text-primary mb-4">
        Cloud Whip Body Oil
      </p>
      <Button
        onClick={() => handleBuy(s.paypal)}
        size="lg"
        className="w-full rounded-full bg-cocoa text-cream hover:bg-primary tracking-[0.2em] uppercase text-xs shadow-elegant"
      >
        Buy Now
      </Button>
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
      {/* ============ EVERYDAY COLLECTION (main shop) ============ */}
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

      {/* ============ LIMITED / SPECIAL OCCASION COLLECTION ============ */}
      <section id="limited" className="py-20 md:py-28">
        <div className="container">
          <SectionHeader
            eyebrow="Seasonal & Rare"
            title="Limited / Special Occasion"
            subtitle="Reserved for moments worth remembering."
          />
          <div className="max-w-2xl mx-auto rounded-3xl border border-dashed border-border bg-card/60 px-8 py-14 text-center shadow-soft">
            <Sparkles className="h-5 w-5 text-rose-gold mx-auto mb-4" />
            <p className="font-serif text-xl md:text-2xl text-primary">
              Limited edition seasonal scents will appear here.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Sign up below to be the first to know when they arrive.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
