import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const WaitlistForm = ({ group, label }: { group: string; label: string }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("Enter a valid email");
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("mailerlite-subscribe", {
        body: { email, group, source: `waitlist-${group}` },
      });
      if (error) throw error;
      toast.success("You're on the list ✨");
      setEmail("");
    } catch (err: any) {
      toast.error(err.message || "Could not subscribe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="rounded-3xl bg-card border border-border/60 p-6 md:p-8 shadow-soft max-w-xl mx-auto">
      <p className="text-[10px] uppercase tracking-[0.3em] text-rose-gold text-center">Early Access</p>
      <h3 className="font-serif text-2xl md:text-3xl text-primary text-center mt-2">{label}</h3>
      <p className="text-sm text-muted-foreground text-center mt-3">
        Be the first to know when this collection drops. No spam — just quiet luxuries.
      </p>
      <div className="mt-5 flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="rounded-full bg-cream/60 border-border h-12 flex-1 text-center sm:text-left"
        />
        <Button
          type="submit"
          disabled={loading}
          className="rounded-full bg-cocoa text-cream hover:bg-primary tracking-[0.2em] uppercase text-xs h-12 px-8"
        >
          {loading ? "Joining…" : "Notify Me"}
        </Button>
      </div>
    </form>
  );
};
