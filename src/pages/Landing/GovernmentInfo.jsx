import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaExternalLinkAlt } from 'react-icons/fa';

const GovernmentInfo = () => {
  const { t } = useTranslation();

  const schemes = [
    {
      titleKey: 'PM-KISAN Samman Nidhi',
      descriptionKey: 'Income support of ₹6000 per year to farmer families',
      dateKey: 'Ongoing',
      link: '#'
    },
    {
      titleKey: 'Soil Health Card Scheme',
      descriptionKey: 'Free soil testing and recommendations',
      dateKey: 'Apply Now',
      link: '#'
    },
    {
      titleKey: 'Pradhan Mantri Fasal Bima Yojana',
      descriptionKey: 'Crop insurance scheme for farmers',
      dateKey: 'Seasonal',
      link: '#'
    }
  ];

  const alerts = [
    {
      titleKey: 'Heavy Rainfall Alert',
      locationKey: 'Punjab, Haryana',
      severityKey: 'High'
    },
    {
      titleKey: 'Pest Advisory',
      locationKey: 'Maharashtra',
      severityKey: 'Medium'
    },
    {
      titleKey: 'Temperature Warning',
      locationKey: 'Rajasthan',
      severityKey: 'Low'
    }
  ];

  const getSeverityClass = (severityKey) => {
    const severity = t(severityKey);
    switch(severityKey) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-dark-card">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-4">
          {t('Government Information')}
        </h2>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
          {t('Latest schemes, alerts, and advisories for farmers')}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Government Schemes */}
          <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800 dark:text-white">
              <span className="bg-primary w-2 h-8 rounded-full mr-3"></span>
              {t('Latest Farming Schemes')}
            </h3>
            <div className="space-y-4">
              {schemes.map((scheme, index) => (
                <div key={index} className="bg-white dark:bg-dark-card p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-gray-800 dark:text-white">
                        {t(scheme.titleKey)}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                        {t(scheme.descriptionKey)}
                      </p>
                      <span className="inline-block mt-2 text-sm bg-primary text-white px-3 py-1 rounded-full">
                        {t(scheme.dateKey)}
                      </span>
                    </div>
                    <a 
                      href={scheme.link} 
                      className="text-primary hover:text-green-700 ml-4 flex-shrink-0"
                      aria-label={t('Read more')}
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Alerts */}
          <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800 dark:text-white">
              <span className="bg-accent w-2 h-8 rounded-full mr-3"></span>
              {t('Weather & Crop Alerts')}
            </h3>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="bg-white dark:bg-dark-card p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800 dark:text-white">
                        {t(alert.titleKey)}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {t('Location')}: {t(alert.locationKey)}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityClass(alert.severityKey)}`}>
                      {t(alert.severityKey)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernmentInfo;