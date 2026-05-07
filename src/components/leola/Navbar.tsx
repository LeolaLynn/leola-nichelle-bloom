import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";

export const Navbar = () => {
  const { count, open } = useCart();
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/40">
      <div className="container flex items-center justify-between py-4">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-serif text-xl md:text-2xl tracking-wide text-primary">Leola Nichelle</span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground mt-0.5">Ritual Fragrance &amp; Skincare</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide text-foreground/80">
          <a href="#core" className="hover:text-rose-gold transition-smooth">Shop</a>
          <a href="#collections" className="hover:text-rose-gold transition-smooth">Collections</a>
          <a href="#coming-soon" className="hover:text-rose-gold transition-smooth">Coming Soon</a>
          <a href="#footer" className="hover:text-rose-gold transition-smooth">Contact</a>
        </nav>
        <button
          onClick={open}
          aria-label="Open cart"
          className="relative rounded-full p-2.5 bg-secondary/60 hover:bg-secondary transition-smooth"
        >
          <ShoppingBag className="h-5 w-5 text-primary" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-cocoa text-cream text-[10px] flex items-center justify-center font-medium">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
