// src/services/weatherService.js
// WeatherAPI.com integration - INDIAN CITIES ONLY

const API_KEY = '17badfa802e747f08b2110226261403';
const BASE_URL = 'https://api.weatherapi.com/v1';

// Comprehensive list of major Indian cities for fallback
export const INDIAN_CITIES = [
  // Metropolitan cities
  { name: 'Mumbai', state: 'Maharashtra' },
  { name: 'Delhi', state: 'Delhi' },
  { name: 'Bengaluru', state: 'Karnataka' },
  { name: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Kolkata', state: 'West Bengal' },
  { name: 'Hyderabad', state: 'Telangana' },
  { name: 'Pune', state: 'Maharashtra' },
  { name: 'Ahmedabad', state: 'Gujarat' },
  { name: 'Jaipur', state: 'Rajasthan' },
  { name: 'Lucknow', state: 'Uttar Pradesh' },
  { name: 'Kanpur', state: 'Uttar Pradesh' },
  { name: 'Nagpur', state: 'Maharashtra' },
  { name: 'Indore', state: 'Madhya Pradesh' },
  { name: 'Bhopal', state: 'Madhya Pradesh' },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { name: 'Patna', state: 'Bihar' },
  { name: 'Vadodara', state: 'Gujarat' },
  { name: 'Surat', state: 'Gujarat' },
  { name: 'Thane', state: 'Maharashtra' },
  { name: 'Agra', state: 'Uttar Pradesh' },
  // South Indian cities
  { name: 'Coimbatore', state: 'Tamil Nadu' },
  { name: 'Madurai', state: 'Tamil Nadu' },
  { name: 'Mysuru', state: 'Karnataka' },
  { name: 'Mangaluru', state: 'Karnataka' },
  { name: 'Thiruvananthapuram', state: 'Kerala' },
  { name: 'Kochi', state: 'Kerala' },
  { name: 'Kozhikode', state: 'Kerala' },
  // North Indian cities
  { name: 'Chandigarh', state: 'Chandigarh' },
  { name: 'Amritsar', state: 'Punjab' },
  { name: 'Ludhiana', state: 'Punjab' },
  { name: 'Jalandhar', state: 'Punjab' },
  { name: 'Dehradun', state: 'Uttarakhand' },
  { name: 'Shimla', state: 'Himachal Pradesh' },
  { name: 'Srinagar', state: 'Jammu and Kashmir' },
  { name: 'Jammu', state: 'Jammu and Kashmir' },
  // East Indian cities
  { name: 'Guwahati', state: 'Assam' },
  { name: 'Bhubaneswar', state: 'Odisha' },
  { name: 'Cuttack', state: 'Odisha' },
  { name: 'Ranchi', state: 'Jharkhand' },
  { name: 'Jamshedpur', state: 'Jharkhand' },
  // West Indian cities
  { name: 'Nashik', state: 'Maharashtra' },
  { name: 'Aurangabad', state: 'Maharashtra' },
  { name: 'Solapur', state: 'Maharashtra' },
  { name: 'Kolhapur', state: 'Maharashtra' },
  { name: 'Rajkot', state: 'Gujarat' },
  { name: 'Bhavnagar', state: 'Gujarat' },
  // Central Indian cities
  { name: 'Raipur', state: 'Chhattisgarh' },
  { name: 'Bilaspur', state: 'Chhattisgarh' },
  { name: 'Jabalpur', state: 'Madhya Pradesh' },
  { name: 'Gwalior', state: 'Madhya Pradesh' },
  { name: 'Ujjain', state: 'Madhya Pradesh' }
];

// Check if a city is in India
const isIndianCity = (city) => {
  // If country is explicitly provided, check if it's India
  if (city.country) {
    const countryLower = city.country.toLowerCase();
    return countryLower.includes('india') || countryLower === 'in';
  }
  
  // If no country, check against our Indian cities list
  return INDIAN_CITIES.some(indianCity => 
    indianCity.name.toLowerCase() === city.name?.toLowerCase()
  );
};

const weatherService = {
  // Search for cities - FILTERED FOR INDIA ONLY
  searchCities: async (query) => {
    if (!query || query.length < 2) return [];
    
    try {
      const url = `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.error) {
        console.log('Search error:', data.error);
        return [];
      }
      
      // Filter to show ONLY Indian cities
      const indianResults = data.filter(city => {
        // Check if city is in India
        if (city.country) {
          const countryLower = city.country.toLowerCase();
          return countryLower.includes('india') || countryLower === 'in';
        }
        return false;
      });
      
      // If no results from API, fallback to our local Indian cities list
      if (indianResults.length === 0) {
        return INDIAN_CITIES
          .filter(city => 
            city.name.toLowerCase().includes(query.toLowerCase()) ||
            city.state.toLowerCase().includes(query.toLowerCase())
          )
          .map(city => ({
            name: city.name,
            region: city.state,
            country: 'India'
          }));
      }
      
      // Map the results to a consistent format
      return indianResults.map(city => ({
        name: city.name,
        region: city.region || '',
        country: city.country || 'India'
      }));
    } catch (error) {
      console.error('City search error:', error);
      
      // Fallback to local Indian cities list
      return INDIAN_CITIES
        .filter(city => 
          city.name.toLowerCase().includes(query.toLowerCase()) ||
          city.state.toLowerCase().includes(query.toLowerCase())
        )
        .map(city => ({
          name: city.name,
          region: city.state,
          country: 'India'
        }));
    }
  },

  // Get current weather by city name - VERIFY IT'S AN INDIAN CITY
  getWeatherByCity: async (cityName) => {
    if (!cityName || cityName.trim() === '') {
      return {
        success: false,
        message: 'Please enter a city name'
      };
    }

    try {
      console.log(`Fetching weather for: ${cityName}`);
      
      const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(cityName.trim())}&aqi=yes`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('API Response:', data);

      if (data.error) {
        console.log('API returned error:', data.error);
        
        if (data.error.code === 1006) {
          return {
            success: false,
            message: `City "${cityName}" not found. Please check the spelling or try another Indian city.`
          };
        } else {
          return {
            success: false,
            message: data.error.message || 'Failed to fetch weather data'
          };
        }
      }

      // Check if the returned city is in India
      if (data.location && data.location.country) {
        const countryLower = data.location.country.toLowerCase();
        const isIndia = countryLower.includes('india') || countryLower === 'in';
        
        if (!isIndia) {
          return {
            success: false,
            message: `Sorry, "${cityName}" is not an Indian city. Please search for cities in India only.`
          };
        }
      }

      // Success! Transform the response
      return {
        success: true,
        weather: {
          temperature: Math.round(data.current.temp_c),
          feelsLike: Math.round(data.current.feelslike_c),
          humidity: data.current.humidity,
          condition: data.current.condition.text,
          description: data.current.condition.text,
          icon: data.current.condition.icon.startsWith('//') 
            ? `https:${data.current.condition.icon}` 
            : data.current.condition.icon,
          windSpeed: data.current.wind_kph,
          windDirection: data.current.wind_dir,
          pressure: data.current.pressure_mb,
          location: data.location.name,
          region: data.location.region || '',
          country: data.location.country,
          localTime: data.location.localtime,
          uvIndex: data.current.uv || 0,
          airQuality: data.current.air_quality ? {
            pm2_5: data.current.air_quality.pm2_5?.toFixed(1) || 'N/A',
            pm10: data.current.air_quality.pm10?.toFixed(1) || 'N/A',
            co: data.current.air_quality.co?.toFixed(1) || 'N/A',
            no2: data.current.air_quality.no2?.toFixed(1) || 'N/A',
            o3: data.current.air_quality.o3?.toFixed(1) || 'N/A'
          } : null
        }
      };
    } catch (error) {
      console.error('Network or fetch error:', error);
      
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        return {
          success: false,
          message: 'Network error. Please check your internet connection.'
        };
      }
      
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again.'
      };
    }
  },

  // Get forecast - VERIFY IT'S FOR INDIAN CITIES
  getForecast: async (cityName, days = 3) => {
    if (!cityName || cityName.trim() === '') {
      return {
        success: false,
        message: 'Please enter a city name'
      };
    }

    try {
      const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(cityName.trim())}&days=${days}&aqi=yes`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        return {
          success: false,
          message: data.error.message || 'Failed to fetch forecast'
        };
      }

      // Check if it's an Indian city
      if (data.location && data.location.country) {
        const countryLower = data.location.country.toLowerCase();
        const isIndia = countryLower.includes('india') || countryLower === 'in';
        
        if (!isIndia) {
          return {
            success: false,
            message: `Forecast not available for non-Indian cities.`
          };
        }
      }

      const forecast = data.forecast.forecastday.map(day => ({
        date: day.date,
        tempMax: Math.round(day.day.maxtemp_c),
        tempMin: Math.round(day.day.mintemp_c),
        condition: day.day.condition.text,
        icon: day.day.condition.icon.startsWith('//') 
          ? `https:${day.day.condition.icon}` 
          : day.day.condition.icon,
        chanceOfRain: day.day.daily_chance_of_rain || 0,
        humidity: day.day.avghumidity || 0,
        sunrise: day.astro.sunrise || 'N/A',
        sunset: day.astro.sunset || 'N/A'
      }));

      return {
        success: true,
        forecast,
        location: data.location.name
      };
    } catch (error) {
      console.error('Forecast error:', error);
      return {
        success: false,
        message: 'Failed to fetch forecast data'
      };
    }
  },

  // Get weather by coordinates - VERIFY IT'S IN INDIA
  getWeatherByCoords: async (lat, lon) => {
    try {
      const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=yes`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        return {
          success: false,
          message: data.error.message || 'Location not found'
        };
      }

      // Check if the location is in India
      if (data.location && data.location.country) {
        const countryLower = data.location.country.toLowerCase();
        const isIndia = countryLower.includes('india') || countryLower === 'in';
        
        if (!isIndia) {
          return {
            success: false,
            message: 'Weather data is only available for locations within India.'
          };
        }
      }

      return {
        success: true,
        weather: {
          temperature: Math.round(data.current.temp_c),
          feelsLike: Math.round(data.current.feelslike_c),
          humidity: data.current.humidity,
          condition: data.current.condition.text,
          description: data.current.condition.text,
          icon: data.current.condition.icon.startsWith('//') 
            ? `https:${data.current.condition.icon}` 
            : data.current.condition.icon,
          windSpeed: data.current.wind_kph,
          pressure: data.current.pressure_mb,
          location: data.location.name,
          region: data.location.region || '',
          country: data.location.country
        }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch weather data for your location'
      };
    }
  },

  // Get list of all Indian cities (for dropdown)
  getAllIndianCities: () => {
    return INDIAN_CITIES;
  }
};

export default weatherService;