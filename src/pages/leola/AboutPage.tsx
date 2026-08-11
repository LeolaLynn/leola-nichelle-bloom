import { PageShell } from "@/components/leola/PageShell";

const AboutPage = () => (
  <PageShell
    eyebrow="The House"
    title="A boutique fragrance house, hidden inside a luxury skin ritual."
    intro="Leola Nichelle is built around emotional scent storytelling, soft luxury, and the warmth of a candlelit room."
  >
    <div className="prose prose-stone max-w-none font-sans text-foreground/80 leading-relaxed space-y-6">
      <p>
        Leola Nichelle is a small-batch fragrance and skin ritual house. Every scent is
        designed to feel like a memory — warm, intimate, and unmistakably yours.
      </p>
      <p>
        Our signature is the <strong>Mango + Kokum Whipped Body Butter</strong>: a water-free,
        marshmallow-soft whip of mango and kokum butters with meadowfoam, jojoba and
        squalane, smoothing on silky and leaving skin soft, conditioned, and scented.
        It's the ritual we built the house around.
      </p>
      <p>
        Our scents live in four chapters — the Core Collection (available now), and three
        future drops: Endless Summer, Gothic Romance, and Holiday. Each one is a world
        of its own.
      </p>
      <p className="font-serif italic text-2xl text-cocoa text-center pt-6">
        Soft skin. Warm scents. Everyday luxury.
      </p>
    </div>
  </PageShell>
);
export default AboutPage;
