import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 dark:bg-opacity-70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 md:px-8 max-w-4xl mx-auto w-full">
        
        {/* Main Heading - Responsive Font Sizes */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 animate-fade-in">
          {t('Harvestify')}
        </h1>
        
        {/* Subheading - Responsive */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 sm:mb-3 md:mb-4 text-gray-100 px-2">
          {t('Smart Farming Assistance for Better Crop Decisions')}
        </p>
        
        {/* Description - Responsive */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 md:mb-10 text-gray-200 max-w-2xl mx-auto px-4">
          {t('Helping farmers predict crops, detect diseases, and improve yield using data-driven insights.')}
        </p>
        
        {/* Buttons - Responsive Layout */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center px-4 sm:px-0">
          <Link 
            to="/register" 
            className="bg-primary hover:bg-green-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center shadow-lg text-sm sm:text-base"
          >
            {t('Get Started')} <FaArrowRight className="ml-2 text-xs sm:text-sm" />
          </Link>
          <Link 
            to="/dashboard" 
            className="bg-white hover:bg-gray-100 text-primary px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
          >
            {t('Explore Dashboard')}
          </Link>
        </div>

        {/* Stats Section - Fully Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-14 md:mt-16 lg:mt-20 px-4 sm:px-0">
          
          {/* Stat Card 1 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-5 md:p-6 hover:bg-white/20 transition-all duration-300">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-1 sm:mb-2">
              50K+
            </div>
            <div className="text-xs sm:text-sm md:text-base text-gray-200">
              {t('Happy Farmers')}
            </div>
          </div>
          
          {/* Stat Card 2 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-5 md:p-6 hover:bg-white/20 transition-all duration-300">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-1 sm:mb-2">
              100+
            </div>
            <div className="text-xs sm:text-sm md:text-base text-gray-200">
              {t('Crops Analyzed')}
            </div>
          </div>
          
          {/* Stat Card 3 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-5 md:p-6 hover:bg-white/20 transition-all duration-300">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-1 sm:mb-2">
              95%
            </div>
            <div className="text-xs sm:text-sm md:text-base text-gray-200">
              {t('Accuracy Rate')}
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Scroll Down Indicator for Mobile */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;