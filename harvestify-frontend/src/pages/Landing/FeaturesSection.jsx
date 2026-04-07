import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaSeedling, FaBug, FaChartLine, FaCloudSun, 
  FaTint, FaLeaf, FaRupeeSign, FaMobile
} from 'react-icons/fa';
import Card from '../../components/common/Card';

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FaSeedling className="text-3xl sm:text-4xl text-primary" />,
      title: 'Crop Recommendation',
      descKey: 'Get personalized crop recommendations based on your soil and climate conditions.'
    },
    {
      icon: <FaBug className="text-3xl sm:text-4xl text-primary" />,
      title: 'Disease Detection',
      descKey: 'Upload leaf images to instantly detect diseases and get treatment advice.'
    },
    {
      icon: <FaChartLine className="text-3xl sm:text-4xl text-primary" />,
      title: 'Yield Prediction',
      descKey: 'Predict your crop yield accurately using advanced ML algorithms.'
    },
    {
      icon: <FaCloudSun className="text-3xl sm:text-4xl text-primary" />,
      title: 'Weather Monitoring',
      descKey: 'Real-time weather updates and forecasts tailored for farming.'
    },
    {
      icon: <FaTint className="text-3xl sm:text-4xl text-primary" />,
      title: 'Soil Health Insights',
      descKey: 'Analyze your soil health and get recommendations for improvement.'
    },
    {
      icon: <FaRupeeSign className="text-3xl sm:text-4xl text-primary" />,
      title: 'Market Prices',
      descKey: 'Stay updated with current market prices for different crops.'
    },
    {
      icon: <FaLeaf className="text-3xl sm:text-4xl text-primary" />,
      title: 'Multi-Language Support',
      descKey: 'Use the platform in English, Hindi, or Marathi.'
    },
    {
      icon: <FaMobile className="text-3xl sm:text-4xl text-primary" />,
      title: 'Mobile Friendly',
      descKey: 'Access all features on your mobile device.'
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background dark:bg-dark-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Responsive */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
            {t('Our Features')}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4 sm:mb-6 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            {t('Everything you need to make informed farming decisions')}
          </p>
        </div>

        {/* Features Grid - Fully Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
            >
              {/* Icon Container - Responsive */}
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-primary/10 dark:bg-primary/20 rounded-full transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
              </div>
              
              {/* Title - Responsive */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800 dark:text-white">
                {t(feature.title)}
              </h3>
              
              {/* Description - Responsive */}
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 flex-grow">
                {t(feature.descKey)}
              </p>
              
              {/* Optional: Learn More Link (adds interactivity) */}
              <div className="mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-primary text-xs sm:text-sm font-medium inline-flex items-center gap-1 cursor-pointer">
                  Learn More 
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Optional: Call to Action Button for Mobile */}
        <div className="text-center mt-10 sm:mt-12 md:mt-16 lg:hidden">
          <button className="bg-primary hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 inline-flex items-center gap-2 shadow-md">
            <span>View All Features</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;