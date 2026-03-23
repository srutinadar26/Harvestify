import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/FirebaseAuthContext';
import LanguageWrapper from './components/common/LanguageWrapper';
import ProtectedRoute from './components/ProtectedRoute';
import './i18n';
import TestAPI from './pages/TestAPI';
// Pages
import Landing from './pages/Landing/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VerifyEmail from './pages/auth/VerifyEmail';
import PhoneOTP from './pages/auth/PhoneOTP';
import Dashboard from './pages/dashboard/Dashboard';
import DashboardHome from './pages/dashboard/DashboardHome';
import DashboardChatbot from './pages/dashboard/DashboardChatbot'; // ← ADD THIS
import CropRecommendation from './pages/crop-recommendation/CropRecommendation';
import DiseaseDetection from './pages/disease-detection/DiseaseDetection';
import YieldPrediction from './pages/yield-prediction/YieldPrediction';
import Weather from './pages/weather/Weather';
import MarketPrices from './pages/market/MarketPrices';
import Profile from './pages/profile/Profile';
import NotFound from './pages/NotFound/NotFound';
import Features from './pages/Features/Features';
import About from './pages/About/About';
import TestFirebase from './pages/TestFirebase';
// Remove ChatbotPage import if you have it (or keep it for standalone)

function AppContent() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = 'ltr';
  }, [i18n.language]);

  return (
    <div className="App flex flex-col min-h-screen bg-background dark:bg-dark-bg text-gray-900 dark:text-gray-100">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#2E7D32',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/phone-otp" element={<PhoneOTP />} />
        <Route path="/test-firebase" element={<TestFirebase />} />
        <Route path="/test-api" element={<TestAPI />} />

        {/* Dashboard Routes - Protected */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardHome />} />
          <Route path="crop-recommendation" element={<CropRecommendation />} />
          <Route path="disease-detection" element={<DiseaseDetection />} />
          <Route path="yield-prediction" element={<YieldPrediction />} />
          <Route path="weather" element={<Weather />} />
          <Route path="market-prices" element={<MarketPrices />} />
          <Route path="profile" element={<Profile />} />
          <Route path="chatbot" element={<DashboardChatbot />} />  {/* ← THIS IS CORRECT */}
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <LanguageWrapper>
            <AppContent />
          </LanguageWrapper>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;