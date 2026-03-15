import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaLeaf, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaLeaf className="text-secondary text-2xl" />
              <span className="text-xl font-bold">{t('Harvestify')}</span>
            </div>
            <p className="text-gray-400 text-sm">
              {t('Smart Farming Assistance for Better Crop Decisions')}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              {t('Helping farmers predict crops, detect diseases, and improve yield using data-driven insights.')}
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('Quick Links')}</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">{t('About')}</Link></li>
              <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">{t('Features')}</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">{t('Dashboard')}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">{t('Contact Us')}</Link></li>
            </ul>
          </div>

          {/* Farmer Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('शेतकरी समर्थन')}</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">{t('Help Center')}</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">{t('FAQs')}</Link></li>
              <li><Link to="/schemes" className="text-gray-400 hover:text-white transition-colors">{t('Government Schemes')}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">{t('Contact Support')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('आमच्याशी संपर्क साधा')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>{t('Toll Free: 1800-180-1551')}</li>
              <li>{t('Email: support@harvestify.gov.in')}</li>
              <li>{t('Hours: Mon-Sat 9:00 AM - 6:00 PM')}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {currentYear} {t('Harvestify')}. {t('All rights reserved')}. {t('Made for Smart Agriculture')}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-white transition-colors">{t('Privacy Policy')}</Link>
              <Link to="/terms" className="hover:text-white transition-colors">{t('Terms of Service')}</Link>
              <Link to="/disclaimer" className="hover:text-white transition-colors">{t('Disclaimer')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;