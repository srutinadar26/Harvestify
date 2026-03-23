import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/FirebaseAuthContext';
import { getUserPredictions, deletePrediction } from '../../services/historyService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { FaHistory, FaTrash, FaSeedling, FaBug, FaChartLine, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const PredictionHistory = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'crop', 'disease', 'yield'

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    const result = await getUserPredictions(currentUser.uid, 100);
    if (result.success) {
      setPredictions(result.predictions);
    } else {
      toast.error('Failed to load history');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('Are you sure you want to delete this prediction?'))) {
      const result = await deletePrediction(id);
      if (result.success) {
        toast.success('Prediction deleted');
        loadHistory();
      } else {
        toast.error('Failed to delete');
      }
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'crop': return <FaSeedling className="text-green-600" />;
      case 'disease': return <FaBug className="text-red-600" />;
      case 'yield': return <FaChartLine className="text-blue-600" />;
      default: return <FaInfoCircle />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'crop': return 'bg-green-100 text-green-800';
      case 'disease': return 'bg-red-100 text-red-800';
      case 'yield': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPredictions = filter === 'all' 
    ? predictions 
    : predictions.filter(p => p.type === filter);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderPredictionDetails = (prediction) => {
    switch(prediction.type) {
      case 'crop':
        return (
          <div>
            <p className="font-semibold text-lg">{prediction.result.crop}</p>
            <p className="text-sm text-gray-600">Confidence: {prediction.confidence}%</p>
          </div>
        );
      case 'disease':
        return (
          <div>
            <p className="font-semibold text-lg">{prediction.result.disease}</p>
            <p className="text-sm text-gray-600">Crop: {prediction.result.crop} | Confidence: {prediction.confidence}%</p>
          </div>
        );
      case 'yield':
        return (
          <div>
            <p className="font-semibold text-lg">{prediction.result.yield} {prediction.result.unit}</p>
            <p className="text-sm text-gray-600">Year: {prediction.input.year}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          <FaHistory className="inline mr-2 text-primary" />
          {t('Prediction History')}
        </h1>
        <Button onClick={loadHistory} variant="outline">
          Refresh
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
        {['all', 'crop', 'disease', 'yield'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg capitalize transition ${
              filter === type
                ? 'bg-primary text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {type === 'all' ? 'All' : type}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}

      {!loading && filteredPredictions.length === 0 && (
        <Card className="text-center py-12">
          <FaHistory className="text-5xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No predictions saved yet</p>
          <p className="text-sm text-gray-400 mt-2">Make predictions to see them here</p>
        </Card>
      )}

      <div className="space-y-4">
        {filteredPredictions.map((pred) => (
          <Card key={pred.id} className="hover:shadow-lg transition">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getTypeColor(pred.type)}`}>
                  {getTypeIcon(pred.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${getTypeColor(pred.type)}`}>
                      {pred.type}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <FaCalendarAlt size={10} />
                      {formatDate(pred.createdAt)}
                    </span>
                  </div>
                  {renderPredictionDetails(pred)}
                  {pred.input && (
                    <div className="mt-2 text-xs text-gray-500">
                      <details>
                        <summary className="cursor-pointer">Input Details</summary>
                        <pre className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs overflow-auto">
                          {JSON.stringify(pred.input, null, 2)}
                        </pre>
                      </details>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleDelete(pred.id)}
                className="text-gray-400 hover:text-red-500 transition"
                title="Delete"
              >
                <FaTrash size={16} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PredictionHistory;