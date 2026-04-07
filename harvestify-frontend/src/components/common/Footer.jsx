import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaLeaf, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-8 sm:pt-12 pb-4 sm:pb-6">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <FaLeaf className="text-secondary text-xl sm:text-2xl" />
              <span className="text-lg sm:text-xl font-bold">{t('Harvestify')}</span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">
              {t('Smart Farming Assistance for Better Crop Decisions')}
            </p>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">
              {t('Helping farmers predict crops, detect diseases, and improve yield using data-driven insights.')}
            </p>
            <div className="flex space-x-3 mt-3 sm:mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-1.5 touch-manipulation"><FaFacebook size={16} className="sm:text-lg" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-1.5 touch-manipulation"><FaTwitter size={16} className="sm:text-lg" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-1.5 touch-manipulation"><FaInstagram size={16} className="sm:text-lg" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-1.5 touch-manipulation"><FaYoutube size={16} className="sm:text-lg" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('Quick Links')}</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm touch-manipulation">{t('About')}</Link></li>
              <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm touch-manipulation">{t('Features')}</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm touch-manipulation">{t('Dashboard')}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm touch-manipulation">{t('Contact Us')}</Link></li>
            </ul>
          </div>

          {/* Farmer Support */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('शेतकरी समर्थन')}</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm touch-manipulation">{t('Help Center')}</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm touch-manipulation">{t('FAQs')}</Link></li>
              <li><Link to="/schemes" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm touch-manipulation">{t('Government Schemes')}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm touch-manipulation">{t('Contact Support')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t('आमच्याशी संपर्क साधा')}</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
              <li>{t('Toll Free: 1800-180-1551')}</li>
              <li><a href="mailto:support@harvestify.gov.in" className="hover:text-white transition-colors touch-manipulation">{t('Email: support@harvestify.gov.in')}</a></li>
              <li>{t('Hours: Mon-Sat 9:00 AM - 6:00 PM')}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-4 sm:pt-6 mt-4 sm:mt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
            <p>© {currentYear} {t('Harvestify')}. {t('All rights reserved')}. {t('Made for Smart Agriculture')}</p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-6">
              <Link to="/privacy" className="hover:text-white transition-colors touch-manipulation">{t('Privacy Policy')}</Link>
              <Link to="/terms" className="hover:text-white transition-colors touch-manipulation">{t('Terms of Service')}</Link>
              <Link to="/disclaimer" className="hover:text-white transition-colors touch-manipulation">{t('Disclaimer')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;