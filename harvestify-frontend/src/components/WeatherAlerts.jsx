import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaExclamationTriangle, FaMapMarkerAlt, FaSync, 
  FaCloudRain, FaWind, FaSun, FaSnowflake, FaBug,
  FaTemperatureHigh, FaTemperatureLow
} from 'react-icons/fa';
import { fetchRealTimeAlerts, fetchPestAdvisories } from '../services/alertService';

const WeatherAlerts = () => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState([]);
  const [pestAdvisories, setPestAdvisories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('weather'); // 'weather' or 'pest'

  const loadAllAlerts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch weather alerts
      const weatherResult = await fetchRealTimeAlerts();
      
      if (weatherResult.success) {
        setAlerts(weatherResult.alerts);
        if (!weatherResult.isRealTime) {
          console.log('Using smart alerts:', weatherResult.message);
        }
      }
      
      // Fetch pest advisories
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
    
    // Refresh alerts every 30 minutes
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
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200';
      case 'Low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
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

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg p-6">
      {/* Header with Tabs */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-semibold flex items-center gap-2">
            <span className="bg-accent w-2 h-8 rounded-full"></span>
            {t('Weather & Crop Alerts')}
          </h3>
          
          {/* Tab Switcher */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('weather')}
              className={`px-3 py-1 rounded-lg text-sm transition ${
                activeTab === 'weather' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Weather
            </button>
            <button
              onClick={() => setActiveTab('pest')}
              className={`px-3 py-1 rounded-lg text-sm transition flex items-center gap-1 ${
                activeTab === 'pest' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <FaBug size={12} />
              Pest Advisories
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {lastUpdated && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Updated: {formatTime(lastUpdated)}
            </span>
          )}
          <button
            onClick={loadAllAlerts}
            disabled={loading}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
            title="Refresh alerts"
          >
            <FaSync className={`text-primary ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Status Message */}
      {!loading && alerts.length > 0 && alerts[0]?.source === 'Smart Advisory' && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
          <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
            <FaSun className="text-yellow-500" />
            No severe weather alerts currently. Showing seasonal advisories.
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
          <p className="text-sm text-red-700 dark:text-red-300">
            {error}
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Weather Alerts Tab */}
      {!loading && activeTab === 'weather' && (
        <div className="space-y-4">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`border rounded-lg p-4 transition-all hover:shadow-md ${getSeverityClass(alert.severity)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getAlertIcon(alert.title)}
                      <h4 className="font-semibold text-lg">{alert.title}</h4>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <FaMapMarkerAlt className="text-gray-500" />
                      <span>{t('Location')}: {alert.location}</span>
                    </div>
                    
                    <p className="text-sm mt-2 opacity-90">
                      {alert.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs opacity-60">
                        Source: {alert.source}
                      </p>
                      {alert.timestamp && (
                        <p className="text-xs opacity-60">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ml-4
                    ${alert.severity === 'High' ? 'bg-red-500 text-white' :
                      alert.severity === 'Medium' ? 'bg-yellow-500 text-white' :
                      'bg-blue-500 text-white'}`}>
                    {alert.severity}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <FaSun className="text-4xl mx-auto mb-3 text-yellow-500" />
              <p>No active weather alerts</p>
              <p className="text-sm mt-2">Conditions are normal across monitored regions</p>
            </div>
          )}
        </div>
      )}

      {/* Pest Advisories Tab */}
      {!loading && activeTab === 'pest' && (
        <div className="space-y-4">
          {pestAdvisories.length > 0 ? (
            pestAdvisories.map((advisory) => (
              <div
                key={advisory.id}
                className={`border rounded-lg p-4 transition-all hover:shadow-md ${getSeverityClass(advisory.severity)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FaBug className="text-green-700" />
                      <h4 className="font-semibold text-lg">{advisory.title}</h4>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <FaMapMarkerAlt className="text-gray-500" />
                      <span>{t('Location')}: {advisory.location}</span>
                    </div>
                    
                    <p className="text-sm mt-2 opacity-90">
                      {advisory.description}
                    </p>
                    
                    <p className="text-xs mt-3 opacity-60">
                      Source: {advisory.source}
                    </p>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ml-4
                    ${advisory.severity === 'High' ? 'bg-red-500 text-white' :
                      advisory.severity === 'Medium' ? 'bg-yellow-500 text-white' :
                      'bg-blue-500 text-white'}`}>
                    {advisory.severity}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <FaBug className="text-4xl mx-auto mb-3 text-green-600" />
              <p>No active pest advisories</p>
              <p className="text-sm mt-2">Pest populations are currently under control</p>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Data sourced from Open-Meteo weather API and seasonal models. 
          {activeTab === 'weather' && alerts.length > 0 && ` • ${alerts.length} active alert(s)`}
          {activeTab === 'pest' && pestAdvisories.length > 0 && ` • ${pestAdvisories.length} active advisory(ies)`}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-1">
          For official IMD alerts, visit mausam.imd.gov.in
        </p>
      </div>
    </div>
  );
};

export default WeatherAlerts;