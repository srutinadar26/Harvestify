// src/pages/dashboard/DashboardHeader.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../context/FirebaseAuthContext';
import ThemeToggle from '../../components/common/ThemeToggle';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';

const DashboardHeader = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();

  return (
    <header className="bg-white dark:bg-dark-card shadow-sm px-6 py-4 flex items-center justify-between transition-colors duration-300">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {t('Welcome back')}, {currentUser?.displayName || currentUser?.email?.split('@')[0] || t('Farmer')}!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{t("Here's your farming dashboard")}</p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Language Switcher - ADD THIS */}
        <LanguageSwitcher />
        
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Profile */}
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-3xl text-gray-600 dark:text-gray-300" />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              {currentUser?.displayName || currentUser?.email?.split('@')[0] || t('Farmer')}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {currentUser?.emailVerified ? '✅ Verified' : '⚠️ Not verified'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;