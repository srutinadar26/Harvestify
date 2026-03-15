import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { FaCloudUploadAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }

      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!selectedImage) {
      toast.error('Please upload an image first');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setResult({
        disease: 'Early Blight',
        confidence: '92%',
        treatment: [
          'Apply fungicides containing chlorothalonil or copper',
          'Remove and destroy infected leaves',
          'Ensure proper air circulation between plants',
          'Avoid overhead irrigation'
        ],
        prevention: [
          'Use disease-resistant varieties',
          'Practice crop rotation',
          'Maintain proper plant spacing',
          'Water at the base of plants'
        ],
        severity: 'Moderate'
      });
      setLoading(false);
      toast.success('Analysis complete!');
    }, 3000);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Disease Detection</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Upload Leaf Image</h2>
          
          {!preview ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition">
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
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  Supported formats: JPG, PNG, JPEG (Max 5MB)
                </p>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  onClick={handleReset}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex space-x-4">
                <Button
                  onClick={handleAnalyze}
                  variant="primary"
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? 'Analyzing...' : 'Analyze Disease'}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                >
                  Upload New
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Results Section */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Analysis Result</h2>
          
          {loading && (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Analyzing leaf image...</p>
              <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
            </div>
          )}

          {!loading && !result && preview && (
            <div className="text-center text-gray-500 h-96 flex items-center justify-center">
              <p>Click "Analyze Disease" to start detection</p>
            </div>
          )}

          {!loading && !preview && (
            <div className="text-center text-gray-500 h-96 flex items-center justify-center">
              <p>Upload a leaf image to see results</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-6">
              {/* Disease Info */}
              <div className={`p-4 rounded-lg ${
                result.severity === 'High' ? 'bg-red-50' :
                result.severity === 'Moderate' ? 'bg-yellow-50' : 'bg-green-50'
              }`}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {result.disease}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${result.severity === 'High' ? 'bg-red-200 text-red-800' :
                      result.severity === 'Moderate' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-green-200 text-green-800'}`}>
                    {result.severity}
                  </span>
                </div>
                <p className="text-lg text-primary font-semibold">
                  Confidence: {result.confidence}
                </p>
              </div>

              {/* Treatment */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Treatment Advice:</h4>
                <ul className="space-y-2">
                  {result.treatment.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Prevention Tips:</h4>
                <ul className="space-y-2">
                  {result.prevention.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-bold">Note:</span> This is an AI-based detection. For accurate diagnosis, please consult with local agricultural experts.
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