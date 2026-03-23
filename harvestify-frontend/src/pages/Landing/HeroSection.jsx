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
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          {t('Harvestify')}
        </h1>
        <p className="text-2xl md:text-3xl mb-4 text-gray-100">
          {t('Smart Farming Assistance for Better Crop Decisions')}
        </p>
        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
          {t('Helping farmers predict crops, detect diseases, and improve yield using data-driven insights.')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/register" 
            className="bg-primary hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center shadow-lg"
          >
            {t('Get Started')} <FaArrowRight className="ml-2" />
          </Link>
          <Link 
            to="/dashboard" 
            className="bg-white hover:bg-gray-100 text-primary px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {t('Explore Dashboard')}
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl font-bold text-accent mb-2">50K+</div>
            <div className="text-gray-200">{t('Happy Farmers')}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl font-bold text-accent mb-2">100+</div>
            <div className="text-gray-200">{t('Crops Analyzed')}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl font-bold text-accent mb-2">95%</div>
            <div className="text-gray-200">{t('Accuracy Rate')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;