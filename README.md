# 🌾 Harvestify

### *Your Intelligent Digital Farm Assistant*

<p align="center">
  <b>AI-Powered • Real-Time Intelligence • Farmer-Centric</b><br><br>
  <img src="https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/AI-Enabled-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Contributions-Welcome-blue?style=for-the-badge" />
</p>

---

## 🚀 Overview

**Harvestify** is a full-stack AgriTech platform designed to empower farmers with **real-time data, predictive intelligence, and accessible digital tools**.

It bridges the gap between **raw agricultural data and actionable decision-making** by combining weather analytics, live mandi prices, government resources, and AI-driven insights into one seamless ecosystem.

From **knowing what to grow** to **predicting how much you’ll harvest**, Harvestify transforms uncertainty into clarity.

---

## ✨ Key Features

### 🌤️ Real-Time Weather Intelligence

* Live weather updates (temperature, humidity, conditions)
* Air Quality Index (AQI) monitoring
* Multi-day forecasts
* Location-aware detection
* Smart alerts for sudden changes

---

### 📊 Live Mandi Market Prices

* Real-time crop prices from government datasets
* Price trend indicators (rise, fall, stable)
* Filters by crop, state, and location
* Statistical insights (average, highest, lowest)

---

### 🌱 Intelligent Crop Recommendation

* Suggests optimal crops based on environmental conditions
* Powered by ML models using multiple agricultural factors
* Provides reasoning and confidence levels
* Enables data-driven farming decisions

---

### 📈 Crop Yield Prediction

* Predicts future yield using historical and environmental data
* Powered by LSTM (Long Short-Term Memory) neural networks
* Identifies seasonal patterns and trends
* Helps farmers plan production and maximize profitability

---

### 🔬 Crop Disease Detection

* Image-based disease detection using deep learning (CNN)
* Identifies plant diseases from leaf images
* Provides treatment suggestions and preventive measures

---

### 🏛️ Government Schemes & Resources

* Access to major Indian agricultural schemes
* Direct links to official portals
* Simplified, farmer-friendly information cards
* Awareness of subsidies and benefits

---

### 🌐 Multi-Language Support

* English
* Hindi (हिंदी)
* Marathi (मराठी)
* Seamless switching for accessibility

---

### 🤖 Chatbot & Voice Assistant

* Interactive chatbot for instant guidance
* Voice-enabled interaction for ease of use
* Works offline for general queries
* Provides real-time responses when connected
* Designed for low-tech accessibility

---

### 🎨 Modern User Experience

* Clean, intuitive interface
* Fully responsive (mobile, tablet, desktop)
* Dark & light mode support
* Smooth animations and transitions
* Real-time feedback and alerts

---

## 🧠 System Architecture

``` 
User
 │
 ▼
React Frontend (UI Layer)
 │
 ├── Firebase Authentication (Login / Signup)
 │
 ▼
Backend Server (Node.js + Express)
 │
 ├── External APIs
 │     ├── WeatherAPI (Weather Data)
 │     └── data.gov.in (Mandi Prices)
 │
 ├── AI/ML Models
 │     ├── Crop Recommendation (Random Forest / XGBoost)
 │     ├── Yield Prediction (LSTM)
 │     └── Disease Detection (CNN)
 │
 ├── Chatbot Engine
 │     ├── Offline Responses (Static Knowledge Base)
 │     └── Online Responses (Real-Time Data)
 │
 ▼
Database (MongoDB)
 │
 ▼
Processed Insights & Predictions
 │
 ▼
Frontend Dashboard (Visualization & User Interaction)

```

---

## 🛠️ Tech Stack

### Frontend

* React
* Tailwind CSS
* React Router
* Context API
* Framer Motion
* Recharts
* i18next

---

### Backend

* Node.js
* Express.js
* Firebase Authentication (secure login & signup)

---

### APIs & Services

* WeatherAPI (real-time weather data)
* data.gov.in (mandi market prices)

---

### AI / Machine Learning

* Random Forest / XGBoost — crop recommendation
* LSTM (Long Short-Term Memory) — yield prediction
* Convolutional Neural Networks (CNN) — disease detection

---

### Database

* MongoDB

---

## ⚡ Getting Started

```bash
git clone https://github.com/srutinadar26/Harvestify.git
cd Harvestify
npm install
npm start
```

---

## 🌍 Vision

To build a scalable digital agriculture ecosystem where **every farmer has access to intelligence, not just information**.

Harvestify aims to transform farming into a **data-driven, predictable, and profitable practice** — especially for those in low-connectivity and resource-constrained environments.

---

## 🔮 Future Scope

* IoT-based soil monitoring integration
* Satellite imagery for crop analysis
* Advanced AI advisory system
* Hyper-local language expansion
* Mobile app deployment

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repository, open issues, or submit pull requests to improve Harvestify.

---

## 💬 Final Note

> *“When farmers grow smarter, the nation grows stronger.”* 🌾🇮🇳

---
