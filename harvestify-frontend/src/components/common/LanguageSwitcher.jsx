// src/components/common/LanguageSwitcher.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaLanguage, FaCheck } from 'react-icons/fa';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', display: 'English' },
    { code: 'hi', name: 'हिंदी', display: 'हिंदी' },
    { code: 'mr', name: 'मराठी', display: 'मराठी' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    setIsOpen(false);
    // Force re-render of all components
    window.dispatchEvent(new Event('languageChanged'));
  };

  const getCurrentDisplay = () => {
    const current = languages.find(lang => lang.code === i18n.language);
    return current ? current.display : 'English';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
        aria-label="Select language"
      >
        <FaLanguage className="text-primary text-lg" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {getCurrentDisplay()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                i18n.language === lang.code ? 'bg-primary/10 text-primary' : 'text-gray-700 dark:text-gray-200'
              }`}
            >
              <span>{lang.display}</span>
              {i18n.language === lang.code && <FaCheck className="text-primary text-xs" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;