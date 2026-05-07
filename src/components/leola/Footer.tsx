import { Instagram } from "lucide-react";

export const Footer = () => (
  <footer id="footer" className="bg-primary text-primary-foreground">
    <div className="container py-16 grid md:grid-cols-3 gap-10">
      <div>
        <h3 className="font-serif text-2xl">Leola Nichelle</h3>
        <p className="text-xs uppercase tracking-[0.3em] mt-1 text-primary-foreground/70">
          Ritual Fragrance &amp; Skincare
        </p>
        <p className="mt-5 text-sm text-primary-foreground/70 max-w-xs italic font-serif">
          Soft skin. Warm scents. Everyday luxury.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6 text-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] mb-3 text-primary-foreground/60">Explore</p>
          <ul className="space-y-2">
            <li><a href="#shop" className="hover:text-rose-gold transition-smooth">Shop</a></li>
            <li><a href="#collections" className="hover:text-rose-gold transition-smooth">Collections</a></li>
            <li><a href="#coming-soon" className="hover:text-rose-gold transition-smooth">Coming Soon</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] mb-3 text-primary-foreground/60">Contact</p>
          <ul className="space-y-2">
            <li><a href="mailto:hello@leolanichelle.com" className="hover:text-rose-gold transition-smooth">hello@leolanichelle.com</a></li>
            <li>
              {/* Replace with your real Instagram URL */}
              <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-rose-gold transition-smooth">
                <Instagram className="h-4 w-4" /> Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="md:text-right">
        <p className="text-xs text-primary-foreground/60">
          © 2026 Leola Nichelle. All rights reserved.
        </p>
        <p className="mt-2 text-[11px] text-primary-foreground/40">
          Handcrafted with care. Small-batch boutique skincare.
        </p>
      </div>
    </div>
  </footer>
);
