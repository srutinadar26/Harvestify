import { useState } from 'react';
import cropService from '../services/cropService';

const useCrop = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const predictCrop = async (soilData) => {
    setLoading(true);
    setError(null);
    
    const result = await cropService.predictCrop(soilData);
    
    if (result.success) {
      setPrediction(result.prediction);
    } else {
      setError(result.message);
    }
    
    setLoading(false);
    return result;
  };

  const loadHistory = async () => {
    setLoading(true);
    setError(null);
    
    const result = await cropService.getPredictionHistory();
    
    if (result.success) {
      setHistory(result.history);
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const savePrediction = async (predictionData) => {
    setLoading(true);
    setError(null);
    
    const result = await cropService.savePrediction(predictionData);
    
    if (result.success) {
      await loadHistory(); // Refresh history
    } else {
      setError(result.message);
    }
    
    setLoading(false);
    return result;
  };

  return {
    prediction,
    history,
    loading,
    error,
    predictCrop,
    loadHistory,
    savePrediction
  };
};

export default useCrop;