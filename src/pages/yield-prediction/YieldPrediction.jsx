import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

const YieldPrediction = () => {
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [selectedYear, setSelectedYear] = useState('2024');

  // Mock historical yield data
  const historicalData = [
    { year: '2019', yield: 3.2, rainfall: 850, temperature: 24 },
    { year: '2020', yield: 3.5, rainfall: 900, temperature: 23.5 },
    { year: '2021', yield: 3.8, rainfall: 880, temperature: 25 },
    { year: '2022', yield: 4.0, rainfall: 920, temperature: 24.5 },
    { year: '2023', yield: 4.2, rainfall: 950, temperature: 26 },
    { year: '2024', yield: 4.5, rainfall: 930, temperature: 25.5 },
  ];

  // Crop comparison data
  const cropComparisonData = [
    { name: 'Wheat', current: 4.5, average: 3.8, potential: 5.2 },
    { name: 'Rice', current: 5.2, average: 4.5, potential: 6.0 },
    { name: 'Maize', current: 3.8, average: 3.2, potential: 4.5 },
    { name: 'Sugarcane', current: 70, average: 65, potential: 80 },
  ];

  // Monthly yield distribution
  const monthlyData = [
    { month: 'Jan', yield: 0 },
    { month: 'Feb', yield: 0 },
    { month: 'Mar', yield: 0.5 },
    { month: 'Apr', yield: 1.2 },
    { month: 'May', yield: 2.8 },
    { month: 'Jun', yield: 3.5 },
    { month: 'Jul', yield: 4.0 },
    { month: 'Aug', yield: 4.2 },
    { month: 'Sep', yield: 3.8 },
    { month: 'Oct', yield: 2.5 },
    { month: 'Nov', yield: 1.0 },
    { month: 'Dec', yield: 0.2 },
  ];

  // Risk factors pie data
  const riskData = [
    { name: 'Weather Risk', value: 35 },
    { name: 'Pest Risk', value: 25 },
    { name: 'Soil Risk', value: 20 },
    { name: 'Market Risk', value: 20 },
  ];

  const COLORS = ['#2E7D32', '#81C784', '#FFC107', '#f44336'];

  const crops = ['Wheat', 'Rice', 'Maize', 'Sugarcane', 'Cotton', 'Potato'];
  const years = ['2024', '2025', '2026'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Yield Prediction & Analytics
        </h1>
        
        <div className="flex gap-4">
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="input-field w-40"
          >
            {crops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
          
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="input-field w-32"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Prediction Card */}
      <Card className="bg-gradient-to-r from-primary to-green-600 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-xl mb-2">Predicted Yield for {selectedCrop}</p>
            <p className="text-6xl font-bold mb-2">4.5 tons/ha</p>
            <p className="text-lg">↑ 12% higher than last year</p>
          </div>
          <div className="text-8xl opacity-50">
            <FaChartLine />
          </div>
        </div>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Historical Yield Trend */}
        <Card>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaCalendarAlt className="text-primary" />
            Historical Yield Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="yield"
                stroke="#2E7D32"
                name="Yield (tons/ha)"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="rainfall"
                stroke="#2196F3"
                name="Rainfall (mm)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Crop Comparison */}
        <Card>
          <h3 className="text-xl font-semibold mb-4">Crop Yield Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cropComparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" fill="#2E7D32" name="Current Yield" />
              <Bar dataKey="average" fill="#81C784" name="Average Yield" />
              <Bar dataKey="potential" fill="#FFC107" name="Potential Yield" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Monthly Distribution */}
        <Card>
          <h3 className="text-xl font-semibold mb-4">Monthly Yield Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="yield" fill="#2E7D32" name="Yield (tons)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Risk Analysis */}
        <Card>
          <h3 className="text-xl font-semibold mb-4">Risk Factors Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <h3 className="text-xl font-semibold mb-4">AI-Powered Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-primary mb-2">🌱 Planting Time</h4>
            <p>Optimal planting window: November 15 - December 15</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-600 mb-2">💧 Irrigation</h4>
            <p>Schedule irrigation every 10-12 days based on soil moisture</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-600 mb-2">🌾 Fertilizer</h4>
            <p>Apply NPK 20:20:20 at 50kg/acre during growing season</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default YieldPrediction;