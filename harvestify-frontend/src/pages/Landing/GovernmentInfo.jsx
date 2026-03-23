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
    // 3 NEW SCHEMES ADDED BELOW
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
  {/* Additional Schemes Section - Enhanced Design */}
<div className="mt-16">
  <div className="text-center mb-10">
    <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-3 flex items-center justify-center gap-3">
      <span className="bg-gradient-to-r from-primary to-green-600 w-10 h-1 rounded-full"></span>
      {t('Additional Farmer Welfare Schemes')}
      <span className="bg-gradient-to-r from-green-600 to-primary w-10 h-1 rounded-full"></span>
    </h3>
    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
      Government initiatives to support and empower farmers across India
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {schemes.slice(3).map((scheme, index) => (
      <a
        key={index}
        href={scheme.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative bg-white dark:bg-dark-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary/30"
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Top accent bar with color based on scheme type */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${
          index % 3 === 0 ? 'from-blue-500 to-purple-500' :
          index % 3 === 1 ? 'from-green-500 to-teal-500' :
          'from-orange-500 to-red-500'
        }`}></div>
        
        <div className="p-6">
          {/* Header with icon and title */}
          <div className="flex items-start gap-3 mb-4">
            <div className={`p-3 rounded-lg ${
              index % 3 === 0 ? 'bg-blue-50 dark:bg-blue-900/20' :
              index % 3 === 1 ? 'bg-green-50 dark:bg-green-900/20' :
              'bg-orange-50 dark:bg-orange-900/20'
            }`}>
              <div className="text-2xl">
                {scheme.icon}
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg text-gray-800 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                {t(scheme.titleKey)}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                {t(scheme.descriptionKey)}
              </p>
            </div>
          </div>

          {/* Details section */}
          {scheme.details && (
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-xs text-gray-600 dark:text-gray-300 border-l-2 border-primary">
              ℹ️ {scheme.details}
            </div>
          )}

          {/* Footer with status and link */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDateStyle(scheme.dateKey)}`}>
              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                scheme.dateKey === 'Ongoing' ? 'bg-green-500 animate-pulse' :
                scheme.dateKey === 'Apply Now' ? 'bg-yellow-500 animate-pulse' :
                scheme.dateKey === 'New' ? 'bg-red-500 animate-pulse' :
                'bg-gray-500'
              }`}></span>
              {t(scheme.dateKey)}
            </span>
            
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 group-hover:text-primary transition-colors">
              <span>{t('Official Portal')}</span>
              <FaExternalLinkAlt size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </a>
    ))}
  </div>

  {/* Footer Note with enhanced styling */}
  <div className="mt-12 text-center">
    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-full">
      <span className="text-sm text-gray-600 dark:text-gray-300">
        {t('Click on any scheme card to visit the official government portal.')}
      </span>
      <span className="text-gray-400 dark:text-gray-500">•</span>
      <a 
        href="https://www.india.gov.in/topics/agriculture" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-sm text-primary hover:text-green-700 font-medium flex items-center gap-1 group"
      >
        {t('For more schemes, visit')} india.gov.in
        <FaExternalLinkAlt size={10} className="group-hover:translate-x-0.5 transition-transform" />
      </a>
    </div>
  </div>
</div>

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
          {/* Left Column - Government Schemes */}
          <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800 dark:text-white">
              <span className="bg-primary w-2 h-8 rounded-full mr-3"></span>
              {t('Latest Farming Schemes')}
            </h3>
            <div className="space-y-4">
              {schemes.slice(0, 3).map((scheme, index) => (
                <a
                  key={index}
                  href={scheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white dark:bg-dark-card p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-transparent hover:border-primary/30"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {scheme.icon}
                        <h4 className="font-semibold text-lg text-gray-800 dark:text-white">
                          {t(scheme.titleKey)}
                        </h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                        {t(scheme.descriptionKey)}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className={`inline-block text-xs px-3 py-1 rounded-full ${getDateStyle(scheme.dateKey)}`}>
                          {t(scheme.dateKey)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <FaExternalLinkAlt size={10} />
                          Official Portal
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
          <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-6">
            <WeatherAlerts />
          </div>
        </div>

        {/* Additional Schemes Section - Now with 9 total schemes (3 original + 3 old + 3 new) */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800 dark:text-white justify-center">
            <span className="bg-accent w-2 h-8 rounded-full mr-3"></span>
            {t('Additional Farmer Welfare Schemes')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {schemes.slice(3).map((scheme, index) => (
              <a
                key={index}
                href={scheme.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white dark:bg-dark-card p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-transparent hover:border-accent/30"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-2">
                    {scheme.icon}
                    <h4 className="font-semibold text-lg text-gray-800 dark:text-white">
                      {t(scheme.titleKey)}
                    </h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 flex-grow">
                    {t(scheme.descriptionKey)}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className={`inline-block text-xs px-3 py-1 rounded-full ${getDateStyle(scheme.dateKey)}`}>
                      {t(scheme.dateKey)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <FaExternalLinkAlt size={10} />
                      Official Portal
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click on any scheme card to visit the official government portal. 
            For more schemes, visit{' '}
            <a 
              href="https://www.india.gov.in/topics/agriculture" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              india.gov.in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default GovernmentInfo;