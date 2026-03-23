// src/pages/disease-detection/DiseaseDetection.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/FirebaseAuthContext';
import mlService from '../../services/mlService';
import { savePrediction } from '../../services/historyService';
import { FaCloudUploadAlt, FaLeaf, FaBug, FaShieldAlt, FaSpinner } from 'react-icons/fa';

const DiseaseDetection = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error(t('Please upload an image file'));
        return;
      }

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size should be less than 10MB');
        return;
      }

      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast.error(t('Please upload an image first'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await mlService.detectDisease(selectedImage);
      
      if (result.success) {
        setResult(result);
        toast.success('Analysis complete!');
        
        // Save to history if user is logged in
        if (currentUser) {
          setSaving(true);
          
          // Convert image to base64 for storage reference
          const reader = new FileReader();
          reader.onloadend = async () => {
            const saveResult = await savePrediction(currentUser.uid, {
              type: 'disease',
              input: {
                imageName: selectedImage.name,
                imageSize: selectedImage.size,
                imageType: selectedImage.type
              },
              result: {
                crop: result.crop,
                disease: result.disease,
                confidence: result.confidence,
                severity: result.severity,
                treatment: result.treatment,
                prevention: result.prevention
              },
              confidence: result.confidence
            });
            
            if (saveResult.success) {
              toast.success('Detection saved to history!');
            }
            setSaving(false);
          };
          reader.readAsDataURL(selectedImage);
        }
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze image');
      toast.error('Failed to analyze image');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {t('Disease Detection')}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaCloudUploadAlt className="text-primary" />
            {t('Upload Leaf Image')}
          </h2>
          
          {!preview ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary transition">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <FaCloudUploadAlt className="text-5xl text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {t('Click to upload or drag and drop')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('Supported formats')}: JPG, PNG, JPEG (Max 10MB)
                </p>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-64 object-contain rounded-lg bg-gray-100 dark:bg-gray-800"
                />
                <button
                  onClick={handleReset}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex space-x-4">
                <Button
                  onClick={handleAnalyze}
                  variant="primary"
                  className="flex-1"
                  disabled={loading || saving}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <FaSpinner className="animate-spin" />
                      {t('Analyzing...')}
                    </span>
                  ) : (
                    t('Analyze Disease')
                  )}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                >
                  {t('Upload New')}
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Results Section */}
        <Card>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaBug className="text-primary" />
            {t('Analysis Result')}
          </h2>
          
          {loading && (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">Analyzing leaf image...</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Using AI model</p>
            </div>
          )}

          {error && !loading && (
            <div className="text-center text-red-500 h-96 flex flex-col items-center justify-center">
              <FaBug className="text-5xl mb-4" />
              <p className="text-lg">{error}</p>
              <p className="text-sm mt-2">Please try again with a different image</p>
            </div>
          )}

          {!loading && !result && !error && (
            <div className="text-center text-gray-500 dark:text-gray-400 h-96 flex items-center justify-center">
              <div>
                <FaLeaf className="text-5xl mx-auto mb-4 text-primary" />
                <p className="text-lg">{t('Upload a leaf image to see results')}</p>
                <p className="text-sm mt-2">AI will detect diseases with high accuracy</p>
              </div>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-6">
              {/* Disease Info */}
              <div className={`p-5 rounded-lg border ${getSeverityColor(result.severity)}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold capitalize">{result.disease}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.severity === 'High' ? 'bg-red-500 text-white' :
                    result.severity === 'Medium' ? 'bg-yellow-500 text-white' :
                    'bg-green-500 text-white'
                  }`}>
                    {result.severity} Severity
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/20 px-3 py-1 rounded-full">
                    <span className="text-primary font-medium capitalize">Crop: {result.crop}</span>
                  </div>
                  <div className="bg-primary/20 px-3 py-1 rounded-full">
                    <span className="text-primary font-medium">Confidence: {result.confidence}%</span>
                  </div>
                </div>
                {result.mode === 'real' && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
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

              {/* Treatment */}
              {result.treatment && result.treatment.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <FaShieldAlt className="text-primary" />
                    {t('Treatment Advice')}:
                  </h4>
                  <ul className="space-y-2">
                    {result.treatment.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-primary font-bold">•</span>
                        <span className="text-gray-600 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Prevention */}
              {result.prevention && result.prevention.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <FaLeaf className="text-primary" />
                    {t('Prevention Tips')}:
                  </h4>
                  <ul className="space-y-2">
                    {result.prevention.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span className="text-gray-600 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Disclaimer */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <span className="font-bold">Note:</span> This is an AI-based detection using your trained model. For accurate diagnosis, please consult with local agricultural experts.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DiseaseDetection;