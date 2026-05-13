import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScentCard } from "./ScentCard";
import { CORE_SCENTS } from "./scents";

export const ScentLibrary = () => {
  return (
    <section id="library" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.4em] text-rose-gold">The Core Collection</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mt-3">Five scents. One ritual.</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Tap any scent to open its story — fragrance notes, what it smells like,
            mood, texture, and what people are saying.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CORE_SCENTS.map((s) => (
            <ScentCard key={s.slug} scent={s} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className="rounded-full border-cocoa text-cocoa hover:bg-cocoa hover:text-cream tracking-[0.2em] uppercase text-xs px-8">
            <Link to="/collections/core">Explore The Full Core Collection</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
