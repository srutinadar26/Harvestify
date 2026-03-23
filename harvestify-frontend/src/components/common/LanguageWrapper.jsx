import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageWrapper = ({ children }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Force re-render when language changes
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return children;
};

export default LanguageWrapper;