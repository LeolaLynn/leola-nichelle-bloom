import { useState } from "react";
import { ChevronDown, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Scent, PRODUCT_TYPES, ProductTypeId, formatPrice } from "./scents";
import { useCart } from "./CartContext";
import { toast } from "sonner";

/**
 * Tappable luxury scent card with an expandable story panel:
 * - Front: name, tagline, quick add
 * - Expanded: full story, fragrance notes pyramid, texture experience, reviews
 */
export const ScentCard = ({ scent }: { scent: Scent }) => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState<ProductTypeId>(
    scent.availableIn.body_oil ? "body_oil" : scent.availableIn.scrub ? "scrub" : "roll_on"
  );
  const product = PRODUCT_TYPES[productId];
  const [sizeId, setSizeId] = useState<string>(product.sizes[0].id);
  const size = product.sizes.find((s) => s.id === sizeId) || product.sizes[0];
  const { add } = useCart();

  const handleAdd = () => {
    add({
      productId,
      productName: product.label,
      scent: scent.name,
      collection: scent.collection,
      sizeLabel: size.label,
      sizeId: size.id,
      priceCents: size.priceCents,
    });
    toast.success(`${scent.name} • ${product.label} added to your ritual`);
  };

  return (
    <article className="group relative flex flex-col rounded-3xl bg-card border border-border/60 shadow-soft hover:shadow-elegant transition-smooth overflow-hidden">
      <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full gradient-gold opacity-20 group-hover:opacity-40 transition-smooth blur-3xl pointer-events-none" />

      {/* Front face */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative text-left p-6 md:p-7"
        aria-expanded={open}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-rose-gold">{scent.collection}</span>
        <h3 className="font-serif text-2xl md:text-[1.7rem] text-primary leading-tight mt-2">
          {scent.name}
        </h3>
        <p className="mt-2 font-serif italic text-cocoa/80 text-sm">{scent.tagline}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star className="h-3 w-3 fill-rose-gold text-rose-gold" />
            {(scent.reviews.reduce((s, r) => s + r.stars, 0) / Math.max(1, scent.reviews.length)).toFixed(1)}
            <span className="opacity-60">· {scent.reviews.length} reviews</span>
          </span>
          <span className="inline-flex items-center gap-1 text-rose-gold">
            {open ? "Hide story" : "Tap to explore"}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
          </span>
        </div>
      </button>

      {/* Expanded story */}
      {open && (
        <div className="relative px-6 md:px-7 pb-6 space-y-5 animate-fade-up">
          <p className="text-sm text-foreground/80 leading-relaxed">{scent.story}</p>

          {/* Notes pyramid */}
          <div className="rounded-2xl bg-cream/60 border border-border/40 px-5 py-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-rose-gold mb-3">Fragrance Notes</p>
            <NoteRow label="Top" notes={scent.notes.top} />
            <NoteRow label="Heart" notes={scent.notes.heart} />
            <NoteRow label="Base" notes={scent.notes.base} />
          </div>

          {/* Texture / experience */}
          <div className="flex gap-3 items-start">
            <Sparkles className="h-4 w-4 text-rose-gold shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-rose-gold">Texture & Wear</p>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">{scent.texture}</p>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-rose-gold mb-2">What People Are Saying</p>
            <div className="space-y-2">
              {scent.reviews.map((r, i) => (
                <blockquote key={i} className="rounded-xl border border-border/50 bg-background/60 px-4 py-3">
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: r.stars }).map((_, k) => (
                      <Star key={k} className="h-3 w-3 fill-rose-gold text-rose-gold" />
                    ))}
                    {Array.from({ length: 5 - r.stars }).map((_, k) => (
                      <Star key={`o${k}`} className="h-3 w-3 text-muted-foreground/30" />
                    ))}
                    <span className="ml-2 text-[11px] uppercase tracking-wider text-muted-foreground">{r.name}</span>
                  </div>
                  <p className="text-sm text-foreground/80 italic leading-snug">"{r.quote}"</p>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Buy area — always visible */}
      <div className="relative mt-auto px-6 md:px-7 pb-6 pt-4 border-t border-border/60 space-y-3">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(PRODUCT_TYPES) as ProductTypeId[])
            .filter((id) => scent.availableIn[id])
            .map((id) => (
              <button
                key={id}
                onClick={() => {
                  setProductId(id);
                  setSizeId(PRODUCT_TYPES[id].sizes[0].id);
                }}
                className={`text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full border transition-smooth ${
                  productId === id
                    ? "bg-cocoa text-cream border-cocoa"
                    : "bg-background text-cocoa border-border hover:border-cocoa"
                }`}
              >
                {PRODUCT_TYPES[id].label.replace("Cloud Whip ", "")}
              </button>
            ))}
        </div>
        <div className="flex gap-2">
          {product.sizes.map((s) => (
            <button
              key={s.id}
              onClick={() => setSizeId(s.id)}
              className={`flex-1 rounded-2xl border px-3 py-2 text-sm transition-smooth ${
                sizeId === s.id
                  ? "border-rose-gold bg-rose-gold/10 text-cocoa"
                  : "border-border bg-background hover:border-rose-gold/60"
              }`}
            >
              <div className="font-serif text-base">{s.label}</div>
              <div className="text-[11px] text-muted-foreground">{formatPrice(s.priceCents)}</div>
            </button>
          ))}
        </div>
        <Button
          onClick={handleAdd}
          size="lg"
          className="w-full rounded-full bg-cocoa text-cream hover:bg-primary tracking-[0.2em] uppercase text-xs shadow-elegant"
        >
          Add to Ritual — {formatPrice(size.priceCents)}
        </Button>
      </div>
    </article>
  );
};

const NoteRow = ({ label, notes }: { label: string; notes: string[] }) => (
  <div className="flex gap-3 py-1 text-sm">
    <span className="w-12 shrink-0 text-[10px] uppercase tracking-[0.25em] text-muted-foreground pt-1">{label}</span>
    <span className="text-foreground/80">{notes.join(" · ")}</span>
  </div>
);