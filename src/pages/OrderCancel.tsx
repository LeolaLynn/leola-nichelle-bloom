import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const OrderCancel = () => {
  return (
    <div className="min-h-screen bg-background flex items-center">
      <div className="container max-w-xl text-center py-16">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blush/40 mb-4">
          <Heart className="h-7 w-7 text-rose-gold" />
        </div>
        <span className="text-xs uppercase tracking-[0.4em] text-rose-gold">No Worries</span>
        <h1 className="font-serif text-4xl md:text-5xl text-primary mt-3">
          Your ritual is still waiting
        </h1>
        <p className="mt-4 text-muted-foreground">
          We didn't process your card — your bag has been saved exactly as you left it.
          Take your time. When you're ready, just open your bag and check out again.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="rounded-full bg-cocoa text-cream hover:bg-primary tracking-[0.2em] uppercase text-xs">
            <Link to="/">Back to the Library</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full border-cocoa text-cocoa hover:bg-cocoa hover:text-cream tracking-[0.2em] uppercase text-xs">
            <a href="mailto:leolalynn8277@gmail.com">Contact Us</a>
          </Button>
        </div>
        <p className="mt-8 text-[11px] text-muted-foreground">
          Common reasons checkout doesn't complete: card declined, browser closed, or simply needing more time. None of these charged you.
        </p>
      </div>
    </div>
  );
};

export default OrderCancel;