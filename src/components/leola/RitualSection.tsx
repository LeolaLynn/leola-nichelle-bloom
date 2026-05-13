import { Cloud, Droplet, Flower2, Sparkles } from "lucide-react";

const points = [
  { icon: Cloud, title: "Whipped marshmallow texture", body: "Soft cream that melts on contact." },
  { icon: Droplet, title: "Silky, non-greasy finish", body: "Drinks into skin without residue." },
  { icon: Flower2, title: "Long-lasting fragrance", body: "Editorial scent that lingers softly through the day." },
  { icon: Sparkles, title: "Soft luxury moisturizing glow", body: "A quiet, candlelit shine — never shimmer." },
];

export const RitualSection = () => {
  return (
    <section id="ritual-story" className="py-20 md:py-28 bg-cream/40 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30 gradient-warm" />
      <div className="container max-w-5xl">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.4em] text-rose-gold">The Ritual</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mt-3 text-balance">
            From whipped cream to silken oil.
          </h2>
          <p className="mt-5 font-serif italic text-xl text-cocoa/80 text-balance max-w-2xl mx-auto">
            Scoop a small dollop. The Cloud Whip melts the second it meets warm skin —
            transforming from a marshmallow-soft cream into a silky, dry-touch oil.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-3xl bg-card border border-border/60 p-6 shadow-soft text-center">
              <div className="mx-auto h-12 w-12 rounded-full gradient-gold flex items-center justify-center shadow-soft">
                <Icon className="h-5 w-5 text-cream" />
              </div>
              <p className="mt-4 font-serif text-lg text-primary leading-snug">{title}</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
