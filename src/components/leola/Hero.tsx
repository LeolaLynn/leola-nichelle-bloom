import jar from "@/assets/cloud-whip-jar.jpg";
import bg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section id="top" className="relative pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 -z-10 gradient-warm opacity-70" />

      <div className="container grid md:grid-cols-2 gap-12 md:gap-8 items-center">
        <div className="animate-fade-up text-center md:text-left">
          <span className="inline-block text-xs uppercase tracking-[0.4em] text-rose-gold mb-6">
            Boutique Skincare
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-primary leading-[1.05] text-balance">
            Leola
            <br />
            <span className="italic text-cocoa">Nichelle</span>
          </h1>
          <p className="mt-3 text-sm md:text-base uppercase tracking-[0.3em] text-muted-foreground">
            Ritual Fragrance &amp; Skincare
          </p>
          <p className="mt-8 font-serif italic text-2xl md:text-3xl text-cocoa/90 text-balance">
            Soft skin. Warm scents. Everyday luxury.
          </p>
          <div className="mt-10 flex gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-cocoa rounded-full px-10 py-6 text-sm tracking-[0.2em] uppercase shadow-elegant">
              <a href="#shop">Shop Now</a>
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center animate-fade-up [animation-delay:200ms]">
          <div className="absolute inset-8 rounded-full gradient-gold blur-3xl opacity-50" />
          <img
            src={jar}
            alt="Leola Nichelle Cloud Whip Body Oil jar on champagne satin"
            width={1024}
            height={1024}
            className="relative w-72 h-72 md:w-[28rem] md:h-[28rem] object-cover rounded-full shadow-elegant"
          />
        </div>
      </div>
    </section>
  );
};
