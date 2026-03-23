// Weather API Configuration
export const getWeatherUrl = (lat, lon) => {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
};

// Colors used across the UI
export const COLORS = {
  primary: '#2E7D32',
  secondary: '#81C784',
  accent: '#FFC107',
  background: '#F5F5F5',
  text: '#333333',
};

// Crop list for recommendation system
export const CROPS = [
  'Rice',
  'Wheat',
  'Maize',
  'Barley',
  'Cotton',
  'Sugarcane',
  'Potato',
  'Tomato',
  'Onion'
];

// Indian states for location selection
export const STATES = [
  'Andhra Pradesh',
  'Assam',
  'Bihar',
  'Gujarat',
  'Haryana',
  'Karnataka',
  'Madhya Pradesh',
  'Maharashtra',
  'Punjab',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'West Bengal'
];