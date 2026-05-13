import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const STORAGE_KEY = "leola.ritualList.v1";

export const RitualListPopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (seen) return;
    const t = setTimeout(() => setOpen(true), 12000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "dismissed");
    setOpen(false);
  };

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("mailerlite-subscribe", {
        body: { email, group: "ritual-list", source: "popup" },
      });
      if (error) throw error;
      localStorage.setItem(STORAGE_KEY, "subscribed");
      toast.success("Welcome to the Ritual List ✨");
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Could not subscribe — please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm animate-fade-up">
      <div className="relative w-full max-w-md rounded-3xl bg-background border border-border/60 shadow-elegant overflow-hidden">
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 rounded-full p-1.5 hover:bg-secondary transition-smooth"
        >
          <X className="h-4 w-4 text-cocoa" />
        </button>
        <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full gradient-gold opacity-30 blur-3xl pointer-events-none" />

        <div className="relative p-8 md:p-10 text-center">
          <Sparkles className="h-6 w-6 text-rose-gold mx-auto" />
          <span className="block text-xs uppercase tracking-[0.4em] text-rose-gold mt-3">
            Members Only
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-primary mt-2 text-balance">
            Join The Ritual List.
          </h3>
          <p className="mt-3 font-serif italic text-cocoa/80 text-balance">
            Early access to future collections, seasonal drops, and quiet luxuries
            you won't find anywhere else.
          </p>

          <form onSubmit={subscribe} className="mt-6 space-y-3">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="rounded-full bg-cream/60 border-border h-12 text-center"
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-cocoa text-cream hover:bg-primary tracking-[0.2em] uppercase text-xs h-12 shadow-elegant"
            >
              {loading ? "Joining…" : "Join The List"}
            </Button>
            <button
              type="button"
              onClick={dismiss}
              className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-cocoa transition-smooth"
            >
              No thanks
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
