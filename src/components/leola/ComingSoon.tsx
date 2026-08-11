import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { FUTURE_COLLECTIONS } from "./scents";

// Future products — add pricing/sizes here once finalized.
const COMING_SOON_PRODUCTS = [
  {
    name: "Perfumed Body Oil",
    blurb:
      "A silky liquid body oil layered with our house fragrances. Sizes and pricing to be announced.",
  },
  {
    name: "New Seasonal Scents",
    blurb:
      "Fresh chapters of the scent library, released alongside each collection drop.",
  },
];

export const ComingSoon = () => (
  <section id="coming-soon" className="py-20 md:py-28">
    <div className="container max-w-4xl text-center">
      <Sparkles className="h-6 w-6 text-rose-gold mx-auto mb-4" />
      <span className="text-xs uppercase tracking-[0.4em] text-rose-gold">Coming Soon</span>
      <h2 className="font-serif text-4xl md:text-5xl text-primary mt-3 text-balance">
        New chapters of the Leola Nichelle world.
      </h2>
      <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
        Endless Summer, Gothic Romance, and Holiday — three future collections,
        each a world of its own. Join the Ritual List for early access.
      </p>

      {/* Future products — no pricing announced yet */}
      <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {COMING_SOON_PRODUCTS.map((p) => (
          <div
            key={p.name}
            className="rounded-2xl py-6 px-5 bg-card border border-border/60 shadow-soft text-left"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-rose-gold">
              In Development
            </span>
            <p className="font-serif text-xl text-primary mt-2">{p.name}</p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.blurb}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid sm:grid-cols-3 gap-4">
        {FUTURE_COLLECTIONS.map((c) => (
          <Link
            key={c.id}
            to={c.href}
            className="rounded-2xl py-8 px-4 bg-card border border-border/60 font-serif text-xl text-primary shadow-soft hover:shadow-elegant transition-smooth"
          >
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  </section>
);
