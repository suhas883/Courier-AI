import { Crown, Sparkles, Zap, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

interface PremiumUpgradeBarProps {
  variant?: 'inline' | 'banner';
}

export default function PremiumUpgradeBar({ variant = 'banner' }: PremiumUpgradeBarProps) {
  const { t } = useTranslation();

  const handleUpgrade = () => {
    window.open('https://livetrackings.lemonsqueezy.com/buy/your-product-id', '_blank');
  };

  if (variant === 'inline') {
    return (
      <div 
        className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-2 border-amber-200 dark:border-amber-700"
        data-testid="premium-upgrade-inline"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
            <Crown className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-gray-100">{t('premium.title')}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('premium.subtitle')}</p>
          </div>
        </div>
        <Button 
          onClick={handleUpgrade}
          className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold px-6"
          data-testid="button-upgrade-premium"
        >
          {t('premium.cta')}
        </Button>
      </div>
    );
  }

  return (
    <div 
      className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6"
      data-testid="premium-upgrade-bar"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 p-6 md:p-8 shadow-xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Crown className="h-8 w-8 text-yellow-300" />
            </div>
            <div className="text-white">
              <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                {t('premium.title')}
                <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-bold">PRO</span>
              </h3>
              <p className="text-white/80 text-sm md:text-base max-w-md">
                {t('premium.subtitle')}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-6 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-300" />
                <span>{t('premium.feature1')}</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-300" />
                <span>{t('premium.feature2')}</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Shield className="h-4 w-4 text-yellow-300" />
                <span>{t('premium.feature3')}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right text-white">
                <p className="text-2xl font-bold">{t('premium.price')}</p>
              </div>
              <Button 
                onClick={handleUpgrade}
                size="lg"
                className="bg-white text-purple-700 hover:bg-yellow-50 font-bold px-8 shadow-lg"
                data-testid="button-upgrade-premium-main"
              >
                {t('premium.cta')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
