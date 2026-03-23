// src/services/chatService.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  getRealWeatherData, 
  getRealMarketPrices, 
  getGovernmentSchemes,
  getSeasonalCropRecommendation,
  getPestControlTips
} from './harvestifyDataService';
import { getOfflineResponse, cacheOfflineResponse, getCachedResponse, isOffline } from './offlineService';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const MODEL_NAME = 'gemini-2.5-flash';

let genAI = null;
if (API_KEY && API_KEY !== 'your_api_key_here') {
  try {
    genAI = new GoogleGenerativeAI(API_KEY);
    console.log('✅ Gemini AI initialized');
  } catch (error) {
    console.error('❌ Failed to initialize Gemini AI:', error);
  }
}

// ========== HELPER FUNCTIONS ==========

// Get language-specific footnotes
const getLanguageFootnote = (language, hasRealData) => {
  if (hasRealData) {
    const footnotes = {
      hi: '\n\n---\n📊 *यह जानकारी Harvestify के रियल-टाइम डेटा पर आधारित है*',
      mr: '\n\n---\n📊 *ही माहिती Harvestify च्या रीअल-टाइम डेटावर आधारित आहे*',
      en: '\n\n---\n📊 *This information is based on Harvestify\'s real-time data*'
    };
    return footnotes[language] || footnotes.en;
  } else {
    const footnotes = {
      hi: '\n\n---\n📡 *व्यक्तिगत सलाह और रियल-टाइम डेटा के लिए इंटरनेट से कनेक्ट करें*',
      mr: '\n\n---\n📡 *वैयक्तिक सल्ला आणि रीअल-टाइम डेटासाठी इंटरनेटशी कनेक्ट करा*',
      en: '\n\n---\n📡 *Connect to internet for personalized advice and real-time data*'
    };
    return footnotes[language] || footnotes.en;
  }
};

// STRICT language instructions for AI
const getStrictLanguageInstruction = (language) => {
  const instructions = {
    hi: `⚠️ IMPORTANT: You MUST respond ONLY in Hindi (हिंदी) language.
Use Devanagari script (हिंदी लिपि).
DO NOT use English words unless absolutely necessary (like technical terms).
Your entire response should be in Hindi.
If the farmer asks in Hindi, answer in Hindi.
Do NOT switch to English.

Example:
- Farmer: "गेहूं की फसल के लिए क्या करें?"
- You: "गेहूं की फसल के लिए... (full Hindi response)"`,

    mr: `⚠️ IMPORTANT: You MUST respond ONLY in Marathi (मराठी) language.
Use Devanagari script (मराठी लिपी).
DO NOT use English words unless absolutely necessary (like technical terms).
Your entire response should be in Marathi.
If the farmer asks in Marathi, answer in Marathi.
Do NOT switch to English.

Example:
- Farmer: "गव्हाच्या पिकासाठी काय करावे?"
- You: "गव्हाच्या पिकासाठी... (full Marathi response)"`,

    en: `⚠️ IMPORTANT: You MUST respond ONLY in English.
Your entire response should be in English.
Do NOT use Hindi or Marathi unless quoting specific terms.`
  };
  
  return instructions[language] || instructions.en;
};

// Get real data based on user query
const getRealTimeData = async (userMessage, location, crop) => {
  const lowerMessage = userMessage.toLowerCase();
  let realData = {};
  
  try {
    if (lowerMessage.includes('weather') || lowerMessage.includes('temperature') || 
        lowerMessage.includes('rain') || lowerMessage.includes('मौसम') || 
        lowerMessage.includes('हवामान') || lowerMessage.includes('तापमान')) {
      const weatherData = await getRealWeatherData(location || 'Mumbai');
      if (weatherData) realData.weather = weatherData;
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('market') || 
        lowerMessage.includes('rate') || lowerMessage.includes('mandi') ||
        lowerMessage.includes('भाव') || lowerMessage.includes('बाजार') ||
        lowerMessage.includes('दर')) {
      const marketData = await getRealMarketPrices(crop || 'Wheat', location);
      if (marketData) realData.marketPrices = marketData;
    }
    
    if (lowerMessage.includes('scheme') || lowerMessage.includes('yojana') || 
        lowerMessage.includes('subsidy') || lowerMessage.includes('government') ||
        lowerMessage.includes('योजना') || lowerMessage.includes('सरकारी')) {
      realData.schemes = getGovernmentSchemes();
    }
    
    if ((lowerMessage.includes('crop') && (lowerMessage.includes('recommend') || lowerMessage.includes('which') || lowerMessage.includes('best'))) ||
        lowerMessage.includes('फसल') || lowerMessage.includes('पीक')) {
      const month = new Date().getMonth();
      realData.cropRecommendations = getSeasonalCropRecommendation(location || 'Punjab', month);
    }
    
    if (lowerMessage.includes('pest') || lowerMessage.includes('insect') || 
        lowerMessage.includes('bug') || lowerMessage.includes('कीट') || 
        lowerMessage.includes('कीटक')) {
      realData.pestControl = getPestControlTips(crop || 'Wheat');
    }
  } catch (error) {
    console.error('Error fetching real data:', error);
  }
  
  return realData;
};

// Format real data for AI prompt - with language-specific formatting
const formatRealDataForPrompt = (realData, language) => {
  let prompt = '\n\n[REAL HARVESTIFY DATA - USE THIS IN YOUR RESPONSE]:\n';
  
  if (realData.weather) {
    if (language === 'hi') {
      prompt += `\n📍 ${realData.weather.location} में वर्तमान मौसम:
- तापमान: ${realData.weather.temp}°C (महसूस: ${realData.weather.feelsLike}°C)
- स्थिति: ${realData.weather.condition}
- आर्द्रता: ${realData.weather.humidity}%
- हवा की गति: ${realData.weather.windSpeed} किमी/घंटा\n`;
    } else if (language === 'mr') {
      prompt += `\n📍 ${realData.weather.location} मध्ये सध्याचे हवामान:
- तापमान: ${realData.weather.temp}°C (वाटते: ${realData.weather.feelsLike}°C)
- स्थिती: ${realData.weather.condition}
- आर्द्रता: ${realData.weather.humidity}%
- वाऱ्याचा वेग: ${realData.weather.windSpeed} किमी/तास\n`;
    } else {
      prompt += `\n📍 Current Weather in ${realData.weather.location}:
- Temperature: ${realData.weather.temp}°C (feels like ${realData.weather.feelsLike}°C)
- Conditions: ${realData.weather.condition}
- Humidity: ${realData.weather.humidity}%
- Wind Speed: ${realData.weather.windSpeed} km/h\n`;
    }
  }
  
  if (realData.marketPrices && realData.marketPrices.length > 0) {
    if (language === 'hi') {
      prompt += `\n💰 वर्तमान बाजार भाव:\n`;
      realData.marketPrices.slice(0, 3).forEach(price => {
        prompt += `- ${price.market}: ₹${price.avgPrice}/क्विंटल (सीमा: ₹${price.minPrice}-₹${price.maxPrice})\n`;
      });
    } else if (language === 'mr') {
      prompt += `\n💰 सध्याचे बाजार भाव:\n`;
      realData.marketPrices.slice(0, 3).forEach(price => {
        prompt += `- ${price.market}: ₹${price.avgPrice}/क्विंटल (मर्यादा: ₹${price.minPrice}-₹${price.maxPrice})\n`;
      });
    } else {
      prompt += `\n💰 Current Market Prices:\n`;
      realData.marketPrices.slice(0, 3).forEach(price => {
        prompt += `- ${price.market}: ₹${price.avgPrice}/quintal (Range: ₹${price.minPrice}-₹${price.maxPrice})\n`;
      });
    }
  }
  
  if (realData.schemes && realData.schemes.length > 0) {
    if (language === 'hi') {
      prompt += `\n📋 उपलब्ध सरकारी योजनाएं:\n`;
      realData.schemes.forEach(scheme => {
        prompt += `- ${scheme.name}: ${scheme.description}\n`;
      });
    } else if (language === 'mr') {
      prompt += `\n📋 उपलब्ध सरकारी योजना:\n`;
      realData.schemes.forEach(scheme => {
        prompt += `- ${scheme.name}: ${scheme.description}\n`;
      });
    } else {
      prompt += `\n📋 Government Schemes Available:\n`;
      realData.schemes.forEach(scheme => {
        prompt += `- ${scheme.name}: ${scheme.description}\n`;
      });
    }
  }
  
  if (realData.cropRecommendations && realData.cropRecommendations.length > 0) {
    if (language === 'hi') {
      prompt += `\n🌾 वर्तमान मौसम के लिए अनुशंसित फसलें:\n`;
      realData.cropRecommendations.forEach(crop => {
        prompt += `- ${crop}\n`;
      });
    } else if (language === 'mr') {
      prompt += `\n🌾 सध्याच्या हंगामासाठी शिफारस केलेली पिके:\n`;
      realData.cropRecommendations.forEach(crop => {
        prompt += `- ${crop}\n`;
      });
    } else {
      prompt += `\n🌾 Recommended Crops for Current Season:\n`;
      realData.cropRecommendations.forEach(crop => {
        prompt += `- ${crop}\n`;
      });
    }
  }
  
  if (realData.pestControl) {
    if (language === 'hi') {
      prompt += `\n🐛 ${realData.pestControl.pests?.join(', ') || 'फसलों'} के लिए कीट नियंत्रण टिप्स:\n`;
      (realData.pestControl.tips || []).forEach(tip => {
        prompt += `- ${tip}\n`;
      });
    } else if (language === 'mr') {
      prompt += `\n🐛 ${realData.pestControl.pests?.join(', ') || 'पिकांसाठी'} कीटक नियंत्रण टिप्स:\n`;
      (realData.pestControl.tips || []).forEach(tip => {
        prompt += `- ${tip}\n`;
      });
    } else {
      prompt += `\n🐛 Pest Control Tips for ${realData.pestControl.pests?.join(', ') || 'crops'}:\n`;
      (realData.pestControl.tips || []).forEach(tip => {
        prompt += `- ${tip}\n`;
      });
    }
  }
  
  return prompt;
};

// Helper function to ensure language consistency
const ensureLanguageConsistency = (text, targetLanguage) => {
  const hasHindi = /[\u0900-\u097F]/g.test(text);
  const hasEnglish = /[a-zA-Z]/g.test(text);
  
  const targetIsHindi = targetLanguage === 'hi';
  const targetIsMarathi = targetLanguage === 'mr';
  
  if (targetIsHindi && !hasHindi && hasEnglish) {
    return "⚠️ कृपया पुनः प्रयास करें। मैं हिंदी में जवाब देने में सक्षम हूं।\n\n" + text;
  }
  
  if (targetIsMarathi && !hasHindi && hasEnglish) {
    return "⚠️ कृपया पुन्हा प्रयत्न करा. मी मराठीत उत्तर देण्यास सक्षम आहे.\n\n" + text;
  }
  
  return text;
};

// Main AI response function
export const sendMessageToAI = async (userMessage, language = 'en', location = 'Mumbai', crop = 'Wheat', isOfflineMode = false) => {
  // Check cache first
  const cached = getCachedResponse(userMessage, language);
  if (cached) {
    return {
      success: true,
      message: cached,
      language,
      offline: true,
      cached: true
    };
  }
  
  // Check offline mode
  if (isOfflineMode || isOffline()) {
    console.log('📴 Offline mode - using local knowledge base');
    const offlineResponse = getOfflineResponse(userMessage, language);
    return {
      success: true,
      message: offlineResponse,
      language,
      offline: true
    };
  }

  try {
    if (!API_KEY || !genAI) {
      const offlineResponse = getOfflineResponse(userMessage, language);
      return {
        success: true,
        message: offlineResponse,
        language,
        offline: true
      };
    }

    console.log('🤖 Fetching real-time Harvestify data...');
    console.log('🎯 Target language:', language);
    
    const realData = await getRealTimeData(userMessage, location, crop);
    console.log('📊 Real data fetched:', Object.keys(realData));
    
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    // STRICT language instruction
    const strictLanguageInstruction = getStrictLanguageInstruction(language);
    
    // Farming context with language enforcement
    const farmingContext = `
You are Harvestify Assistant, an AI farming advisor for Indian farmers.

STRICT RULES:
1. ${strictLanguageInstruction}
2. Keep responses concise but helpful
3. Use simple, friendly language
4. Focus on practical farming advice

Areas you help with:
- Crop recommendations based on soil and climate
- Plant disease identification and treatment
- Weather impact on farming
- Government schemes and subsidies
- Market prices and selling strategies
- Organic farming practices
- Pest management
- Irrigation techniques
- Fertilizer usage
- Soil health management
`;
    
    const realDataPrompt = formatRealDataForPrompt(realData, language);
    const hasRealData = Object.keys(realData).length > 0;
    
    // Build final prompt
    let prompt = `${farmingContext}\n\n${realDataPrompt}\n\n`;
    
    if (!hasRealData) {
      if (language === 'hi') {
        prompt += '[नोट: इस प्रश्न के लिए कोई विशिष्ट रियल-टाइम डेटा नहीं मिला। सामान्य कृषि सलाह दें।]\n\n';
      } else if (language === 'mr') {
        prompt += '[टीप: या प्रश्नासाठी कोणताही विशिष्ट रीअल-टाइम डेटा सापडला नाही. सामान्य शेती सल्ला द्या.]\n\n';
      } else {
        prompt += '[Note: No specific real-time data found for this query. Provide general farming advice.]\n\n';
      }
    }
    
    prompt += `Farmer's question: ${userMessage}\n\nAssistant (respond ONLY in ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}):`;
    
    console.log('🤖 Sending to Gemini with language:', language);
    
    // Add timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);
    
    const result = await model.generateContent(prompt, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    const response = await result.response;
    let text = response.text();
    
    // Post-process to ensure language consistency
    text = ensureLanguageConsistency(text, language);
    
    // Cache response
    cacheOfflineResponse(userMessage, text, language);
    
    // Add source note using the helper function
    const sourceNote = getLanguageFootnote(language, hasRealData);
    text += sourceNote;

    return {
      success: true,
      message: text,
      language,
      usedRealData: hasRealData
    };
    
  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Use offline fallback
    const offlineResponse = getOfflineResponse(userMessage, language);
    return { 
      success: true, 
      message: offlineResponse, 
      language, 
      offline: true 
    };
  }
};

// Quick questions in all languages
export const quickQuestions = {
  en: [
    { text: '🌾 Current weather?', query: 'What is the current weather in Punjab?' },
    { text: '💰 Wheat price today?', query: 'What is the current market price of wheat?' },
    { text: '📋 Government schemes?', query: 'What government schemes are available for farmers?' },
    { text: '🌱 Best crop this season?', query: 'Which crop is best to grow in this season?' },
    { text: '🐛 Pest control in wheat?', query: 'How to control pests in wheat crop?' }
  ],
  hi: [
    { text: '🌾 वर्तमान मौसम?', query: 'पंजाब में वर्तमान मौसम कैसा है? (कृपया हिंदी में जवाब दें)' },
    { text: '💰 गेहूं का आज का भाव?', query: 'गेहूं का वर्तमान बाजार भाव क्या है? (कृपया हिंदी में जवाब दें)' },
    { text: '📋 सरकारी योजनाएं?', query: 'किसानों के लिए कौन सी सरकारी योजनाएं उपलब्ध हैं? (कृपया हिंदी में जवाब दें)' },
    { text: '🌱 इस मौसम में सबसे अच्छी फसल?', query: 'इस मौसम में कौन सी फसल उगाना सबसे अच्छा है? (कृपया हिंदी में जवाब दें)' },
    { text: '🐛 गेहूं में कीट नियंत्रण?', query: 'गेहूं की फसल में कीटों को कैसे नियंत्रित करें? (कृपया हिंदी में जवाब दें)' }
  ],
  mr: [
    { text: '🌾 सध्याचे हवामान?', query: 'पंजाब मध्ये सध्याचे हवामान कसे आहे? (कृपया मराठीत उत्तर द्या)' },
    { text: '💰 गव्हाचा आजचा भाव?', query: 'गव्हाचा सध्याचा बाजार भाव काय आहे? (कृपया मराठीत उत्तर द्या)' },
    { text: '📋 सरकारी योजना?', query: 'शेतकऱ्यांसाठी कोणत्या सरकारी योजना उपलब्ध आहेत? (कृपया मराठीत उत्तर द्या)' },
    { text: '🌱 या हंगामात सर्वोत्तम पीक?', query: 'या हंगामात कोणते पीक घेणे सर्वोत्तम आहे? (कृपया मराठीत उत्तर द्या)' },
    { text: '🐛 गव्हामध्ये कीटक नियंत्रण?', query: 'गव्हाच्या पिकातील कीटकांवर कसे नियंत्रण करावे? (कृपया मराठीत उत्तर द्या)' }
  ]
};