import { useState } from 'react';
import { Crown, Lock, CloudRain, Zap, Shield, Bell, ArrowRight, CheckCircle2, Star, TrendingUp, Route, MessageSquare, Check, Eye, AlertTriangle, Key, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { validateLicenseKey, isPremiumSubscriber } from '@/lib/premiumAccess';

const LEMONSQUEEZY_CHECKOUT_URL = 'https://livetrackings.lemonsqueezy.com/buy/your-product-id';

interface LockedPremiumFeaturesProps {
  trackingNumber?: string;
  packageStatus?: string;
  carrier?: string;
  freeTracksLeft?: number;
  delayRisk?: string;
  onUnlock?: () => void;
}

export default function LockedPremiumFeatures({ trackingNumber, packageStatus, carrier, delayRisk, onUnlock }: LockedPremiumFeaturesProps) {
  const { t } = useTranslation();
  const [licenseKey, setLicenseKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleUpgrade = () => {
    window.open(LEMONSQUEEZY_CHECKOUT_URL, '_blank');
  };

  const handleValidateLicense = async () => {
    if (!licenseKey.trim()) {
      setError('Please enter a license key');
      return;
    }

    setIsValidating(true);
    setError('');

    const result = await validateLicenseKey(licenseKey.trim());

    setIsValidating(false);

    if (result.valid) {
      setSuccess(true);
      if (onUnlock) {
        onUnlock();
      }
      // Reload after short delay to show success state
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      setError(result.error || 'Invalid license key');
    }
  };

  const isDelivered = packageStatus && ['Delivered', 'delivered'].includes(packageStatus);
  const hasHighRisk = delayRisk && ['medium', 'high'].includes(delayRisk.toLowerCase());

  const freeFeatures = [
    'AI delivery prediction',
    'Basic delay risk level',
    'Smart recommendations',
  ];

  const premiumTeasers = isDelivered ? [
    {
      icon: Star,
      title: 'Carrier Score',
      teaser: `How did ${carrier || 'this carrier'} perform? Was it faster or slower than average?`,
      blurred: '4.2/5 - 12% faster than average',
    },
    {
      icon: TrendingUp,
      title: 'Delivery Analytics',
      teaser: 'Route efficiency, cost-saving tips for next time',
      blurred: 'Could have saved $3.40 with...',
    },
  ] : [
    {
      icon: CloudRain,
      title: 'Weather Alert',
      teaser: 'Is weather affecting your package right now?',
      blurred: hasHighRisk ? 'Storm warning in transit area...' : 'Clear conditions on route',
    },
    {
      icon: Zap,
      title: 'Disruption Radar',
      teaser: 'Port congestion? Customs backup? Carrier issues?',
      blurred: hasHighRisk ? '2 active disruptions detected...' : 'No disruptions detected',
    },
    {
      icon: Route,
      title: 'Reroute Options',
      teaser: 'Wont be home? See your redirect options',
      blurred: '3 options: Hold at facility, neighbor...',
    },
    {
      icon: Bell,
      title: 'Instant Alerts',
      teaser: 'Get SMS/email the moment something changes',
      blurred: 'Next update in ~4 hours',
    },
  ];

  // If already premium, don't show this component
  if (isPremiumSubscriber()) {
    return null;
  }

  return (
    <Card className="overflow-hidden border border-border bg-card" data-testid="locked-premium-section">
      <div className="p-6 md:p-8">
        {/* What You Got Free */}
        <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            What you got (free):
          </h4>
          <ul className="space-y-2">
            {freeFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                <Check className="h-4 w-4 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* What You're Missing - Teasers */}
        <div className="mb-6">
          <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-amber-500" />
            What you're not seeing:
          </h4>
          <div className="space-y-3">
            {premiumTeasers.map((teaser, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-3 rounded-lg bg-muted/50 p-3 relative overflow-hidden"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <teaser.icon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-semibold text-sm text-foreground">{teaser.title}</h5>
                    <Lock className="h-3 w-3 text-amber-500 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{teaser.teaser}</p>
                  {/* Blurred teaser - what they would see */}
                  <div className="relative">
                    <p className="text-sm font-medium text-foreground blur-[6px] select-none pointer-events-none">
                      {teaser.blurred}
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">
                        Premium
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgency Banner - Only if high risk detected */}
        {hasHighRisk && !isDelivered && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-800 dark:text-red-200 text-sm">
                  Delay risk detected for this package
                </p>
                <p className="text-xs text-red-700 dark:text-red-300">
                  Premium would tell you exactly why and what to do about it.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <div className="text-center sm:text-right">
              <p className="text-3xl font-bold text-foreground">
                $9
                <span className="text-base font-normal text-muted-foreground">/month</span>
              </p>
              <p className="text-xs text-muted-foreground">Unlimited packages</p>
            </div>
            <Button 
              onClick={handleUpgrade}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-6 shadow-lg group"
              data-testid="button-subscribe-premium"
            >
              <Crown className="h-4 w-4 mr-2" />
              Get Premium
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Trust Signals */}
          <div className="flex items-center justify-center gap-4 flex-wrap text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-green-500" />
              Secure payment
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-amber-500" />
              Instant access
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-blue-500" />
              Cancel anytime
            </span>
          </div>

          {/* License Key Input */}
          <div className="border-t border-amber-200 dark:border-amber-800 pt-4 mt-4">
            <p className="text-sm text-center text-muted-foreground mb-3">
              Already have a license key?
            </p>
            
            {success ? (
              <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">License activated! Reloading...</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your license key"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value)}
                    className="pl-10"
                    data-testid="input-license-key"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleValidateLicense();
                      }
                    }}
                  />
                </div>
                <Button
                  onClick={handleValidateLicense}
                  disabled={isValidating || !licenseKey.trim()}
                  variant="outline"
                  data-testid="button-activate-license"
                >
                  {isValidating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Activate'
                  )}
                </Button>
              </div>
            )}
            
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 text-center mt-2" data-testid="text-license-error">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Honest AI Disclaimer */}
        <p className="mt-4 text-center text-xs text-muted-foreground">
          AI predictions are estimates based on carrier patterns - not guarantees. 
          We show you what the data suggests, you decide what to do.
        </p>
      </div>
    </Card>
  );
}
