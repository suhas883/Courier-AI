import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacy() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
                    <p className="text-muted-foreground">Last updated: January 2026</p>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none space-y-4">
                    <h3 className="text-xl font-semibold mt-6">1. Information We Collect</h3>
                    <p>
                        <strong>Tracking Data:</strong> When you track a package, we process the tracking number to retrieve
                        status updates. We may store this tracking history locally on your device or in our database for your convenience.
                        <br />
                        <strong>Analytics:</strong> We use anonymous analytics tools to understand how our site is used and improve user experience.
                    </p>

                    <h3 className="text-xl font-semibold mt-6">2. How We Use Your Data</h3>
                    <p>
                        We use your data solely to provide the package tracking service. We do not sell your personal tracking
                        data to third parties.
                    </p>

                    <h3 className="text-xl font-semibold mt-6">3. Third-Party Links & Cookies</h3>
                    <p>
                        Our site contains links to third-party partners (affiliates). If you click these links, the third party
                        may place a cookie on your browser to track the referral. We do not control these cookies. Please review
                        the privacy policies of any third-party sites you visit.
                    </p>

                    <h3 className="text-xl font-semibold mt-6">4. Data Security</h3>
                    <p>
                        We implement reasonable security measures to protect your information. However, no method of transmission
                        over the Internet is 100% secure.
                    </p>

                    <h3 className="text-xl font-semibold mt-6">5. Contact Us</h3>
                    <p>
                        If you have questions about this privacy policy, please contact us via our website contact form.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
