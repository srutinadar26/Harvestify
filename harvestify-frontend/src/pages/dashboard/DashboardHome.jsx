// src/pages/dashboard/DashboardHome.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../../components/common/Card';
import { 
  FaCloudSun, 
  FaSeedling, 
  FaTint, 
  FaHistory,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const DashboardHome = () => {
  const { t } = useTranslation();

  const stats = [
    {
      title: t('Today\'s Weather'),
      value: '28°C',
      icon: <FaCloudSun className="text-3xl" />,
      color: 'bg-blue-100 text-blue-600',
      change: '+2°'
    },
    {
      title: t('Recommended Crop'),
      value: 'Wheat',
      icon: <FaSeedling className="text-3xl" />,
      color: 'bg-green-100 text-green-600',
      change: 'Season: Rabi'
    },
    {
      title: t('Soil Moisture'),
      value: '65%',
      icon: <FaTint className="text-3xl" />,
      color: 'bg-cyan-100 text-cyan-600',
      change: 'Good'
    },
    {
      title: t('Recent Predictions'),
      value: '12',
      icon: <FaHistory className="text-3xl" />,
      color: 'bg-purple-100 text-purple-600',
      change: '+3 this week'
    }
  ];

  const recentActivities = [
    { action: t('Crop Prediction'), crop: 'Rice', date: '2 hours ago', status: 'success' },
    { action: t('Disease Detection'), crop: 'Tomato', date: 'Yesterday', status: 'warning' },
    { action: t('Weather Check'), crop: t('All crops'), date: 'Yesterday', status: 'info' },
    { action: t('Market Price Update'), crop: 'Wheat', date: '2 days ago', status: 'success' },
  ];

  const quickActions = [
    { text: t('New Crop Prediction'), color: 'green', icon: <FaSeedling className="mr-2" /> },
    { text: t('Upload for Disease Check'), color: 'yellow', icon: <FaArrowUp className="mr-2" /> },
    { text: t('Check Weather Forecast'), color: 'blue', icon: <FaCloudSun className="mr-2" /> },
    { text: t('View Market Prices'), color: 'purple', icon: <FaArrowDown className="mr-2" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{stat.change}</p>
            </div>
            <div className={`p-4 rounded-full ${stat.color}`}>
              {stat.icon}
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              {t('Recent Activities')}
            </h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{activity.action}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {t('Crop')}: {activity.crop}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              {t('Quick Actions')}
            </h3>
            <div className="space-y-3">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  className={`w-full bg-${action.color}-50 text-${action.color === 'green' ? 'primary' : action.color === 'yellow' ? 'yellow-700' : action.color === 'blue' ? 'blue-700' : 'purple-700'} p-3 rounded-lg hover:bg-${action.color}-100 transition flex items-center justify-center gap-2`}
                >
                  {action.icon}
                  {action.text}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;