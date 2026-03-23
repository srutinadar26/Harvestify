import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaLeaf, FaHome, FaSeedling, FaTachometerAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

const NotFound = () => {
  const { t } = useTranslation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const leafVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const numberVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-background via-white to-background dark:from-dark-bg dark:via-dark-card dark:to-dark-bg flex items-center justify-center px-4 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-3xl w-full text-center">
        {/* Animated Leaf Logo */}
        <motion.div
          variants={leafVariants}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-primary to-green-600 p-6 rounded-full shadow-2xl">
              <FaLeaf className="text-white text-7xl transform rotate-12" />
            </div>
          </div>
        </motion.div>

        {/* 404 Number */}
        <motion.div
          variants={numberVariants}
          className="mb-4"
        >
          <h1 className="text-9xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600 dark:from-primary dark:to-green-500">
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
        >
          {t('Page Not Found')}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto"
        >
          {t("Oops! The page you're looking for doesn't exist.")}
        </motion.p>

        {/* Back to Home Button */}
        <motion.div
          variants={itemVariants}
          className="mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-3 bg-primary hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
          >
            <FaHome className="text-xl group-hover:rotate-12 transition-transform" />
            <span>{t('Back to Home')}</span>
          </Link>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          <Link
            to="/"
            className="flex flex-col items-center p-4 bg-white dark:bg-dark-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <FaHome className="text-2xl text-primary mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{t('Home')}</span>
          </Link>

          <Link
            to="/features"
            className="flex flex-col items-center p-4 bg-white dark:bg-dark-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <FaSeedling className="text-2xl text-primary mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{t('Features')}</span>
          </Link>

          <Link
            to="/dashboard"
            className="flex flex-col items-center p-4 bg-white dark:bg-dark-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <FaTachometerAlt className="text-2xl text-primary mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{t('Dashboard')}</span>
          </Link>

          <Link
            to="/login"
            className="flex flex-col items-center p-4 bg-white dark:bg-dark-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <FaSignInAlt className="text-2xl text-primary mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{t('Login')}</span>
          </Link>
        </motion.div>

        {/* Additional Help Text */}
        <motion.p
          variants={itemVariants}
          className="mt-8 text-sm text-gray-500 dark:text-gray-400"
        >
          {t('Need help?')} <Link to="/contact" className="text-primary hover:underline">{t('Contact Support')}</Link>
        </motion.p>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/5 rounded-full translate-x-24 translate-y-24"></div>
      </div>
    </motion.div>
  );
};

export default NotFound;