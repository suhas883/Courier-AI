import { Package, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Package className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">LiveTrackings</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Track any package, anywhere. Powered by AI for smarter delivery insights.
            </p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Powered by Gemini AI</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Real-Time Tracking</li>
              <li>AI Predictions</li>
              <li>1000+ Couriers</li>
              <li>Multi-Language Support</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Help Center</li>
              <li>API Documentation</li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
              <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="mb-4 text-xs max-w-2xl mx-auto italic opacity-70">
            **Affiliate Disclosure**: We may earn a commission when you click through links on our site.
            This supports our free tracking tool at no extra cost to you.
          </p>
          <p>&copy; {new Date().getFullYear()} LiveTrackings. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
