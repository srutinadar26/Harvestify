import React, { useState } from 'react';
import weatherService from '../services/weatherService';

const TestWeatherAPI = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('Mumbai');

  const testAPI = async () => {
    setLoading(true);
    const data = await weatherService.getWeatherByCity(city);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Test WeatherAPI.com</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input-field flex-1"
          placeholder="Enter Indian city name"
        />
        <button 
          onClick={testAPI}
          className="btn-primary"
          disabled={loading}
        >
          Test
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {result && (
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default TestWeatherAPI;