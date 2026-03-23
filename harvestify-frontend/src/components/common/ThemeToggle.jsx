import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
      aria-label="Toggle theme"
      title={isDark ? t('Switch to Light Mode') : t('Switch to Dark Mode')}
    >
      {isDark ? (
        <FaSun className="text-yellow-500 text-lg transform group-hover:rotate-90 transition-transform duration-500" />
      ) : (
        <FaMoon className="text-gray-700 dark:text-gray-200 text-lg transform group-hover:-rotate-12 transition-transform duration-500" />
      )}
    </button>
  );
};

export default ThemeToggle;