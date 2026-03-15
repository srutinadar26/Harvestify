import api from './api';

const diseaseService = {
  // Detect disease from leaf image
  detectDisease: async (imageFile, cropType) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('cropType', cropType);

      const response = await api.post('/disease/detect', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        return {
          success: true,
          result: response.data.result
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Disease detection failed'
      };
    }
  },

  // Get treatment information for a disease
  getTreatmentInfo: async (diseaseName) => {
    try {
      const response = await api.get(`/disease/treatment/${diseaseName}`);
      
      if (response.data.success) {
        return {
          success: true,
          treatment: response.data.treatment
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch treatment info'
      };
    }
  },

  // Get common diseases for a crop
  getCommonDiseases: async (cropType) => {
    try {
      const response = await api.get(`/disease/common/${cropType}`);
      
      if (response.data.success) {
        return {
          success: true,
          diseases: response.data.diseases
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch diseases'
      };
    }
  },

  // Save detection result
  saveDetection: async (detectionData) => {
    try {
      const response = await api.post('/disease/save', detectionData);
      
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to save detection'
      };
    }
  }
};

export default diseaseService;