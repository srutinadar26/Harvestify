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
import { FaCalendarAlt, FaChartLine, FaTractor, FaCloudSun, FaRainbow, FaSpinner } from 'react-icons/fa';

const YieldPrediction = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    rainfall: '',
    pesticides: '',
    temperature: ''
  });

  const historicalData = [
    { year: 2019, yield: 3.2, rainfall: 850, temperature: 24 },
    { year: 2020, yield: 3.5, rainfall: 900, temperature: 23.5 },
    { year: 2021, yield: 3.8, rainfall: 880, temperature: 25 },
    { year: 2022, yield: 4.0, rainfall: 920, temperature: 24.5 },
    { year: 2023, yield: 4.2, rainfall: 950, temperature: 26 },
  ];

  const cropComparisonData = [
    { name: 'Wheat', current: 4.5, average: 3.8, potential: 5.2 },
    { name: 'Rice', current: 5.2, average: 4.5, potential: 6.0 },
    { name: 'Maize', current: 3.8, average: 3.2, potential: 4.5 },
  ];

  const riskData = [
    { name: 'Weather Risk', value: 35 },
    { name: 'Pest Risk', value: 25 },
    { name: 'Soil Risk', value: 20 },
    { name: 'Market Risk', value: 20 },
  ];

  const COLORS = ['#2E7D32', '#81C784', '#FFC107', '#f44336'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.rainfall || !formData.pesticides || !formData.temperature) {
      toast.error(t('Please fill all fields'));
      return;
    }

    setLoading(true);

    try {
      const result = await mlService.predictYield({
        year: parseInt(formData.year),
        rainfall: parseFloat(formData.rainfall),
        pesticides: parseFloat(formData.pesticides),
        temperature: parseFloat(formData.temperature)
      });
      
      if (result.success) {
        setPrediction({
          value: result.yield,
          unit: result.unit,
          mode: result.mode,
          insights: result.insights || []
        });
        toast.success(t('Prediction complete!'));
        
        // Save to history if user is logged in
        if (currentUser) {
          setSaving(true);
          const saveResult = await savePrediction(currentUser.uid, {
            type: 'yield',
            input: {
              year: parseInt(formData.year),
              rainfall: parseFloat(formData.rainfall),
              pesticides: parseFloat(formData.pesticides),
              temperature: parseFloat(formData.temperature)
            },
            result: {
              yield: result.yield,
              unit: result.unit,
              insights: result.insights || []
            },
            confidence: null
          });
          
          if (saveResult.success) {
            toast.success('Prediction saved to history!');
          }
          setSaving(false);
        }
      } else {
        toast.error(result.message || t('Prediction failed'));
      }
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error('Failed to connect to ML service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {t('Yield Prediction & Analytics')}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaTractor className="text-primary" />
            {t('Enter Crop & Climate Details')}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                {t('Year')}
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="input-field dark:bg-dark-bg dark:text-white"
                min="2000"
                max="2030"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                {t('Rainfall (mm)')}
              </label>
              <input
                type="number"
                name="rainfall"
                value={formData.rainfall}
                onChange={handleChange}
                className="input-field dark:bg-dark-bg dark:text-white"
                placeholder="e.g., 850"
                step="10"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                {t('Pesticides (kg/ha)')}
              </label>
              <input
                type="number"
                name="pesticides"
                value={formData.pesticides}
                onChange={handleChange}
                className="input-field dark:bg-dark-bg dark:text-white"
                placeholder="e.g., 120"
                step="10"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                {t('Average Temperature (°C)')}
              </label>
              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                className="input-field dark:bg-dark-bg dark:text-white"
                placeholder="e.g., 28.5"
                step="0.5"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading || saving}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <FaSpinner className="animate-spin" />
                  {t('Predicting...')}
                </span>
              ) : (
                t('Predict Yield')
              )}
            </Button>
          </form>
        </Card>

        {/* Prediction Result */}
        <Card>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaChartLine className="text-primary" />
            {t('Yield Prediction Result')}
          </h2>
          
          {loading && (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">{t('Analyzing data...')}</p>
            </div>
          )}

          {!loading && !prediction && (
            <div className="text-center text-gray-500 dark:text-gray-400 h-64 flex items-center justify-center">
              <p>{t('Enter crop details and click predict to see results')}</p>
            </div>
          )}

          {prediction && !loading && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-primary to-green-600 text-white p-6 rounded-lg text-center">
                <p className="text-gray-100 mb-2">{t('Predicted Yield')}</p>
                <p className="text-5xl font-bold mb-2">{prediction.value}</p>
                <p className="text-xl">{prediction.unit}</p>
                {prediction.mode === 'mock' && (
                  <p className="text-sm mt-2 text-yellow-200">
                    ⚠️ Mock prediction (ML model pending)
                  </p>
                )}
                {prediction.mode === 'real' && (
                  <p className="text-sm mt-2 text-green-200">
                    ✅ AI Model Prediction
                  </p>
                )}
              </div>

              {/* Saving Indicator */}
              {saving && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Saving to history...</p>
                  </div>
                </div>
              )}

              {/* Insights */}
              {prediction.insights && prediction.insights.length > 0 && (
                <div className="border-l-4 border-primary bg-gray-50 dark:bg-dark-card p-4 rounded-r-lg">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    {t('Insights')}
                  </h4>
                  <ul className="space-y-1">
                    {prediction.insights.map((insight, idx) => (
                      <li key={idx} className="text-gray-600 dark:text-gray-300 text-sm">
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-l-4 border-primary bg-gray-50 dark:bg-dark-card p-4 rounded-r-lg">
                <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  {t('Interpretation')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {prediction.value > 5 
                    ? "🌾 Excellent yield expected! Your farming practices are optimal."
                    : prediction.value > 3
                    ? "🌱 Good yield expected. Consider optimizing inputs for better results."
                    : "⚠️ Below average yield predicted. Review your farming practices."}
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaCalendarAlt className="text-primary" />
            {t('Historical Yield Trend')}
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

        <Card>
          <h3 className="text-xl font-semibold mb-4">{t('Crop Yield Comparison')}</h3>
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
      </div>

      {/* Risk Analysis */}
      <Card>
        <h3 className="text-xl font-semibold mb-4">{t('Risk Factors Analysis')}</h3>
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

      {/* Recommendations */}
      <Card>
        <h3 className="text-xl font-semibold mb-4">{t('AI-Powered Recommendations')}</h3>
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