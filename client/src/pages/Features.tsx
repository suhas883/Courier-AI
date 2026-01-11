import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Package, 
  Globe, 
  Brain, 
  Cloud, 
  Clock, 
  Shield, 
  Zap, 
  Bell,
  BarChart3,
  MessageSquare
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "1,500+ Carriers Worldwide",
    description: "Track packages from UPS, FedEx, DHL, USPS, DTDC, Delhivery, Royal Mail, and 1,500+ other carriers globally. One platform for all your shipments."
  },
  {
    icon: Brain,
    title: "AI-Powered Predictions",
    description: "Our Gemini AI analyzes tracking patterns to provide intelligent delivery predictions. Get accurate estimates based on real carrier data."
  },
  {
    icon: Cloud,
    title: "Real-Time Weather Impact",
    description: "AI monitors weather conditions at your package's location and destination to alert you of potential weather-related delays."
  },
  {
    icon: Clock,
    title: "Delay Risk Analysis",
    description: "Smart algorithms analyze tracking patterns to identify potential delays before they happen. Stay informed about your package status."
  },
  {
    icon: Zap,
    title: "Instant Tracking",
    description: "Get real-time updates in seconds. No account required. Just enter your tracking number and get comprehensive status information."
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "We don't store your tracking numbers. Your data passes through securely to fetch real-time information from carriers."
  },
  {
    icon: Bell,
    title: "Smart Recommendations",
    description: "Receive AI-generated tips and recommendations based on your package status to help ensure successful delivery."
  },
  {
    icon: BarChart3,
    title: "Detailed Timeline",
    description: "View complete tracking history with timestamps, locations, and status updates from pickup to delivery."
  },
  {
    icon: MessageSquare,
    title: "AI Chat Assistant",
    description: "Have questions about your shipment? Our AI assistant can help answer tracking questions and provide shipping guidance."
  }
];

export default function Features() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link href="/" className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2">
          <span data-testid="link-back-home">Back to Home</span>
        </Link>

        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Package className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4" data-testid="text-page-title">Platform Features</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            LiveTrackings.com combines real-time carrier data with AI intelligence to give you the most comprehensive package tracking experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="hover-elevate">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Track Your Package?</h2>
              <p className="text-muted-foreground mb-6">
                Start tracking any package from 1,500+ carriers worldwide with AI-powered insights.
              </p>
              <Link href="/">
                <Button size="lg" data-testid="button-start-tracking">
                  <Package className="mr-2 h-5 w-5" />
                  Start Tracking Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
