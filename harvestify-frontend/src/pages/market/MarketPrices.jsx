// src/pages/market/MarketPrices.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../../components/common/Card';
import marketService, { INDIAN_STATES, CROPS } from '../../services/marketService';
import { 
  FaSearch, 
  FaArrowUp, 
  FaArrowDown, 
  FaMinus,
  FaFilter,
  FaSync,
  FaMapMarkerAlt,
  FaLeaf,
  FaCalendarAlt,
  FaExclamationCircle
} from 'react-icons/fa';

const MarketPrices = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [marketData, setMarketData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [apiError, setApiError] = useState(null);
  
  // Filter states
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Stats
  const [stats, setStats] = useState({
    totalMarkets: 0,
    avgPrice: 0,
    highestPrice: 0,
    lowestPrice: 0
  });

  // Fetch data on component mount and when filters change
  useEffect(() => {
    fetchMarketData();
  }, [selectedState, selectedCrop]);

  const fetchMarketData = async () => {
    setLoading(true);
    setApiError(null);
    
    try {
      const result = await marketService.getMarketPrices({
        state: selectedState,
        crop: selectedCrop,
        limit: 100
      });
      
      if (result.success && result.prices.length > 0) {
        setMarketData(result.prices);
        applySearchFilter(result.prices, searchTerm);
        calculateStats(result.prices);
        setApiError(null);
      } else {
        setMarketData([]);
        setFilteredData([]);
        setStats({
          totalMarkets: 0,
          avgPrice: 0,
          highestPrice: 0,
          lowestPrice: 0
        });
        if (result.message) {
          setApiError(result.message);
        }
      }
    } catch (error) {
      console.error('Error fetching market data:', error);
      setApiError(t('Failed to fetch market data. Please try again later.'));
    } finally {
      setLoading(false);
    }
  };

  const applySearchFilter = (data, term) => {
    if (!term.trim()) {
      setFilteredData(data);
      return;
    }
    
    const filtered = data.filter(item => 
      item.market.toLowerCase().includes(term.toLowerCase()) ||
      item.crop.toLowerCase().includes(term.toLowerCase()) ||
      item.state.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const calculateStats = (data) => {
    if (data.length === 0) {
      setStats({
        totalMarkets: 0,
        avgPrice: 0,
        highestPrice: 0,
        lowestPrice: 0
      });
      return;
    }

    const prices = data.map(item => item.avgPrice);
    const total = prices.reduce((acc, price) => acc + price, 0);
    
    setStats({
      totalMarkets: data.length,
      avgPrice: Math.round(total / data.length),
      highestPrice: Math.max(...prices),
      lowestPrice: Math.min(...prices)
    });
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    applySearchFilter(marketData, term);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleCropChange = (e) => {
    setSelectedCrop(e.target.value);
  };

  const handleRefresh = () => {
    fetchMarketData();
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up':
        return <FaArrowUp className="text-green-500" />;
      case 'down':
        return <FaArrowDown className="text-red-500" />;
      default:
        return <FaMinus className="text-gray-500" />;
    }
  };

  const getTrendClass = (trend) => {
    switch(trend) {
      case 'up':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'down':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
    }
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {t('Market Prices')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {t('Real-time mandi prices across India')}
          </p>
        </div>
        
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          disabled={loading}
        >
          <FaSync className={loading ? 'animate-spin' : ''} />
          {t('Refresh')}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{t('Total Markets')}</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalMarkets}</p>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{t('Average Price')}</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatPrice(stats.avgPrice)}</p>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{t('Highest Price')}</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{formatPrice(stats.highestPrice)}</p>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{t('Lowest Price')}</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{formatPrice(stats.lowestPrice)}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FaFilter className="text-primary" />
            {t('Filters')}
          </h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-primary hover:text-green-700 md:hidden"
          >
            {showFilters ? t('Hide') : t('Show')}
          </button>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${!showFilters && 'hidden md:grid'}`}>
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('Search market or crop...')}
              value={searchTerm}
              onChange={handleSearch}
              className="input-field pl-10 w-full dark:bg-dark-bg dark:text-white"
            />
          </div>

          {/* State Filter */}
          <select
            value={selectedState}
            onChange={handleStateChange}
            className="input-field dark:bg-dark-bg dark:text-white"
          >
            {marketService.getStates().map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          {/* Crop Filter */}
          <select
            value={selectedCrop}
            onChange={handleCropChange}
            className="input-field dark:bg-dark-bg dark:text-white"
          >
            {marketService.getCrops().map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>

          {/* Results count */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center p-2">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('Showing')} <span className="font-bold text-primary">{filteredData.length}</span> {t('results')}
            </p>
          </div>
        </div>
      </Card>

      {/* API Error Message */}
      {apiError && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-start gap-3">
          <FaExclamationCircle className="text-yellow-600 dark:text-yellow-400 text-xl flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-800 dark:text-yellow-200 font-medium">{apiError}</p>
            <p className="text-sm text-yellow-600 dark:text-yellow-300 mt-1">
              {t('Showing mock data for demonstration. The API will work once data is available.')}
            </p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Market Table */}
      {!loading && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    {t('Crop')}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    {t('State')}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    {t('Market')}
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">
                    {t('Min Price')}
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">
                    {t('Max Price')}
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">
                    {t('Avg Price')}
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">
                    {t('Trend')}
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">
                    {t('Updated')}
                  </th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FaLeaf className="text-primary" />
                          <span className="font-medium">{item.crop}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-gray-400" />
                          {item.state}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">{item.market}</td>
                      <td className="px-6 py-4 text-right">{formatPrice(item.minPrice)}</td>
                      <td className="px-6 py-4 text-right">{formatPrice(item.maxPrice)}</td>
                      <td className="px-6 py-4 text-right font-semibold">{formatPrice(item.avgPrice)}</td>
                      <td className="px-6 py-4 text-center">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getTrendClass(item.trend)}`}>
                          {getTrendIcon(item.trend)}
                          <span>{item.change}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
                          <FaCalendarAlt className="text-xs" />
                          {formatDate(item.updatedAt)}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      <p className="text-lg">{t('No market data available')}</p>
                      <p className="text-sm mt-2">{t('Try selecting different filters')}</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Market Info */}
      <Card className="bg-blue-50 dark:bg-blue-900/20">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <span className="text-2xl">📢</span>
          {t('Market Information')}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t('Prices are in ₹ per quintal. Data sourced from data.gov.in (Ministry of Agriculture & Farmers Welfare). Updated daily from regulated markets across India.')}
        </p>
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <span>🔑 Data Source: Government of India (data.gov.in)</span>
          <span>•</span>
          <span>{t('Last updated')}: {new Date().toLocaleDateString('en-IN', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</span>
        </div>
      </Card>
    </div>
  );
};

export default MarketPrices;