import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLeaf, FaUsers, FaBullseye, FaHeart, FaTractor, FaChartLine, FaHeadset } from 'react-icons/fa';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 md:pb-20 bg-background dark:bg-dark-bg overflow-x-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Hero Section - Mobile First */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-primary/10 rounded-full">
              <FaLeaf className="text-4xl sm:text-5xl md:text-6xl text-primary" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3 md:mb-4 px-2">
            {t('About Harvestify')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Empowering farmers with technology for a better tomorrow
          </p>
          {/* Decorative underline */}
          <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mt-4 sm:mt-6 rounded-full"></div>
        </div>

        {/* Mission & Vision - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
          
          {/* Mission Card */}
          <div className="bg-white dark:bg-dark-card rounded-lg p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-2 bg-primary/10 rounded-lg mr-3">
                <FaBullseye className="text-xl sm:text-2xl md:text-3xl text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                Our Mission
              </h2>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              To revolutionize Indian agriculture by providing farmers with cutting-edge technology solutions 
              that increase crop yield, reduce losses, and promote sustainable farming practices.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white dark:bg-dark-card rounded-lg p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-2 bg-primary/10 rounded-lg mr-3">
                <FaHeart className="text-xl sm:text-2xl md:text-3xl text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                Our Vision
              </h2>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              A future where every farmer in India has access to AI-powered farming assistance, 
              making agriculture more profitable, sustainable, and resilient.
            </p>
          </div>
        </div>

        {/* Stats Section - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-12 md:mb-16">
          
          <div className="text-center p-3 sm:p-4 bg-white dark:bg-dark-card rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">50K+</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">
              Happy Farmers
            </div>
          </div>
          
          <div className="text-center p-3 sm:p-4 bg-white dark:bg-dark-card rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">100+</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">
              Crops Analyzed
            </div>
          </div>
          
          <div className="text-center p-3 sm:p-4 bg-white dark:bg-dark-card rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">95%</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">
              Accuracy Rate
            </div>
          </div>
          
          <div className="text-center p-3 sm:p-4 bg-white dark:bg-dark-card rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">24/7</div>
            <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">
              Farmer Support
            </div>
          </div>
        </div>

        {/* What We Offer Section */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-8 sm:mb-10 md:mb-12">
            What We Offer
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            
            <div className="text-center p-4 sm:p-5 md:p-6 bg-white dark:bg-dark-card rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FaTractor className="text-xl sm:text-2xl md:text-3xl text-primary" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-2">
                AI-Powered Insights
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Get accurate crop recommendations, disease detection, and yield predictions using advanced machine learning.
              </p>
            </div>
            
            <div className="text-center p-4 sm:p-5 md:p-6 bg-white dark:bg-dark-card rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FaChartLine className="text-xl sm:text-2xl md:text-3xl text-primary" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Real-time Analytics
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Monitor weather patterns, market prices, and crop health in real-time for better decision making.
              </p>
            </div>
            
            <div className="text-center p-4 sm:p-5 md:p-6 bg-white dark:bg-dark-card rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FaHeadset className="text-xl sm:text-2xl md:text-3xl text-primary" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-2">
                24/7 Support
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Round-the-clock assistance through our AI chatbot and dedicated support team.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section - Responsive */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6 sm:mb-8 md:mb-10">
            Our Team
          </h2>
          
          <div className="flex flex-wrap justify-center gap-5 sm:gap-6 md:gap-8">
            
            <div className="bg-white dark:bg-dark-card rounded-lg p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 max-w-xs w-full">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-primary/20 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                <FaUsers className="text-3xl sm:text-4xl md:text-5xl text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-1">
                Dedicated Team
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">
                Agricultural Experts & Data Scientists
              </p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                A team of agricultural experts, data scientists, and developers working together 
                to bring you the best farming assistance platform.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-green-600/10 dark:from-primary/20 dark:to-green-600/20 rounded-2xl p-6 sm:p-8 md:p-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
              Ready to Transform Your Farming?
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
              Join thousands of farmers already using Harvestify to improve their crop yield.
            </p>
            <button className="bg-primary hover:bg-green-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-md">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;