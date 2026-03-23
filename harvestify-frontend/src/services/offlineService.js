// src/services/offlineService.js
// Complete offline knowledge base for Indian farmers

// Multi-language knowledge base
const offlineKnowledge = {
  // English Knowledge Base
  en: {
    // Crop information
    'wheat': {
      sowing: 'November to December',
      harvesting: 'March to April',
      irrigation: 'Every 10-12 days',
      fertilizer: 'DAP 50kg/acre, Urea 30kg/acre',
      pest: 'Aphids, Rust - Use neem oil spray',
      tips: 'Ensure proper field drainage, use certified seeds'
    },
    'rice': {
      sowing: 'June to July',
      harvesting: 'October to November',
      irrigation: 'Maintain 2-5cm water level',
      fertilizer: 'Urea 40kg/acre, DAP 30kg/acre',
      pest: 'Stem borer, BPH - Use pheromone traps',
      tips: 'Puddling important, transplant healthy seedlings'
    },
    'maize': {
      sowing: 'June-July (Kharif), October-November (Rabi)',
      harvesting: 'September-October, February-March',
      irrigation: 'Every 8-10 days',
      fertilizer: 'DAP 50kg/acre, Urea 60kg/acre',
      pest: 'Fall armyworm, stem borer - Monitor regularly',
      tips: 'Row spacing 60cm, plant population 60,000/acre'
    },
    'cotton': {
      sowing: 'April-May',
      harvesting: 'October-December',
      irrigation: 'Drip irrigation recommended',
      fertilizer: 'DAP 60kg/acre, Potash 40kg/acre',
      pest: 'Pink bollworm, American bollworm - Install pheromone traps',
      tips: 'Bt cotton recommended, avoid waterlogging'
    },
    'sugarcane': {
      sowing: 'February-March',
      harvesting: 'December-January',
      irrigation: 'Every 7-10 days',
      fertilizer: 'Urea 100kg/acre, DAP 60kg/acre',
      pest: 'Stem borer, Pyrilla - Biological control',
      tips: 'Use setts from healthy plants, proper earthing up'
    },
    'potato': {
      sowing: 'October-November',
      harvesting: 'January-February',
      irrigation: 'Every 7-10 days',
      fertilizer: 'Urea 60kg/acre, Potash 80kg/acre',
      pest: 'Aphids, Potato tuber moth - Use certified seed',
      tips: 'Well-drained soil, avoid excessive nitrogen'
    },
    // Pest control
    'pest_control': {
      general: 'Use neem oil (5ml/liter), pheromone traps, yellow sticky traps, biological control agents',
      organic: 'Neem cake, Trichoderma, Pseudomonas, Panchagavya (3%)',
      chemical: 'Consult local agriculture officer for specific pesticides',
      prevention: 'Crop rotation, resistant varieties, field sanitation'
    },
    // Government schemes
    'schemes': {
      pmkisan: 'PM-KISAN: ₹6000/year in 3 installments',
      soilhealth: 'Free soil testing at nearest agriculture office',
      pmfby: 'Crop insurance at 1.5-2% premium',
      pmkmy: 'Pension scheme for farmers',
      agristack: 'Digital farmer registration, land records'
    },
    // General farming tips
    'general_tips': [
      'Test soil before sowing',
      'Use certified seeds',
      'Maintain proper spacing',
      'Irrigate as per crop requirement',
      'Monitor pest population regularly',
      'Harvest at correct maturity stage',
      'Store produce in clean, dry place'
    ],
    // Footer messages
    'internet_message': 'Connect to internet for personalized advice and real-time data',
    'offline_message': 'You are offline. This is from Harvestify\'s local farming guide.'
  },

  // Hindi Knowledge Base
  hi: {
    'wheat': {
      sowing: 'नवंबर से दिसंबर',
      harvesting: 'मार्च से अप्रैल',
      irrigation: 'हर 10-12 दिन में',
      fertilizer: 'डीएपी 50 किलो/एकड़, यूरिया 30 किलो/एकड़',
      pest: 'एफिड, रस्ट - नीम का तेल छिड़कें',
      tips: 'खेत की उचित निकासी, प्रमाणित बीज का प्रयोग'
    },
    'rice': {
      sowing: 'जून से जुलाई',
      harvesting: 'अक्टूबर से नवंबर',
      irrigation: '2-5 सेमी पानी रखें',
      fertilizer: 'यूरिया 40 किलो/एकड़, डीएपी 30 किलो/एकड़',
      pest: 'तना छेदक, बीपीएच - फेरोमोन ट्रैप लगाएं',
      tips: 'पुडलिंग जरूरी, स्वस्थ पौधे रोपें'
    },
    'maize': {
      sowing: 'जून-जुलाई (खरीफ), अक्टूबर-नवंबर (रबी)',
      harvesting: 'सितंबर-अक्टूबर, फरवरी-मार्च',
      irrigation: 'हर 8-10 दिन में',
      fertilizer: 'डीएपी 50 किलो/एकड़, यूरिया 60 किलो/एकड़',
      pest: 'फॉल आर्मीवर्म, तना छेदक - नियमित निगरानी',
      tips: '60 सेमी पंक्ति दूरी, 60,000 पौधे/एकड़'
    },
    'pest_control': {
      general: 'नीम का तेल (5ml/लीटर), फेरोमोन ट्रैप, पीला चिपचिपा ट्रैप, जैविक नियंत्रण',
      organic: 'नीम की खली, ट्राइकोडर्मा, पंचगव्य (3%)',
      prevention: 'फसल चक्र, प्रतिरोधी किस्में, खेत की सफाई'
    },
    'schemes': {
      pmkisan: 'पीएम-किसान: ₹6000/वर्ष तीन किस्तों में',
      soilhealth: 'नजदीकी कृषि कार्यालय में मुफ्त मिट्टी परीक्षण',
      pmfby: '1.5-2% प्रीमियम पर फसल बीमा',
      pmkmy: 'किसानों के लिए पेंशन योजना'
    },
    'general_tips': [
      'बुवाई से पहले मिट्टी की जांच करें',
      'प्रमाणित बीज का प्रयोग करें',
      'उचित दूरी बनाए रखें',
      'फसल के अनुसार सिंचाई करें',
      'कीटों की नियमित निगरानी करें',
      'सही समय पर कटाई करें',
      'उपज को साफ, सूखी जगह पर रखें'
    ],
    'internet_message': 'व्यक्तिगत सलाह और रियल-टाइम डेटा के लिए इंटरनेट से कनेक्ट करें',
    'offline_message': 'आप ऑफलाइन हैं। यह हार्वेस्टिफाई के स्थानीय कृषि गाइड से है।'
  },

  // Marathi Knowledge Base
  mr: {
    'wheat': {
      sowing: 'नोव्हेंबर ते डिसेंबर',
      harvesting: 'मार्च ते एप्रिल',
      irrigation: 'दर 10-12 दिवसांनी',
      fertilizer: 'डीएपी 50 किलो/एकर, युरिया 30 किलो/एकर',
      pest: 'ॲफिड, रस्ट - निंबोळी तेल फवारणी',
      tips: 'शेताचा योग्य निचरा, प्रमाणित बियाणे वापरा'
    },
    'rice': {
      sowing: 'जून ते जुलै',
      harvesting: 'ऑक्टोबर ते नोव्हेंबर',
      irrigation: '2-5 सेमी पाणी ठेवा',
      fertilizer: 'युरिया 40 किलो/एकर, डीएपी 30 किलो/एकर',
      pest: 'स्टेम बोरर, बीपीएच - फेरोमोन ट्रॅप',
      tips: 'पुडलिंग आवश्यक, निरोगी रोपे लावा'
    },
    'maize': {
      sowing: 'जून-जुलै (खरीप), ऑक्टोबर-नोव्हेंबर (रब्बी)',
      harvesting: 'सप्टेंबर-ऑक्टोबर, फेब्रुवारी-मार्च',
      irrigation: 'दर 8-10 दिवसांनी',
      fertilizer: 'डीएपी 50 किलो/एकर, युरिया 60 किलो/एकर',
      pest: 'फॉल आर्मीवर्म, स्टेम बोरर - नियमित निरीक्षण',
      tips: '60 सेमी ओळीतील अंतर, 60,000 रोपे/एकर'
    },
    'pest_control': {
      general: 'निंबोळी तेल (5ml/लिटर), फेरोमोन ट्रॅप, पिवळा चिकट ट्रॅप',
      organic: 'निंबोळी खारी, ट्रायकोडर्मा, पंचगव्य (3%)',
      prevention: 'पीक फेरपालट, प्रतिरोधक वाण, शेत स्वच्छता'
    },
    'schemes': {
      pmkisan: 'पीएम-किसान: ₹6000/वर्ष तीन हप्त्यांमध्ये',
      soilhealth: 'जवळच्या कृषी कार्यालयात मोफत माती चाचणी',
      pmfby: '1.5-2% प्रीमियमवर पीक विमा',
      pmkmy: 'शेतकऱ्यांसाठी पेन्शन योजना'
    },
    'general_tips': [
      'पेरणीपूर्वी माती चाचणी करा',
      'प्रमाणित बियाणे वापरा',
      'योग्य अंतर ठेवा',
      'पिकानुसार सिंचन करा',
      'कीटकांचे नियमित निरीक्षण करा',
      'योग्य वेळी कापणी करा',
      'उत्पन्न स्वच्छ, कोरड्या जागी साठवा'
    ],
    'internet_message': 'वैयक्तिक सल्ला आणि रीअल-टाइम डेटासाठी इंटरनेटशी कनेक्ट करा',
    'offline_message': 'आपण ऑफलाइन आहात. ही हार्वेस्टिफायच्या स्थानिक शेती मार्गदर्शकाकडून आहे.'
  }
};

// Cache for offline responses
let offlineCache = new Map();

// Load cached responses from localStorage
export const loadOfflineCache = () => {
  try {
    const saved = localStorage.getItem('harvestify_offline_cache');
    if (saved) {
      offlineCache = new Map(JSON.parse(saved));
      console.log(`📀 Loaded ${offlineCache.size} cached responses`);
    }
  } catch (error) {
    console.error('Failed to load cache:', error);
  }
};

// Save cache to localStorage
const saveCache = () => {
  try {
    localStorage.setItem('harvestify_offline_cache', JSON.stringify([...offlineCache]));
  } catch (error) {
    console.error('Failed to save cache:', error);
  }
};

// Cache a response for offline use
export const cacheOfflineResponse = (question, answer, language) => {
  const key = `${question.toLowerCase().slice(0, 100)}|${language}`;
  offlineCache.set(key, {
    answer,
    timestamp: Date.now(),
    language
  });
  saveCache();
  console.log(`💾 Cached response for: "${question.slice(0, 50)}..."`);
};

// Get cached response
export const getCachedResponse = (question, language) => {
  const key = `${question.toLowerCase().slice(0, 100)}|${language}`;
  const cached = offlineCache.get(key);
  if (cached && (Date.now() - cached.timestamp < 7 * 24 * 60 * 60 * 1000)) {
    console.log(`📀 Using cached response for: "${question.slice(0, 50)}..."`);
    return cached.answer;
  }
  return null;
};

// Get offline response based on keywords
export const getOfflineResponse = (question, language = 'en') => {
  const lowerQuestion = question.toLowerCase();
  const kb = offlineKnowledge[language] || offlineKnowledge.en;
  
  // Check for crop-specific queries
  const crops = ['wheat', 'rice', 'maize', 'cotton', 'sugarcane', 'potato'];
  for (const crop of crops) {
    if (lowerQuestion.includes(crop)) {
      const cropInfo = kb[crop];
      if (cropInfo) {
        let response = `🌾 **${crop.charAt(0).toUpperCase() + crop.slice(1)}**\n\n`;
        response += `🌱 **${language === 'hi' ? 'बुवाई का समय' : language === 'mr' ? 'पेरणीची वेळ' : 'Sowing'}:** ${cropInfo.sowing}\n`;
        response += `🌾 **${language === 'hi' ? 'कटाई का समय' : language === 'mr' ? 'कापणीची वेळ' : 'Harvesting'}:** ${cropInfo.harvesting}\n`;
        response += `💧 **${language === 'hi' ? 'सिंचाई' : language === 'mr' ? 'सिंचन' : 'Irrigation'}:** ${cropInfo.irrigation}\n`;
        response += `🧪 **${language === 'hi' ? 'उर्वरक' : language === 'mr' ? 'खत' : 'Fertilizer'}:** ${cropInfo.fertilizer}\n`;
        response += `🐛 **${language === 'hi' ? 'कीट प्रबंधन' : language === 'mr' ? 'कीटक व्यवस्थापन' : 'Pest Management'}:** ${cropInfo.pest}\n`;
        response += `📝 **${language === 'hi' ? 'सुझाव' : language === 'mr' ? 'सूचना' : 'Tips'}:** ${cropInfo.tips}\n\n`;
        response += `---\n📡 *${kb.internet_message}*`;
        return response;
      }
    }
  }
  
  // Check for pest control
  if (lowerQuestion.includes('pest') || lowerQuestion.includes('insect') || 
      lowerQuestion.includes('कीट') || lowerQuestion.includes('कीटक')) {
    const pestInfo = kb.pest_control;
    let response = `🐛 **${language === 'hi' ? 'कीट प्रबंधन' : language === 'mr' ? 'कीटक व्यवस्थापन' : 'Pest Management'}**\n\n`;
    response += `**${language === 'hi' ? 'सामान्य तरीके' : language === 'mr' ? 'सामान्य पद्धती' : 'General Methods'}:** ${pestInfo.general}\n\n`;
    response += `**${language === 'hi' ? 'जैविक विकल्प' : language === 'mr' ? 'सेंद्रिय पर्याय' : 'Organic Options'}:** ${pestInfo.organic}\n\n`;
    response += `**${language === 'hi' ? 'रोकथाम' : language === 'mr' ? 'प्रतिबंध' : 'Prevention'}:** ${pestInfo.prevention}\n\n`;
    response += `---\n📡 *${kb.internet_message}*`;
    return response;
  }
  
  // Check for government schemes
  if (lowerQuestion.includes('scheme') || lowerQuestion.includes('yojana') || 
      lowerQuestion.includes('सरकारी') || lowerQuestion.includes('योजना')) {
    const schemes = kb.schemes;
    let response = `📋 **${language === 'hi' ? 'किसानों के लिए सरकारी योजनाएं' : language === 'mr' ? 'शेतकऱ्यांसाठी सरकारी योजना' : 'Government Schemes for Farmers'}**\n\n`;
    response += `1. **PM-KISAN**: ${schemes.pmkisan}\n`;
    response += `2. **${language === 'hi' ? 'मृदा स्वास्थ्य कार्ड' : language === 'mr' ? 'मृदा आरोग्य कार्ड' : 'Soil Health Card'}**: ${schemes.soilhealth}\n`;
    response += `3. **${language === 'hi' ? 'पीएम फसल बीमा' : language === 'mr' ? 'पीएम पीक विमा' : 'PM Fasal Bima'}**: ${schemes.pmfby}\n`;
    if (schemes.pmkmy) response += `4. **${language === 'hi' ? 'पीएम किसान मान धन' : language === 'mr' ? 'पीएम किसान मान धन' : 'PM Kisan Maan Dhan'}**: ${schemes.pmkmy}\n`;
    response += `\n---\n📡 *${kb.internet_message}*`;
    return response;
  }
  
  // Return general tips
  let response = `🌾 **${language === 'hi' ? 'सामान्य कृषि सुझाव' : language === 'mr' ? 'सामान्य शेती सूचना' : 'General Farming Tips'}**\n\n`;
  kb.general_tips.forEach((tip, i) => {
    response += `${i+1}. ${tip}\n`;
  });
  response += `\n---\n📡 *${kb.internet_message}*`;
  return response;
};

// Check if offline mode is active
export const isOffline = () => {
  return !navigator.onLine;
};

// Initialize offline service
loadOfflineCache();

export default {
  getOfflineResponse,
  cacheOfflineResponse,
  getCachedResponse,
  isOffline,
  offlineKnowledge
};