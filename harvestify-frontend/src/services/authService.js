import api from './api';

const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', {
        name: userData.fullName,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        state: userData.state,
        farmType: userData.farmType,
        farmSize: userData.farmSize
      });
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      return error.response?.data || {
        success: false,
        message: 'Registration failed'
      };
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      return error.response?.data || {
        success: false,
        message: 'Login failed'
      };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if logged in
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Update profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      return error.response?.data || {
        success: false,
        message: 'Update failed'
      };
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      return error.response?.data || {
        success: false,
        message: 'Password change failed'
      };
    }
  },

  // Save prediction
  savePrediction: async (predictionData) => {
    try {
      const response = await api.post('/auth/save-prediction', predictionData);
      return response.data;
    } catch (error) {
      return error.response?.data || {
        success: false,
        message: 'Failed to save prediction'
      };
    }
  },

  // Get predictions
  getPredictions: async () => {
    try {
      const response = await api.get('/auth/predictions');
      return response.data;
    } catch (error) {
      return error.response?.data || {
        success: false,
        predictions: []
      };
    }
  }
};

export default authService;