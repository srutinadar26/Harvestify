import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaExclamationTriangle, FaMapMarkerAlt, FaSync, 
  FaCloudRain, FaWind, FaSun, FaSnowflake, FaBug,
  FaTemperatureHigh, FaTemperatureLow, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import { fetchRealTimeAlerts, fetchPestAdvisories } from '../services/alertService';

const WeatherAlerts = () => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState([]);
  const [pestAdvisories, setPestAdvisories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('weather');
  const [expandedAlert, setExpandedAlert] = useState(null);

  const loadAllAlerts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const weatherResult = await fetchRealTimeAlerts();
      if (weatherResult.success) {
        setAlerts(weatherResult.alerts);
        if (!weatherResult.isRealTime) {
          console.log('Using smart alerts:', weatherResult.message);
        }
      }
      
      const pestResult = await fetchPestAdvisories();
      if (pestResult.success) {
        setPestAdvisories(pestResult.advisories);
      }
      
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Alert loading error:', err);
      setError('Unable to fetch real-time alerts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllAlerts();
    const interval = setInterval(loadAllAlerts, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case 'High': return <FaExclamationTriangle className="text-red-500" />;
      case 'Medium': return <FaCloudRain className="text-yellow-500" />;
      case 'Low': return <FaWind className="text-blue-500" />;
      default: return <FaExclamationTriangle className="text-gray-500" />;
    }
  };

  const getAlertIcon = (title) => {
    if (title.includes('Rain')) return <FaCloudRain className="text-blue-500" />;
    if (title.includes('Heat') || title.includes('Temperature')) return <FaTemperatureHigh className="text-red-500" />;
    if (title.includes('Cold')) return <FaTemperatureLow className="text-blue-300" />;
    if (title.includes('Wind')) return <FaWind className="text-gray-500" />;
    if (title.includes('Fog')) return <FaWind className="text-gray-400" />;
    if (title.includes('Pest') || title.includes('Armyworm') || title.includes('Aphid')) return <FaBug className="text-green-700" />;
    return <FaExclamationTriangle className="text-yellow-500" />;
  };

  const getSeverityClass = (severity) => {
    switch(severity) {
      case 'High':
        return 'bg-red-50 text-red-800 dark:bg-red-950/50 dark:text-red-200 border-red-200 dark:border-red-800';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800';
      case 'Low':
        return 'bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-200 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const formatTime = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const toggleExpand = (id) => {
    setExpandedAlert(expandedAlert === id ? null : id);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Main Container - Mobile First */}
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg p-3 sm:p-4 md:p-6">
        
        {/* Header Section - Responsive */}
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 mb-4 sm:mb-6">
          
          {/* Title and Tabs - Stack on mobile, side by side on tablet+ */}
          <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 w-full xs:w-auto">
            <h3 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
              <span className="bg-accent w-1.5 sm:w-2 h-6 sm:h-8 rounded-full"></span>
              {t('Weather & Crop Alerts')}
            </h3>
            
            {/* Tab Switcher - Mobile Optimized */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 w-full xs:w-auto">
              <button
                onClick={() => setActiveTab('weather')}
                className={`flex-1 xs:flex-none px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium transition ${
                  activeTab === 'weather' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span className="whitespace-nowrap">🌤️ Weather</span>
              </button>
              <button
                onClick={() => setActiveTab('pest')}
                className={`flex-1 xs:flex-none px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium transition flex items-center justify-center gap-1 ${
                  activeTab === 'pest' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <FaBug size={12} className="sm:text-sm" />
                <span className="whitespace-nowrap">Pest Alerts</span>
              </button>
            </div>
          </div>
          
          {/* Refresh and Time - Responsive */}
          <div className="flex items-center justify-between xs:justify-end gap-3 w-full xs:w-auto">
            {lastUpdated && (
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span className="hidden xs:inline">Updated: </span>
                {formatTime(lastUpdated)}
              </span>
            )}
            <button
              onClick={loadAllAlerts}
              disabled={loading}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition active:scale-95 touch-manipulation"
              aria-label="Refresh alerts"
            >
              <FaSync className={`text-primary text-sm sm:text-base ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Status Message - Responsive */}
        {!loading && alerts.length > 0 && alerts[0]?.source === 'Smart Advisory' && (
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
            <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <FaSun className="text-yellow-500 flex-shrink-0" />
              <span>No severe weather alerts currently. Showing seasonal advisories.</span>
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
            <p className="text-xs sm:text-sm text-red-700 dark:text-red-300">
              {error}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-2 border-primary border-t-transparent"></div>
          </div>
        )}

        {/* Weather Alerts Tab */}
        {!loading && activeTab === 'weather' && (
          <div className="space-y-3 sm:space-y-4">
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`border rounded-lg transition-all hover:shadow-md overflow-hidden ${getSeverityClass(alert.severity)}`}
                >
                  {/* Alert Header - Always visible */}
                  <div 
                    className="p-3 sm:p-4 cursor-pointer touch-manipulation"
                    onClick={() => toggleExpand(alert.id)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {getAlertIcon(alert.title)}
                          <h4 className="font-semibold text-sm sm:text-base md:text-lg break-words">
                            {alert.title}
                          </h4>
                        </div>
                        
                        {/* Location - Responsive */}
                        <div className="flex items-center gap-1 text-xs sm:text-sm mb-2">
                          <FaMapMarkerAlt className="text-gray-500 flex-shrink-0" size={12} />
                          <span className="truncate">{t('Location')}: {alert.location}</span>
                        </div>
                        
                        {/* Description - Show preview on mobile, full on expanded */}
                        <p className={`text-xs sm:text-sm mt-1 opacity-90 ${expandedAlert !== alert.id ? 'line-clamp-2' : ''}`}>
                          {alert.description}
                        </p>
                      </div>
                      
                      {/* Severity Badge and Expand Icon */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap
                          ${alert.severity === 'High' ? 'bg-red-500 text-white' :
                            alert.severity === 'Medium' ? 'bg-yellow-500 text-white' :
                            'bg-blue-500 text-white'}`}>
                          {alert.severity}
                        </span>
                        <div className="text-gray-400 sm:hidden">
                          {expandedAlert === alert.id ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                        </div>
                      </div>
                    </div>
                    
                    {/* Source Info - Responsive */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs">
                      <p className="text-gray-500 dark:text-gray-400">
                        Source: {alert.source}
                      </p>
                      {alert.timestamp && (
                        <p className="text-gray-400 dark:text-gray-500">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 sm:py-12 text-gray-500 dark:text-gray-400">
                <FaSun className="text-3xl sm:text-4xl mx-auto mb-3 text-yellow-500" />
                <p className="text-sm sm:text-base">No active weather alerts</p>
                <p className="text-xs sm:text-sm mt-2">Conditions are normal across monitored regions</p>
              </div>
            )}
          </div>
        )}

        {/* Pest Advisories Tab */}
        {!loading && activeTab === 'pest' && (
          <div className="space-y-3 sm:space-y-4">
            {pestAdvisories.length > 0 ? (
              pestAdvisories.map((advisory) => (
                <div
                  key={advisory.id}
                  className={`border rounded-lg transition-all hover:shadow-md overflow-hidden ${getSeverityClass(advisory.severity)}`}
                >
                  <div 
                    className="p-3 sm:p-4 cursor-pointer touch-manipulation"
                    onClick={() => toggleExpand(advisory.id)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <FaBug className="text-green-600 dark:text-green-400 flex-shrink-0" />
                          <h4 className="font-semibold text-sm sm:text-base md:text-lg break-words">
                            {advisory.title}
                          </h4>
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs sm:text-sm mb-2">
                          <FaMapMarkerAlt className="text-gray-500 flex-shrink-0" size={12} />
                          <span className="truncate">{t('Location')}: {advisory.location}</span>
                        </div>
                        
                        <p className={`text-xs sm:text-sm mt-1 opacity-90 ${expandedAlert !== advisory.id ? 'line-clamp-2' : ''}`}>
                          {advisory.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap
                          ${advisory.severity === 'High' ? 'bg-red-500 text-white' :
                            advisory.severity === 'Medium' ? 'bg-yellow-500 text-white' :
                            'bg-blue-500 text-white'}`}>
                          {advisory.severity}
                        </span>
                        <div className="text-gray-400 sm:hidden">
                          {expandedAlert === advisory.id ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs">
                      <p className="text-gray-500 dark:text-gray-400">
                        Source: {advisory.source}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 sm:py-12 text-gray-500 dark:text-gray-400">
                <FaBug className="text-3xl sm:text-4xl mx-auto mb-3 text-green-600" />
                <p className="text-sm sm:text-base">No active pest advisories</p>
                <p className="text-xs sm:text-sm mt-2">Pest populations are currently under control</p>
              </div>
            )}
          </div>
        )}

        {/* Footer - Responsive */}
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center px-2">
            Data sourced from Open-Meteo weather API and seasonal models. 
            {activeTab === 'weather' && alerts.length > 0 && ` • ${alerts.length} active alert(s)`}
            {activeTab === 'pest' && pestAdvisories.length > 0 && ` • ${pestAdvisories.length} active advisory(ies)`}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-1">
            For official IMD alerts, visit mausam.imd.gov.in
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherAlerts;