import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "./CartContext";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/collections/core", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const { count, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/40">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex flex-col leading-none" onClick={() => setMenuOpen(false)}>
          <span className="font-serif text-xl md:text-2xl tracking-wide text-primary">Leola Nichelle</span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground mt-0.5">
            Fragrance &amp; Skin Rituals
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] tracking-wide text-foreground/80">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                `transition-smooth hover:text-rose-gold ${isActive ? "text-rose-gold" : ""}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
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
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Open menu"
            className="lg:hidden rounded-full p-2.5 bg-secondary/60 hover:bg-secondary transition-smooth"
          >
            {menuOpen ? <X className="h-5 w-5 text-primary" /> : <Menu className="h-5 w-5 text-primary" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-md animate-fade-up">
          <nav className="container flex flex-col py-4">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `py-3 border-b border-border/40 text-sm tracking-wide ${
                    isActive ? "text-rose-gold" : "text-foreground/80"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
