import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStripeEnvironment } from "@/lib/stripe";

type OrderItem = {
  product_name: string;
  scent: string | null;
  size_label: string | null;
  unit_price_cents: number;
  quantity: number;
  line_total_cents: number;
};
type Order = {
  id: string;
  stripe_session_id: string;
  customer_email: string | null;
  customer_name: string | null;
  subtotal_cents: number;
  discount_cents: number;
  shipping_cents: number;
  tax_cents: number;
  total_cents: number;
  currency: string;
  shipping_address: any;
  created_at: string;
  order_items: OrderItem[];
};

const fmt = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

const OrderSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError("No order reference found.");
      return;
    }
    let cancelled = false;
    let attempts = 0;
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID as string;
    const apikey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
    const fetchOrder = async () => {
      try {
        const url = `https://${projectId}.supabase.co/functions/v1/get-order?session_id=${encodeURIComponent(sessionId)}&env=${getStripeEnvironment()}`;
        const res = await fetch(url, { headers: { apikey, Authorization: `Bearer ${apikey}` } });
        const json = await res.json();
        if (cancelled) return;
        if (json.order) {
          setOrder(json.order);
          setLoading(false);
        } else if (json.pending && attempts < 5) {
          attempts += 1;
          setTimeout(fetchOrder, 1500);
        } else {
          setError(json.error || "Order not found yet. Please check your email.");
          setLoading(false);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e.message || "Could not load order");
          setLoading(false);
        }
      }
    };
    fetchOrder();
    return () => { cancelled = true; };
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl py-16 md:py-24">
        <div className="text-center mb-10">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-rose-gold/15 mb-4">
            <CheckCircle2 className="h-8 w-8 text-rose-gold" />
          </div>
          <span className="text-xs uppercase tracking-[0.4em] text-rose-gold">Thank you</span>
          <h1 className="font-serif text-4xl md:text-5xl text-primary mt-3">
            Your ritual is on its way
          </h1>
          <p className="mt-4 text-muted-foreground">
            A small-batch labor of love, hand-poured with care. Thank you for supporting Leola Nichelle.
          </p>
        </div>

        {loading && (
          <p className="text-center text-muted-foreground">Loading your order…</p>
        )}

        {error && !order && (
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">{error}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Reference: {sessionId?.slice(-12)}
            </p>
          </div>
        )}

        {order && (
          <div className="rounded-3xl border border-border/60 bg-card shadow-soft p-6 md:p-8 space-y-6">
            <div className="flex flex-wrap justify-between gap-3 text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Order</p>
                <p className="font-mono text-cocoa">#{order.id.slice(0, 8).toUpperCase()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Date</p>
                <p>{new Date(order.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            {order.customer_email && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground border-t border-border pt-4">
                <Mail className="h-4 w-4 text-rose-gold" />
                A receipt has been sent to <strong className="text-foreground">{order.customer_email}</strong>
              </div>
            )}

            <div className="border-t border-border pt-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-rose-gold mb-3">Your items</p>
              <ul className="space-y-3">
                {order.order_items.map((it, idx) => (
                  <li key={idx} className="flex justify-between gap-4">
                    <div>
                      <p className="font-serif text-base text-primary">
                        {it.scent ? `${it.scent} — ` : ""}{it.product_name.replace(/^.* — /, "")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {it.size_label} · qty {it.quantity}
                      </p>
                    </div>
                    <span className="font-serif text-cocoa">{fmt(it.line_total_cents)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border pt-4 space-y-1.5 text-sm">
              <Row label="Subtotal" value={fmt(order.subtotal_cents)} />
              {order.discount_cents > 0 && (
                <Row label="Bundle discount" value={`− ${fmt(order.discount_cents)}`} accent />
              )}
              <Row label="Shipping" value={fmt(order.shipping_cents)} />
              <Row label="Tax" value={fmt(order.tax_cents)} />
              <div className="flex justify-between font-serif text-xl pt-2">
                <span className="text-primary">Total</span>
                <span className="text-cocoa">{fmt(order.total_cents)}</span>
              </div>
            </div>

            {order.shipping_address && (
              <div className="border-t border-border pt-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-rose-gold mb-2">Shipping to</p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {order.customer_name && <>{order.customer_name}<br /></>}
                  {order.shipping_address.line1}<br />
                  {order.shipping_address.line2 && <>{order.shipping_address.line2}<br /></>}
                  {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}<br />
                  {order.shipping_address.country}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-10">
          <Button asChild size="lg" className="rounded-full bg-cocoa text-cream hover:bg-primary tracking-[0.2em] uppercase text-xs">
            <Link to="/">Return to the Library</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className={`flex justify-between ${accent ? "text-rose-gold" : "text-muted-foreground"}`}>
    <span>{label}</span>
    <span className={accent ? "" : "text-foreground"}>{value}</span>
  </div>
);

export default OrderSuccess;