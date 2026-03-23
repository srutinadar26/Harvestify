import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLeaf, FaUsers, FaBullseye, FaHeart } from 'react-icons/fa';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-24 pb-20 bg-background dark:bg-dark-bg">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <FaLeaf className="text-6xl text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            {t('About Harvestify')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Empowering farmers with technology for a better tomorrow
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-dark-card rounded-lg p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <FaBullseye className="text-3xl text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Our Mission</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To revolutionize Indian agriculture by providing farmers with cutting-edge technology solutions 
              that increase crop yield, reduce losses, and promote sustainable farming practices.
            </p>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-lg p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <FaHeart className="text-3xl text-primary mr-3" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Our Vision</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              A future where every farmer in India has access to AI-powered farming assistance, 
              making agriculture more profitable, sustainable, and resilient.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">50K+</div>
            <div className="text-gray-600 dark:text-gray-300">Happy Farmers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">100+</div>
            <div className="text-gray-600 dark:text-gray-300">Crops Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">95%</div>
            <div className="text-gray-600 dark:text-gray-300">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-300">Farmer Support</div>
          </div>
        </div>

        {/* Team */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Our Team
          </h2>
          <div className="flex justify-center">
            <div className="bg-white dark:bg-dark-card rounded-lg p-6 shadow-lg max-w-sm">
              <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FaUsers className="text-4xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dedicated Team</h3>
              <p className="text-gray-600 dark:text-gray-300">
                A team of agricultural experts, data scientists, and developers working together 
                to bring you the best farming assistance platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;