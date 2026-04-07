import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import GovernmentInfo from './GovernmentInfo';

const Landing = () => {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position for any scroll-based effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg overflow-x-hidden w-full">
      
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      
      {/* Navbar - Sticky on mobile, static on larger screens */}
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>
      
      {/* Main Content with proper spacing */}
      <main id="main-content" className="w-full overflow-x-hidden">
        {/* Each section has proper spacing and full width */}
        <div className="w-full">
          <HeroSection />
        </div>
        
        {/* Features Section with background separation */}
        <div className="w-full bg-gray-50 dark:bg-gray-900/50">
          <FeaturesSection />
        </div>
        
        {/* Government Info Section */}
        <div className="w-full">
          <GovernmentInfo />
        </div>
      </main>
      
      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>

      {/* Back to Top Button - Mobile Friendly */}
      {scrollY > 300 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 
                     bg-primary hover:bg-green-700 text-white 
                     w-10 h-10 sm:w-12 sm:h-12 rounded-full 
                     shadow-lg transition-all duration-300 
                     hover:scale-110 active:scale-95
                     z-50 flex items-center justify-center
                     focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                     touch-manipulation"
          aria-label="Back to top"
        >
          <svg 
            className="w-5 h-5 sm:w-6 sm:h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Mobile Bottom Navigation Hint (Optional) */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 transform transition-transform duration-300 z-40 pointer-events-none"
           style={{ transform: `translateX(${scrollY > 100 ? 0 : '-100%'})` }}>
      </div>
    </div>
  );
};

export default Landing;