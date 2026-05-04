import { COLLECTIONS } from "./data";

export const Collections = () => {
  return (
    <section id="collections" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.4em] text-rose-gold">The Library</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mt-3">Scent Collections</h2>
          <p className="mt-5 text-muted-foreground">
            Three curated chapters of fragrance — each one hand-poured in small batches.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(COLLECTIONS).map(([key, c], idx) => (
            <article
              key={key}
              className="group relative rounded-3xl p-8 bg-card border border-border/60 shadow-soft hover:shadow-elegant transition-smooth overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full gradient-gold opacity-20 group-hover:opacity-40 transition-smooth blur-2xl" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-rose-gold">
                Chapter {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-2xl text-primary mt-2 mb-5">{c.label}</h3>
              <ul className="space-y-2">
                {c.scents.map((s) => (
                  <li key={s.name} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-2 h-1 w-1 rounded-full bg-rose-gold shrink-0" />
                    <span>
                      <span className="text-foreground">{s.name}</span>
                      <span className="block text-xs text-muted-foreground italic">{s.notes}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
