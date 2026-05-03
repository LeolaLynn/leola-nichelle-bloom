import { CartProvider } from "@/components/leola/CartContext";
import { Navbar } from "@/components/leola/Navbar";
import { Hero } from "@/components/leola/Hero";
import { ProductSection } from "@/components/leola/ProductSection";
import { Collections } from "@/components/leola/Collections";
import { Trust } from "@/components/leola/Trust";
import { ComingSoon } from "@/components/leola/ComingSoon";
import { Footer } from "@/components/leola/Footer";
import { CartDrawer } from "@/components/leola/CartDrawer";

const Index = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Trust />
          <ProductSection />
          <Collections />
          <ComingSoon />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default Index;
