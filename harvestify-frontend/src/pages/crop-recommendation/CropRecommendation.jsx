// src/pages/crop-recommendation/CropRecommendation.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/FirebaseAuthContext';
import mlService from '../../services/mlService';
import { savePrediction } from '../../services/historyService';
import weatherService from '../../services/weatherService';  // ✅ ADD THIS IMPORT

const CropRecommendation = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [loading, setLoading]         = useState(false);
  const [prediction, setPrediction]   = useState(null);
  const [error, setError]             = useState(null);
  const [saving, setSaving]           = useState(false);
  const [fetchingWeather, setFetchingWeather] = useState(false);
  const [weatherFetched, setWeatherFetched]   = useState(false);

  const [cityInput, setCityInput] = useState('');
  const [formData, setFormData] = useState({
    nitrogen:    '',
    phosphorus:  '',
    potassium:   '',
    temperature: '',
    humidity:    '',
    ph:          '',
    rainfall:    ''
  });

  // ✅ REPLACE handleFetchWeather with this version using weatherService
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
        
        // WeatherAPI.com doesn't provide soil data, so we use sensible defaults
        // Users can manually adjust these values if they have soil test results
        setFormData({
          nitrogen:    50,     // Regional average (mg/kg)
          phosphorus:  40,     // Regional average (mg/kg)
          potassium:   43,     // Regional average (mg/kg)
          temperature: w.temperature,
          humidity:    w.humidity,
          ph:          6.5,    // Neutral soil pH (ideal for most crops)
          rainfall:    800     // Default annual rainfall (mm) - user can adjust
        });
        
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
    for (let key in formData) {
      if (formData[key] === '') {
        toast.error('Please fetch location data or fill all fields');
        return;
      }
    }
    setLoading(true);
    setError(null);
    try {
      const result = await mlService.predictCrop(formData);
      if (result.success) {
        setPrediction({
          crop:           result.prediction,
          confidence:     result.confidence,
          topPredictions: result.top_predictions,
        });
        toast.success('Prediction complete!');

        if (currentUser) {
          setSaving(true);
          await savePrediction(currentUser.uid, {
            type: 'crop',
            input: {
              nitrogen:    parseFloat(formData.nitrogen),
              phosphorus:  parseFloat(formData.phosphorus),
              potassium:   parseFloat(formData.kalium),
              temperature: parseFloat(formData.temperature),
              humidity:    parseFloat(formData.humidity),
              ph:          parseFloat(formData.ph),
              rainfall:    parseFloat(formData.rainfall)
            },
            result: {
              crop:            result.prediction,
              confidence:      result.confidence,
              top_predictions: result.top_predictions
            },
            confidence: result.confidence
          });
          setSaving(false);
        }
      } else {
        setError(result.message);
        toast.error(result.message || 'Prediction failed');
      }
    } catch (err) {
      toast.error('Failed to connect to ML service');
      setError('Connection error. Please make sure ML service is running.');
    } finally {
      setLoading(false);
    }
  };

  const getCropDetails = (crop) => {
    const details = {
      rice:        { fertilizer: 'Urea 40kg/acre + DAP 30kg/acre', season: 'Kharif (June–July)', water: 'High — keep fields flooded', tips: ['Plant in June–July', 'Maintain 2–5cm water level', 'Harvest when 80% grains are golden'] },
      wheat:       { fertilizer: 'DAP 50kg/acre + Urea 30kg/acre', season: 'Rabi (Nov–Dec)',     water: 'Medium — irrigate every 10–12 days', tips: ['Sow in November–December', 'Apply DAP at sowing', 'Harvest when grains are golden'] },
      maize:       { fertilizer: 'DAP 50kg/acre + Urea 60kg/acre', season: 'Kharif (June–July)', water: 'Medium — irrigate every 8–10 days', tips: ['Sow in June–July', 'Apply zinc sulfate for better yield', 'Harvest when husks turn brown'] },
      cotton:      { fertilizer: 'DAP 60kg/acre + Potash 40kg/acre', season: 'Kharif (April–May)', water: 'Medium — drip irrigation best', tips: ['Plant in April–May', 'Install pheromone traps for bollworm', 'Harvest when bolls crack open'] },
      mango:       { fertilizer: 'NPK 10:10:10 at 1kg/tree', season: 'Annual', water: 'Low–Medium', tips: ['Prune after harvest', 'Avoid waterlogging', 'Apply fertilizer in March–April'] },
      banana:      { fertilizer: 'Urea 200g + Potash 300g per plant', season: 'Annual', water: 'High — irrigate every 3–4 days', tips: ['Plant in February–April', 'Remove side suckers', 'Harvest 12–15 months after planting'] },
    };
    return details[crop?.toLowerCase()] || {
      fertilizer: 'Apply balanced NPK fertilizer based on soil test',
      season:     'Consult local agriculture officer',
      water:      'As per crop requirement',
      tips:       ['Test soil before planting', 'Use organic manure for soil health', 'Monitor pest population regularly']
    };
  };

  const cropDetails = prediction ? getCropDetails(prediction.crop) : null;

  // Farmer-friendly label map
  const friendlyLabels = {
    nitrogen:    { label: '🌿 Soil Fertility (Nitrogen)',  hint: 'Auto-detected (50 mg/kg default) — adjust if you have soil test' },
    phosphorus:  { label: '🔴 Phosphorus Level',           hint: 'Auto-detected (40 mg/kg default) — adjust if you have soil test' },
    potassium:   { label: '🟡 Potassium Level',            hint: 'Auto-detected (43 mg/kg default) — adjust if you have soil test' },
    temperature: { label: '🌡️ Temperature (°C)',           hint: 'Current temperature at your location' },
    humidity:    { label: '💧 Air Moisture (%)',           hint: 'Current humidity at your location' },
    ph:          { label: '⚗️ Soil Acidity (pH)',          hint: 'Ideal range: 6.0 – 7.5 (default 6.5)' },
    rainfall:    { label: '🌧️ Rainfall (mm)',              hint: 'Annual rainfall estimate (default 800mm) — adjust as needed' },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          🌱 {t('Crop Recommendation')}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            📍 Enter Your Location
          </h2>

          {/* City auto-fetch */}
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
            <p className="text-sm text-green-800 dark:text-green-300 font-medium mb-3">
              🤖 Let AI detect your weather automatically
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={cityInput}
                onChange={e => setCityInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleFetchWeather()}
                placeholder="Enter your city (e.g. Pune, Mumbai)"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg dark:text-white text-sm"
              />
              <Button
                onClick={handleFetchWeather}
                variant="primary"
                disabled={fetchingWeather}
                className="whitespace-nowrap"
              >
                {fetchingWeather ? '⏳ Fetching...' : '🌍 Auto Detect'}
              </Button>
            </div>
            {weatherFetched && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                ✅ Weather auto-filled. Soil values are regional averages — adjust if you have soil test results.
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
                  {friendlyLabels[key].label}
                </label>
                <input
                  type="number"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  step={key === 'ph' ? 0.1 : 1}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg dark:text-white"
                  placeholder={weatherFetched ? 'Auto-detected' : 'Enter value'}
                  required
                  disabled={loading}
                />
                <p className="text-xs text-gray-400 mt-1">{friendlyLabels[key].hint}</p>
              </div>
            ))}

            <Button type="submit" variant="primary" className="w-full" disabled={loading || saving}>
              {loading ? '⏳ Predicting...' : '🌾 Find Best Crop'}
            </Button>
          </form>
        </Card>

        {/* Result */}
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            🎯 Recommendation Result
          </h2>

          {loading && (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">Analyzing your soil & weather data...</p>
            </div>
          )}

          {error && !loading && (
            <div className="text-center text-red-500 h-96 flex flex-col items-center justify-center">
              <p className="text-lg">{error}</p>
              <p className="text-sm mt-2">Check your connection and try again</p>
            </div>
          )}

          {!loading && !prediction && !error && (
            <div className="text-center text-gray-500 dark:text-gray-400 h-96 flex items-center justify-center">
              <div>
                <p className="text-4xl mb-4">🌱</p>
                <p className="text-lg">Enter your city above and click</p>
                <p className="text-lg font-semibold text-primary">Find Best Crop</p>
              </div>
            </div>
          )}

          {prediction && !loading && (
            <div className="space-y-5">
              {/* Top result */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-1">Best Crop for Your Land</p>
                <h3 className="text-5xl font-bold text-primary dark:text-green-400 capitalize mb-3">
                  {prediction.crop}
                </h3>
                <span className="bg-primary text-white px-4 py-1 rounded-full text-sm">
                  {prediction.confidence}% match
                </span>
                {prediction.topPredictions?.length > 1 && (
                  <p className="text-sm text-gray-500 mt-3">
                    Other options: {prediction.topPredictions.slice(1).map(p => p.crop).join(', ')}
                  </p>
                )}
              </div>

              {/* Crop details in friendly cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">🗓️ Best Season</p>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm mt-1">{cropDetails.season}</p>
                </div>
                <div className="bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">💧 Water Need</p>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm mt-1">{cropDetails.water}</p>
                </div>
              </div>

              {/* Fertilizer */}
              <div className="border-l-4 border-primary bg-gray-50 dark:bg-dark-card p-4 rounded-r-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">🧪 Suggested Fertilizer</p>
                <p className="font-semibold text-primary dark:text-green-400 mt-1">{cropDetails.fertilizer}</p>
              </div>

              {/* Tips */}
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-200 mb-2">💡 Quick Tips</p>
                <ul className="space-y-2">
                  {cropDetails.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {saving && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Saving to history...</p>
                  </div>
                </div>
              )}

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <span className="font-bold">Note:</span> These recommendations are based on your local weather and regional soil averages. For best results, update soil values with a local soil test report.
                </p>
              </div>

              <Button
                onClick={() => {
                  navigator.clipboard.writeText(`Recommended crop: ${prediction.crop} with ${prediction.confidence}% confidence`);
                  toast.success('Copied to clipboard!');
                }}
                variant="outline"
                className="w-full"
              >
                📋 Share Result
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CropRecommendation;