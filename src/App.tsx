import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import OrderSuccess from "./pages/OrderSuccess.tsx";
import OrderCancel from "./pages/OrderCancel.tsx";
import CoreCollectionPage from "./pages/leola/CoreCollectionPage";
import EndlessSummerPage from "./pages/leola/EndlessSummerPage";
import GothicRomancePage from "./pages/leola/GothicRomancePage";
import HolidayPage from "./pages/leola/HolidayPage";
import AboutPage from "./pages/leola/AboutPage";
import RitualGuidePage from "./pages/leola/RitualGuidePage";
import FaqPage from "./pages/leola/FaqPage";
import ContactPage from "./pages/leola/ContactPage";
import { CartProvider } from "@/components/leola/CartContext";
import { RootLayout } from "@/components/leola/RootLayout";
import Unsubscribe from "./pages/Unsubscribe";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCampaigns from "./pages/admin/AdminCampaigns";
import AdminCalendar from "./pages/admin/AdminCalendar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/collections/core" element={<CoreCollectionPage />} />
              <Route path="/collections/endless-summer" element={<EndlessSummerPage />} />
              <Route path="/collections/gothic-romance" element={<GothicRomancePage />} />
              <Route path="/collections/holiday" element={<HolidayPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/ritual-guide" element={<RitualGuidePage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/order/success" element={<OrderSuccess />} />
              <Route path="/order/cancel" element={<OrderCancel />} />
            </Route>
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="campaigns" element={<AdminCampaigns />} />
              <Route path="calendar" element={<AdminCalendar />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
