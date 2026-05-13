import { PageShell } from "@/components/leola/PageShell";

const steps = [
  { n: "01", t: "Warm the skin", b: "After a shower or bath, while skin is still warm and slightly damp, scoop a small dollop of Cloud Whip Body Oil." },
  { n: "02", t: "Melt and smooth", b: "Press into skin — pulse points first (wrists, neck, décolleté). The whipped texture transforms into a silky dry-touch oil on contact." },
  { n: "03", t: "Layer the perfume oil", b: "Roll the matching Roll-On Perfume Oil over pulse points. The oil base anchors the scent and makes it last hours longer." },
  { n: "04", t: "Repeat at night", b: "Reapply before bed. Scent develops in warmth — your sheets, your robe, your skin will hold it through the night." },
];

const tips = [
  "Layer two complementary Core scents for a signature: Velvet + Decadence, or Suede + Hush.",
  "Apply on damp skin to lock in fragrance and moisture together.",
  "Keep a Roll-On in your bag for a midday refresh on wrists.",
  "Hush is the nighttime scent — chamomile and warm vanilla wind down the day.",
];

const RitualGuidePage = () => (
  <PageShell
    eyebrow="The Ritual Guide"
    title="How to wear Leola Nichelle."
    intro="A slow, sensory practice — designed to make scent last longer and feel more like memory."
  >
    <div className="space-y-6">
      {steps.map((s) => (
        <div key={s.n} className="rounded-3xl bg-card border border-border/60 p-6 md:p-8 shadow-soft flex gap-5 md:gap-8">
          <span className="font-serif text-4xl md:text-5xl text-rose-gold leading-none shrink-0">{s.n}</span>
          <div>
            <h3 className="font-serif text-xl md:text-2xl text-primary">{s.t}</h3>
            <p className="mt-2 text-sm md:text-base text-foreground/80 leading-relaxed">{s.b}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-16 rounded-3xl bg-cream/60 border border-border/60 p-6 md:p-8">
      <p className="text-[10px] uppercase tracking-[0.3em] text-rose-gold text-center">Editor's Tips</p>
      <h3 className="font-serif text-2xl md:text-3xl text-primary text-center mt-2">Make it last longer.</h3>
      <ul className="mt-6 space-y-3 max-w-xl mx-auto">
        {tips.map((t) => (
          <li key={t} className="flex gap-3 text-sm md:text-base text-foreground/80 leading-relaxed">
            <span className="mt-2 h-1 w-1 rounded-full bg-rose-gold shrink-0" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  </PageShell>
);
export default RitualGuidePage;
