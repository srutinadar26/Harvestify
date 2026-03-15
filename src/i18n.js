import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // ========== NAVIGATION ==========
      "Home": "Home",
      "Features": "Features",
      "Dashboard": "Dashboard",
      "About": "About",
      "Login": "Login",
      "Register": "Register",
      "Logout": "Logout",
      "Profile": "Profile",
      
      // ========== HERO SECTION ==========
      "Harvestify": "Harvestify",
      "Smart Farming Assistance for Better Crop Decisions": "Smart Farming Assistance for Better Crop Decisions",
      "Helping farmers predict crops, detect diseases, and improve yield using data-driven insights.": "Helping farmers predict crops, detect diseases, and improve yield using data-driven insights.",
      "Get Started": "Get Started",
      "Explore Dashboard": "Explore Dashboard",
      "Happy Farmers": "Happy Farmers",
      "Crops Analyzed": "Crops Analyzed",
      "Accuracy Rate": "Accuracy Rate",
      
      // ========== FEATURES SECTION ==========
      "Our Features": "Our Features",
      "Everything you need to make informed farming decisions": "Everything you need to make informed farming decisions",
      "Crop Recommendation": "Crop Recommendation",
      "Disease Detection": "Disease Detection",
      "Yield Prediction": "Yield Prediction",
      "Weather Monitoring": "Weather Monitoring",
      "Soil Health Insights": "Soil Health Insights",
      "Market Prices": "Market Prices",
      "Multi-Language Support": "Multi-Language Support",
      "Mobile Friendly": "Mobile Friendly",
      
      // ========== GOVERNMENT SCHEMES ==========
      "PM-KISAN Samman Nidhi": "PM-KISAN Samman Nidhi",
      "Income support of ₹6000 per year to farmer families": "Income support of ₹6000 per year to farmer families",
      "Ongoing": "Ongoing",
      "Soil Health Card Scheme": "Soil Health Card Scheme",
      "Free soil testing and recommendations": "Free soil testing and recommendations",
      "Apply Now": "Apply Now",
      "Pradhan Mantri Fasal Bima Yojana": "Pradhan Mantri Fasal Bima Yojana",
      "Crop insurance scheme for farmers": "Crop insurance scheme for farmers",
      "Seasonal": "Seasonal",
      
      // ========== WEATHER ALERTS ==========
      "Heavy Rainfall Alert": "Heavy Rainfall Alert",
      "Pest Advisory": "Pest Advisory",
      "Temperature Warning": "Temperature Warning",
      "High": "High",
      "Medium": "Medium",
      "Low": "Low",
      
      // ========== LOCATIONS ==========
      "Punjab, Haryana": "Punjab, Haryana",
      "Maharashtra": "Maharashtra",
      "Rajasthan": "Rajasthan",
      
      // ========== GOVERNMENT INFO SECTION ==========
      "Government Information": "Government Information",
      "Latest schemes, alerts, and advisories for farmers": "Latest schemes, alerts, and advisories for farmers",
      "Latest Farming Schemes": "Latest Farming Schemes",
      "Weather & Crop Alerts": "Weather & Crop Alerts",
      "Location": "Location",
      "Read more": "Read more",
      
      // ========== AUTH PAGES ==========
      "Welcome Back": "Welcome Back",
      "Login to your Harvestify account": "Login to your Harvestify account",
      "Create Account": "Create Account",
      "Join Harvestify for smart farming solutions": "Join Harvestify for smart farming solutions",
      "Email Address": "Email Address",
      "Enter your email": "Enter your email",
      "Password": "Password",
      "Enter your password": "Enter your password",
      "Confirm Password": "Confirm Password",
      "Confirm your password": "Confirm your password",
      "Full Name": "Full Name",
      "Enter your full name": "Enter your full name",
      "State": "State",
      "Select your state": "Select your state",
      "Farm Type": "Farm Type",
      "Select farm type": "Select farm type",
      "Remember me": "Remember me",
      "Forgot Password?": "Forgot Password?",
      "Don't have an account?": "Don't have an account?",
      "Register here": "Register here",
      "Already have an account?": "Already have an account?",
      "Login here": "Login here",
      "Please fill all fields": "Please fill all fields",
      "Login successful!": "Login successful!",
      "Registration successful!": "Registration successful!",
      "Passwords do not match": "Passwords do not match",
      "Password must be at least 6 characters": "Password must be at least 6 characters",
      "Farmer Support": "Farmer Support",
      "Subsistence Farming": "Subsistence Farming",
      "Commercial Farming": "Commercial Farming",
      "Organic Farming": "Organic Farming",
      "Mixed Farming": "Mixed Farming",
      "I agree to the": "I agree to the",
      "Terms and Conditions": "Terms and Conditions",
      "and": "and",
      "Privacy Policy": "Privacy Policy",
      
      // ========== DASHBOARD ==========
      "Welcome back, Farmer!": "Welcome back, Farmer!",
      "Here's your farming dashboard": "Here's your farming dashboard",
      "Today's Weather": "Today's Weather",
      "Recommended Crop": "Recommended Crop",
      "Soil Moisture": "Soil Moisture",
      "Recent Predictions": "Recent Predictions",
      "Quick Actions": "Quick Actions",
      "New Crop Prediction": "New Crop Prediction",
      "Upload for Disease Check": "Upload for Disease Check",
      "Check Weather Forecast": "Check Weather Forecast",
      "View Market Prices": "View Market Prices",
      "Recent Activities": "Recent Activities",
      
      // ========== CROP RECOMMENDATION ==========
      "Enter Soil & Climate Details": "Enter Soil & Climate Details",
      "Recommendation Result": "Recommendation Result",
      "Predict Best Crop": "Predict Best Crop",
      "Confidence": "Confidence",
      "Suggested Fertilizer": "Suggested Fertilizer",
      "Cultivation Tips": "Cultivation Tips",
      "Nitrogen (N)": "Nitrogen (N)",
      "Phosphorus (P)": "Phosphorus (P)",
      "Potassium (K)": "Potassium (K)",
      "Temperature": "Temperature",
      "Humidity": "Humidity",
      "pH Level": "pH Level",
      "Rainfall": "Rainfall",
      
      // ========== DISEASE DETECTION ==========
      "Upload Leaf Image": "Upload Leaf Image",
      "Analysis Result": "Analysis Result",
      "Analyze Disease": "Analyze Disease",
      "Treatment Advice": "Treatment Advice",
      "Prevention Tips": "Prevention Tips",
      "Upload New": "Upload New",
      "Click to upload or drag and drop": "Click to upload or drag and drop",
      "Supported formats": "Supported formats",
      
      // ========== WEATHER ==========
      "Weather Information": "Weather Information",
      "Current Weather": "Current Weather",
      "Weather Details": "Weather Details",
      "7-Day Forecast": "7-Day Forecast",
      "Farming Advice for Today": "Farming Advice for Today",
      
      // ========== MARKET PRICES ==========
      "Search crop or market...": "Search crop or market...",
      "Min Price": "Min Price",
      "Max Price": "Max Price",
      "Avg Price": "Avg Price",
      "Trend": "Trend",
      "showing results": "showing results",
      
      // ========== PROFILE ==========
      "My Profile": "My Profile",
      "Edit Profile": "Edit Profile",
      "Farming Statistics": "Farming Statistics",
      "Total Predictions": "Total Predictions",
      "Favorite Crop": "Favorite Crop",
      "Recent Activity": "Recent Activity",
      "Member since": "Member since",
      
      // ========== FOOTER ==========
      "Quick Links": "Quick Links",
      "Contact Us": "Contact Us",
      "All rights reserved": "All rights reserved",
      "Made for Smart Agriculture": "Made for Smart Agriculture",
      "Terms of Service": "Terms of Service",
      "Disclaimer": "Disclaimer",
      "Help Center": "Help Center",
      "FAQs": "FAQs",
      "Government Schemes": "Government Schemes",
      "Contact Support": "Contact Support",
      "Toll Free: 1800-180-1551": "Toll Free: 1800-180-1551",
      "Email: support@harvestify.gov.in": "Email: support@harvestify.gov.in",
      "Hours: Mon-Sat 9:00 AM - 6:00 PM": "Hours: Mon-Sat 9:00 AM - 6:00 PM",
      
      // ========== MARATHI/HINDI SPECIFIC KEYS (for footer) ==========
      "शेतकरी समर्थन": "Farmer Support",
      "आमच्याशी संपर्क साधा": "Contact Us",
      
      // ========== LANGUAGE SWITCHER ==========
      "Select Language": "Select Language",
      "English": "English",
      "Hindi": "हिंदी",
      "Marathi": "मराठी",
      
      // ========== 404 PAGE ==========
      "Page Not Found": "Page Not Found",
      "Oops! The page you're looking for doesn't exist.": "Oops! The page you're looking for doesn't exist.",
      "Back to Home": "Back to Home",
      
      // ========== ABOUT PAGE ==========
      "About Harvestify": "About Harvestify",
      "Empowering farmers with technology for a better tomorrow": "Empowering farmers with technology for a better tomorrow",
      "Our Mission": "Our Mission",
      "Our Vision": "Our Vision",
      "Our Team": "Our Team",
      "Dedicated Team": "Dedicated Team",
      
      // ========== COMMON ==========
      "Submit": "Submit",
      "Cancel": "Cancel",
      "Save": "Save",
      "Delete": "Delete",
      "Edit": "Edit",
      "Loading...": "Loading...",
      "Error": "Error",
      "Success": "Success",
      "Warning": "Warning",
      "Info": "Info"
    }
  },
  hi: {
    translation: {
      // ========== NAVIGATION ==========
      "Home": "होम",
      "Features": "विशेषताएँ",
      "Dashboard": "डैशबोर्ड",
      "About": "हमारे बारे में",
      "Login": "लॉग इन",
      "Register": "पंजीकरण",
      "Logout": "लॉग आउट",
      "Profile": "प्रोफाइल",
      
      // ========== HERO SECTION ==========
      "Harvestify": "हार्वेस्टिफाई",
      "Smart Farming Assistance for Better Crop Decisions": "बेहतर फसल निर्णयों के लिए स्मार्ट कृषि सहायता",
      "Helping farmers predict crops, detect diseases, and improve yield using data-driven insights.": "डेटा-संचालित अंतर्दृष्टि का उपयोग करके किसानों को फसलों की भविष्यवाणी, बीमारियों का पता लगाने और उपज में सुधार करने में मदद करना।",
      "Get Started": "शुरू करें",
      "Explore Dashboard": "डैशबोर्ड देखें",
      "Happy Farmers": "खुश किसान",
      "Crops Analyzed": "विश्लेषित फसलें",
      "Accuracy Rate": "सटीकता दर",
      
      // ========== FEATURES SECTION ==========
      "Our Features": "हमारी विशेषताएँ",
      "Everything you need to make informed farming decisions": "सूचित कृषि निर्णय लेने के लिए आपको जो कुछ भी चाहिए",
      "Crop Recommendation": "फसल अनुशंसा",
      "Disease Detection": "रोग का पता लगाना",
      "Yield Prediction": "उपज भविष्यवाणी",
      "Weather Monitoring": "मौसम निगरानी",
      "Soil Health Insights": "मृदा स्वास्थ्य जानकारी",
      "Market Prices": "बाजार भाव",
      "Multi-Language Support": "बहु-भाषा समर्थन",
      "Mobile Friendly": "मोबाइल के अनुकूल",
      
      // ========== GOVERNMENT SCHEMES ==========
      "PM-KISAN Samman Nidhi": "पीएम-किसान सम्मान निधि",
      "Income support of ₹6000 per year to farmer families": "किसान परिवारों को ₹6000 प्रति वर्ष की आय सहायता",
      "Ongoing": "जारी",
      "Soil Health Card Scheme": "मृदा स्वास्थ्य कार्ड योजना",
      "Free soil testing and recommendations": "मुफ्त मृदा परीक्षण और सिफारिशें",
      "Apply Now": "अभी आवेदन करें",
      "Pradhan Mantri Fasal Bima Yojana": "प्रधानमंत्री फसल बीमा योजना",
      "Crop insurance scheme for farmers": "किसानों के लिए फसल बीमा योजना",
      "Seasonal": "मौसमी",
      
      // ========== WEATHER ALERTS ==========
      "Heavy Rainfall Alert": "भारी वर्षा चेतावनी",
      "Pest Advisory": "कीट सलाह",
      "Temperature Warning": "तापमान चेतावनी",
      "High": "उच्च",
      "Medium": "मध्यम",
      "Low": "निम्न",
      
      // ========== LOCATIONS ==========
      "Punjab, Haryana": "पंजाब, हरियाणा",
      "Maharashtra": "महाराष्ट्र",
      "Rajasthan": "राजस्थान",
      
      // ========== GOVERNMENT INFO SECTION ==========
      "Government Information": "सरकारी जानकारी",
      "Latest schemes, alerts, and advisories for farmers": "किसानों के लिए नवीनतम योजनाएं, अलर्ट और सलाह",
      "Latest Farming Schemes": "नवीनतम कृषि योजनाएं",
      "Weather & Crop Alerts": "मौसम और फसल अलर्ट",
      "Location": "स्थान",
      "Read more": "और पढ़ें",
      
      // ========== AUTH PAGES ==========
      "Welcome Back": "वापस स्वागत है",
      "Login to your Harvestify account": "अपने हार्वेस्टिफाई खाते में लॉगिन करें",
      "Create Account": "खाता बनाएं",
      "Join Harvestify for smart farming solutions": "स्मार्ट कृषि समाधान के लिए हार्वेस्टिफाई से जुड़ें",
      "Email Address": "ईमेल पता",
      "Enter your email": "अपना ईमेल दर्ज करें",
      "Password": "पासवर्ड",
      "Enter your password": "अपना पासवर्ड दर्ज करें",
      "Confirm Password": "पासवर्ड की पुष्टि करें",
      "Confirm your password": "अपने पासवर्ड की पुष्टि करें",
      "Full Name": "पूरा नाम",
      "Enter your full name": "अपना पूरा नाम दर्ज करें",
      "State": "राज्य",
      "Select your state": "अपना राज्य चुनें",
      "Farm Type": "खेती का प्रकार",
      "Select farm type": "खेती का प्रकार चुनें",
      "Remember me": "मुझे याद रखें",
      "Forgot Password?": "पासवर्ड भूल गए?",
      "Don't have an account?": "खाता नहीं है?",
      "Register here": "यहां पंजीकरण करें",
      "Already have an account?": "पहले से ही खाता है?",
      "Login here": "यहां लॉगिन करें",
      "Please fill all fields": "कृपया सभी फ़ील्ड भरें",
      "Login successful!": "लॉगिन सफल!",
      "Registration successful!": "पंजीकरण सफल!",
      "Passwords do not match": "पासवर्ड मेल नहीं खाते",
      "Password must be at least 6 characters": "पासवर्ड कम से कम 6 अक्षर का होना चाहिए",
      "Farmer Support": "किसान सहायता",
      "Subsistence Farming": "निर्वाह खेती",
      "Commercial Farming": "वाणिज्यिक खेती",
      "Organic Farming": "जैविक खेती",
      "Mixed Farming": "मिश्रित खेती",
      "I agree to the": "मैं सहमत हूँ",
      "Terms and Conditions": "नियम और शर्तें",
      "and": "और",
      "Privacy Policy": "गोपनीयता नीति",
      
      // ========== DASHBOARD ==========
      "Welcome back, Farmer!": "वापस स्वागत है, किसान भाई!",
      "Here's your farming dashboard": "आपका कृषि डैशबोर्ड",
      "Today's Weather": "आज का मौसम",
      "Recommended Crop": "अनुशंसित फसल",
      "Soil Moisture": "मृदा नमी",
      "Recent Predictions": "हालिया भविष्यवाणियाँ",
      "Quick Actions": "त्वरित कार्रवाई",
      "New Crop Prediction": "नई फसल भविष्यवाणी",
      "Upload for Disease Check": "रोग जांच के लिए अपलोड करें",
      "Check Weather Forecast": "मौसम पूर्वानुमान देखें",
      "View Market Prices": "बाजार भाव देखें",
      "Recent Activities": "हालिया गतिविधियाँ",
      
      // ========== CROP RECOMMENDATION ==========
      "Enter Soil & Climate Details": "मृदा और जलवायु विवरण दर्ज करें",
      "Recommendation Result": "अनुशंसा परिणाम",
      "Predict Best Crop": "सर्वोत्तम फसल की भविष्यवाणी करें",
      "Confidence": "विश्वास स्तर",
      "Suggested Fertilizer": "सुझाया गया उर्वरक",
      "Cultivation Tips": "खेती के सुझाव",
      "Nitrogen (N)": "नाइट्रोजन (एन)",
      "Phosphorus (P)": "फास्फोरस (पी)",
      "Potassium (K)": "पोटेशियम (के)",
      "Temperature": "तापमान",
      "Humidity": "आर्द्रता",
      "pH Level": "पीएच स्तर",
      "Rainfall": "वर्षा",
      
      // ========== DISEASE DETECTION ==========
      "Upload Leaf Image": "पत्ती की तस्वीर अपलोड करें",
      "Analysis Result": "विश्लेषण परिणाम",
      "Analyze Disease": "रोग का विश्लेषण करें",
      "Treatment Advice": "उपचार सलाह",
      "Prevention Tips": "रोकथाम के सुझाव",
      "Upload New": "नया अपलोड करें",
      "Click to upload or drag and drop": "अपलोड करने के लिए क्लिक करें या खींचें और छोड़ें",
      "Supported formats": "समर्थित प्रारूप",
      
      // ========== WEATHER ==========
      "Weather Information": "मौसम की जानकारी",
      "Current Weather": "वर्तमान मौसम",
      "Weather Details": "मौसम विवरण",
      "7-Day Forecast": "7 दिन का पूर्वानुमान",
      "Farming Advice for Today": "आज के लिए कृषि सलाह",
      
      // ========== MARKET PRICES ==========
      "Search crop or market...": "फसल या बाजार खोजें...",
      "Min Price": "न्यूनतम मूल्य",
      "Max Price": "अधिकतम मूल्य",
      "Avg Price": "औसत मूल्य",
      "Trend": "रुझान",
      "showing results": "परिणाम दिखा रहे हैं",
      
      // ========== PROFILE ==========
      "My Profile": "मेरी प्रोफाइल",
      "Edit Profile": "प्रोफाइल संपादित करें",
      "Farming Statistics": "कृषि आंकड़े",
      "Total Predictions": "कुल भविष्यवाणियाँ",
      "Favorite Crop": "पसंदीदा फसल",
      "Recent Activity": "हालिया गतिविधि",
      "Member since": "सदस्यता तिथि",
      
      // ========== FOOTER ==========
      "Quick Links": "त्वरित लिंक",
      "Contact Us": "संपर्क करें",
      "All rights reserved": "सर्वाधिकार सुरक्षित",
      "Made for Smart Agriculture": "स्मार्ट कृषि के लिए बनाया गया",
      "Terms of Service": "सेवा की शर्तें",
      "Disclaimer": "अस्वीकरण",
      "Help Center": "सहायता केंद्र",
      "FAQs": "सामान्य प्रश्न",
      "Government Schemes": "सरकारी योजनाएं",
      "Contact Support": "सहायता से संपर्क करें",
      "Toll Free: 1800-180-1551": "टोल फ्री: 1800-180-1551",
      "Email: support@harvestify.gov.in": "ईमेल: support@harvestify.gov.in",
      "Hours: Mon-Sat 9:00 AM - 6:00 PM": "समय: सोम-शनि सुबह 9:00 - शाम 6:00",
      
      // ========== MARATHI/HINDI SPECIFIC KEYS (for footer) ==========
      "शेतकरी समर्थन": "शेतकरी समर्थन",
      "आमच्याशी संपर्क साधा": "संपर्क करें",
      
      // ========== LANGUAGE SWITCHER ==========
      "Select Language": "भाषा चुनें",
      "English": "English",
      "Hindi": "हिंदी",
      "Marathi": "मराठी",
      
      // ========== 404 PAGE ==========
      "Page Not Found": "पृष्ठ नहीं मिला",
      "Oops! The page you're looking for doesn't exist.": "ओह! आप जिस पृष्ठ की तलाश कर रहे हैं वह मौजूद नहीं है।",
      "Back to Home": "होम पेज पर वापस जाएं",
      
      // ========== ABOUT PAGE ==========
      "About Harvestify": "हार्वेस्टिफाई के बारे में",
      "Empowering farmers with technology for a better tomorrow": "बेहतर कल के लिए किसानों को प्रौद्योगिकी से सशक्त बनाना",
      "Our Mission": "हमारा मिशन",
      "Our Vision": "हमारा दृष्टिकोण",
      "Our Team": "हमारी टीम",
      "Dedicated Team": "समर्पित टीम",
      
      // ========== COMMON ==========
      "Submit": "जमा करें",
      "Cancel": "रद्द करें",
      "Save": "सहेजें",
      "Delete": "हटाएं",
      "Edit": "संपादित करें",
      "Loading...": "लोड हो रहा है...",
      "Error": "त्रुटि",
      "Success": "सफलता",
      "Warning": "चेतावनी",
      "Info": "जानकारी"
    }
  },
  mr: {
    translation: {
      // ========== NAVIGATION ==========
      "Home": "मुखपृष्ठ",
      "Features": "वैशिष्ट्ये",
      "Dashboard": "डॅशबोर्ड",
      "About": "आमच्याबद्दल",
      "Login": "लॉगिन",
      "Register": "नोंदणी",
      "Logout": "लॉगआउट",
      "Profile": "प्रोफाइल",
      
      // ========== HERO SECTION ==========
      "Harvestify": "हार्वेस्टिफाय",
      "Smart Farming Assistance for Better Crop Decisions": "चांगल्या पीक निर्णयांसाठी स्मार्ट शेती सहाय्य",
      "Helping farmers predict crops, detect diseases, and improve yield using data-driven insights.": "डेटा-चालित अंतर्दृष्टी वापरून शेतकऱ्यांना पिकांचा अंदाज, रोग शोधण्यात आणि उत्पन्न सुधारण्यात मदत करणे.",
      "Get Started": "सुरू करा",
      "Explore Dashboard": "डॅशबोर्ड एक्सप्लोर करा",
      "Happy Farmers": "आनंदी शेतकरी",
      "Crops Analyzed": "विश्लेषित पिके",
      "Accuracy Rate": "अचूकता दर",
      
      // ========== FEATURES SECTION ==========
      "Our Features": "आमची वैशिष्ट्ये",
      "Everything you need to make informed farming decisions": "माहितीपूर्ण शेती निर्णय घेण्यासाठी आवश्यक असलेली प्रत्येक गोष्ट",
      "Crop Recommendation": "पीक शिफारस",
      "Disease Detection": "रोग शोध",
      "Yield Prediction": "उत्पन्न अंदाज",
      "Weather Monitoring": "हवामान निरीक्षण",
      "Soil Health Insights": "माती आरोग्य माहिती",
      "Market Prices": "बाजार भाव",
      "Multi-Language Support": "बहु-भाषा समर्थन",
      "Mobile Friendly": "मोबाइलसाठी अनुकूल",
      
      // ========== GOVERNMENT SCHEMES ==========
      "PM-KISAN Samman Nidhi": "पीएम-किसान सन्मान निधी",
      "Income support of ₹6000 per year to farmer families": "शेतकरी कुटुंबांना दरवर्षी ₹6000 उत्पन्न सहाय्य",
      "Ongoing": "सुरू",
      "Soil Health Card Scheme": "मृदा आरोग्य कार्ड योजना",
      "Free soil testing and recommendations": "मोफत माती चाचणी आणि शिफारसी",
      "Apply Now": "आता अर्ज करा",
      "Pradhan Mantri Fasal Bima Yojana": "प्रधानमंत्री पीक विमा योजना",
      "Crop insurance scheme for farmers": "शेतकऱ्यांसाठी पीक विमा योजना",
      "Seasonal": "हंगामी",
      
      // ========== WEATHER ALERTS ==========
      "Heavy Rainfall Alert": "मुसळधार पावसाचा इशारा",
      "Pest Advisory": "कीटक सल्ला",
      "Temperature Warning": "तापमान इशारा",
      "High": "उच्च",
      "Medium": "मध्यम",
      "Low": "निम्न",
      
      // ========== LOCATIONS ==========
      "Punjab, Haryana": "पंजाब, हरियाणा",
      "Maharashtra": "महाराष्ट्र",
      "Rajasthan": "राजस्थान",
      
      // ========== GOVERNMENT INFO SECTION ==========
      "Government Information": "सरकारी माहिती",
      "Latest schemes, alerts, and advisories for farmers": "शेतकऱ्यांसाठी नवीन योजना, सूचना आणि सल्ला",
      "Latest Farming Schemes": "नवीन शेती योजना",
      "Weather & Crop Alerts": "हवामान आणि पीक अलर्ट",
      "Location": "स्थान",
      "Read more": "अधिक वाचा",
      
      // ========== AUTH PAGES ==========
      "Welcome Back": "पुन्हा स्वागत आहे",
      "Login to your Harvestify account": "आपल्या हार्वेस्टिफाय खात्यात लॉगिन करा",
      "Create Account": "खाते तयार करा",
      "Join Harvestify for smart farming solutions": "स्मार्ट शेती उपायांसाठी हार्वेस्टिफायमध्ये सामील व्हा",
      "Email Address": "ईमेल पत्ता",
      "Enter your email": "आपला ईमेल प्रविष्ट करा",
      "Password": "पासवर्ड",
      "Enter your password": "आपला पासवर्ड प्रविष्ट करा",
      "Confirm Password": "पासवर्डची पुष्टी करा",
      "Confirm your password": "आपल्या पासवर्डची पुष्टी करा",
      "Full Name": "पूर्ण नाव",
      "Enter your full name": "आपले पूर्ण नाव प्रविष्ट करा",
      "State": "राज्य",
      "Select your state": "आपले राज्य निवडा",
      "Farm Type": "शेतीचा प्रकार",
      "Select farm type": "शेतीचा प्रकार निवडा",
      "Remember me": "मला लक्षात ठेवा",
      "Forgot Password?": "पासवर्ड विसरलात?",
      "Don't have an account?": "खाते नाही?",
      "Register here": "येथे नोंदणी करा",
      "Already have an account?": "आधीपासून खाते आहे?",
      "Login here": "येथे लॉगिन करा",
      "Please fill all fields": "कृपया सर्व फील्ड भरा",
      "Login successful!": "लॉगिन यशस्वी!",
      "Registration successful!": "नोंदणी यशस्वी!",
      "Passwords do not match": "पासवर्ड जुळत नाहीत",
      "Password must be at least 6 characters": "पासवर्ड किमान ६ अक्षरे असणे आवश्यक आहे",
      "Farmer Support": "शेतकरी समर्थन",
      "Subsistence Farming": "निर्वाह शेती",
      "Commercial Farming": "व्यावसायिक शेती",
      "Organic Farming": "सेंद्रिय शेती",
      "Mixed Farming": "मिश्र शेती",
      "I agree to the": "मी सहमत आहे",
      "Terms and Conditions": "अटी व शर्ती",
      "and": "आणि",
      "Privacy Policy": "गोपनीयता धोरण",
      
      // ========== DASHBOARD ==========
      "Welcome back, Farmer!": "पुन्हा स्वागत आहे, शेतकरी बंधू!",
      "Here's your farming dashboard": "तुमचा शेती डॅशबोर्ड",
      "Today's Weather": "आजचे हवामान",
      "Recommended Crop": "शिफारस केलेले पीक",
      "Soil Moisture": "मातीतील ओलावा",
      "Recent Predictions": "अलीकडील अंदाज",
      "Quick Actions": "द्रुत क्रिया",
      "New Crop Prediction": "नवीन पीक अंदाज",
      "Upload for Disease Check": "रोग तपासणीसाठी अपलोड करा",
      "Check Weather Forecast": "हवामान अंदाज तपासा",
      "View Market Prices": "बाजार भाव पहा",
      "Recent Activities": "अलीकडील क्रियाकलाप",
      
      // ========== CROP RECOMMENDATION ==========
      "Enter Soil & Climate Details": "माती आणि हवामान तपशील प्रविष्ट करा",
      "Recommendation Result": "शिफारस परिणाम",
      "Predict Best Crop": "सर्वोत्तम पीक अंदाज करा",
      "Confidence": "विश्वास पातळी",
      "Suggested Fertilizer": "सुचवलेले खत",
      "Cultivation Tips": "लागवड टिप्स",
      "Nitrogen (N)": "नायट्रोजन (एन)",
      "Phosphorus (P)": "फॉस्फरस (पी)",
      "Potassium (K)": "पोटॅशियम (के)",
      "Temperature": "तापमान",
      "Humidity": "आर्द्रता",
      "pH Level": "पीएच पातळी",
      "Rainfall": "पाऊस",
      
      // ========== DISEASE DETECTION ==========
      "Upload Leaf Image": "पानांची प्रतिमा अपलोड करा",
      "Analysis Result": "विश्लेषण परिणाम",
      "Analyze Disease": "रोगाचे विश्लेषण करा",
      "Treatment Advice": "उपचार सल्ला",
      "Prevention Tips": "प्रतिबंध टिप्स",
      "Upload New": "नवीन अपलोड करा",
      "Click to upload or drag and drop": "अपलोड करण्यासाठी क्लिक करा किंवा ड्रॅग आणि ड्रॉप करा",
      "Supported formats": "समर्थित स्वरूप",
      
      // ========== WEATHER ==========
      "Weather Information": "हवामान माहिती",
      "Current Weather": "सध्याचे हवामान",
      "Weather Details": "हवामान तपशील",
      "7-Day Forecast": "७ दिवसांचा अंदाज",
      "Farming Advice for Today": "आजचा शेती सल्ला",
      
      // ========== MARKET PRICES ==========
      "Search crop or market...": "पीक किंवा बाजार शोधा...",
      "Min Price": "किमान किंमत",
      "Max Price": "कमाल किंमत",
      "Avg Price": "सरासरी किंमत",
      "Trend": "कल",
      "showing results": "परिणाम दाखवत आहे",
      
      // ========== PROFILE ==========
      "My Profile": "माझे प्रोफाइल",
      "Edit Profile": "प्रोफाइल संपादित करा",
      "Farming Statistics": "शेती आकडेवारी",
      "Total Predictions": "एकूण अंदाज",
      "Favorite Crop": "आवडते पीक",
      "Recent Activity": "अलीकडील क्रियाकलाप",
      "Member since": "सदस्यत्व तारीख",
      
      // ========== FOOTER ==========
      "Quick Links": "द्रुत दुवे",
      "Contact Us": "आमच्याशी संपर्क साधा",
      "All rights reserved": "सर्व हक्क राखीव",
      "Made for Smart Agriculture": "स्मार्ट शेतीसाठी बनविले",
      "Terms of Service": "सेवेच्या अटी",
      "Disclaimer": "अस्वीकरण",
      "Help Center": "मदत केंद्र",
      "FAQs": "वारंवार विचारले जाणारे प्रश्न",
      "Government Schemes": "सरकारी योजना",
      "Contact Support": "समर्थनाशी संपर्क साधा",
      "Toll Free: 1800-180-1551": "टोल फ्री: 1800-180-1551",
      "Email: support@harvestify.gov.in": "ईमेल: support@harvestify.gov.in",
      "Hours: Mon-Sat 9:00 AM - 6:00 PM": "वेळ: सोम-शनि सकाळी 9:00 - संध्याकाळी 6:00",
      
      // ========== MARATHI/HINDI SPECIFIC KEYS (for footer) ==========
      "शेतकरी समर्थन": "शेतकरी समर्थन",
      "आमच्याशी संपर्क साधा": "आमच्याशी संपर्क साधा",
      
      // ========== LANGUAGE SWITCHER ==========
      "Select Language": "भाषा निवडा",
      "English": "English",
      "Hindi": "हिंदी",
      "Marathi": "मराठी",
      
      // ========== 404 PAGE ==========
      "Page Not Found": "पृष्ठ सापडले नाही",
      "Oops! The page you're looking for doesn't exist.": "अरेरे! आपण शोधत असलेले पृष्ठ अस्तित्वात नाही.",
      "Back to Home": "मुखपृष्ठावर परत जा",
      
      // ========== ABOUT PAGE ==========
      "About Harvestify": "हार्वेस्टिफाय बद्दल",
      "Empowering farmers with technology for a better tomorrow": "चांगल्या उद्यासाठी शेतकऱ्यांना तंत्रज्ञानाने सक्षम करणे",
      "Our Mission": "आमचे ध्येय",
      "Our Vision": "आमचे दृष्टिकोन",
      "Our Team": "आमची टीम",
      "Dedicated Team": "समर्पित टीम",
      
      // ========== COMMON ==========
      "Submit": "सबमिट करा",
      "Cancel": "रद्द करा",
      "Save": "जतन करा",
      "Delete": "हटवा",
      "Edit": "संपादित करा",
      "Loading...": "लोड होत आहे...",
      "Error": "त्रुटी",
      "Success": "यश",
      "Warning": "चेतावणी",
      "Info": "माहिती"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;