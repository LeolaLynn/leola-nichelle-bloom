import { HandHeart, Cloud, Droplet, Flower2, Sparkles } from "lucide-react";

const features = [
  { icon: HandHeart, title: "Handmade in small batches" },
  { icon: Cloud, title: "Marshmallow-soft whipped butter" },
  { icon: Droplet, title: "Non-greasy finish" },
  { icon: Flower2, title: "Long-lasting scent" },
  { icon: Sparkles, title: "Designed for comfort and luxury" },
];

export const Trust = () => (
  <section className="py-20 md:py-24">
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {features.map(({ icon: Icon, title }) => (
          <div key={title} className="text-center">
            <div className="mx-auto h-14 w-14 rounded-full gradient-gold flex items-center justify-center shadow-soft">
              <Icon className="h-6 w-6 text-cream" />
            </div>
            <p className="mt-4 text-sm font-serif text-primary leading-snug">{title}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
