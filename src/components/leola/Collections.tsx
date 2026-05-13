import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FUTURE_COLLECTIONS } from "./scents";

export const Collections = () => {
  return (
    <section id="collections" className="py-20 md:py-28 bg-cream/40">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.4em] text-rose-gold">Future Drops</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mt-3">Three chapters in waiting.</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Each future collection is a world of its own. Join the Ritual List to get early access when they drop.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {FUTURE_COLLECTIONS.map((c, i) => (
            <Link
              key={c.id}
              to={c.href}
              className="group relative flex flex-col rounded-3xl p-8 bg-card border border-border/60 shadow-soft hover:shadow-elegant transition-smooth overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full gradient-gold opacity-25 group-hover:opacity-50 transition-smooth blur-2xl" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-rose-gold">
                Chapter {String(i + 2).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-primary mt-2 mb-3">{c.name}</h3>
              <p className="font-serif italic text-cocoa/80 text-sm">{c.tagline}</p>
              <p className="mt-4 text-sm text-foreground/75 leading-relaxed">{c.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-rose-gold">
                Preview the chapter <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
