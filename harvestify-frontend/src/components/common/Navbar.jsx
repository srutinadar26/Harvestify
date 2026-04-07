import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLeaf, FaBars, FaTimes, FaRobot, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/FirebaseAuthContext';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { currentUser, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Navigation links - Fixed duplicate Dashboard issue
  const navLinks = [
    { name: t('Home'), path: '/' },
    { name: t('Features'), path: '/features' },
    { name: t('About'), path: '/about' },
  ];

  // Add Dashboard only for logged-in users (only once)
  if (currentUser) {
    navLinks.push({ name: t('Dashboard'), path: '/dashboard' });
  }

  // Don't show navbar on dashboard (it has its own sidebar)
  if (location.pathname.startsWith('/dashboard')) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-dark-bg/95 backdrop-blur-md shadow-lg' 
          : 'bg-white dark:bg-dark-bg shadow-sm'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          
          {/* Logo - Mobile First */}
          <Link 
            to="/" 
            className="flex items-center gap-1.5 sm:gap-2 group flex-shrink-0"
          >
            <div className="relative">
              <FaLeaf className="text-primary text-xl sm:text-2xl md:text-3xl transform group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary dark:text-primary whitespace-nowrap">
              {t('Harvestify')}
            </span>
          </Link>

          {/* Desktop Menu - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-300 whitespace-nowrap
                  ${location.pathname === link.path
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary dark:hover:text-primary'
                  }`}
              >
                {link.icon && link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            
            {!currentUser ? (
              <>
                <Link
                  to="/login"
                  className="px-4 lg:px-5 py-1.5 lg:py-2 rounded-lg bg-primary text-white text-sm lg:text-base font-medium hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  {t('Login')}
                </Link>
                
                <Link
                  to="/register"
                  className="px-4 lg:px-5 py-1.5 lg:py-2 rounded-lg bg-accent text-gray-800 text-sm lg:text-base font-medium hover:bg-yellow-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  {t('Register')}
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaUser className="text-gray-600 dark:text-gray-300" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Logout"
                >
                  <FaSignOutAlt className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button - Touch Friendly */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors active:scale-95 touch-manipulation"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Mobile Menu - Slide Down Animation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            
            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium transition-colors active:scale-98 touch-manipulation
                    ${location.pathname === link.path
                      ? 'bg-primary text-white'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>

            {/* Mobile Actions Section */}
            <div className="space-y-3">
              {/* Theme and Language Row */}
              <div className="flex items-center justify-between px-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Preferences</span>
                <div className="flex items-center gap-3">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
              </div>

              {/* Auth Buttons */}
              {!currentUser ? (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    to="/login"
                    className="text-center px-4 py-3 rounded-lg bg-primary text-white text-sm font-medium hover:bg-green-700 transition-colors active:scale-98 touch-manipulation"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('Login')}
                  </Link>
                  
                  <Link
                    to="/register"
                    className="text-center px-4 py-3 rounded-lg bg-accent text-gray-800 text-sm font-medium hover:bg-yellow-500 transition-colors active:scale-98 touch-manipulation"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('Register')}
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-primary text-white text-sm font-medium hover:bg-green-700 transition-colors active:scale-98 touch-manipulation"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUser size={14} />
                    {t('My Profile')}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border border-red-500 text-red-600 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950 transition-colors active:scale-98 touch-manipulation"
                  >
                    <FaSignOutAlt size={14} />
                    {t('Logout')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[-1] md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;