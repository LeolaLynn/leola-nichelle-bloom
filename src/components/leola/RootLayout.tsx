import { Outlet, ScrollRestoration } from "react-router-dom";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { CartDrawer } from "./CartDrawer";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { RitualListPopup } from "./RitualListPopup";

export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PaymentTestModeBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <RitualListPopup />
      <ScrollRestoration />
    </div>
  );
};
