// src/pages/crop-recommendation/CropRecommendation.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/FirebaseAuthContext';
import mlService from '../../services/mlService';
import { savePrediction } from '../../services/historyService';

const CropRecommendation = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    for (let key in formData) {
      if (!formData[key]) {
        toast.error(t('Please fill all fields'));
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const result = await mlService.predictCrop(formData);
      
      if (result.success) {
        setPrediction({
          crop: result.prediction,
          confidence: result.confidence,
          topPredictions: result.top_predictions,
          recommendations: result.recommendations
        });
        toast.success(t('Prediction complete!'));
        
        // Save to history if user is logged in
        if (currentUser) {
          setSaving(true);
          const saveResult = await savePrediction(currentUser.uid, {
            type: 'crop',
            input: {
              nitrogen: parseFloat(formData.nitrogen),
              phosphorus: parseFloat(formData.phosphorus),
              potassium: parseFloat(formData.potassium),
              temperature: parseFloat(formData.temperature),
              humidity: parseFloat(formData.humidity),
              ph: parseFloat(formData.ph),
              rainfall: parseFloat(formData.rainfall)
            },
            result: {
              crop: result.prediction,
              confidence: result.confidence,
              top_predictions: result.top_predictions
            },
            confidence: result.confidence
          });
          
          if (saveResult.success) {
            toast.success('Prediction saved to history!');
          }
          setSaving(false);
        }
      } else {
        setError(result.message);
        toast.error(result.message || t('Prediction failed'));
      }
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error('Failed to connect to ML service');
      setError('Connection error. Please make sure ML service is running');
    } finally {
      setLoading(false);
    }
  };

  const getCropDetails = (crop) => {
    const cropDetails = {
      'rice': {
        fertilizer: 'Urea 40kg/acre + DAP 30kg/acre',
        tips: [
          '🌱 Plant in June-July for Kharif season',
          '💧 Maintain 2-5cm water level throughout',
          '🧪 Apply fertilizer in split doses',
          '🐛 Monitor for stem borer and BPH',
          '🌾 Harvest when 80% grains are golden'
        ]
      },
      'wheat': {
        fertilizer: 'DAP 50kg/acre + Urea 30kg/acre',
        tips: [
          '🌱 Sow in November-December for best yield',
          '💧 Irrigate every 10-12 days',
          '🧪 Apply DAP at sowing, Urea after first irrigation',
          '🐛 Watch for aphids and rust disease',
          '🌾 Harvest when grains are hard and golden'
        ]
      },
      'maize': {
        fertilizer: 'DAP 50kg/acre + Urea 60kg/acre',
        tips: [
          '🌱 Sow in June-July (Kharif) or Oct-Nov (Rabi)',
          '💧 Irrigate every 8-10 days',
          '🧪 Apply zinc sulfate for better yield',
          '🐛 Watch for fall armyworm',
          '🌾 Harvest when husks turn brown'
        ]
      },
      'cotton': {
        fertilizer: 'DAP 60kg/acre + Potash 40kg/acre',
        tips: [
          '🌱 Plant in April-May after summer rains',
          '💧 Drip irrigation recommended',
          '🧪 Apply fertilizer in furrows',
          '🐛 Install pheromone traps for bollworm',
          '🌾 Harvest when bolls crack open'
        ]
      }
    };
    
    const cropLower = crop.toLowerCase();
    return cropDetails[cropLower] || {
      fertilizer: 'Apply balanced NPK fertilizer based on soil test',
      tips: [
        '🌱 Test soil before planting',
        '💧 Irrigate as per crop requirement',
        '🧪 Use organic manure for soil health',
        '🐛 Monitor pest population regularly',
        '🌾 Harvest at correct maturity stage'
      ]
    };
  };

  const inputFields = [
    { label: t('Nitrogen (N)'), name: 'nitrogen', unit: 'kg/ha', min: 0, max: 140, placeholder: 'Enter nitrogen content' },
    { label: t('Phosphorus (P)'), name: 'phosphorus', unit: 'kg/ha', min: 0, max: 140, placeholder: 'Enter phosphorus content' },
    { label: t('Potassium (K)'), name: 'potassium', unit: 'kg/ha', min: 0, max: 140, placeholder: 'Enter potassium content' },
    { label: t('Temperature'), name: 'temperature', unit: '°C', min: 0, max: 50, placeholder: 'Enter temperature' },
    { label: t('Humidity'), name: 'humidity', unit: '%', min: 0, max: 100, placeholder: 'Enter humidity' },
    { label: t('pH Level'), name: 'ph', unit: '', min: 0, max: 14, step: 0.1, placeholder: 'Enter soil pH (6-7.5 ideal)' },
    { label: t('Rainfall'), name: 'rainfall', unit: 'mm', min: 0, max: 300, placeholder: 'Enter annual rainfall' },
  ];

  const cropDetails = prediction ? getCropDetails(prediction.crop) : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {t('Crop Recommendation')}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            {t('Enter Soil & Climate Details')}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {inputFields.map((field) => (
              <div key={field.name}>
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                  {field.label} {field.unit && `(${field.unit})`}
                </label>
                <input
                  type="number"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  min={field.min}
                  max={field.max}
                  step={field.step || 1}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark-bg dark:text-white"
                  placeholder={t(field.placeholder || `Enter ${field.label.toLowerCase()}`)}
                  required
                  disabled={loading}
                />
                {field.name === 'ph' && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Ideal pH range: 6.0 - 7.5
                  </p>
                )}
              </div>
            ))}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading || saving}
            >
              {loading ? t('Predicting...') : t('Predict Best Crop')}
            </Button>
          </form>
        </Card>

        {/* Result Section */}
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            {t('Recommendation Result')}
          </h2>
          
          {loading && (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">{t('Analyzing your soil data...')}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">This may take a few seconds</p>
            </div>
          )}

          {error && !loading && (
            <div className="text-center text-red-500 dark:text-red-400 h-96 flex flex-col items-center justify-center">
              <p className="text-lg">{error}</p>
              <p className="text-sm mt-2">Please check your connection and try again</p>
            </div>
          )}

          {!loading && !prediction && !error && (
            <div className="text-center text-gray-500 dark:text-gray-400 h-96 flex items-center justify-center">
              <div>
                <p className="text-lg">{t('Fill the form and click predict to see results')}</p>
                <p className="text-sm mt-2">Get AI-powered crop recommendations</p>
              </div>
            </div>
          )}

          {prediction && !loading && (
            <div className="space-y-6">
              {/* Recommended Crop */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-2">{t('Recommended Crop')}</p>
                <h3 className="text-4xl font-bold text-primary dark:text-green-400 mb-2 capitalize">
                  {prediction.crop}
                </h3>
                <div className="flex justify-center items-center space-x-4">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm">
                    {t('Confidence')}: {prediction.confidence}%
                  </span>
                </div>
                {prediction.topPredictions && prediction.topPredictions.length > 1 && (
                  <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    <p>Other options: {prediction.topPredictions.slice(1).map(p => p.crop).join(', ')}</p>
                  </div>
                )}
              </div>

              {/* Suggested Fertilizer */}
              <div className="border-l-4 border-primary bg-gray-50 dark:bg-dark-card p-4 rounded-r-lg">
                <p className="font-medium text-gray-700 dark:text-gray-200">{t('Suggested Fertilizer')}:</p>
                <p className="text-lg text-primary dark:text-green-400 font-semibold mt-1">
                  {cropDetails.fertilizer}
                </p>
              </div>

              {/* Cultivation Tips */}
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <span className="text-xl">🌱</span> {t('Cultivation Tips')}:
                </h4>
                <ul className="space-y-2">
                  {cropDetails.tips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-gray-600 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
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

              {/* Additional Info */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <span className="font-bold">{t('Note')}:</span> {t('These recommendations are based on standard agricultural practices. Consult with local agricultural officer for region-specific advice.')}
                </p>
              </div>

              {/* Share Result Button */}
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(`Recommended crop: ${prediction.crop} with ${prediction.confidence}% confidence`);
                  toast.success('Result copied to clipboard!');
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