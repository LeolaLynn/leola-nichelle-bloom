import { Navbar } from "@/components/leola/Navbar";
import { Hero } from "@/components/leola/Hero";
import { CoreCollection } from "@/components/leola/CoreCollection";
import { Collections } from "@/components/leola/Collections";
import { ScentLibrary } from "@/components/leola/ScentLibrary";
import { RitualBuilder } from "@/components/leola/RitualBuilder";
import { Trust } from "@/components/leola/Trust";
import { Reviews } from "@/components/leola/Reviews";
import { ComingSoon } from "@/components/leola/ComingSoon";
import { Footer } from "@/components/leola/Footer";
import { CartDrawer } from "@/components/leola/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Trust />
          <ScentLibrary />
          <RitualBuilder />
          <CoreCollection />
          <Collections />
          <Reviews />
          <ComingSoon />
        </main>
        <Footer />
        <CartDrawer />
    </div>
  );
};

export default Index;
