// src/services/harvestifyDataService.js
import weatherService from './weatherService';
import marketService from './marketService';
import { INDIAN_STATES, INDIAN_CITIES } from './weatherService';

// Get real weather data for a location
export const getRealWeatherData = async (location) => {
  try {
    const result = await weatherService.getWeatherByCity(location);
    if (result.success) {
      return {
        temp: result.weather.temperature,
        condition: result.weather.condition,
        humidity: result.weather.humidity,
        windSpeed: result.weather.windSpeed,
        feelsLike: result.weather.feelsLike,
        location: result.weather.location
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};

// Get real market prices for a crop
export const getRealMarketPrices = async (crop, state) => {
  try {
    const result = await marketService.getMarketPrices({ crop, state, limit: 5 });
    if (result.success && result.prices.length > 0) {
      return result.prices.map(p => ({
        market: p.market,
        minPrice: p.minPrice,
        maxPrice: p.maxPrice,
        avgPrice: p.avgPrice,
        trend: p.trend
      }));
    }
    return null;
  } catch (error) {
    console.error('Error fetching market prices:', error);
    return null;
  }
};

// Get government schemes
export const getGovernmentSchemes = () => {
  return [
    {
      name: 'PM-KISAN Samman Nidhi',
      description: '₹6000/year income support for farmers',
      status: 'Active',
      link: 'https://pmkisan.gov.in'
    },
    {
      name: 'Soil Health Card Scheme',
      description: 'Free soil testing and recommendations',
      status: 'Active',
      link: 'https://soilhealth.dac.gov.in'
    },
    {
      name: 'Pradhan Mantri Fasal Bima Yojana',
      description: 'Crop insurance for farmers',
      status: 'Seasonal',
      link: 'https://pmfby.gov.in'
    },
    {
      name: 'PM Kisan Maan Dhan Yojana',
      description: 'Pension scheme for small farmers',
      status: 'Active',
      link: 'https://maandhan.in'
    }
  ];
};

// Get seasonal crop recommendations
export const getSeasonalCropRecommendation = (state, month) => {
  const recommendations = {
    'Punjab': {
      'winter': ['Wheat', 'Mustard', 'Barley'],
      'summer': ['Cotton', 'Maize', 'Sugarcane'],
      'monsoon': ['Rice', 'Maize', 'Cotton']
    },
    'Maharashtra': {
      'winter': ['Wheat', 'Gram', 'Jowar'],
      'summer': ['Cotton', 'Sugarcane', 'Groundnut'],
      'monsoon': ['Rice', 'Bajra', 'Pulses']
    },
    'Uttar Pradesh': {
      'winter': ['Wheat', 'Mustard', 'Peas'],
      'summer': ['Sugarcane', 'Maize', 'Potato'],
      'monsoon': ['Rice', 'Pulses', 'Millets']
    },
    'default': {
      'winter': ['Wheat', 'Mustard', 'Gram'],
      'summer': ['Cotton', 'Maize', 'Groundnut'],
      'monsoon': ['Rice', 'Bajra', 'Pulses']
    }
  };

  // Determine season based on month
  let season = 'winter';
  if (month >= 3 && month <= 5) season = 'summer';
  if (month >= 6 && month <= 9) season = 'monsoon';
  
  const stateData = recommendations[state] || recommendations.default;
  return stateData[season];
};

// Get pest control tips
export const getPestControlTips = (crop) => {
  const pestTips = {
    'Wheat': {
      pests: ['Aphids', 'Wheat Rust'],
      tips: [
        'Use neem oil spray for aphids',
        'Ensure proper field drainage',
        'Use resistant varieties'
      ]
    },
    'Rice': {
      pests: ['Brown Plant Hopper', 'Stem Borer'],
      tips: [
        'Monitor BPH population regularly',
        'Use pheromone traps for stem borer',
        'Maintain proper water level'
      ]
    },
    'Cotton': {
      pests: ['Pink Bollworm', 'American Bollworm'],
      tips: [
        'Install pheromone traps',
        'Remove affected bolls',
        'Use neem-based pesticides'
      ]
    },
    'default': {
      pests: ['General pests'],
      tips: [
        'Regular field monitoring',
        'Use organic pest control methods',
        'Consult local agriculture officer'
      ]
    }
  };
  
  return pestTips[crop] || pestTips.default;
};