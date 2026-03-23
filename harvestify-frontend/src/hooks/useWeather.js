// src/hooks/useWeather.js
import { useState, useEffect, useCallback } from 'react';
import weatherService from '../services/weatherService';

const useWeather = (initialCity = 'Mumbai') => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(initialCity);
  const [suggestions, setSuggestions] = useState([]);

  const fetchWeather = useCallback(async (cityName) => {
    if (!cityName || cityName.trim() === '') {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather
      const weatherResult = await weatherService.getWeatherByCity(cityName);
      
      if (weatherResult.success) {
        setWeather(weatherResult.weather);
        
        // Also fetch forecast
        const forecastResult = await weatherService.getForecast(cityName, 3);
        if (forecastResult.success) {
          setForecast(forecastResult.forecast);
        }
      } else {
        setError(weatherResult.message);
        setWeather(null);
        setForecast([]);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Search for cities as user types
  const searchCities = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }
    
    const results = await weatherService.searchCities(query);
    setSuggestions(results);
  }, []);

  // Get weather for user's location
  const getUserLocation = useCallback(() => {
    setLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            const result = await weatherService.getWeatherByCoords(latitude, longitude);
            
            if (result.success) {
              setWeather(result.weather);
              setCity(result.weather.location);
              
              // Also fetch forecast
              const forecastResult = await weatherService.getForecast(result.weather.location, 3);
              if (forecastResult.success) {
                setForecast(forecastResult.forecast);
              }
            } else {
              setError(result.message);
            }
          } catch (err) {
            setError('Failed to get weather for your location');
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          setError('Please enable location access or enter a city name');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation not supported by your browser');
      setLoading(false);
    }
  }, []);

  // Fetch weather when city changes
  useEffect(() => {
    fetchWeather(city);
  }, [city, fetchWeather]);

  // Get weather alerts
  const getAlerts = useCallback(async () => {
    return await weatherService.getWeatherAlerts();
  }, []);

  return {
    weather,
    forecast,
    loading,
    error,
    city,
    setCity,
    suggestions,
    searchCities,
    getUserLocation,
    refreshWeather: () => fetchWeather(city),
    getAlerts
  };
};

export default useWeather;