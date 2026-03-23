// src/pages/dashboard/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FaLeaf, 
  FaTachometerAlt, 
  FaSeedling, 
  FaBug, 
  FaChartLine, 
  FaCloudSun, 
  FaRupeeSign, 
  FaUser,
  FaSignOutAlt,
  FaRobot
} from 'react-icons/fa';
import { useAuth } from '../../context/FirebaseAuthContext';

const Sidebar = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/dashboard', name: t('Dashboard'), icon: <FaTachometerAlt /> },
    { path: '/dashboard/crop-recommendation', name: t('Crop Recommendation'), icon: <FaSeedling /> },
    { path: '/dashboard/disease-detection', name: t('Disease Detection'), icon: <FaBug /> },
    { path: '/dashboard/yield-prediction', name: t('Yield Prediction'), icon: <FaChartLine /> },
    { path: '/dashboard/weather', name: t('Weather'), icon: <FaCloudSun /> },
    { path: '/dashboard/market-prices', name: t('Market Prices'), icon: <FaRupeeSign /> },
    { path: '/dashboard/profile', name: t('Profile'), icon: <FaUser /> },
    { path: '/dashboard/chatbot', name: t('AI Assistant'), icon: <FaRobot /> },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="bg-white dark:bg-dark-card w-64 shadow-lg flex flex-col transition-colors duration-300 h-full">
      {/* Logo */}
      <div className="flex items-center space-x-2 p-6 border-b border-gray-200 dark:border-gray-700">
        <FaLeaf className="text-primary text-2xl" />
        <span className="text-xl font-bold text-primary dark:text-primary">{t('Harvestify')}</span>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-200 ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary'
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition duration-200"
        >
          <FaSignOutAlt className="text-xl" />
          <span>{t('Logout')}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;