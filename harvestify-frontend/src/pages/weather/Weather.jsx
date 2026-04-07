// src/pages/weather/Weather.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import useWeather from '../../hooks/useWeather';
import { 
  FaMapMarkerAlt, FaSync, FaLocationArrow,
  FaTint, FaWind, FaThermometerHalf, FaSun, FaCloud,
  FaCloudRain, FaSnowflake, FaBolt, FaUmbrella,
  FaSearch, FaSeedling, FaTemperatureHigh, FaTemperatureLow
} from 'react-icons/fa';

const Weather = () => {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const { 
    weather, 
    forecast, 
    loading, 
    error, 
    city, 
    setCity, 
    suggestions,
    searchCities,
    getUserLocation,
    refreshWeather
  } = useWeather('Mumbai');

  // Handle search input change
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchInput(value);
    await searchCities(value);
    setShowSuggestions(true);
  };

  // Handle city selection from suggestions
  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity.name);
    setSearchInput(selectedCity.name);
    setShowSuggestions(false);
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      setShowSuggestions(false);
    }
  };

  // Get weather icon based on condition
  const getWeatherIcon = (condition, size = 'text-5xl') => {
    const conditionLower = condition?.toLowerCase() || '';
    
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return <FaSun className={`text-yellow-500 ${size}`} />;
    } else if (conditionLower.includes('cloud')) {
      return <FaCloud className={`text-gray-500 ${size}`} />;
    } else if (conditionLower.includes('rain')) {
      return <FaCloudRain className={`text-blue-500 ${size}`} />;
    } else if (conditionLower.includes('snow')) {
      return <FaSnowflake className={`text-blue-300 ${size}`} />;
    } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
      return <FaBolt className={`text-yellow-600 ${size}`} />;
    } else {
      return <FaSun className={`text-yellow-500 ${size}`} />;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Mobile Responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
          {t('Weather Information')}
        </h1>
      </div>

      {/* Search Bar - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row gap-2 w-full relative">
        <form onSubmit={handleSearchSubmit} className="flex flex-1 relative w-full">
          <div className="relative flex-1">
            <FaSearch className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm" />
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(true)}
              placeholder={t('Enter Indian city name...')}
              className="input-field pl-8 sm:pl-10 text-xs sm:text-sm h-10 sm:h-11 w-full dark:bg-dark-bg dark:text-white"
              disabled={loading}
            />
          </div>
          <Button 
            type="submit"
            variant="primary"
            className="ml-2 px-3 sm:px-6 text-xs sm:text-sm py-2 sm:py-2.5"
            disabled={loading}
          >
            {t('Search')}
          </Button>
        </form>
        
        <div className="flex gap-2">
          <Button
            onClick={getUserLocation}
            variant="outline"
            className="px-2.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm touch-manipulation"
            title={t('Use my location')}
            disabled={loading}
          >
            <FaLocationArrow size={12} className="sm:text-sm" />
          </Button>
          
          <Button
            onClick={refreshWeather}
            variant="outline"
            className="px-2.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm touch-manipulation"
            disabled={loading}
            title={t('Refresh')}
          >
            <FaSync size={12} className={`${loading ? 'animate-spin' : ''} sm:text-sm`} />
          </Button>
        </div>

        {/* City Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-12 sm:top-14 left-0 right-0 mt-1 bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {suggestions.map((city, index) => (
              <button
                key={index}
                onClick={() => handleCitySelect(city)}
                className="w-full text-left px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-gray-700 border-b last:border-b-0 flex justify-between items-center gap-2 touch-manipulation"
              >
                <span className="font-medium">{city.name}</span>
                <span className="text-xs text-gray-500 flex-shrink-0">{city.region || city.country}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-300 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8 sm:py-12">
          <div className="animate-spin rounded-full h-10 sm:h-12 w-10 sm:w-12 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Weather Data */}
      {!loading && weather && (
        <>
          {/* Current Weather Card - Responsive Layout */}
          <Card className="bg-gradient-to-br from-primary to-green-600 text-white">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8">
              <div className="text-center lg:text-left w-full lg:flex-1">
                <div className="flex items-center gap-2 mb-2 justify-center lg:justify-start flex-wrap">
                  <FaMapMarkerAlt className="text-sm" />
                  <p className="text-base sm:text-xl font-medium">{weather.location}</p>
                  {weather.region && (
                    <span className="text-xs sm:text-sm opacity-75">({weather.region})</span>
                  )}
                </div>
                <div className="flex items-center gap-2 sm:gap-4 justify-center lg:justify-start mb-2 sm:mb-3">
                  <p className="text-4xl sm:text-5xl lg:text-6xl font-bold">{weather.temperature}°C</p>
                  <div className="text-4xl sm:text-5xl lg:text-6xl">
                    {weather.icon ? (
                      <img src={weather.icon} alt={weather.condition} className="w-12 sm:w-16 h-12 sm:h-16" />
                    ) : (
                      getWeatherIcon(weather.condition, 'text-4xl sm:text-5xl lg:text-6xl')
                    )}
                  </div>
                </div>
                <p className="text-lg sm:text-2xl mb-1">{weather.condition}</p>
                <p className="text-sm sm:text-lg opacity-90">{t('Feels like')} {weather.feelsLike}°C</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 w-full lg:w-auto">
                <div className="text-center">
                  <FaTint className="text-2xl sm:text-3xl mx-auto mb-1 sm:mb-2" />
                  <p className="text-xs text-opacity-75 opacity-75">{t('Humidity')}</p>
                  <p className="text-base sm:text-xl font-semibold">{weather.humidity}%</p>
                </div>
                <div className="text-center">
                  <FaWind className="text-2xl sm:text-3xl mx-auto mb-1 sm:mb-2" />
                  <p className="text-xs opacity-75">{t('Wind')}</p>
                  <p className="text-base sm:text-xl font-semibold">{weather.windSpeed} km/h</p>
                </div>
                {weather.pressure && (
                  <div className="text-center">
                    <FaThermometerHalf className="text-2xl sm:text-3xl mx-auto mb-1 sm:mb-2" />
                    <p className="text-xs opacity-75">{t('Pressure')}</p>
                    <p className="text-base sm:text-xl font-semibold">{weather.pressure} mb</p>
                  </div>
                )}
                {weather.uvIndex > 0 && (
                  <div className="text-center">
                    <FaSun className="text-2xl sm:text-3xl mx-auto mb-1 sm:mb-2" />
                    <p className="text-xs opacity-75">{t('UV Index')}</p>
                    <p className="text-base sm:text-xl font-semibold">{weather.uvIndex}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* 3-Day Forecast - Responsive Grid */}
          {forecast.length > 0 && (
            <Card>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 dark:text-white">{t('3-Day Forecast')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {forecast.map((day, index) => (
                  <div key={index} className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-dark-bg rounded-lg">
                    <p className="font-medium text-xs sm:text-sm mb-2 dark:text-gray-200">{day.date}</p>
                    <div className="text-2xl sm:text-3xl mb-2 flex justify-center">
                      {day.icon ? (
                        <img src={day.icon} alt={day.condition} className="w-10 sm:w-12 h-10 sm:h-12" />
                      ) : (
                        getWeatherIcon(day.condition, 'text-2xl sm:text-3xl')
                      )}
                    </div>
                    <div className="flex justify-center gap-2 mb-2 text-xs sm:text-sm">
                      <span className="text-red-500 flex items-center gap-1">
                        <FaTemperatureHigh size={12} /> {day.tempMax}°
                      </span>
                      <span className="text-blue-500 flex items-center gap-1">
                        <FaTemperatureLow size={12} /> {day.tempMin}°
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{day.condition}</p>
                    {day.chanceOfRain > 0 && (
                      <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1">
                        <FaUmbrella size={10} /> {day.chanceOfRain}%
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Air Quality (if available) */}
          {weather.airQuality && (
            <Card>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 dark:text-white">{t('Air Quality')}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {weather.airQuality.pm2_5 !== 'N/A' && (
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">PM2.5</p>
                    <p className="text-base sm:text-lg font-semibold">{weather.airQuality.pm2_5}</p>
                  </div>
                )}
                {weather.airQuality.pm10 !== 'N/A' && (
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">PM10</p>
                    <p className="text-base sm:text-lg font-semibold">{weather.airQuality.pm10}</p>
                  </div>
                )}
                {weather.airQuality.co !== 'N/A' && (
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">CO</p>
                    <p className="text-base sm:text-lg font-semibold">{weather.airQuality.co}</p>
                  </div>
                )}
                {weather.airQuality.no2 !== 'N/A' && (
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">NO₂</p>
                    <p className="text-base sm:text-lg font-semibold">{weather.airQuality.no2}</p>
                  </div>
                )}
                {weather.airQuality.o3 !== 'N/A' && (
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">O₃</p>
                    <p className="text-base sm:text-lg font-semibold">{weather.airQuality.o3}</p>
                  </div>
                )}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default Weather;