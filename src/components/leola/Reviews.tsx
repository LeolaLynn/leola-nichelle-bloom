import { Star } from "lucide-react";

/**
 * CUSTOMER REVIEWS
 * To edit reviews, update the REVIEWS array below.
 */
type Review = { name: string; stars: number; text: string };

const REVIEWS: Review[] = [
  { name: "Jasmine R.", stars: 5, text: "This melts into my skin so beautifully. It's not greasy at all and the scent lingers in the best way. My skin feels soft all day." },
  { name: "Nicole T.", stars: 5, text: "Velvet is EVERYTHING. Soft, warm, and just… pretty. I've gotten compliments every time I wear it." },
  { name: "Brianna L.", stars: 5, text: "I didn't expect to love the texture this much. It's light but still deeply moisturizing — perfect right after the shower." },
  { name: "Tasha M.", stars: 5, text: "Skullz On The Beach smells so unique. I can't even describe it, but I keep going back to it. Truly one of a kind." },
  { name: "Erica D.", stars: 5, text: "My skin literally glows after I use this. It feels like luxury in a jar — soft, smooth, and so well made." },
  { name: "Monique S.", stars: 5, text: "Decadence is rich and sweet without being overpowering. It's officially my night scent — warm, comforting, indulgent." },
  { name: "Kendra B.", stars: 5, text: "This is the first body product I've used that doesn't leave me feeling sticky or oily. It just sinks right in." },
  { name: "Alicia P.", stars: 5, text: "Chocolate Under A Cherry Moon is addictive. I didn't think I'd like it this much — now I can't stop reaching for it." },
  { name: "Danielle W.", stars: 5, text: "I love how soft my skin feels the next morning. It actually lasts. Such a beautiful, comforting ritual." },
  { name: "Keisha F.", stars: 5, text: "Light, fluffy, and smooth. It melts instantly into my skin. I'm completely obsessed with the texture." },
  { name: "Renee C.", stars: 5, text: "This feels like something you'd buy in a high-end boutique. The packaging, the scent, the finish — all of it." },
  { name: "Latoya H.", stars: 5, text: "I keep one in my bag now. It's that good. A quick swipe and my skin feels nourished and smells incredible." },
  { name: "Mariah J.", stars: 5, text: "Cashmere Glow is my everyday scent now. Soft, clean, and comforting — exactly what I want my skin to smell like." },
  { name: "Aaliyah B.", stars: 5, text: "Smells expensive in the best way. Subtle, warm, and grown — never overpowering. I'm hooked." },
  { name: "Vanessa G.", stars: 4, text: "I really love the scent and how it feels. I just wish it lasted a little longer on my skin — but I still use it daily." },
  { name: "Shonda K.", stars: 4, text: "Very soft and smooth. I use a little more than I expected, but it works beautifully and the finish is gorgeous." },
  { name: "Tiffany E.", stars: 3, text: "It smells amazing and feels great. I just personally prefer a thicker body butter — that's just my preference though." },
  { name: "Carla N.", stars: 3, text: "The texture is lighter than what I'm used to, but the scent and finish are really nice. Quality is clearly there." },
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
          What Our Customers Are Saying
        </h2>
        <p className="mt-5 text-muted-foreground leading-relaxed">
          Real words from the people who wear Leola Nichelle on their skin every day.
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
