// src/services/voiceService.js

class VoiceService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.synthesis = window.speechSynthesis;
    this.supported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    this.selectedVoice = null;
    this.voices = [];
    this.isLoadingVoices = false;
    
    if (this.supported) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
    }
    
    // Load voices when available
    if (this.synthesis) {
      this.loadVoices();
      this.synthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  loadVoices() {
    if (this.isLoadingVoices) return;
    this.isLoadingVoices = true;
    
    setTimeout(() => {
      this.voices = this.synthesis.getVoices();
      console.log('📢 Available voices:', this.voices.map(v => `${v.name} (${v.lang})`).slice(0, 10));
      this.isLoadingVoices = false;
    }, 100);
  }

  // Get best Indian voice for the language
  getIndianVoice(language) {
    // Priority order for Hindi/Marathi: use same Indian voices
    const preferredVoices = [
      // Google Indian voices (best quality)
      'Google हिंदी',
      'Google हिन्दी', 
      'Google मराठी',
      'Google Indian English',
      // Microsoft Indian voices
      'Microsoft Neerja',
      'Microsoft Hemant',
      'Microsoft Swara',
      'Microsoft Ravi',
      // Any Indian voice
      'Hindi',
      'Marathi',
      'Indian'
    ];
    
    // For Marathi, also try Hindi voices as fallback
    const targetVoices = language === 'mr' 
      ? ['Google मराठी', 'Marathi', 'Google हिंदी', 'Google हिन्दी', 'Hindi']
      : ['Google हिंदी', 'Google हिन्दी', 'Hindi', 'Google मराठी', 'Marathi'];
    
    // First, try to find exact match with priority
    for (const voiceName of targetVoices) {
      const voice = this.voices.find(v => 
        v.name.includes(voiceName) && 
        (language === 'mr' ? v.lang.includes('mr') || v.lang.includes('hi') : v.lang.includes('hi') || v.lang.includes('mr'))
      );
      if (voice) {
        console.log(`✅ Found voice for ${language}: ${voice.name} (${voice.lang})`);
        return voice;
      }
    }
    
    // Fallback: any voice with Devanagari script support
    const devanagariVoice = this.voices.find(v => 
      v.lang.includes('hi') || v.lang.includes('mr') || v.lang.includes('hi-IN') || v.lang.includes('mr-IN')
    );
    
    if (devanagariVoice) {
      console.log(`🔄 Fallback voice for ${language}: ${devanagariVoice.name} (${devanagariVoice.lang})`);
      return devanagariVoice;
    }
    
    // Last resort: any female voice
    const femaleVoice = this.voices.find(v => v.name.includes('Female') || v.name.includes('Google'));
    if (femaleVoice) {
      console.log(`🎤 Using female voice for ${language}: ${femaleVoice.name}`);
      return femaleVoice;
    }
    
    console.log(`⚠️ No suitable voice found for ${language}, using default`);
    return this.voices[0];
  }

  // Set language for recognition (input)
  setLanguage(language) {
    if (!this.recognition) return;
    
    const langMap = {
      'hi': 'hi-IN',
      'mr': 'mr-IN',  // Marathi recognition
      'en': 'en-IN'
    };
    
    const recognitionLang = langMap[language] || 'en-IN';
    this.recognition.lang = recognitionLang;
    console.log(`🎤 Speech recognition language set to: ${recognitionLang} (${language})`);
  }

  // Start listening
  startListening(onResult, onError, onEnd) {
    if (!this.recognition) {
      onError?.('Speech recognition not supported in this browser');
      return;
    }

    // Reset recognition to ensure clean state
    try {
      if (this.recognition.abort) this.recognition.abort();
    } catch(e) {}

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('🎤 Recognized speech:', transcript);
      onResult?.(transcript);
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      onError?.(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      onEnd?.();
    };

    try {
      this.recognition.start();
      this.isListening = true;
      console.log('🎤 Started listening...');
    } catch (error) {
      console.error('Failed to start recognition:', error);
      onError?.(error.message);
    }
  }

  // Stop listening
  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch(e) {}
      this.isListening = false;
      console.log('🎤 Stopped listening');
    }
  }

  // Speak text with Indian voice
  speak(text, language = 'en', onEnd = null) {
    if (!this.synthesis) {
      console.warn('Speech synthesis not supported');
      return null;
    }
    
    // Stop any ongoing speech
    if (this.synthesis.speaking) {
      this.synthesis.cancel();
    }
    
    // Clean text - remove markdown and emojis for better speech
    const cleanText = text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/[#_~`]/g, '')
      .replace(/[🌾🌱🌿🌻🌸🌼🎤🔊🎙️📊📡⚠️❌✅▶️◀️]/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/\(.*?\)/g, '')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (!cleanText) {
      console.log('No text to speak');
      return null;
    }
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Set language
    const langMap = {
      'hi': 'hi-IN',
      'mr': 'mr-IN',  // Marathi output
      'en': 'en-IN'
    };
    utterance.lang = langMap[language] || 'en-IN';
    
    // Adjust speech parameters for clarity
    utterance.rate = 0.85;  // Slightly slower for better clarity
    utterance.pitch = 1.1;   // Slightly higher pitch for friendly tone
    utterance.volume = 1;
    
    // Select appropriate Indian voice
    const indianVoice = this.getIndianVoice(language);
    if (indianVoice) {
      utterance.voice = indianVoice;
      console.log(`🔊 Speaking in ${language} with voice: ${indianVoice.name} (${indianVoice.lang})`);
    } else {
      console.log(`🔊 Speaking in ${language} with default voice`);
    }
    
    if (onEnd) {
      utterance.onend = onEnd;
    }
    
    utterance.onerror = (event) => {
      console.error('Speech error:', event);
    };
    
    // Ensure voices are loaded before speaking
    if (this.synthesis.getVoices().length === 0) {
      console.log('⏳ Waiting for voices to load...');
      const speakWhenReady = () => {
        this.loadVoices();
        const voice = this.getIndianVoice(language);
        if (voice) utterance.voice = voice;
        this.synthesis.speak(utterance);
        this.synthesis.onvoiceschanged = null;
      };
      this.synthesis.onvoiceschanged = speakWhenReady;
    } else {
      this.synthesis.speak(utterance);
    }
    
    return utterance;
  }

  // Check if speech synthesis is supported
  isSpeechSupported() {
    return this.supported;
  }

  // Stop speaking
  stopSpeaking() {
    if (this.synthesis && this.synthesis.speaking) {
      this.synthesis.cancel();
      console.log('🔊 Stopped speaking');
    }
  }
}

const voiceService = new VoiceService();
export default voiceService;