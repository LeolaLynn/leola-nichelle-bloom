import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { CartDrawer } from "./CartDrawer";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { RitualListPopup } from "./RitualListPopup";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
};

export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollToTop />
      <PaymentTestModeBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <RitualListPopup />
    </div>
  );
};
