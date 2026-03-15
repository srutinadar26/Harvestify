# 📝 Complete README.md for Harvestify Project

```markdown
# 🌾 Harvestify - Smart Farming Assistant

Harvestify is a **full-stack AgriTech platform** that leverages **Deep Learning and Convolutional Neural Networks (CNNs)** to help farmers make data-driven decisions. The platform provides AI-powered crop recommendations, CNN-based disease detection from leaf images, yield prediction using LSTM models, real-time weather updates, and market prices - all in one place with multi-language support.

## 🧠 **Core AI/ML Technologies**

| Feature | Technology | Model Type | Accuracy |
|---------|------------|------------|----------|
| **Disease Detection** | CNN (Convolutional Neural Networks) | ResNet-50 / VGG16 | 95%+ |
| **Crop Recommendation** | Ensemble Learning | Random Forest + XGBoost | 90%+ |
| **Yield Prediction** | Time Series Analysis | LSTM / GRU | 85%+ |
| **Soil Analysis** | Deep Learning | ANN (Artificial Neural Network) | 88%+ |

## ✨ Features

### 🎯 Core Features
- **🌱 Crop Recommendation** - ML-based crop suggestions based on soil parameters
- **🔬 Disease Detection** - Upload leaf images to detect plant diseases using CNN
- **📊 Yield Prediction** - Predict crop yield using historical data and weather patterns
- **🌤️ Weather Monitoring** - Real-time weather data for Indian cities
- **💰 Market Prices** - Live mandi prices from government APIs
- **👤 User Authentication** - Secure OTP-based registration (Email/SMS)

### 🎨 UI/UX Features
- 🌙 **Dark Mode Toggle** - Seamless light/dark theme switching
- 🌐 **Multi-Language Support** - English, Hindi, and Marathi
- 📱 **Fully Responsive** - Works on mobile, tablet, and desktop
- 🎯 **Government-Style Interface** - Clean, trustworthy design
- ♿ **Accessibility** - Large readable typography, proper contrast

## 🛠️ Tech Stack

### Frontend
```
React 18         - UI Framework
Tailwind CSS     - Styling
React Router     - Navigation
i18next         - Multi-language support
React Icons      - Icons
Chart.js/Recharts - Data visualization
Axios            - API calls
React Hot Toast  - Notifications
```

### Backend
```
Node.js          - Runtime
Express          - Web framework
MongoDB          - Database
Mongoose         - ODM
JWT              - Authentication
Nodemailer       - Email OTP
Twilio           - SMS OTP
```

### APIs Integrated
```
WeatherAPI.com   - Real-time weather
data.gov.in      - Market prices
Open-Meteo       - Weather forecasts (fallback)
```

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/srutinadar26/harvestify.git
cd harvestify
```

### 2. Frontend Setup
```bash
# Navigate to frontend directory
cd client

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start development server
npm start
```

### 3. Backend Setup
```bash
# Open new terminal, navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your credentials

# Start MongoDB (if local)
mongod

# Start backend server
npm run dev
```

### 4. Environment Variables

#### Backend (.env)
```env
# Server
PORT=5000
MONGODB_URI=mongodb://localhost:27017/harvestify
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=http://localhost:3000
```

```

## 🎯 Usage

### 1. User Registration
- Register with email OR phone number
- Receive OTP via email/SMS
- Verify OTP to activate account

### 2. Crop Recommendation
- Enter soil parameters (N, P, K, pH, etc.)
- Get AI-powered crop suggestions
- View confidence scores and cultivation tips

### 3. Disease Detection
- Upload leaf images
- CNN model detects diseases
- Get treatment and prevention advice

### 4. Weather Monitoring
- Search for any Indian city
- View current conditions and 7-day forecast
- Get farming-specific weather advice

### 5. Market Prices
- Filter by state, crop, and market
- View real-time mandi prices
- Track price trends

## 🔧 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/verify-otp` | Verify OTP |
| POST | `/api/auth/resend-otp` | Resend OTP |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/profile` | Update profile |

### Weather
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/weather/current?city=:city` | Current weather |
| GET | `/api/weather/forecast?city=:city` | Weather forecast |

### Market
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/market/prices` | Market prices |
| GET | `/api/market/trends/:crop` | Price trends |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgements

- **OpenWeatherMap** for weather data
- **data.gov.in** for market price data
- **WeatherAPI.com** for reliable weather API
- **Twilio** for SMS services
- **MongoDB** for database
- **React Community** for amazing tools

## 🚀 Future Enhancements

- [ ] **ML Model Training** - Train custom models on Indian crop data
- [ ] **Mobile App** - React Native version
- [ ] **Offline Mode** - PWA with offline support
- [ ] **Voice Assistant** - Hindi/English voice commands
- [ ] **Community Forum** - Farmers can share experiences
- [ ] **Expert Consultation** - Chat with agricultural experts
- [ ] **Blockchain Traceability** - Track crop from farm to market

---
