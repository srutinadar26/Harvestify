import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLeaf, FaBars, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: t('Home'), path: '/' },
    { name: t('Features'), path: '/features' },
    { name: t('Dashboard'), path: '/dashboard' },
    { name: t('About'), path: '/about' },
  ];

  // Don't show navbar on dashboard (it has its own sidebar)
  if (location.pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 dark:bg-dark-bg/95 backdrop-blur-md shadow-lg' : 'bg-white dark:bg-dark-bg'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <FaLeaf className="text-primary text-3xl transform group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-2xl font-bold text-primary dark:text-primary">
              {t('Harvestify')}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-300
                  ${location.pathname === link.path
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary dark:hover:text-primary'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeToggle />
            
            <Link
              to="/login"
              className="px-5 py-2 rounded-lg bg-primary text-white font-medium hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {t('Login')}
            </Link>
            
            <Link
              to="/register"
              className="px-5 py-2 rounded-lg bg-accent text-gray-800 font-medium hover:bg-yellow-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {t('Register')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
            {/* Mobile Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2 rounded-lg text-base font-medium transition-colors
                  ${location.pathname === link.path
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Actions */}
            <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-green-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t('Login')}
                </Link>
                
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-accent text-gray-800 text-sm font-medium hover:bg-yellow-500 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t('Register')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;