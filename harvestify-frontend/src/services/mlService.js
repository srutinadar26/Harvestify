// src/services/mlService.js
import axios from 'axios';

const defaultMlApiUrl =
  process.env.REACT_APP_ML_API_URL ||
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8000'
    : window.location.origin);

const ML_API_URL = defaultMlApiUrl;

const mlService = {
  // Check if ML service is running
  healthCheck: async () => {
    try {
      const response = await axios.get(`${ML_API_URL}/health`);
      return response.data;
    } catch (error) {
      console.error('ML service not reachable:', error);
      return { status: 'offline' };
    }
  },

  // ========== CROP RECOMMENDATION ==========
  predictCrop: async (soilData) => {
    try {
      const response = await axios.post(`${ML_API_URL}/predict/crop`, {
        nitrogen: parseFloat(soilData.nitrogen),
        phosphorus: parseFloat(soilData.phosphorus),
        potassium: parseFloat(soilData.potassium),
        temperature: parseFloat(soilData.temperature),
        humidity: parseFloat(soilData.humidity),
        ph: parseFloat(soilData.ph),
        rainfall: parseFloat(soilData.rainfall)
      });
      return response.data;
    } catch (error) {
      console.error('Crop prediction error:', error);
      return {
        success: false,
        message: error.response?.data?.detail || 'Failed to connect to ML service'
      };
    }
  },

  // ========== DISEASE DETECTION ==========
  detectDisease: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      
      const response = await axios.post(`${ML_API_URL}/predict/disease`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000
      });
      return response.data;
    } catch (error) {
      console.error('Disease detection error:', error);
      return {
        success: false,
        message: error.response?.data?.detail || 'Detection failed'
      };
    }
  },

  // ========== YIELD PREDICTION ==========
  predictYield: async (yieldData) => {
    try {
      const response = await axios.post(`${ML_API_URL}/predict/yield`, {
        year: parseInt(yieldData.year),
        rainfall: parseFloat(yieldData.rainfall),
        pesticides: parseFloat(yieldData.pesticides),
        temperature: parseFloat(yieldData.temperature)
      });
      console.log('Yield API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Yield prediction error:', error);
      return {
        success: false,
        message: error.response?.data?.detail || 'Failed to connect to ML service'
      };
    }
  }
};

export default mlService;