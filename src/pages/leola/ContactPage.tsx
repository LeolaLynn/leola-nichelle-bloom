import { useState } from "react";
import { PageShell } from "@/components/leola/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Instagram } from "lucide-react";
import { toast } from "sonner";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.includes("@") || !form.message.trim()) {
      return toast.error("Please complete all fields");
    }
    setLoading(true);
    // Soft submit — opens user's mail client (no backend required for v1)
    const subject = encodeURIComponent(`Leola Nichelle — ${form.name || "Inquiry"}`);
    const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`);
    window.location.href = `mailto:hello@leolanichelle.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email…");
    setLoading(false);
  };

  return (
    <PageShell eyebrow="Get In Touch" title="We'd love to hear from you." intro="Press, partnerships, or a quiet hello — leave a note and we'll write back.">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={submit} className="rounded-3xl bg-card border border-border/60 p-6 md:p-8 shadow-soft space-y-4">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="rounded-full bg-cream/60 h-12" />
            <Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className="rounded-full bg-cream/60 h-12" />
            <Textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="What's on your mind?" rows={6} className="rounded-2xl bg-cream/60" />
            <Button type="submit" disabled={loading} className="w-full rounded-full bg-cocoa text-cream hover:bg-primary tracking-[0.2em] uppercase text-xs h-12 shadow-elegant">
              {loading ? "Opening…" : "Send Message"}
            </Button>
          </form>
        </div>
        <div className="space-y-4">
          <a href="mailto:hello@leolanichelle.com" className="rounded-2xl bg-card border border-border/60 p-5 shadow-soft flex items-center gap-3 hover:shadow-elegant transition-smooth">
            <Mail className="h-5 w-5 text-rose-gold" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-rose-gold">Email</p>
              <p className="text-sm font-serif text-primary">hello@leolanichelle.com</p>
            </div>
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="rounded-2xl bg-card border border-border/60 p-5 shadow-soft flex items-center gap-3 hover:shadow-elegant transition-smooth">
            <Instagram className="h-5 w-5 text-rose-gold" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-rose-gold">Instagram</p>
              <p className="text-sm font-serif text-primary">@leolanichelle</p>
            </div>
          </a>
        </div>
      </div>
    </PageShell>
  );
};
export default ContactPage;
