import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaLeaf, FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaPhone, FaTractor } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../../services/api';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    state: '',
    farmType: '',
    farmSize: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error(t('Please fill all required fields'));
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error(t('Passwords do not match'));
      return false;
    }

    if (formData.password.length < 6) {
      toast.error(t('Password must be at least 6 characters'));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(t('Please enter a valid email address'));
      return false;
    }

    if (!formData.agreeTerms) {
      toast.error(t('You must agree to the terms and conditions'));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        state: formData.state,
        farmType: formData.farmType,
        farmSize: formData.farmSize ? parseFloat(formData.farmSize) : undefined
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success(t('Registration successful!'));
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || t('Registration failed'));
    } finally {
      setLoading(false);
    }
  };

  const states = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const farmTypes = [
    { value: 'subsistence', label: 'Subsistence Farming' },
    { value: 'commercial', label: 'Commercial Farming' },
    { value: 'organic', label: 'Organic Farming' },
    { value: 'mixed', label: 'Mixed Farming' }
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-full">
              <FaLeaf className="text-primary text-5xl" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
            {t('Create Account')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {t('Join Harvestify for smart farming solutions')}
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 transition-colors duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {t('Full Name')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-bg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder={t('Enter your full name')}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {t('Email Address')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-bg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder={t('Enter your email')}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {t('Password')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-bg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder={t('Minimum 6 characters')}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {t('Confirm Password')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-bg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder={t('Confirm your password')}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Phone (Optional) */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {t('Phone Number')} <span className="text-gray-400">({t('optional')})</span>
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-bg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder={t('10-digit mobile number')}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* State (Optional) */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {t('State')} <span className="text-gray-400">({t('optional')})</span>
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-bg text-gray-900 dark:text-white appearance-none"
                    disabled={loading}
                  >
                    <option value="">{t('Select your state')}</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Farm Type (Optional) */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {t('Farm Type')} <span className="text-gray-400">({t('optional')})</span>
                </label>
                <div className="relative">
                  <FaTractor className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <select
                    name="farmType"
                    value={formData.farmType}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-bg text-gray-900 dark:text-white appearance-none"
                    disabled={loading}
                  >
                    <option value="">{t('Select farm type')}</option>
                    {farmTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {t(type.label)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Farm Size (Optional) */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {t('Farm Size')} <span className="text-gray-400">({t('acres, optional')})</span>
                </label>
                <input
                  type="number"
                  name="farmSize"
                  value={formData.farmSize}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-bg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder={t('e.g., 5.5')}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="agreeTerms"
                id="terms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-4 h-4 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary bg-white dark:bg-dark-bg"
                disabled={loading}
              />
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                {t('I agree to the')}{' '}
                <Link to="/terms" className="text-primary hover:text-green-700 font-medium">
                  {t('Terms and Conditions')}
                </Link>{' '}
                {t('and')}{' '}
                <Link to="/privacy" className="text-primary hover:text-green-700 font-medium">
                  {t('Privacy Policy')}
                </Link>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('Creating account...')}
                </span>
              ) : (
                t('Create Account')
              )}
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600 dark:text-gray-300">
              {t('Already have an account?')}{' '}
              <Link to="/login" className="text-primary hover:text-green-700 font-medium">
                {t('Sign in')}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;