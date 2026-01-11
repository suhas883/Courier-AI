import { useState } from 'react';
import { Switch, Route, useLocation } from 'wouter';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import Header from './components/header';
import Hero from './components/Hero';
import TrackingResults from './components/TrackingResults';
import AIPredictions from './components/AIPredictions';
import FeaturesSection from './components/Features';
import Carriers from './components/Carriers';
import Footer from './components/footer';
import EmailModal from './components/EmailModal';
import SmsModal from './components/SmsModal';
import AIChat from './components/AIChat';
import { usePremiumCredit, getFreePremiumRemaining, isPremiumSubscriber } from "@/lib/premiumAccess";

import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import FeaturesPage from './pages/Features';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

function HomePage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('auto');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [smsModalOpen, setSmsModalOpen] = useState(false);
  const [trackingError, setTrackingError] = useState<string | null>(null);
  const [freeTracksLeft, setFreeTracksLeft] = useState(getFreePremiumRemaining());
  const { toast } = useToast();

  const handleTrack = async (inputTrackingNumber: string, inputCarrier: string) => {
    if (!inputTrackingNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a tracking number",
        variant: "destructive"
      });
      return;
    }

    setTrackingNumber(inputTrackingNumber);
    setCarrier(inputCarrier);
    setIsLoading(true);
    setShowResults(true);
    setTrackingData(null);
    setTrackingError(null);

    try {
      const response = await fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trackingNumber: inputTrackingNumber,
          carrier: inputCarrier
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to track package');
      }

      setTrackingData(data);
      setCarrier(data.carrier || inputCarrier);
      
      const successfulTrack = !data.notFound && data.events && data.events.length > 0;
      if (successfulTrack && !isPremiumSubscriber()) {
        usePremiumCredit(inputTrackingNumber);
        setFreeTracksLeft(getFreePremiumRemaining());
      }
    } catch (err: any) {
      console.error('Tracking error:', err);
      setTrackingError(err.message || 'Failed to track package. Please try again.');
      toast({
        title: "Tracking Error",
        description: err.message || 'Failed to track package. Please check the tracking number and try again.',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!showResults && <Hero onTrack={handleTrack} />}
      
      {showResults && (
        <>
          {trackingError ? (
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tracking Not Found</h3>
                <p className="text-gray-600 mb-6">{trackingError}</p>
                <button
                  onClick={() => {
                    setShowResults(false);
                    setTrackingError(null);
                  }}
                  className="px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition-all"
                  data-testid="button-try-again"
                >
                  Try Another Number
                </button>
              </div>
            </div>
          ) : (
            <>
              <TrackingResults
                trackingNumber={trackingNumber}
                carrier={carrier}
                trackingData={trackingData}
                isLoading={isLoading}
                onEmailClick={() => setEmailModalOpen(true)}
                onSmsClick={() => setSmsModalOpen(true)}
              />
              <AIPredictions
                trackingData={trackingData}
                isLoading={isLoading}
              />
              {trackingData && !trackingData.notFound && trackingData.events?.length > 0 && 
               freeTracksLeft > 0 && !isPremiumSubscriber() && (
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
                  <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center" data-testid="banner-free-tracks">
                    <p className="text-green-800 font-medium">
                      You got full AI insights for free! 
                      <span className="ml-2 font-bold">{freeTracksLeft} free premium track{freeTracksLeft !== 1 ? 's' : ''} remaining.</span>
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
      
      <FeaturesSection />
      <Carriers />
      
      <EmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        trackingNumber={trackingNumber}
        carrier={carrier}
      />
      
      <SmsModal
        isOpen={smsModalOpen}
        onClose={() => setSmsModalOpen(false)}
        trackingNumber={trackingNumber}
        carrier={carrier}
      />
      
      <AIChat />
    </>
  );
}

function App() {
  const [location] = useLocation();
  const isHomePage = location === '/';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/terms" component={TermsOfService} />
        <Route path="/features" component={FeaturesPage} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:postId" component={Blog} />
        <Route path="/contact" component={Contact} />
        <Route>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
              <a href="/" className="text-primary hover:underline">Go back home</a>
            </div>
          </div>
        </Route>
      </Switch>
      
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
