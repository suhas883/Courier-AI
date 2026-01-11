import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/" className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2">
          <span data-testid="link-back-home">Back to Home</span>
        </Link>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl" data-testid="text-page-title">Privacy Policy</CardTitle>
            </div>
            <p className="text-muted-foreground">Last updated: January 2026</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">Our Commitment to Your Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Livetrackings.com uses API to provide logistics insights. We do not store your personal tracking numbers on our servers. We use cookies only for site functionality and affiliate attribution.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Data We Collect</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Tracking numbers entered for lookup (not stored permanently)</li>
                <li>Basic usage analytics for site improvement</li>
                <li>Cookie preferences for functionality</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">How We Use Your Data</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>To retrieve tracking information from carrier APIs</li>
                <li>To provide AI-powered delivery predictions</li>
                <li>To improve our service quality</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use TrackingMore API to fetch real-time tracking data from 1,500+ carriers worldwide. We also use Google Gemini AI to provide intelligent delivery predictions and insights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use essential cookies for site functionality and optional cookies for affiliate attribution. You can manage your cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this privacy policy, please contact us through our website.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
