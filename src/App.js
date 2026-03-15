import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import LanguageWrapper from './components/common/LanguageWrapper';
import './i18n';

// Pages
import Landing from './pages/Landing/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import DashboardHome from './pages/dashboard/DashboardHome';
import CropRecommendation from './pages/crop-recommendation/CropRecommendation';
import DiseaseDetection from './pages/disease-detection/DiseaseDetection';
import YieldPrediction from './pages/yield-prediction/YieldPrediction';
import Weather from './pages/weather/Weather';
import MarketPrices from './pages/market/MarketPrices';
import Profile from './pages/profile/Profile';
import Features from './pages/Features/Features';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <LanguageWrapper>
            <div className="App min-h-screen bg-background dark:bg-dark-bg text-gray-900 dark:text-gray-100">
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

                {/* Dashboard Routes - Nested Structure */}
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="crop-recommendation" element={<CropRecommendation />} />
                  <Route path="disease-detection" element={<DiseaseDetection />} />
                  <Route path="yield-prediction" element={<YieldPrediction />} />
                  <Route path="weather" element={<Weather />} />
                  <Route path="market-prices" element={<MarketPrices />} />
                  <Route path="profile" element={<Profile />} />
                </Route>

                {/* 404 Route - This must be LAST */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </LanguageWrapper>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;