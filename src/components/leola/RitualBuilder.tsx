import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Trash2, Plus } from "lucide-react";
import {
  SCENTS,
  PRODUCT_TYPES,
  ProductTypeId,
  bundleDiscountPercent,
  BUNDLE_TIERS,
  formatPrice,
} from "./scents";
import { useCart } from "./CartContext";
import { toast } from "sonner";

type Pick = {
  id: string;
  productId: ProductTypeId;
  scent: string;
  sizeId: string;
  priceCents: number;
  sizeLabel: string;
};

/**
 * Interactive Ritual Builder
 * Customers compose a ritual from Scrub + Body Oil + Roll-On
 * with bundle pricing applied in real time:
 *   2 items = 10% off · 3 items = 15% off · 4+ items = 20% off
 */
export const RitualBuilder = () => {
  const [picks, setPicks] = useState<Pick[]>([]);
  const [productId, setProductId] = useState<ProductTypeId>("scrub");
  const [scent, setScent] = useState<string>(SCENTS[0].name);
  const [sizeId, setSizeId] = useState<string>(PRODUCT_TYPES.scrub.sizes[0].id);
  const { add, open } = useCart();

  const product = PRODUCT_TYPES[productId];
  const size = product.sizes.find((s) => s.id === sizeId) || product.sizes[0];

  const subtotal = useMemo(() => picks.reduce((s, p) => s + p.priceCents, 0), [picks]);
  const itemCount = picks.length;
  const discountPct = bundleDiscountPercent(itemCount);
  const discountCents = Math.round((subtotal * discountPct) / 100);
  const total = subtotal - discountCents;

  const nextTier = BUNDLE_TIERS.slice().reverse().find((t) => itemCount < t.minItems);

  const addPick = () => {
    setPicks((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        productId,
        scent,
        sizeId: size.id,
        sizeLabel: size.label,
        priceCents: size.priceCents,
      },
    ]);
  };
  const removePick = (id: string) => setPicks((p) => p.filter((x) => x.id !== id));

  const addRitualToCart = () => {
    if (!picks.length) {
      toast.error("Pick at least one item to build your ritual");
      return;
    }
    picks.forEach((p) => {
      add({
        productId: p.productId,
        productName: PRODUCT_TYPES[p.productId].label,
        scent: p.scent,
        collection: SCENTS.find((s) => s.name === p.scent)?.collection || "",
        sizeLabel: p.sizeLabel,
        sizeId: p.sizeId,
        priceCents: p.priceCents,
      });
    });
    toast.success("Your ritual is in your bag");
    setPicks([]);
    open();
  };

  return (
    <section id="ritual" className="py-20 md:py-28 bg-cream/40">
      <div className="container max-w-4xl">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.4em] text-rose-gold">Mix & Match</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mt-3">
            Build Your Ritual
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">
            Combine sugar scrubs, cloud whip body oil, and roll-on perfume — your discount grows as your ritual does.
          </p>
        </div>

        {/* Tier strip */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          {BUNDLE_TIERS.slice().reverse().map((t) => {
            const active = itemCount >= t.minItems;
            return (
              <div
                key={t.minItems}
                className={`rounded-2xl border px-3 py-3 text-center transition-smooth ${
                  active
                    ? "border-rose-gold bg-rose-gold/15 shadow-soft"
                    : "border-border bg-background/60"
                }`}
              >
                <div className="font-serif text-xl text-primary">{t.percent}%</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  {t.minItems}+ items
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-3xl bg-card border border-border/60 shadow-soft p-6 md:p-8 space-y-6">
          {/* Picker row */}
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Product">
              <select
                value={productId}
                onChange={(e) => {
                  const id = e.target.value as ProductTypeId;
                  setProductId(id);
                  setSizeId(PRODUCT_TYPES[id].sizes[0].id);
                }}
                className="luxe-select"
              >
                {Object.values(PRODUCT_TYPES).map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Scent">
              <select
                value={scent}
                onChange={(e) => setScent(e.target.value)}
                className="luxe-select"
              >
                {SCENTS.filter((s) => s.availableIn[productId]).map((s) => (
                  <option key={s.slug} value={s.name}>{s.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Size">
              <select
                value={sizeId}
                onChange={(e) => setSizeId(e.target.value)}
                className="luxe-select"
              >
                {product.sizes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label} — {formatPrice(s.priceCents)}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Button
            onClick={addPick}
            variant="outline"
            className="w-full rounded-full border-cocoa text-cocoa hover:bg-cocoa hover:text-cream tracking-[0.2em] uppercase text-xs"
          >
            <Plus className="h-4 w-4 mr-1" /> Add to Ritual
          </Button>

          {/* Picks */}
          {picks.length > 0 && (
            <div className="space-y-2">
              {picks.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/60 px-4 py-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-rose-gold">{PRODUCT_TYPES[p.productId].label}</p>
                    <p className="font-serif text-base text-primary">{p.scent} <span className="text-muted-foreground text-sm">· {p.sizeLabel}</span></p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-cocoa">{formatPrice(p.priceCents)}</span>
                    <button onClick={() => removePick(p.id)} aria-label="Remove" className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Live totals */}
          <div className="border-t border-border pt-5 space-y-2">
            {discountPct > 0 ? (
              <div className="flex items-center gap-2 rounded-xl bg-rose-gold/15 border border-rose-gold/30 px-3 py-2 text-xs text-cocoa">
                <Sparkles className="h-3.5 w-3.5 text-rose-gold" />
                <span>Bundle reward unlocked — <strong>{discountPct}% off</strong> your ritual.</span>
              </div>
            ) : nextTier ? (
              <p className="text-xs text-center text-muted-foreground">
                Add {nextTier.minItems - itemCount} more to unlock <strong>{nextTier.percent}% off</strong>.
              </p>
            ) : null}

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discountCents > 0 && (
              <div className="flex justify-between text-sm text-rose-gold">
                <span>Bundle discount ({discountPct}%)</span>
                <span>− {formatPrice(discountCents)}</span>
              </div>
            )}
            <div className="flex justify-between font-serif text-2xl pt-1">
              <span className="text-primary">Total</span>
              <span className="text-cocoa">{formatPrice(total)}</span>
            </div>
          </div>

          <Button
            onClick={addRitualToCart}
            size="lg"
            disabled={!picks.length}
            className="w-full rounded-full bg-cocoa text-cream hover:bg-primary tracking-[0.2em] uppercase text-xs shadow-elegant"
          >
            Add Ritual to Bag
          </Button>
        </div>
      </div>

      <style>{`
        .luxe-select {
          width: 100%;
          background: hsl(var(--background));
          border: 1px solid hsl(var(--border));
          border-radius: 9999px;
          padding: 0.65rem 1.1rem;
          font-size: 0.9rem;
          color: hsl(var(--foreground));
          outline: none;
          appearance: none;
          background-image: linear-gradient(45deg, transparent 50%, hsl(var(--cocoa)) 50%), linear-gradient(135deg, hsl(var(--cocoa)) 50%, transparent 50%);
          background-position: calc(100% - 18px) 50%, calc(100% - 13px) 50%;
          background-size: 5px 5px, 5px 5px;
          background-repeat: no-repeat;
        }
        .luxe-select:focus { border-color: hsl(var(--rose-gold)); box-shadow: 0 0 0 3px hsl(var(--rose-gold) / 0.2); }
      `}</style>
    </section>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
      {label}
    </label>
    {children}
  </div>
);