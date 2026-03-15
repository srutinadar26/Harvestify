import { useState, useEffect } from 'react';
import authService from '../services/authService';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in on mount
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    const result = await authService.login(email, password);
    
    if (result.success) {
      setUser(result.user);
    } else {
      setError(result.message);
    }
    
    setLoading(false);
    return result;
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    const result = await authService.register(userData);
    
    if (!result.success) {
      setError(result.message);
    }
    
    setLoading(false);
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    
    const result = await authService.updateProfile(userData);
    
    if (result.success) {
      setUser(result.user);
    } else {
      setError(result.message);
    }
    
    setLoading(false);
    return result;
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };
};

export default useAuth;