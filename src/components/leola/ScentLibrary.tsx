import { ScentCard } from "./ScentCard";
import { SCENTS, COLLECTIONS_ORDER } from "./scents";

export const ScentLibrary = () => {
  return (
    <section id="library" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.4em] text-rose-gold">The Scent Library</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mt-3">Tap any scent to begin</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Each scent is a ritual. Tap a card to read its story, fragrance notes,
            texture experience, and what people are saying.
          </p>
        </div>

        {COLLECTIONS_ORDER.map((collection) => {
          const scents = SCENTS.filter((s) => s.collection === collection);
          if (!scents.length) return null;
          return (
            <div key={collection} className="mb-16 last:mb-0">
              <h3 className="font-serif text-2xl md:text-3xl text-primary text-center mb-8">
                {collection} Collection
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {scents.map((s) => (
                  <ScentCard key={s.slug} scent={s} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};