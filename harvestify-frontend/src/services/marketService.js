// src/services/marketService.js
// Real market prices from data.gov.in API

const API_KEY = '579b464db66ec23bdd00000102b75beae8024d57583b69e303b87c57';
const BASE_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';

// Indian states for filtering
export const INDIAN_STATES = [
  'All', 'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry',
  'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

// Major crops in India
export const CROPS = [
  'All', 'Wheat', 'Paddy', 'Rice', 'Maize', 'Bajra', 'Jowar',
  'Cotton', 'Sugarcane', 'Groundnut', 'Mustard', 'Soybean',
  'Potato', 'Onion', 'Tomato', 'Brinjal', 'Cauliflower',
  'Cabbage', 'Pea', 'Bengal Gram', 'Red Gram', 'Green Gram',
  'Black Gram', 'Sunflower', 'Sesame', 'Copra', 'Jute'
];

const marketService = {
  // Get real-time market prices from API
  getMarketPrices: async (filters = {}) => {
    try {
      const { state = '', crop = '', market = '', limit = 100 } = filters;
      
      // Build query parameters
      const params = new URLSearchParams({
        'api-key': API_KEY,
        'format': 'json',
        'limit': limit.toString()
      });
      
      // Add filters if provided
      if (state && state !== 'All') {
        params.append('filters[state]', state);
      }
      if (crop && crop !== 'All') {
        params.append('filters[commodity]', crop);
      }
      if (market) {
        params.append('filters[market]', market);
      }
      
      const url = `${BASE_URL}?${params.toString()}`;
      console.log('Fetching market data from:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.records && data.records.length > 0) {
        // Transform API response to your app's format
        const prices = data.records.map((record, index) => {
          // Calculate average price (modal price is the most common)
          const avgPrice = parseInt(record.modal_price) || 
                          (parseInt(record.min_price) + parseInt(record.max_price)) / 2;
          
          // Determine trend (simplified - in real app you'd compare with historical data)
          const randomTrend = Math.random();
          const trend = randomTrend > 0.6 ? 'up' : randomTrend > 0.3 ? 'down' : 'stable';
          const change = trend === 'up' ? `+${(Math.random() * 3).toFixed(1)}%` : 
                        trend === 'down' ? `-${(Math.random() * 3).toFixed(1)}%` : '0%';
          
          return {
            id: record.id || index + 1,
            crop: record.commodity,
            state: record.state,
            district: record.district,
            market: record.market,
            minPrice: parseInt(record.min_price) || 0,
            maxPrice: parseInt(record.max_price) || 0,
            avgPrice: Math.round(avgPrice),
            unit: record.price_unit || 'Quintal',
            trend: trend,
            change: change,
            arrivalDate: record.arrival_date,
            updatedAt: record.arrival_date || new Date().toISOString().split('T')[0]
          };
        });
        
        return {
          success: true,
          prices,
          total: data.total_count || prices.length
        };
      } else {
        // If no records from API, return empty array with success false
        return {
          success: false,
          prices: [],
          total: 0,
          message: 'No data found for selected filters'
        };
      }
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        prices: [],
        total: 0,
        message: 'Failed to fetch market data'
      };
    }
  },

  // Get unique states from data
  getStates: () => {
    return INDIAN_STATES;
  },

  // Get unique crops from data
  getCrops: () => {
    return CROPS;
  },

  // Get price trends for charts (for future enhancement)
  getPriceTrends: async (crop, state, days = 30) => {
    try {
      // Fetch historical data - you can implement this when needed
      const params = new URLSearchParams({
        'api-key': API_KEY,
        'format': 'json',
        'limit': days.toString()
      });
      
      if (state && state !== 'All') {
        params.append('filters[state]', state);
      }
      if (crop && crop !== 'All') {
        params.append('filters[commodity]', crop);
      }
      
      const url = `${BASE_URL}?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();
      
      // Process historical data for trends
      // This is a placeholder - you can enhance this later
      return {
        success: true,
        trends: [],
        crop,
        state
      };
    } catch (error) {
      console.error('Trends API Error:', error);
      return {
        success: false,
        trends: [],
        crop,
        state
      };
    }
  }
};

export default marketService;