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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {t('Weather Information')}
        </h1>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2 w-full relative">
        <form onSubmit={handleSearchSubmit} className="flex flex-1 relative">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(true)}
              placeholder={t('Enter Indian city name...')}
              className="input-field pl-10 w-full dark:bg-dark-bg dark:text-white"
              disabled={loading}
            />
          </div>
          <Button 
            type="submit"
            variant="primary"
            className="ml-2 px-6"
            disabled={loading}
          >
            {t('Search')}
          </Button>
        </form>
        
        <Button
          onClick={getUserLocation}
          variant="outline"
          className="px-4"
          title={t('Use my location')}
          disabled={loading}
        >
          <FaLocationArrow />
        </Button>
        
        <Button
          onClick={refreshWeather}
          variant="outline"
          className="px-4"
          disabled={loading}
          title={t('Refresh')}
        >
          <FaSync className={loading ? 'animate-spin' : ''} />
        </Button>

        {/* City Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {suggestions.map((city, index) => (
              <button
                key={index}
                onClick={() => handleCitySelect(city)}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-b last:border-b-0 flex justify-between items-center"
              >
                <span className="font-medium">{city.name}</span>
                <span className="text-sm text-gray-500">{city.region || city.country}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Weather Data */}
      {!loading && weather && (
        <>
          {/* Current Weather Card */}
          <Card className="bg-gradient-to-br from-primary to-green-600 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                  <FaMapMarkerAlt />
                  <p className="text-xl">{weather.location}</p>
                  {weather.region && (
                    <span className="text-sm opacity-75">({weather.region})</span>
                  )}
                </div>
                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <p className="text-6xl font-bold">{weather.temperature}°C</p>
                  <div className="text-6xl">
                    {weather.icon ? (
                      <img src={weather.icon} alt={weather.condition} className="w-16 h-16" />
                    ) : (
                      getWeatherIcon(weather.condition, 'text-6xl')
                    )}
                  </div>
                </div>
                <p className="text-2xl mt-2">{weather.condition}</p>
                <p className="text-lg opacity-90">{t('Feels like')} {weather.feelsLike}°C</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-6 md:mt-0">
                <div className="text-center">
                  <FaTint className="text-3xl mx-auto mb-2" />
                  <p className="text-sm opacity-75">{t('Humidity')}</p>
                  <p className="text-xl font-semibold">{weather.humidity}%</p>
                </div>
                <div className="text-center">
                  <FaWind className="text-3xl mx-auto mb-2" />
                  <p className="text-sm opacity-75">{t('Wind')}</p>
                  <p className="text-xl font-semibold">{weather.windSpeed} km/h</p>
                </div>
                {weather.pressure && (
                  <div className="text-center">
                    <FaThermometerHalf className="text-3xl mx-auto mb-2" />
                    <p className="text-sm opacity-75">{t('Pressure')}</p>
                    <p className="text-xl font-semibold">{weather.pressure} mb</p>
                  </div>
                )}
                {weather.uvIndex > 0 && (
                  <div className="text-center">
                    <FaSun className="text-3xl mx-auto mb-2" />
                    <p className="text-sm opacity-75">{t('UV Index')}</p>
                    <p className="text-xl font-semibold">{weather.uvIndex}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* 3-Day Forecast */}
          {forecast.length > 0 && (
            <Card>
              <h3 className="text-xl font-semibold mb-6 dark:text-white">{t('3-Day Forecast')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {forecast.map((day, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 dark:bg-dark-bg rounded-lg">
                    <p className="font-medium mb-2 dark:text-gray-200">{day.date}</p>
                    <div className="text-3xl mb-2 flex justify-center">
                      {day.icon ? (
                        <img src={day.icon} alt={day.condition} className="w-12 h-12" />
                      ) : (
                        getWeatherIcon(day.condition, 'text-3xl')
                      )}
                    </div>
                    <div className="flex justify-center gap-2 mb-2">
                      <span className="text-red-500 flex items-center gap-1">
                        <FaTemperatureHigh /> {day.tempMax}°
                      </span>
                      <span className="text-blue-500 flex items-center gap-1">
                        <FaTemperatureLow /> {day.tempMin}°
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{day.condition}</p>
                    {day.chanceOfRain > 0 && (
                      <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1">
                        <FaUmbrella /> {day.chanceOfRain}%
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
              <h3 className="text-xl font-semibold mb-4 dark:text-white">{t('Air Quality')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {weather.airQuality.pm2_5 !== 'N/A' && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">PM2.5</p>
                    <p className="text-lg font-semibold">{weather.airQuality.pm2_5}</p>
                  </div>
                )}
                {weather.airQuality.pm10 !== 'N/A' && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">PM10</p>
                    <p className="text-lg font-semibold">{weather.airQuality.pm10}</p>
                  </div>
                )}
                {weather.airQuality.co !== 'N/A' && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">CO</p>
                    <p className="text-lg font-semibold">{weather.airQuality.co}</p>
                  </div>
                )}
                {weather.airQuality.no2 !== 'N/A' && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">NO₂</p>
                    <p className="text-lg font-semibold">{weather.airQuality.no2}</p>
                  </div>
                )}
                {weather.airQuality.o3 !== 'N/A' && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">O₃</p>
                    <p className="text-lg font-semibold">{weather.airQuality.o3}</p>
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