import { Outlet } from "react-router-dom";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { CartDrawer } from "./CartDrawer";

/**
 * RootLayout renders shared chrome (test-mode banner + cart drawer) and
 * an <Outlet /> for the current route. Mounting this inside the single
 * <CartProvider> in App guarantees every route can safely call useCart().
 */
export const RootLayout = () => {
  return (
    <>
      <PaymentTestModeBanner />
      <Outlet />
      <CartDrawer />
    </>
  );
};