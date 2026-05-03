import { Sparkles } from "lucide-react";

const items = ["Sugar Scrubs", "Skin Milk", "Shower Gelée", "Body Mists"];

export const ComingSoon = () => (
  <section id="coming-soon" className="py-20 md:py-28 bg-cream/40">
    <div className="container max-w-4xl text-center">
      <Sparkles className="h-6 w-6 text-rose-gold mx-auto mb-4" />
      <span className="text-xs uppercase tracking-[0.4em] text-rose-gold">Coming Soon</span>
      <h2 className="font-serif text-4xl md:text-5xl text-primary mt-3">
        New textures &amp; experiences
      </h2>
      <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
        New textures and scent experiences are currently being created for the
        full Leola Nichelle collection.
      </p>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((i) => (
          <div
            key={i}
            className="rounded-2xl py-8 px-4 bg-background border border-border/60 font-serif text-xl text-primary shadow-soft"
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  </section>
);
