// =====================================================================
// LEOLA NICHELLE — "What Makes Our Soufflé Different?" educational block
// Displayed below the product showcase on the homepage. To edit copy,
// change the strings in BENEFITS or the intro paragraph below.
// =====================================================================

const BENEFITS = [
  { icon: "✨", title: "Water-Free Formula",          blurb: "Pure botanical richness — no water filler." },
  { icon: "☁️", title: "Marshmallow-Soft Texture",   blurb: "Whipped airy, scooped soft, melted silky." },
  { icon: "🌿", title: "Lightweight Botanical Oils",  blurb: "Skin-loving oils chosen for a clean glide." },
  { icon: "💛", title: "Melts Beautifully Into Skin", blurb: "Transforms from cloud to oil on contact." },
  { icon: "💧", title: "Soft & Radiant Finish",       blurb: "Leaves skin dewy, never greasy." },
  { icon: "🌸", title: "Long-Lasting Luxury Scent",   blurb: "A whisper of fragrance that lingers." },
  { icon: "👜", title: "A Little Goes a Long Way",     blurb: "One scoop is a full-body ritual." },
];

export const SouffleEducation = () => (
  <section id="souffle-story" className="py-20 md:py-28 bg-cream/50">
    <div className="container max-w-5xl">
      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
        <span className="text-xs uppercase tracking-[0.4em] text-rose-gold">
          The Soufflé Story
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-primary mt-3 leading-tight">
          What Makes Our Soufflé Different?
        </h2>
        <p className="mt-6 text-base md:text-lg text-foreground/75 leading-relaxed font-light italic">
          Unlike traditional lotions, our Luxury Body Oil Soufflé isn't built
          around water. Instead, it's made from a carefully selected blend of
          botanical oils, skin-conditioning ingredients, and luxurious
          fragrance — all whipped into an airy, marshmallow-soft texture. As
          it touches your skin, the soufflé melts into a silky oil that leaves
          your skin feeling soft, radiant, and beautifully scented.
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
    </div>
  </section>
);