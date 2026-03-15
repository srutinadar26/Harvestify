import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaLeaf, FaPhone, FaCalendarAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import Card from '../../components/common/Card';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { t } = useTranslation();
  const { user: contextUser, updateUser } = useAuth();
  const [user, setUser] = useState(contextUser);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: '',
    farmType: '',
    farmSize: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        state: user.state || '',
        farmType: user.farmType || '',
        farmSize: user.farmSize || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await api.put('/auth/profile', formData);
      
      if (response.data.success) {
        setUser(response.data.user);
        updateUser(response.data.user);
        setIsEditing(false);
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      month: 'long',
      year: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        {t('My Profile')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <FaUser className="text-white text-5xl" />
            </div>
            <h2 className="text-2xl font-bold mb-2 dark:text-white">{user.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center justify-center gap-1">
              <FaCalendarAlt className="text-sm" />
              {t('Member since')} {formatDate(user.createdAt)}
            </p>
            
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-400" />
                <span className="dark:text-gray-200">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center space-x-2">
                  <FaPhone className="text-gray-400" />
                  <span className="dark:text-gray-200">{user.phone}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-gray-400" />
                <span className="dark:text-gray-200">{user.state || 'Not specified'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaLeaf className="text-gray-400" />
                <span className="dark:text-gray-200 capitalize">{user.farmType?.replace('_', ' ') || 'Not specified'}</span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
            >
              <FaEdit />
              {isEditing ? t('Cancel') : t('Edit Profile')}
            </button>
          </div>
        </Card>

        {/* Edit Form or Stats */}
        <div className="lg:col-span-2 space-y-6">
          {isEditing ? (
            <Card>
              <h3 className="text-xl font-semibold mb-4 dark:text-white">{t('Edit Profile')}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                    {t('Full Name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field w-full dark:bg-dark-bg dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                    {t('Phone Number')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field w-full dark:bg-dark-bg dark:text-white"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                    {t('State')}
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="input-field w-full dark:bg-dark-bg dark:text-white"
                  >
                    <option value="">Select state</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                    {t('Farm Type')}
                  </label>
                  <select
                    name="farmType"
                    value={formData.farmType}
                    onChange={handleInputChange}
                    className="input-field w-full dark:bg-dark-bg dark:text-white"
                  >
                    <option value="">Select farm type</option>
                    <option value="subsistence">Subsistence Farming</option>
                    <option value="commercial">Commercial Farming</option>
                    <option value="organic">Organic Farming</option>
                    <option value="mixed">Mixed Farming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                    {t('Farm Size (acres)')}
                  </label>
                  <input
                    type="number"
                    name="farmSize"
                    value={formData.farmSize}
                    onChange={handleInputChange}
                    className="input-field w-full dark:bg-dark-bg dark:text-white"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 btn-primary py-2 flex items-center justify-center gap-2"
                  >
                    <FaSave />
                    {loading ? 'Saving...' : t('Save Changes')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    <FaTimes />
                  </button>
                </div>
              </form>
            </Card>
          ) : (
            <>
              <Card>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">{t('Farming Statistics')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-primary">0</p>
                    <p className="text-gray-600 dark:text-gray-300">{t('Total Predictions')}</p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-accent">-</p>
                    <p className="text-gray-600 dark:text-gray-300">{t('Favorite Crop')}</p>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">{t('Account Information')}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">{t('Email Verification')}</span>
                    <span className="text-green-600 font-semibold">
                      {user.isEmailVerified ? '✅ Verified' : '❌ Not Verified'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">{t('Account Type')}</span>
                    <span className="capitalize">{user.role || 'Farmer'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">{t('Last Login')}</span>
                    <span>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'First login'}</span>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;