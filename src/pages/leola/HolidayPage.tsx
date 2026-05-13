import { PageShell } from "@/components/leola/PageShell";
import { WaitlistForm } from "@/components/leola/WaitlistForm";
import { SCENTS } from "@/components/leola/scents";

const HolidayPage = () => {
  const teaser = SCENTS.filter((s) => s.collection === "Holiday");
  return (
    <PageShell
      eyebrow="Coming Soon — Winter Drop"
      title="Holiday"
      intro="Fireplace warmth. Cashmere intimacy. Holiday romance wrapped in soft luxury."
    >
      <p className="text-center text-foreground/80 leading-relaxed max-w-2xl mx-auto mb-12">
        A winter ritual of cashmere amber, soft vanilla, and fire-lit luxury — designed
        for cold nights, holiday rituals, and the most giftable season of the year.
      </p>
      <WaitlistForm group="holiday-waitlist" label="Holiday Waitlist" />
      <div className="mt-16 grid sm:grid-cols-2 gap-6">
        {teaser.map((s) => (
          <article key={s.slug} className="rounded-3xl bg-card border border-border/60 p-6 shadow-soft">
            <span className="text-[10px] uppercase tracking-[0.3em] text-rose-gold">Preview</span>
            <h3 className="font-serif text-2xl text-primary mt-2">{s.name}</h3>
            <p className="font-serif italic text-cocoa/80 text-sm mt-1">{s.tagline}</p>
            <p className="text-sm text-foreground/75 mt-3">{s.story}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
};
export default HolidayPage;
