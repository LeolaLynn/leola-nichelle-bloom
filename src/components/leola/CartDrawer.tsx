import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "./CartContext";
import { getPaypalLink, SizeId } from "./data";

export const CartDrawer = () => {
  const { items, isOpen, close, remove, updateQty, subtotal } = useCart();

  const checkoutAll = () => {
    // Front-end-only: open a PayPal tab per line item.
    // Replace with a single hosted cart link if you prefer.
    items.forEach((i) => {
      window.open(getPaypalLink(i.scent, i.sizeId as SizeId), "_blank", "noopener,noreferrer");
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && close()}>
      <SheetContent className="bg-background w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl text-primary">Your Bag</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
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
                      <p className="font-serif text-lg text-primary leading-tight">{i.scent}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{i.collection}</p>
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
                    <span className="font-serif text-lg text-cocoa">${(i.price * i.qty).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-5 space-y-4">
              <div className="flex justify-between font-serif text-xl">
                <span className="text-primary">Subtotal</span>
                <span className="text-cocoa">${subtotal.toFixed(2)}</span>
              </div>
              <Button onClick={checkoutAll} size="lg" className="w-full rounded-full bg-cocoa text-cream hover:bg-primary tracking-[0.2em] uppercase text-xs">
                Checkout with PayPal
              </Button>
              <p className="text-[11px] text-muted-foreground text-center">
                Each item opens its own PayPal checkout tab.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
