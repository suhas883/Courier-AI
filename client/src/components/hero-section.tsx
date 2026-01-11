import { useState } from "react";
import { Search, Sparkles, Package, Globe, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  onTrack: (trackingNumber: string) => void;
  isLoading?: boolean;
}

export function HeroSection({ onTrack, isLoading }: HeroSectionProps) {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      onTrack(trackingNumber.trim());
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container relative px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 gap-1">
            <Sparkles className="h-3 w-3" />
            Powered by Gemini AI
          </Badge>
          
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Track Any Package,{" "}
            <span className="text-primary">Anywhere</span>
          </h1>
          
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Real-time tracking for 1000+ couriers worldwide with AI-powered delivery insights
          </p>

          <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter your tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="h-12 pl-10 text-base"
                  data-testid="input-tracking-number"
                />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="h-12 px-8"
                disabled={isLoading || !trackingNumber.trim()}
                data-testid="button-track"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Tracking...
                  </span>
                ) : (
                  "Track Package"
                )}
              </Button>
            </div>
          </form>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <span>1000+ Couriers</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              <span>Real-time Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              <span>Smart Predictions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
