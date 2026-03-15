import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../../components/common/ThemeToggle';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';

const DashboardHeader = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-dark-card shadow-sm px-6 py-4 flex items-center justify-between transition-colors duration-300">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {t('Welcome back')}, {user?.name || t('Farmer')}!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{t("Here's your farming dashboard")}</p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Language Switcher */}
        <LanguageSwitcher />
        
        {/* Notifications */}
        <button className="relative">
          <FaBell className="text-2xl text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-3xl text-gray-600 dark:text-gray-300" />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800 dark:text-white">{user?.name || t('Farmer')}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.state || t('Punjab')}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;