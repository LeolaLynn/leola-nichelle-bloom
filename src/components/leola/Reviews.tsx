import { Star } from "lucide-react";

/**
 * CUSTOMER REVIEWS
 * To edit reviews, update the REVIEWS array below.
 */
type Review = { name: string; stars: number; text: string };

const REVIEWS: Review[] = [
  { name: "Jasmine R.", stars: 5, text: "I like that it's lightweight, especially for warmer temps. It doesn't feel heavy at all." },
  { name: "Nicole T.", stars: 5, text: "Chocolate Under A Cherry Moon smells amazing. I LOVE it." },
  { name: "Vanessa G.", stars: 4, text: "Decadence smells like a delicious gooey caramel — honestly a little too sweet for me, but Skullz On The Beach is my forever buy." },
  { name: "Brianna L.", stars: 5, text: "Oooh I love how soft and smooth it is. Other body butters I've used have been hard or even gritty like there was sand in them… this is completely different." },
  { name: "Tasha M.", stars: 5, text: "THIS is the texture I've been looking for!! Thank you!! It's perfectly soft and creamy." },
  { name: "Erica D.", stars: 5, text: "Velvet smells AMAZING. Just soft and warm and pretty." },
  { name: "Monique S.", stars: 5, text: "My favorite is Decadence. I've been looking for a caramel scent and THIS is the one." },
  { name: "Kendra B.", stars: 5, text: "I've sampled all the fragrances and they're all so creative. I'm not big on floral scents, so these are top tier for me." },
  { name: "Alicia P.", stars: 5, text: "The Gothic Romance collection is SO perfect. Eternally Embraced is my favorite." },
  { name: "Danielle W.", stars: 5, text: "Ashes of Roses… if you like a smoky rose scent you HAVE to try this one." },
  { name: "Renee C.", stars: 5, text: "Tropical Glow makes me think of my honeymoon in Tahiti… even my husband loves it." },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < count ? "fill-rose-gold text-rose-gold" : "text-border"}`}
      />
    ))}
  </div>
);

export const Reviews = () => (
  <section id="reviews" className="py-20 md:py-28 bg-cream/40">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-[0.4em] text-rose-gold">
        Customer Love
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-primary mt-3">
        What People Are Saying
        </h2>
        <p className="mt-5 text-muted-foreground leading-relaxed">
        Real feedback from early testers of Leola Nichelle.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
        {REVIEWS.map((r, i) => (
          <article
            key={i}
            className="rounded-3xl bg-card border border-border/60 p-6 md:p-7 shadow-soft hover:shadow-elegant transition-smooth"
          >
            <Stars count={r.stars} />
            <p className="mt-4 text-sm text-foreground/80 leading-relaxed font-serif italic">
              “{r.text}”
            </p>
            <p className="mt-5 text-xs uppercase tracking-[0.3em] text-rose-gold">
              — {r.name}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
