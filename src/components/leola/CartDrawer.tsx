import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, Sparkles } from "lucide-react";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useCart } from "./CartContext";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice, BUNDLE_TIERS } from "./scents";
import { toast } from "sonner";

export const CartDrawer = () => {
  const {
    items, isOpen, close, remove, updateQty,
    subtotalCents, discountPercent, discountCents, totalCents, count,
  } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchClientSecret = async (): Promise<string> => {
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: {
        environment: getStripeEnvironment(),
        returnUrl: `${window.location.origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/order/cancel`,
        discount_cents: discountCents,
        items: items.map((i) => ({
          product_name: i.productName,
          scent: i.scent,
          size_label: i.sizeLabel,
          unit_price_cents: i.priceCents,
          quantity: i.qty,
        })),
      },
    });
    if (error || !data?.clientSecret) {
      throw new Error(error?.message || "Failed to start checkout");
    }
    return data.clientSecret as string;
  };

  const startCheckout = async () => {
    if (!items.length) return;
    setLoading(true);
    try {
      setCheckoutOpen(true);
    } catch (e: any) {
      toast.error(e.message || "Could not start checkout");
    } finally {
      setLoading(false);
    }
  };

  // Find next-tier nudge
  const nextTier = BUNDLE_TIERS
    .slice()
    .reverse()
    .find((t) => count < t.minItems);

  return (
    <Sheet open={isOpen} onOpenChange={(o) => { if (!o) { close(); setCheckoutOpen(false); } }}>
      <SheetContent className="bg-background w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl text-primary">
            {checkoutOpen ? "Checkout" : "Your Ritual"}
          </SheetTitle>
        </SheetHeader>

        {checkoutOpen ? (
          <div className="flex-1 overflow-y-auto -mx-6 px-2">
            <EmbeddedCheckoutProvider
              stripe={getStripe()}
              options={{ fetchClientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="font-serif italic text-cocoa text-xl">Your bag is empty</p>
            <p className="text-sm text-muted-foreground mt-2">Choose a scent to begin.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((i) => (
                <div key={i.id} className="rounded-2xl border border-border/60 p-4 bg-card">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-rose-gold">{i.productName}</p>
                      <p className="font-serif text-lg text-primary leading-tight">{i.scent}</p>
                      <p className="text-xs text-muted-foreground">{i.sizeLabel}</p>
                    </div>
                    <button
                      onClick={() => remove(i.id)}
                      className="text-muted-foreground hover:text-destructive transition-smooth"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(i.id, i.qty - 1)} className="h-7 w-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary"><Minus className="h-3 w-3" /></button>
                      <span className="text-sm w-6 text-center">{i.qty}</span>
                      <button onClick={() => updateQty(i.id, i.qty + 1)} className="h-7 w-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary"><Plus className="h-3 w-3" /></button>
                    </div>
                    <span className="font-serif text-lg text-cocoa">{formatPrice(i.priceCents * i.qty)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              {discountPercent > 0 && (
                <div className="flex items-center gap-2 rounded-xl bg-rose-gold/15 border border-rose-gold/30 px-3 py-2 text-xs text-cocoa">
                  <Sparkles className="h-3.5 w-3.5 text-rose-gold" />
                  <span>Bundle reward unlocked — <strong>{discountPercent}% off</strong> your ritual.</span>
                </div>
              )}
              {discountPercent === 0 && nextTier && (
                <p className="text-[11px] text-center text-muted-foreground">
                  Add {nextTier.minItems - count} more to unlock <strong>{nextTier.percent}% off</strong>.
                </p>
              )}

              <div className="space-y-1 text-sm">
                <Row label="Subtotal" value={formatPrice(subtotalCents)} />
                {discountCents > 0 && (
                  <Row
                    label={`Bundle discount (${discountPercent}%)`}
                    value={`− ${formatPrice(discountCents)}`}
                    accent
                  />
                )}
                <Row label="Shipping" value="$6.00" muted />
                <Row label="Tax" value="Calculated at checkout" muted />
              </div>
              <div className="flex justify-between font-serif text-xl pt-1">
                <span className="text-primary">Total</span>
                <span className="text-cocoa">{formatPrice(totalCents + 600)}+</span>
              </div>
              <Button
                onClick={startCheckout}
                disabled={loading}
                size="lg"
                className="w-full rounded-full bg-cocoa text-cream hover:bg-primary tracking-[0.2em] uppercase text-xs"
              >
                {loading ? "Loading…" : "Secure Checkout"}
              </Button>
              <p className="text-[11px] text-muted-foreground text-center">
                Flat $6 shipping. Sales tax calculated at checkout.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

const Row = ({ label, value, muted, accent }: { label: string; value: string; muted?: boolean; accent?: boolean }) => (
  <div className={`flex justify-between ${muted ? "text-muted-foreground" : ""} ${accent ? "text-rose-gold" : ""}`}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);
