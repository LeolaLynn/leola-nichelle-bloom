import { useMemo, useState } from "react";
import jar from "@/assets/cloud-whip-jar.jpg";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { COLLECTIONS, CollectionKey, SIZES, SizeId, getPaypalLink } from "./data";
import { useCart } from "./CartContext";
import { toast } from "sonner";

export const ProductSection = () => {
  const [collection, setCollection] = useState<CollectionKey>("everyday");
  const scents = COLLECTIONS[collection].scents;
  const [scent, setScent] = useState<string>(scents[0].name);
  const [sizeId, setSizeId] = useState<SizeId>("4oz");
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  // keep scent valid when collection changes
  const ensureScent = (key: CollectionKey) => {
    setCollection(key);
    setScent(COLLECTIONS[key].scents[0].name);
  };

  const currentScent = scents.find((s) => s.name === scent) ?? scents[0];

  const size = useMemo(() => SIZES.find((s) => s.id === sizeId)!, [sizeId]);

  const handleAdd = () => {
    add({
      productId: "body_oil",
      productName: "Cloud Whip Body Oil",
      scent,
      collection: COLLECTIONS[collection].label,
      sizeLabel: size.label,
      sizeId: size.id,
      priceCents: size.price * 100,
      qty,
    });
    toast.success(`${scent} • ${size.label} added to bag`);
  };

  const handleBuyNow = () => {
    // PAYPAL: opens the mapped link for the selected scent + size in a new tab.
    // If the link hasn't been pasted in src/components/leola/data.ts yet,
    // we show a friendly message instead.
    const url = getPaypalLink(scent, sizeId);
    if (!url) {
      toast.error("Please select a scent and size");
      return;
    }
    window.open(url, "_blank");
  };

  return (
    <section id="shop" className="py-20 md:py-28 bg-cream/40">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.4em] text-rose-gold">The Signature</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mt-3">Cloud Whip Body Oil</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Nourishing oils whipped into a soft, buttery, cloud-like texture that
            melts into the skin. Non-greasy, deeply hydrating, and infused with
            scents from our hand-poured library.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start max-w-5xl mx-auto">
          {/* Image */}
          <div className="relative">
            <div className="absolute inset-6 rounded-3xl gradient-gold blur-2xl opacity-40" />
            <img
              src={jar}
              alt="Cloud Whip Body Oil jar"
              width={1024}
              height={1024}
              loading="lazy"
              className="relative w-full aspect-square object-cover rounded-3xl shadow-elegant"
            />
          </div>

          {/* Form */}
          <div className="bg-card rounded-3xl p-8 md:p-10 shadow-soft border border-border/60">
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="font-serif text-2xl text-primary">Customize your jar</h3>
              <span className="font-serif text-3xl text-cocoa">${size.price}</span>
            </div>

            {/* Collection */}
            <Field label="Collection">
              <select
                value={collection}
                onChange={(e) => ensureScent(e.target.value as CollectionKey)}
                className="luxe-select"
              >
                {(Object.keys(COLLECTIONS) as CollectionKey[]).map((k) => (
                  <option key={k} value={k}>{COLLECTIONS[k].label}</option>
                ))}
              </select>
            </Field>

            {/* Scent (dynamic) */}
            <Field label="Scent">
              <select
                value={scent}
                onChange={(e) => setScent(e.target.value)}
                className="luxe-select"
              >
                {scents.map((s) => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
              <p className="mt-2 text-[11px] tracking-wide text-muted-foreground italic">
                {currentScent.notes}
              </p>
            </Field>

            {/* Size */}
            <Field label="Size">
              <select
                value={sizeId}
                onChange={(e) => setSizeId(e.target.value as SizeId)}
                className="luxe-select"
              >
                {SIZES.map((s) => (
                  <option key={s.id} value={s.id}>{s.label} — ${s.price}</option>
                ))}
              </select>
            </Field>

            {/* Quantity */}
            <Field label="Quantity">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-10 w-10 rounded-full border border-border bg-background hover:bg-secondary transition-smooth flex items-center justify-center"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-serif text-xl w-8 text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="h-10 w-10 rounded-full border border-border bg-background hover:bg-secondary transition-smooth flex items-center justify-center"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </Field>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              <Button
                onClick={handleAdd}
                variant="outline"
                size="lg"
                className="rounded-full border-cocoa text-cocoa hover:bg-cocoa hover:text-cream tracking-[0.2em] uppercase text-xs"
              >
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                size="lg"
                className="rounded-full bg-cocoa text-cream hover:bg-primary tracking-[0.2em] uppercase text-xs shadow-elegant"
              >
                Buy Now
              </Button>
            </div>
            <p className="mt-4 text-[11px] text-muted-foreground text-center">
              Buy Now opens secure PayPal checkout in a new tab.
            </p>
          </div>
        </div>
      </div>

      {/* small inline styles for the select to keep luxe look without extra files */}
      <style>{`
        .luxe-select {
          width: 100%;
          background: hsl(var(--background));
          border: 1px solid hsl(var(--border));
          border-radius: 9999px;
          padding: 0.75rem 1.25rem;
          font-size: 0.95rem;
          color: hsl(var(--foreground));
          outline: none;
          transition: all 0.3s;
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
  <div className="mb-5">
    <label className="block text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">{label}</label>
    {children}
  </div>
);
