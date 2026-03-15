import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaSeedling, FaBug, FaChartLine, FaCloudSun, 
  FaTint, FaLeaf, FaRupeeSign, FaMobile 
} from 'react-icons/fa';
import Card from '../../components/common/Card';

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FaSeedling className="text-4xl text-primary" />,
      title: t('Crop Recommendation'),
      description: 'Get personalized crop recommendations based on your soil and climate conditions using AI algorithms.'
    },
    {
      icon: <FaBug className="text-4xl text-primary" />,
      title: t('Disease Detection'),
      description: 'Upload leaf images to instantly detect diseases and get treatment advice with 95% accuracy.'
    },
    {
      icon: <FaChartLine className="text-4xl text-primary" />,
      title: t('Yield Prediction'),
      description: 'Predict your crop yield accurately using historical data and machine learning models.'
    },
    {
      icon: <FaCloudSun className="text-4xl text-primary" />,
      title: t('Weather Monitoring'),
      description: 'Real-time weather updates and 7-day forecasts tailored specifically for farming needs.'
    },
    {
      icon: <FaTint className="text-4xl text-primary" />,
      title: t('Soil Health Insights'),
      description: 'Analyze your soil health and get recommendations for improvement with detailed reports.'
    },
    {
      icon: <FaRupeeSign className="text-4xl text-primary" />,
      title: t('Market Prices'),
      description: 'Stay updated with current market prices for different crops across various mandis.'
    },
    {
      icon: <FaLeaf className="text-4xl text-primary" />,
      title: 'Multi-Language Support',
      description: 'Use the platform in English, Hindi, or Marathi for better accessibility.'
    },
    {
      icon: <FaMobile className="text-4xl text-primary" />,
      title: 'Mobile Friendly',
      description: 'Access all features on your mobile phone with our responsive design.'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-background dark:bg-dark-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            {t('Our Features')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('Everything you need to make informed farming decisions')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;