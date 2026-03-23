import api from './api';

const cropService = {
  // Predict best crop based on soil parameters
  predictCrop: async (soilData) => {
    try {
      const response = await api.post('/crops/predict', {
        nitrogen: parseFloat(soilData.nitrogen),
        phosphorus: parseFloat(soilData.phosphorus),
        potassium: parseFloat(soilData.potassium),
        temperature: parseFloat(soilData.temperature),
        humidity: parseFloat(soilData.humidity),
        ph: parseFloat(soilData.ph),
        rainfall: parseFloat(soilData.rainfall)
      });

      if (response.data.success) {
        return {
          success: true,
          prediction: response.data.prediction
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Prediction failed'
      };
    }
  },

  // Get all supported crops
  getAllCrops: async () => {
    try {
      const response = await api.get('/crops/list');
      
      if (response.data.success) {
        return {
          success: true,
          crops: response.data.crops
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch crops'
      };
    }
  },

  // Get crop details by name
  getCropDetails: async (cropName) => {
    try {
      const response = await api.get(`/crops/${cropName}`);
      
      if (response.data.success) {
        return {
          success: true,
          crop: response.data.crop
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch crop details'
      };
    }
  },

  // Save prediction to history
  savePrediction: async (predictionData) => {
    try {
      const response = await api.post('/crops/save-prediction', predictionData);
      
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to save prediction'
      };
    }
  },

  // Get user's prediction history
  getPredictionHistory: async () => {
    try {
      const response = await api.get('/crops/history');
      
      if (response.data.success) {
        return {
          success: true,
          history: response.data.history
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch history'
      };
    }
  }
};

export default cropService;