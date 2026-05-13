import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer id="footer" className="bg-primary text-primary-foreground">
    <div className="container py-16 grid md:grid-cols-4 gap-10">
      <div className="md:col-span-2">
        <h3 className="font-serif text-2xl">Leola Nichelle</h3>
        <p className="text-xs uppercase tracking-[0.3em] mt-1 text-primary-foreground/70">
          Fragrance &amp; Skin Rituals
        </p>
        <p className="mt-5 text-sm text-primary-foreground/70 max-w-md italic font-serif leading-relaxed">
          A boutique fragrance house hidden inside a luxury skin ritual. Soft skin. Warm scents. Everyday luxury.
        </p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] mb-3 text-primary-foreground/60">Collections</p>
        <ul className="space-y-2 text-sm">
          <li><Link to="/collections/core" className="hover:text-rose-gold transition-smooth">Core</Link></li>
          <li><Link to="/collections/endless-summer" className="hover:text-rose-gold transition-smooth">Endless Summer</Link></li>
          <li><Link to="/collections/gothic-romance" className="hover:text-rose-gold transition-smooth">Gothic Romance</Link></li>
          <li><Link to="/collections/holiday" className="hover:text-rose-gold transition-smooth">Holiday</Link></li>
        </ul>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] mb-3 text-primary-foreground/60">House</p>
        <ul className="space-y-2 text-sm">
          <li><Link to="/about" className="hover:text-rose-gold transition-smooth">About</Link></li>
          <li><Link to="/ritual-guide" className="hover:text-rose-gold transition-smooth">Ritual Guide</Link></li>
          <li><Link to="/faq" className="hover:text-rose-gold transition-smooth">FAQ</Link></li>
          <li><Link to="/contact" className="hover:text-rose-gold transition-smooth">Contact</Link></li>
          <li>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-rose-gold transition-smooth">
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10">
      <div className="container py-6 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
        <p className="text-[11px] text-primary-foreground/50">© 2026 Leola Nichelle. Hand-poured in small batches.</p>
        <p className="text-[11px] text-primary-foreground/40">A boutique fragrance house — soft skin, warm scents, everyday luxury.</p>
      </div>
    </div>
  </footer>
);
