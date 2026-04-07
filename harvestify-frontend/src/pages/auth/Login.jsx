import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaLeaf, FaEnvelope, FaLock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/FirebaseAuthContext'; // ← Import Firebase auth

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth(); // ← Get login function from Firebase
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ SINGLE handleSubmit function (removed the duplicate)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error(t('Please fill all fields'));
      return;
    }

    setLoading(true);

    try {
      // Use Firebase login instead of custom API
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Check if email is verified
        if (!result.user.emailVerified) {
          toast.warning('Please verify your email first');
          navigate('/verify-email');
        } else {
          toast.success(t('Login successful!'));
          navigate('/dashboard');
        }
      } else {
        // Handle Firebase error messages
        const errorMessage = result.error;
        if (errorMessage.includes('invalid-email')) {
          toast.error('Invalid email format');
        } else if (errorMessage.includes('user-not-found')) {
          toast.error('No account found with this email');
        } else if (errorMessage.includes('wrong-password')) {
          toast.error('Incorrect password');
        } else {
          toast.error(errorMessage || t('Login failed'));
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mt-2">
            {t('Welcome Back')}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2">
            {t('Login to your Harvestify account')}
          </p>
        </div>

        {/* Login Card - Responsive Padding */}
        <div className="bg-white dark:bg-dark-card rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl p-5 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium mb-1.5 sm:mb-2">
                {t('Email Address')}
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 text-gray-400 text-xs sm:text-sm" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-8 sm:pl-10 text-sm sm:text-base h-10 sm:h-11 dark:bg-dark-bg dark:text-white dark:border-gray-600"
                  placeholder={t('Enter your email')}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium mb-1.5 sm:mb-2">
                {t('Password')}
              </label>
              <div className="relative">
                <FaLock className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 text-gray-400 text-xs sm:text-sm" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-8 sm:pl-10 text-sm sm:text-base h-10 sm:h-11 dark:bg-dark-bg dark:text-white dark:border-gray-600"
                  placeholder={t('Enter your password')}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <label className="flex items-center touch-manipulation">
                <input type="checkbox" className="rounded text-primary dark:bg-dark-bg" />
                <span className="ml-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">{t('Remember me')}</span>
              </label>
              <Link to="/forgot-password" className="text-primary hover:text-green-700 text-xs sm:text-sm font-medium">
                {t('Forgot Password?')}
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-2.5 sm:py-3 text-sm sm:text-base font-medium disabled:opacity-50 touch-manipulation active:scale-95"
            >
              {loading ? t('Loading...') : t('Login')}
            </button>

            <p className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              {t("Don't have an account?")}{' '}
              <Link to="/register" className="text-primary font-medium hover:text-green-700 touch-manipulation">
                {t('Register here')}
              </Link>
            </p>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600 dark:text-gray-300">
            {t('Farmer Support')}: <span className="font-medium">1800-180-1551</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;