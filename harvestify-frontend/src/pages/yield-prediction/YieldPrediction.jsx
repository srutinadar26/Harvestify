// src/pages/yield-prediction/YieldPrediction.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/FirebaseAuthContext';
import mlService from '../../services/mlService';
import { savePrediction } from '../../services/historyService';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { FaCalendarAlt, FaChartLine, FaTractor, FaSpinner } from 'react-icons/fa';
import weatherService from '../../services/weatherService';

const CROP_OPTIONS = [
  { value: 'rice',       label: '🌾 Rice' },
  { value: 'wheat',      label: '🌿 Wheat' },
  { value: 'maize',      label: '🌽 Maize' },
  { value: 'cotton',     label: '☁️ Cotton' },
  { value: 'sugarcane',  label: '🎋 Sugarcane' },
  { value: 'potato',     label: '🥔 Potato' },
  { value: 'tomato',     label: '🍅 Tomato' },
  { value: 'onion',      label: '🧅 Onion' },
  { value: 'soybean',    label: '🫘 Soybean' },
  { value: 'groundnut',  label: '🥜 Groundnut' },
];

const YieldPrediction = () => {
  const { t }            = useTranslation();
  const { currentUser }  = useAuth();
  const [loading, setLoading]   = useState(false);
  const [saving, setSaving]     = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [fetchingWeather, setFetchingWeather] = useState(false);
  const [weatherFetched, setWeatherFetched]   = useState(false);
  const [cityInput, setCityInput] = useState('');

  const [formData, setFormData] = useState({
    crop:        'wheat',
    area_acres:  '',
    year:        new Date().getFullYear(),
    rainfall:    '',
    pesticides:  85000,
    temperature: ''
  });

  const historicalData = [
    { year: '2019', yield: 3.2, rainfall: 850 },
    { year: '2020', yield: 3.5, rainfall: 900 },
    { year: '2021', yield: 3.8, rainfall: 880 },
    { year: '2022', yield: 4.0, rainfall: 920 },
    { year: '2023', yield: 4.2, rainfall: 950 },
  ];

  const cropComparisonData = [
    { name: 'Wheat', current: 4.5, average: 3.8, potential: 5.2 },
    { name: 'Rice',  current: 5.2, average: 4.5, potential: 6.0 },
    { name: 'Maize', current: 3.8, average: 3.2, potential: 4.5 },
  ];

  const riskData = [
    { name: 'Weather Risk', value: 35 },
    { name: 'Pest Risk',    value: 25 },
    { name: 'Soil Risk',    value: 20 },
    { name: 'Market Risk',  value: 20 },
  ];

  const COLORS = ['#2E7D32', '#81C784', '#FFC107', '#f44336'];

  // ✅ UPDATED: Auto-fetch weather using weatherService (no more 401 errors!)
  const handleFetchWeather = async () => {
    if (!cityInput.trim()) {
      toast.error('Please enter your city name');
      return;
    }
    setFetchingWeather(true);
    try {
      const result = await weatherService.getWeatherByCity(cityInput);
      if (result.success) {
        const w = result.weather;
        // WeatherAPI free tier doesn't provide annual rainfall, using default
        const defaultRainfall = 800;
        setFormData(prev => ({ 
          ...prev, 
          temperature: w.temperature, 
          rainfall: defaultRainfall 
        }));
        setWeatherFetched(true);
        toast.success(`✅ Weather fetched for ${w.location}, ${w.region}`);
      } else {
        toast.error(result.message || 'City not found');
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not fetch weather. Try again.');
    } finally {
      setFetchingWeather(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.rainfall || !formData.temperature || !formData.area_acres) {
      toast.error('Please fill all fields or use Auto Detect');
      return;
    }
    setLoading(true);
    try {
      const result = await mlService.predictYield({
        year:        parseInt(formData.year),
        rainfall:    parseFloat(formData.rainfall),
        pesticides:  parseFloat(formData.pesticides),
        temperature: parseFloat(formData.temperature),
        crop:        formData.crop,
        area_acres:  parseFloat(formData.area_acres)
      });

      if (result.success) {
        setPrediction(result);
        toast.success('Prediction complete!');

        if (currentUser) {
          setSaving(true);
          await savePrediction(currentUser.uid, {
            type: 'yield',
            input: { ...formData },
            result: {
              kg_per_acre:     result.kg_per_acre,
              total_kg:        result.total_kg,
              total_bags_50kg: result.total_bags_50kg,
              rating:          result.rating,
              advice:          result.advice,
            },
            confidence: null
          });
          setSaving(false);
        }
      } else {
        toast.error(result.message || 'Prediction failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to connect to ML service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          📈 {t('Yield Prediction')}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
            <FaTractor className="text-primary" />
            Your Farm Details
          </h2>

          {/* City auto-fetch */}
          <div className="mb-5 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
            <p className="text-sm text-green-800 dark:text-green-300 font-medium mb-3">
              🌍 Auto-detect weather from your location
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={cityInput}
                onChange={e => setCityInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleFetchWeather()}
                placeholder="Enter your city (e.g. Nagpur)"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg dark:text-white text-sm"
              />
              <Button onClick={handleFetchWeather} variant="primary" disabled={fetchingWeather} className="whitespace-nowrap">
                {fetchingWeather ? '⏳...' : '🌦️ Detect'}
              </Button>
            </div>
            {weatherFetched && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                ✅ Temperature auto-filled. Rainfall set to 800mm (you can adjust).
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Crop selector */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                🌾 Which crop are you growing?
              </label>
              <select
                name="crop"
                value={formData.crop}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg dark:text-white"
              >
                {CROP_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Area */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                📏 How much land do you have? (acres)
              </label>
              <input
                type="number"
                name="area_acres"
                value={formData.area_acres}
                onChange={handleChange}
                placeholder="e.g. 5"
                min="0.1"
                step="0.5"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg dark:text-white"
                required
              />
              <p className="text-xs text-gray-400 mt-1">Enter area in acres (1 acre = 0.4 hectare)</p>
            </div>

            {/* Temperature — auto-filled */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                🌡️ Average Temperature (°C)
              </label>
              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                placeholder={weatherFetched ? 'Auto-detected' : 'e.g. 28'}
                step="0.5"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg dark:text-white"
                required
              />
            </div>

            {/* Rainfall — auto-filled */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                🌧️ Annual Rainfall (mm)
              </label>
              <input
                type="number"
                name="rainfall"
                value={formData.rainfall}
                onChange={handleChange}
                placeholder={weatherFetched ? 'Auto-detected (800mm default)' : 'e.g. 850'}
                step="10"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg dark:text-white"
                required
              />
              <p className="text-xs text-gray-400 mt-1">Annual rainfall in millimeters — adjust if you know your local average</p>
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={loading || saving}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <FaSpinner className="animate-spin" /> Predicting...
                </span>
              ) : '📊 Predict My Yield'}
            </Button>
          </form>
        </Card>

        {/* Result */}
        <Card>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
            <FaChartLine className="text-primary" />
            Your Yield Estimate
          </h2>

          {loading && (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">Calculating your yield...</p>
            </div>
          )}

          {!loading && !prediction && (
            <div className="text-center text-gray-500 dark:text-gray-400 h-64 flex items-center justify-center">
              <div>
                <p className="text-4xl mb-4">📊</p>
                <p>Enter your farm details and click</p>
                <p className="font-semibold text-primary">Predict My Yield</p>
              </div>
            </div>
          )}

          {prediction && !loading && (
            <div className="space-y-5">
              {/* Rating banner */}
              <div className="bg-gradient-to-r from-primary to-green-600 text-white p-5 rounded-xl text-center">
                <p className="text-green-100 text-sm mb-1">Expected Yield Rating</p>
                <p className="text-3xl font-bold mb-1">{prediction.rating}</p>
                <p className="text-green-100 text-sm">{prediction.advice}</p>
              </div>

              {/* Key numbers in farmer language */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Per Acre</p>
                  <p className="text-2xl font-bold text-primary dark:text-green-400">
                    {prediction.kg_per_acre?.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">kg / acre</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Harvest</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {prediction.total_kg?.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">kg total</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">In 50kg Bags</p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    ~{prediction.total_bags_50kg}
                  </p>
                  <p className="text-xs text-gray-500">bags</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Per Hectare</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {prediction.kg_per_hectare?.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">kg / ha</p>
                </div>
              </div>

              {/* Insights */}
              {prediction.insights?.length > 0 && (
                <div className="border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-r-lg">
                  <p className="font-semibold text-gray-700 dark:text-gray-200 mb-2">⚠️ Alerts</p>
                  <ul className="space-y-1">
                    {prediction.insights.map((insight, i) => (
                      <li key={i} className="text-sm text-gray-600 dark:text-gray-300">{insight}</li>
                    ))}
                  </ul>
                </div>
              )}

              {saving && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <p className="text-sm text-blue-600">Saving to history...</p>
                  </div>
                </div>
              )}

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <span className="font-bold">Note:</span> Yield estimates are based on weather and historical patterns. Actual yield may vary based on farming practices and local conditions.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <Line yAxisId="left"  type="monotone" dataKey="yield"    stroke="#2E7D32" name="Yield (t/ha)"   strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="rainfall" stroke="#2196F3" name="Rainfall (mm)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold mb-4">Crop Yield Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cropComparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="current"   fill="#2E7D32" name="Current Yield" />
              <Bar dataKey="average"   fill="#81C784" name="Average Yield" />
              <Bar dataKey="potential" fill="#FFC107" name="Potential Yield" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

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

      {/* Recommendations */}
      <Card>
        <h3 className="text-xl font-semibold mb-4">AI-Powered Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-primary mb-2">🌱 Planting Time</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Optimal planting window: November 15 – December 15</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-600 mb-2">💧 Irrigation</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Schedule irrigation every 10–12 days based on soil moisture</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-600 mb-2">🌾 Fertilizer</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Apply NPK 20:20:20 at 50kg/acre during growing season</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default YieldPrediction;