// =====================================================================
// LEOLA NICHELLE — "Inside the Whip" educational block
// Displayed below the product showcase on the homepage. To edit copy,
// change the strings in BENEFITS, INGREDIENTS or the intro paragraph.
// =====================================================================

const BENEFITS = [
  { icon: "✨", title: "Water-Free Formula",            blurb: "Anhydrous and butter-rich — no water filler." },
  { icon: "🥭", title: "Mango + Kokum Base",            blurb: "A rich butter base that still feels elegant." },
  { icon: "☁️", title: "Marshmallow-Soft Whip",         blurb: "Whipped airy, scooped soft, smoothed silky." },
  { icon: "🌿", title: "Slip From Botanical Oils",      blurb: "Meadowfoam, jojoba, safflower and MCT for glide." },
  { icon: "💧", title: "Squalane Softness",             blurb: "Leaves skin conditioned and comfortable." },
  { icon: "🌸", title: "Long-Lasting Luxury Scent",     blurb: "A whisper of fragrance that lingers." },
  { icon: "👜", title: "A Little Goes a Long Way",      blurb: "One scoop is a full-body ritual." },
];

const INGREDIENTS = [
  "Mango Butter",
  "Kokum Butter",
  "MCT / Fractionated Coconut Oil",
  "High-Oleic Safflower Oil",
  "Meadowfoam Seed Oil",
  "Jojoba Oil",
  "Squalane",
  "Cetyl Alcohol",
  "Arrowroot Powder",
  "Vitamin E",
  "Fragrance / Parfum (varies by scent)",
];

export const ButterStory = () => (
  <section id="butter-story" className="py-20 md:py-28 bg-cream/50">
    <div className="container max-w-5xl">
      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
        <span className="text-xs uppercase tracking-[0.4em] text-rose-gold">
          Inside the Whip
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-primary mt-3 leading-tight">
          What Makes Our Whipped Body Butter Different?
        </h2>
        <p className="mt-6 text-base md:text-lg text-foreground/75 leading-relaxed font-light italic">
          Unlike traditional lotions, our Mango + Kokum Whipped Body Butter
          isn't built around water. Mango and kokum butters create a rich yet
          elegant base, while meadowfoam, jojoba, squalane, high-oleic
          safflower and MCT coconut oil bring the slip and softness. Everything
          is whipped into an airy, marshmallow-soft texture that smooths over
          skin and leaves it feeling soft, conditioned, and beautifully
          fragranced.
        </p>
      </div>

      <div className="text-center mb-8">
        <span className="text-[10px] uppercase tracking-[0.4em] text-rose-gold">
          Why You'll Love It
        </span>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {BENEFITS.map((b) => (
          <li
            key={b.title}
            className="rounded-2xl bg-card/80 backdrop-blur border border-border/60 p-6 shadow-soft hover:shadow-elegant transition-smooth"
          >
            <div className="text-3xl mb-3" aria-hidden="true">{b.icon}</div>
            <h3 className="font-serif text-xl text-primary leading-snug">
              {b.title}
            </h3>
            <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
              {b.blurb}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-12 md:mt-16 rounded-3xl bg-card/70 border border-border/60 shadow-soft px-6 md:px-10 py-8 text-center">
        <span className="text-[10px] uppercase tracking-[0.4em] text-rose-gold">
          What's Inside
        </span>
        <p className="mt-4 text-sm md:text-base text-foreground/75 leading-relaxed">
          {INGREDIENTS.join(" · ")}
        </p>
      </div>
    </div>
  </section>
);
