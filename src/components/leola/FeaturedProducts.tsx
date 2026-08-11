import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PRODUCT_TYPES, formatPrice } from "./scents";
import jar from "@/assets/whipped-body-butter-jar.jpg";

const FEATURED = [
  {
    id: "body_butter" as const,
    eyebrow: "Signature Ritual",
    blurb:
      "Mango and kokum butters whipped marshmallow-soft, with meadowfoam, jojoba and squalane for a silky, conditioned finish.",
  },
  {
    id: "roll_on" as const,
    eyebrow: "Pulse-Point Perfume",
    blurb:
      "Slow, sensual scent that warms with the skin and lingers softly through the day.",
  },
];

export const FeaturedProducts = () => {
  return (
    <section id="featured" className="py-20 md:py-28 bg-cream/40">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.4em] text-rose-gold">
            Now Pouring
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mt-3">
            Two ways to wear the warmth.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {FEATURED.map((f) => {
            const p = PRODUCT_TYPES[f.id];
            const startingAt = Math.min(...p.sizes.map((s) => s.priceCents));
            return (
              <article
                key={f.id}
                className="relative flex flex-col rounded-3xl bg-card border border-border/60 shadow-soft hover:shadow-elegant transition-smooth overflow-hidden"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div className="absolute inset-0 gradient-warm opacity-70" />
                  <img
                    src={jar}
                    alt={`${p.label} on champagne satin`}
                    className="relative h-full w-full object-cover mix-blend-multiply"
                  />
                </div>
                <div className="p-6 md:p-7 flex flex-col gap-3">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-rose-gold">
                    {f.eyebrow}
                  </span>
                  <h3 className="font-serif text-2xl text-primary leading-tight">
                    {p.label}
                  </h3>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    {f.blurb}
                  </p>
                  <div className="flex items-center justify-between pt-3 mt-auto">
                    <span className="font-serif text-lg text-cocoa">
                      from {formatPrice(startingAt)}
                    </span>
                    <Button
                      asChild
                      size="sm"
                      className="rounded-full bg-cocoa text-cream hover:bg-primary tracking-[0.2em] uppercase text-[11px] px-5"
                    >
                      <a href="#library">Choose Scent</a>
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
