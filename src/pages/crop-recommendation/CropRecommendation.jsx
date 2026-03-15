import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';
import useCrop from '../../hooks/useCrop'; // Add this
import { useAuth } from '../../context/AuthContext'; // Add this

const CropRecommendation = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { predictCrop, loading, prediction, error } = useCrop();
  
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

    // Call REAL prediction API
    const result = await predictCrop(formData);
    
    if (result.success) {
      toast.success(t('Prediction complete!'));
      
      // If user is logged in, save to history
      if (isAuthenticated) {
        // Save prediction logic here
      }
    } else {
      toast.error(result.message || t('Prediction failed'));
    }
  };

  // Your existing input fields array
  const inputFields = [
    { label: t('Nitrogen (N)'), name: 'nitrogen', unit: 'kg/ha', min: 0, max: 140 },
    { label: t('Phosphorus (P)'), name: 'phosphorus', unit: 'kg/ha', min: 0, max: 140 },
    { label: t('Potassium (K)'), name: 'potassium', unit: 'kg/ha', min: 0, max: 140 },
    { label: t('Temperature'), name: 'temperature', unit: '°C', min: 0, max: 50 },
    { label: t('Humidity'), name: 'humidity', unit: '%', min: 0, max: 100 },
    { label: t('pH Level'), name: 'ph', unit: '', min: 0, max: 14, step: 0.1 },
    { label: t('Rainfall'), name: 'rainfall', unit: 'mm', min: 0, max: 300 },
  ];

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
          <h2 className="text-xl font-semibold mb-4">{t('Enter Soil & Climate Details')}</h2>
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
                  className="input-field dark:bg-dark-bg dark:text-white dark:border-gray-600"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  required
                  disabled={loading}
                />
              </div>
            ))}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? t('Predicting...') : t('Predict Best Crop')}
            </Button>
          </form>
        </Card>

        {/* Result Section */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">{t('Recommendation Result')}</h2>
          
          {loading && (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">{t('Analyzing your soil data...')}</p>
            </div>
          )}

          {!loading && !prediction && (
            <div className="text-center text-gray-500 dark:text-gray-400 h-64 flex items-center justify-center">
              <p>{t('Fill the form and click predict to see results')}</p>
            </div>
          )}

          {prediction && !loading && (
            <div className="space-y-6">
              {/* Recommended Crop */}
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-2">{t('Recommended Crop')}</p>
                <h3 className="text-4xl font-bold text-primary dark:text-green-400 mb-2">
                  {prediction.crop}
                </h3>
                <div className="flex justify-center items-center space-x-4">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm">
                    {t('Confidence')}: {prediction.confidence}%
                  </span>
                </div>
              </div>

              {/* Fertilizer Suggestion */}
              <div className="border-l-4 border-primary bg-gray-50 dark:bg-dark-card p-4">
                <p className="font-medium text-gray-700 dark:text-gray-200">{t('Suggested Fertilizer')}:</p>
                <p className="text-lg text-primary dark:text-green-400">{prediction.fertilizer}</p>
              </div>

              {/* Cultivation Tips */}
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">{t('Cultivation Tips')}:</h4>
                <ul className="space-y-2">
                  {prediction.tips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-gray-600 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Additional Info */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <span className="font-bold">{t('Note')}:</span> {t('These recommendations are based on standard agricultural practices. Consult with local agricultural officer for region-specific advice.')}
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CropRecommendation;