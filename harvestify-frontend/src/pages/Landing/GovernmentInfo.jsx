import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaExternalLinkAlt, 
  FaRupeeSign, 
  FaLeaf, 
  FaShieldAlt, 
  FaUserShield, 
  FaHandHoldingHeart,
  FaSeedling,
  FaTractor,
  FaWater,
  FaSolarPanel
} from 'react-icons/fa';
import WeatherAlerts from '../../components/WeatherAlerts';

const GovernmentInfo = () => {
  const { t } = useTranslation();

  const schemes = [
    {
      titleKey: 'PM-KISAN Samman Nidhi',
      descriptionKey: 'Income support of ₹6000 per year to farmer families',
      dateKey: 'Ongoing',
      link: 'https://pmkisan.gov.in',
      icon: <FaRupeeSign className="text-green-600" />,
      details: '3 equal instalments of ₹2000 every 4 months. 22nd instalment released March 2026'
    },
    {
      titleKey: 'Soil Health Card Scheme',
      descriptionKey: 'Free soil testing and recommendations',
      dateKey: 'Apply Now',
      link: 'https://soilhealth.dac.gov.in',
      icon: <FaLeaf className="text-amber-700" />,
      details: 'Tests 12 parameters: N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC. Valid for 3 years'
    },
    {
      titleKey: 'Pradhan Mantri Fasal Bima Yojana',
      descriptionKey: 'Crop insurance scheme for farmers',
      dateKey: 'Seasonal',
      link: 'https://pmfby.gov.in',
      icon: <FaShieldAlt className="text-red-600" />,
      details: 'Premium: 2% for Kharif, 1.5% for Rabi, 5% for commercial crops. Helpline: 14447'
    },
    {
      titleKey: 'Jeevan Pramaan',
      descriptionKey: 'Digital life certificate for pensioners',
      dateKey: 'Annual',
      link: 'https://jeevanpramaan.gov.in',
      icon: <FaUserShield className="text-blue-600" />,
      details: 'Aadhaar-based digital life certificate for retired government employees including farmers'
    },
    {
      titleKey: 'National Social Assistance Programme (NSAP)',
      descriptionKey: 'Social security for elderly, widows, disabled',
      dateKey: 'Ongoing',
      link: 'http://nsap.nic.in',
      icon: <FaHandHoldingHeart className="text-purple-600" />,
      details: 'Financial assistance to BPL households: Indira Gandhi National Old Age Pension Scheme, Widow Pension Scheme, Disability Pension Scheme'
    },
    {
      titleKey: 'Agristack',
      descriptionKey: 'Digital agriculture platform for farmers',
      dateKey: 'New',
      link: 'https://agristack.gov.in',
      icon: <FaSeedling className="text-indigo-600" />,
      details: 'Unified platform for farmer data, land records, crop sowing patterns, and direct benefit transfers'
    },
    {
      titleKey: 'PM Kisan Maan Dhan Yojana',
      descriptionKey: 'Pension scheme for small and marginal farmers',
      dateKey: 'Ongoing',
      link: 'https://maandhan.in',
      icon: <FaUserShield className="text-orange-600" />,
      details: 'Monthly pension of ₹3000 after 60 years. Contribution: ₹55 to ₹200 per month based on age'
    },
    {
      titleKey: 'Pradhan Mantri Krishi Sinchai Yojana',
      descriptionKey: 'Improve water use efficiency and expand irrigation',
      dateKey: 'Ongoing',
      link: 'https://pmksy.gov.in',
      icon: <FaWater className="text-blue-600" />,
      details: '"Per Drop More Crop" - Micro-irrigation subsidies up to 55% for small farmers'
    },
    {
      titleKey: 'PM-KUSUM Scheme',
      descriptionKey: 'Solar pumps and grid-connected solar power for farmers',
      dateKey: 'Apply Now',
      link: 'https://pmkusum.mnre.gov.in',
      icon: <FaSolarPanel className="text-yellow-600" />,
      details: 'Solar pumps, solarization of grid pumps, and solar power plants on barren land'
    }
  ];

  const getDateStyle = (dateKey) => {
    switch(dateKey) {
      case 'Ongoing':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Apply Now':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 animate-pulse';
      case 'Seasonal':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Annual':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'New':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-dark-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
            {t('Government Information')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            {t('Latest schemes, alerts, and advisories for farmers')}
          </p>
        </div>

        {/* Main Grid - 1 column on mobile, 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          
          {/* Left Column - Government Schemes */}
          <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-4 sm:p-5 md:p-6">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center text-gray-800 dark:text-white">
              <span className="bg-primary w-1.5 sm:w-2 h-6 sm:h-8 rounded-full mr-2 sm:mr-3"></span>
              {t('Latest Farming Schemes')}
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {schemes.slice(0, 3).map((scheme, index) => (
                <a
                  key={index}
                  href={scheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white dark:bg-dark-card p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-transparent hover:border-primary/30"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 sm:mb-2 flex-wrap">
                        <div className="flex-shrink-0 text-base sm:text-lg">
                          {scheme.icon}
                        </div>
                        <h4 className="font-semibold text-sm sm:text-base md:text-lg text-gray-800 dark:text-white break-words">
                          {t(scheme.titleKey)}
                        </h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mt-1">
                        {t(scheme.descriptionKey)}
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-2 mt-2 sm:mt-3">
                        <span className={`inline-block text-xs px-2 sm:px-3 py-1 rounded-full ${getDateStyle(scheme.dateKey)}`}>
                          {t(scheme.dateKey)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <FaExternalLinkAlt size={10} />
                          <span className="hidden sm:inline">Official Portal</span>
                        </span>
                      </div>
                      {scheme.details && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 border-t border-gray-100 dark:border-gray-700 pt-2">
                          ℹ️ {scheme.details}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Weather Alerts */}
          <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-4 sm:p-5 md:p-6">
            <WeatherAlerts />
          </div>
        </div>

        {/* Additional Schemes Section - Responsive Grid */}
        <div className="mt-12 sm:mt-16">
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
              <span className="bg-gradient-to-r from-primary to-green-600 w-8 sm:w-10 h-0.5 sm:h-1 rounded-full hidden sm:block"></span>
              {t('Additional Farmer Welfare Schemes')}
              <span className="bg-gradient-to-r from-green-600 to-primary w-8 sm:w-10 h-0.5 sm:h-1 rounded-full hidden sm:block"></span>
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Government initiatives to support and empower farmers across India
            </p>
          </div>

          {/* Responsive Grid - 1/2/3 columns based on screen size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {schemes.slice(3).map((scheme, index) => (
              <a
                key={index}
                href={scheme.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white dark:bg-dark-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary/30 block"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Top accent bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${
                  index % 3 === 0 ? 'from-blue-500 to-purple-500' :
                  index % 3 === 1 ? 'from-green-500 to-teal-500' :
                  'from-orange-500 to-red-500'
                }`}></div>
                
                <div className="p-4 sm:p-5 md:p-6">
                  {/* Header */}
                  <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${
                      index % 3 === 0 ? 'bg-blue-50 dark:bg-blue-900/20' :
                      index % 3 === 1 ? 'bg-green-50 dark:bg-green-900/20' :
                      'bg-orange-50 dark:bg-orange-900/20'
                    }`}>
                      <div className="text-xl sm:text-2xl">
                        {scheme.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-base sm:text-lg text-gray-800 dark:text-white group-hover:text-primary transition-colors break-words">
                        {t(scheme.titleKey)}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                        {t(scheme.descriptionKey)}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  {scheme.details && (
                    <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-xs text-gray-600 dark:text-gray-300 border-l-2 border-primary break-words">
                      ℹ️ {scheme.details}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-700">
                    <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getDateStyle(scheme.dateKey)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1 ${
                        scheme.dateKey === 'Ongoing' ? 'bg-green-500 animate-pulse' :
                        scheme.dateKey === 'Apply Now' ? 'bg-yellow-500 animate-pulse' :
                        scheme.dateKey === 'New' ? 'bg-red-500 animate-pulse' :
                        'bg-gray-500'
                      }`}></span>
                      {t(scheme.dateKey)}
                    </span>
                    
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 group-hover:text-primary transition-colors">
                      <span className="hidden xs:inline">Official Portal</span>
                      <FaExternalLinkAlt size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-8 sm:mt-12 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-50 dark:bg-gray-800/50 rounded-full">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center">
                {t('Click on any scheme card to visit the official government portal.')}
              </span>
              <span className="text-gray-400 dark:text-gray-500 hidden sm:inline">•</span>
              <a 
                href="https://www.india.gov.in/topics/agriculture" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-primary hover:text-green-700 font-medium flex items-center gap-1 group"
              >
                {t('For more schemes, visit')} india.gov.in
                <FaExternalLinkAlt size={10} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernmentInfo;