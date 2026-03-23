// src/services/weatherService.js
// WeatherAPI.com integration - Working for all Indian states

const API_KEY = '17badfa802e747f08b2110226261403';
const BASE_URL = 'https://api.weatherapi.com/v1';

// All Indian states for weather data
export const INDIAN_STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

// Major Indian cities for quick access
export const INDIAN_CITIES = [
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
  { name: 'Nashik', state: 'Maharashtra' },
  { name: 'Amritsar', state: 'Punjab' },
  { name: 'Chandigarh', state: 'Chandigarh' },
  { name: 'Ludhiana', state: 'Punjab' },
  { name: 'Jalandhar', state: 'Punjab' }
];

// Get weather alerts for Indian regions
const getWeatherAlerts = async () => {
  // This would integrate with IMD or other alert systems
  // For now, return enhanced mock data
  const alerts = [
    {
      id: '1',
      title: 'Heavy Rainfall Alert',
      location: 'Punjab, Haryana',
      severity: 'High',
      description: 'Heavy rainfall expected in the region. Farmers are advised to delay irrigation and ensure proper drainage.',
      source: 'IMD'
    },
    {
      id: '2',
      title: 'Pest Advisory',
      location: 'Maharashtra',
      severity: 'Medium',
      description: 'Increased pest activity reported. Monitor crops regularly and consider preventive measures.',
      source: 'Agriculture Dept'
    },
    {
      id: '3',
      title: 'Temperature Warning',
      location: 'Rajasthan',
      severity: 'Low',
      description: 'Above-normal temperatures expected. Ensure adequate irrigation for sensitive crops.',
      source: 'IMD'
    },
    {
      id: '4',
      title: 'Strong Winds Alert',
      location: 'Gujarat',
      severity: 'Medium',
      description: 'Strong winds expected along coastal areas. Secure farm structures.',
      source: 'IMD'
    },
    {
      id: '5',
      title: 'Fog Advisory',
      location: 'Delhi, Uttar Pradesh',
      severity: 'Low',
      description: 'Dense fog in the morning hours. Drive carefully and delay outdoor activities.',
      source: 'IMD'
    }
  ];
  
  return { success: true, alerts };
};

const weatherService = {
  // Get weather by city name - WORKS FOR ALL INDIAN CITIES
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

      // Check if the returned city is in India (optional filter)
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

  // Get 3-day forecast for a city
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

  // Search for cities (autocomplete)
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
      return data
        .filter(city => {
          if (city.country) {
            const countryLower = city.country.toLowerCase();
            return countryLower.includes('india') || countryLower === 'in';
          }
          return false;
        })
        .map(city => ({
          name: city.name,
          region: city.region || '',
          country: city.country || 'India'
        }));
    } catch (error) {
      console.error('City search error:', error);
      return [];
    }
  },

  // Get weather by coordinates
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

  // Get list of all Indian states
  getAllIndianStates: () => {
    return INDIAN_STATES;
  },

  // Get weather alerts
  getWeatherAlerts // Add the function here
};

export default weatherService;