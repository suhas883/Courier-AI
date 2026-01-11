import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Package, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TrackingInput } from "@/components/tracking-input";
import { TrackingResult } from "@/components/tracking-result";
import { RecentSearches } from "@/components/recent-searches";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorks } from "@/components/how-it-works";
import PremiumUpgradeBar from "@/components/PremiumUpgradeBar";
import LockedPremiumFeatures from "@/components/LockedPremiumFeatures";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { canUsePremiumFree, usePremiumCredit, getFreePremiumRemaining, isPremiumSubscriber } from "@/lib/premiumAccess";
import type { TrackingAPIResponse, TrackingHistory } from "@shared/schema";

export default function Home() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [currentTracking, setCurrentTracking] = useState<TrackingAPIResponse | null>(null);
  const [freeTracksLeft, setFreeTracksLeft] = useState(getFreePremiumRemaining());
  const [usedPremium, setUsedPremium] = useState(false);

  // Fetch recent searches
  const { data: recentSearches = [], isLoading: loadingHistory } = useQuery<TrackingHistory[]>({
    queryKey: ["/api/history"],
  });

  // Track mutation with premium access logic
  const trackMutation = useMutation({
    mutationFn: async (trackingNumber: string) => {
      // Check if user can use premium (subscriber OR has free credits)
      const hasPremiumAccess = isPremiumSubscriber() || canUsePremiumFree(trackingNumber);
      
      const response = await apiRequest("POST", "/api/track", { 
        trackingNumber,
        premium: hasPremiumAccess 
      });
      return { data: await response.json(), trackingNumber, usedPremium: hasPremiumAccess };
    },
    onSuccess: ({ data, trackingNumber, usedPremium: didUsePremium }) => {
      console.log('[Freemium Debug] onSuccess called', { 
        notFound: data.notFound, 
        eventsLength: data.events?.length,
        didUsePremium,
        isPremium: isPremiumSubscriber()
      });
      
      setCurrentTracking(data);
      
      // Only count as premium usage if tracking was successful (not notFound)
      const successfulTrack = !data.notFound && data.events && data.events.length > 0;
      console.log('[Freemium Debug] successfulTrack:', successfulTrack);
      
      if (successfulTrack) {
        setUsedPremium(didUsePremium);
        
        // Use a premium credit if they got premium features for free
        if (didUsePremium && !isPremiumSubscriber()) {
          console.log('[Freemium Debug] Consuming premium credit for:', trackingNumber);
          usePremiumCredit(trackingNumber);
          const remaining = getFreePremiumRemaining();
          console.log('[Freemium Debug] Free tracks remaining:', remaining);
          setFreeTracksLeft(remaining);
        }
      } else {
        // Failed track - don't consume credits
        console.log('[Freemium Debug] Failed track, not consuming credits');
        setUsedPremium(false);
      }
      
      queryClient.invalidateQueries({ queryKey: ["/api/history"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Tracking Failed",
        description: error.message || "Unable to track this package. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleTrack = (trackingNumber: string) => {
    setCurrentTracking(null);
    setUsedPremium(false);
    trackMutation.mutate(trackingNumber);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 bg-gradient-to-b from-primary/5 to-background" data-testid="hero-section">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <Package className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-hero-title">
            {t('hero.title')}
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto" data-testid="text-hero-subtitle">
            {t('hero.subtitle')}
          </p>
          
          {/* Tracking Input */}
          <div className="max-w-2xl mx-auto mb-6">
            <TrackingInput 
              onTrack={handleTrack} 
              isLoading={trackMutation.isPending}
              size="large"
            />
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>{t('hero.carriers')}</span>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {(trackMutation.isPending || currentTracking) && (
        <section className="py-8 px-4" data-testid="results-section">
          <div className="container mx-auto max-w-3xl">
            {trackMutation.isPending ? (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </CardContent>
              </Card>
            ) : currentTracking ? (
              <>
                <TrackingResult tracking={currentTracking} />
                {/* Premium CTA - shows right after tracking results when user is engaged */}
                {/* Only show if user has used all free premium tracks */}
                {freeTracksLeft === 0 && !isPremiumSubscriber() && (
                  <div className="mt-8">
                    <LockedPremiumFeatures 
                      trackingNumber={currentTracking.trackingNumber}
                      packageStatus={currentTracking.status}
                      carrier={currentTracking.courier || undefined}
                      freeTracksLeft={freeTracksLeft}
                    />
                  </div>
                )}
                {/* Show remaining free tracks if they still have some */}
                {freeTracksLeft > 0 && !isPremiumSubscriber() && currentTracking && !currentTracking.notFound && currentTracking.events.length > 0 && (
                  <div className="mt-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center" data-testid="banner-free-tracks">
                    <p className="text-green-800 dark:text-green-200 font-medium">
                      You got full AI insights for free! 
                      <span className="ml-2 font-bold">{freeTracksLeft} free premium track{freeTracksLeft !== 1 ? 's' : ''} remaining.</span>
                    </p>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </section>
      )}

      {/* Recent Searches */}
      {!currentTracking && !trackMutation.isPending && (
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-3xl">
            {loadingHistory ? (
              <div className="space-y-3">
                <Skeleton className="h-5 w-32" />
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
              <RecentSearches searches={recentSearches} onSelect={handleTrack} />
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      {!currentTracking && !trackMutation.isPending && <FeaturesSection />}

      {/* How It Works */}
      {!currentTracking && !trackMutation.isPending && <HowItWorks />}
    </div>
  );
}
