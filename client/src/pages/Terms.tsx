import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Terms() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
                    <p className="text-muted-foreground">Last updated: January 2026</p>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                    <p>
                        Welcome to LiveTrackings.com ("we," "our," or "us"). By accessing or using our website and services,
                        you agree to be bound by these Terms of Service.
                    </p>

                    <h3 className="text-xl font-semibold mt-6">1. Usage of Tracking data</h3>
                    <p>
                        LiveTrackings provides package tracking information for convenience. We are not a carrier.
                        The data shown is retrieved from third-party carriers (TrackingMore, UPS, FedEx, etc.).
                        We do not guarantee the accuracy or timeliness of this information and are not liable for delayed
                        or lost packages. To file a claim, please contact the carrier directly.
                    </p>

                    <h3 className="text-xl font-semibold mt-6">2. Affiliate Disclosure</h3>
                    <p>
                        Our website may contain links to third-party websites or services (such as insurance providers,
                        VPNs, or travel services) that are not owned or controlled by us. We participate in affiliate
                        marketing programs and may earn a commission if you purchase through our links. This comes at
                        no extra cost to you and helps support our free tracking tool.
                    </p>

                    <h3 className="text-xl font-semibold mt-6">3. User Conduct</h3>
                    <p>
                        You agree not to misuse our services, including but not limited to: automated scraping of our data,
                        attempting to interfere with our site's security, or using our service for any illegal purpose.
                    </p>

                    <h3 className="text-xl font-semibold mt-6">4. Limitation of Liability</h3>
                    <p>
                        In no event shall LiveTrackings be liable for any indirect, incidental, special, consequential
                        or punitive damages arising out of your use of the service.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
