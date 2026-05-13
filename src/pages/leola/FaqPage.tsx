import { PageShell } from "@/components/leola/PageShell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: "What is Luxury Body Oil Soufflé?", a: "A marshmallow-soft whipped oil that melts into skin with a silky, non-greasy finish. It transforms from a whipped cream texture into a dry-touch oil on contact with warm skin." },
  { q: "How long does the scent last?", a: "Layered with the matching Roll-On Perfume Oil, scent typically lasts 6–10 hours on warm skin. Apply on damp skin for the longest wear." },
  { q: "Are your products handmade?", a: "Yes. Every batch is hand-poured in small batches in our studio. Nothing leaves until it meets our standards." },
  { q: "Do you ship internationally?", a: "Currently U.S. shipping only. Join the Ritual List to be notified when international shipping opens." },
  { q: "What's your return policy?", a: "Unopened products may be returned within 14 days of delivery. Used products are final sale due to the nature of skincare." },
  { q: "When do future collections drop?", a: "Endless Summer is planned for the next summer drop, Gothic Romance for fall, and Holiday for winter. Join each waitlist for early access." },
  { q: "Is the Luxury Body Oil Soufflé safe for sensitive skin?", a: "Our formulas are designed to be gentle. We recommend a patch test for very sensitive skin." },
];

const FaqPage = () => (
  <PageShell eyebrow="House Notes" title="Questions, answered." intro="Everything you need to know about our rituals, scents, and shipping.">
    <Accordion type="single" collapsible className="rounded-3xl bg-card border border-border/60 shadow-soft px-6 md:px-8">
      {FAQS.map((f, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="border-border/60">
          <AccordionTrigger className="font-serif text-lg md:text-xl text-primary text-left">{f.q}</AccordionTrigger>
          <AccordionContent className="text-foreground/75 leading-relaxed">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </PageShell>
);
export default FaqPage;
