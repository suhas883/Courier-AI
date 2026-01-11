import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Link } from "wouter";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/" className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2">
          <span data-testid="link-back-home">Back to Home</span>
        </Link>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl" data-testid="text-page-title">Terms of Service</CardTitle>
            </div>
            <p className="text-muted-foreground">Last updated: January 2026</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By using this tool, you agree that AI-generated predictions (weather, delays) are estimates and not guarantees. Official carrier data remains the final authority.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Service Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                LiveTrackings.com provides package tracking services by aggregating data from multiple carrier APIs. Our AI-powered features offer predictions and insights based on available tracking data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Accuracy of Information</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Tracking data is sourced directly from carrier systems</li>
                <li>AI predictions are estimates based on historical patterns</li>
                <li>Actual delivery times may vary from predictions</li>
                <li>We are not liable for any discrepancies in carrier data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">User Responsibilities</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Enter valid tracking numbers only</li>
                <li>Do not attempt to abuse or overload our services</li>
                <li>Respect the intellectual property of our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                LiveTrackings.com is not responsible for any losses, delays, or damages resulting from the use of our tracking service or reliance on AI predictions. Always verify critical information directly with your carrier.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of updated terms.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
