import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaLeaf, FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/FirebaseAuthContext';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [method, setMethod] = useState('email');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name) {
      toast.error('Name is required');
      return false;
    }

    if (method === 'email') {
      if (!formData.email) {
        toast.error('Email is required');
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        toast.error('Invalid email format');
        return false;
      }
    }

    if (method === 'phone') {
      if (!formData.phone) {
        toast.error('Phone number is required');
        return false;
      }
      if (!/^[0-9]{10}$/.test(formData.phone)) {
        toast.error('Invalid phone number (10 digits required)');
        return false;
      }
    }

    if (!formData.password) {
      toast.error('Password is required');
      return false;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await signup(formData.email, formData.password, formData.name);
      
      if (result.success) {
        toast.success('Registration successful! Please check your email for verification.');
        navigate('/verify-email');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSignup = () => {
    if (!validateForm()) return;
    // Navigate to phone OTP page with phone number
    navigate('/phone-otp', { state: { phone: formData.phone, name: formData.name } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (method === 'email') {
      handleEmailSignup(e);
    } else {
      handlePhoneSignup();
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg flex items-center justify-center py-8 sm:py-12 px-3 sm:px-4">
      <div className="w-full max-w-sm">
        {/* Logo - Responsive */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-3 sm:mb-4">
            <FaLeaf className="text-primary text-4xl sm:text-5xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h2>
        </div>

        {/* Method Toggle - Mobile Responsive */}
        <div className="flex gap-2 sm:gap-4 mb-5 sm:mb-6 touch-manipulation">
          <button
            onClick={() => setMethod('email')}
            className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition ${
              method === 'email' 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <FaEnvelope className="inline mr-1 sm:mr-2 text-xs sm:text-sm" />
            <span className="hidden sm:inline">Email</span>
          </button>
          <button
            onClick={() => setMethod('phone')}
            className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition ${
              method === 'phone' 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <FaPhone className="inline mr-1 sm:mr-2 text-xs sm:text-sm" />
            <span className="hidden sm:inline">Phone</span>
          </button>
        </div>

        {/* Registration Form - Responsive Padding */}
        <div className="bg-white dark:bg-dark-card rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-5 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Full Name - Common for both */}
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-gray-700 dark:text-gray-200">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 text-gray-400 text-xs sm:text-sm" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-8 sm:pl-10 p-2 sm:p-2.5 text-sm sm:text-base h-10 sm:h-11 border border-gray-300 rounded-lg dark:bg-dark-bg dark:text-white dark:border-gray-600"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email or Phone based on method */}
            {method === 'email' ? (
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-gray-700 dark:text-gray-200">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 text-gray-400 text-xs sm:text-sm" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-8 sm:pl-10 p-2 sm:p-2.5 text-sm sm:text-base h-10 sm:h-11 border border-gray-300 rounded-lg dark:bg-dark-bg dark:text-white dark:border-gray-600"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-gray-700 dark:text-gray-200">
                  Phone Number
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 text-gray-400 text-xs sm:text-sm" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-8 sm:pl-10 p-2 sm:p-2.5 text-sm sm:text-base h-10 sm:h-11 border border-gray-300 rounded-lg dark:bg-dark-bg dark:text-white dark:border-gray-600"
                    placeholder="9876543210"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Enter 10-digit mobile number</p>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-gray-700 dark:text-gray-200">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 text-gray-400 text-xs sm:text-sm" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-8 sm:pl-10 p-2 sm:p-2.5 text-sm sm:text-base h-10 sm:h-11 border border-gray-300 rounded-lg dark:bg-dark-bg dark:text-white dark:border-gray-600"
                  placeholder="Minimum 6 characters"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-gray-700 dark:text-gray-200">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 text-gray-400 text-xs sm:text-sm" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-8 sm:pl-10 p-2 sm:p-2.5 text-sm sm:text-base h-10 sm:h-11 border border-gray-300 rounded-lg dark:bg-dark-bg dark:text-white dark:border-gray-600"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-2.5 sm:py-3 text-sm sm:text-base font-medium disabled:opacity-50 touch-manipulation active:scale-95"
            >
              {loading ? 'Creating account...' : `Sign Up with ${method === 'email' ? 'Email' : 'Phone'}`}
            </button>
          </form>

          <p className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-green-700 font-medium touch-manipulation">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;