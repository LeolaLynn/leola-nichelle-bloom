import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import OrderSuccess from "./pages/OrderSuccess.tsx";
import OrderCancel from "./pages/OrderCancel.tsx";
import { PaymentTestModeBanner } from "./components/PaymentTestModeBanner";
import { CartProvider } from "@/components/leola/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider>
          <PaymentTestModeBanner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/order/success" element={<OrderSuccess />} />
            <Route path="/order/cancel" element={<OrderCancel />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
