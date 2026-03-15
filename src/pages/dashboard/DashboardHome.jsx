import React from 'react';
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
  const stats = [
    {
      title: 'Today\'s Weather',
      value: '28°C',
      icon: <FaCloudSun className="text-3xl" />,
      color: 'bg-blue-100 text-blue-600',
      change: '+2°'
    },
    {
      title: 'Recommended Crop',
      value: 'Wheat',
      icon: <FaSeedling className="text-3xl" />,
      color: 'bg-green-100 text-green-600',
      change: 'Season: Rabi'
    },
    {
      title: 'Soil Moisture',
      value: '65%',
      icon: <FaTint className="text-3xl" />,
      color: 'bg-cyan-100 text-cyan-600',
      change: 'Good'
    },
    {
      title: 'Recent Predictions',
      value: '12',
      icon: <FaHistory className="text-3xl" />,
      color: 'bg-purple-100 text-purple-600',
      change: '+3 this week'
    }
  ];

  const recentActivities = [
    { action: 'Crop Prediction', crop: 'Rice', date: '2 hours ago', status: 'success' },
    { action: 'Disease Detection', crop: 'Tomato', date: 'Yesterday', status: 'warning' },
    { action: 'Weather Check', crop: 'All crops', date: 'Yesterday', status: 'info' },
    { action: 'Market Price Update', crop: 'Wheat', date: '2 days ago', status: 'success' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-2">{stat.change}</p>
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
            <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-600">Crop: {activity.crop}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{activity.date}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-green-50 text-primary p-3 rounded-lg hover:bg-green-100 transition flex items-center justify-center">
                New Crop Prediction
              </button>
              <button className="w-full bg-yellow-50 text-yellow-700 p-3 rounded-lg hover:bg-yellow-100 transition flex items-center justify-center">
                Upload for Disease Check
              </button>
              <button className="w-full bg-blue-50 text-blue-700 p-3 rounded-lg hover:bg-blue-100 transition flex items-center justify-center">
                Check Weather Forecast
              </button>
              <button className="w-full bg-purple-50 text-purple-700 p-3 rounded-lg hover:bg-purple-100 transition flex items-center justify-center">
                View Market Prices
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;