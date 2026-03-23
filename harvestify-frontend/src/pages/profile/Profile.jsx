import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaLeaf, FaPhone, FaCalendarAlt, FaEdit, FaSave, FaTimes, FaCheck } from 'react-icons/fa';
import Card from '../../components/common/Card';
import { useAuth } from '../../context/FirebaseAuthContext'; // ← Changed this
import toast from 'react-hot-toast';

const Profile = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth(); // ← Changed from user to currentUser
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        displayName: currentUser.displayName || '',
        phoneNumber: currentUser.phoneNumber || ''
      });
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Note: Firebase requires re-authentication for email changes
    // For now, we'll just show a message
    toast.info('Profile update coming soon with Firebase');
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      month: 'long',
      year: 'numeric'
    });
  };

  if (!currentUser) {
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
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt={currentUser.displayName} className="w-full h-full rounded-full object-cover" />
              ) : (
                <FaUser className="text-white text-5xl" />
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2 dark:text-white">
              {currentUser.displayName || 'Farmer'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center justify-center gap-1">
              <FaCalendarAlt className="text-sm" />
              {t('Member since')} {formatDate(currentUser.metadata?.creationTime)}
            </p>
            
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-400" />
                <span className="dark:text-gray-200">{currentUser.email}</span>
                {currentUser.emailVerified ? (
                  <FaCheck className="text-green-500 text-xs" />
                ) : (
                  <span className="text-xs text-yellow-500"></span>
                )}
              </div>
              
              {currentUser.phoneNumber && (
                <div className="flex items-center space-x-2">
                  <FaPhone className="text-gray-400" />
                  <span className="dark:text-gray-200">{currentUser.phoneNumber}</span>
                </div>
              )}
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
                    {t('Display Name')}
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    className="input-field w-full dark:bg-dark-bg dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                    {t('Phone Number')}
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="input-field w-full dark:bg-dark-bg dark:text-white"
                    placeholder="+91XXXXXXXXXX"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 btn-primary py-2 flex items-center justify-center gap-2"
                  >
                    <FaSave />
                    {t('Save Changes')}
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
                <h3 className="text-xl font-semibold mb-4 dark:text-white">{t('Account Information')}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">{t('Email')}</span>
                    <span className="font-medium">{currentUser.email}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">{t('Email Verification')}</span>
                    <span className={currentUser.emailVerified ? 'text-green-600' : 'text-yellow-600'}>
                      {currentUser.emailVerified ? '✅ Verified' : '❌ Not Verified'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">{t('User ID')}</span>
                    <span className="text-sm font-mono">{currentUser.uid.substring(0, 8)}...</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">{t('Last Login')}</span>
                    <span>{currentUser.metadata?.lastSignInTime ? new Date(currentUser.metadata.lastSignInTime).toLocaleString() : 'N/A'}</span>
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