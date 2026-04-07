import React, { useState } from 'react';
import axios from 'axios';

const API_URL =
  process.env.REACT_APP_ML_API_URL ||
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8000'
    : window.location.origin);

const TestAPI = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testCropAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/predict/crop`, {
        nitrogen: 90,
        phosphorus: 42,
        potassium: 43,
        temperature: 25.5,
        humidity: 82,
        ph: 6.5,
        rainfall: 202
      });
      setResult(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testYieldAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/predict/yield`, {
        year: 2023,
        rainfall: 850,
        pesticides: 120,
        temperature: 28.5
      });
      setResult(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test ML API Connection</h1>
      
      <div className="space-y-4">
        <button
          onClick={testCropAPI}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded mr-2"
        >
          Test Crop API
        </button>
        
        <button
          onClick={testYieldAPI}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Test Yield API
        </button>
      </div>
      
      {loading && <p className="mt-4">Loading...</p>}
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      
      {result && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestAPI;