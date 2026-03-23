// src/pages/ChatbotPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  FaRobot, FaPaperPlane, FaTrash, FaSpinner, 
  FaMicrophone, FaStop, FaVolumeUp, 
  FaRegLightbulb, FaSeedling, FaCommentDots,
  FaArrowLeft, FaUserCircle, FaLeaf
} from 'react-icons/fa';
import { sendMessageToAI, quickQuestions } from '../services/chatService';
import voiceService from '../services/voiceService';
import { useAuth } from '../context/FirebaseAuthContext';
import ReactMarkdown from 'react-markdown';

const ChatbotPage = () => {
  const { t, i18n } = useTranslation();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [simulateOffline, setSimulateOffline] = useState(false);

  useEffect(() => {
    setVoiceSupported(voiceService.isSpeechSupported());
  }, []);

  useEffect(() => {
    const savedMessages = localStorage.getItem('harvestify_chat_history');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([{
        id: Date.now(),
        text: t('chat_welcome'),
        sender: 'bot',
        timestamp: new Date().toISOString()
      }]);
    }
  }, [t]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('harvestify_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const speakLastMessage = (messageText) => {
    if (!voiceService.isSpeechSupported()) return;
    voiceService.stopSpeaking();
    setIsSpeaking(true);
    voiceService.speak(messageText, i18n.language, () => {
      setIsSpeaking(false);
    });
  };

  const sendMessage = async (message, autoSpeak = true) => {
    if (!message.trim()) return;

    const userLocation = currentUser?.state || 'Punjab';
    let detectedCrop = 'Wheat';
    const cropKeywords = ['wheat', 'rice', 'maize', 'cotton', 'sugarcane', 'potato', 'tomato'];
    for (const crop of cropKeywords) {
      if (message.toLowerCase().includes(crop)) {
        detectedCrop = crop.charAt(0).toUpperCase() + crop.slice(1);
        break;
      }
    }

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    const isActuallyOffline = simulateOffline || !navigator.onLine;
    const language = i18n.language;
    const response = await sendMessageToAI(message, language, userLocation, detectedCrop, isActuallyOffline);

    const botMessage = {
      id: Date.now() + 1,
      text: response.success ? response.message : `❌ ${response.message}`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      error: !response.success
    };
    setMessages(prev => [...prev, botMessage]);
    
    if (autoSpeak && response.success && voiceService.isSpeechSupported()) {
      setTimeout(() => speakLastMessage(response.message), 500);
    }
    
    setIsLoading(false);
  };

  const handleSend = () => {
    sendMessage(inputMessage);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startVoiceInput = () => {
    if (!voiceService.isSpeechSupported()) {
      alert('Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    setIsListening(true);
    voiceService.setLanguage(i18n.language);
    
    voiceService.startListening(
      (transcript) => {
        setIsListening(false);
        if (transcript && transcript.trim()) {
          setInputMessage(transcript);
          sendMessage(transcript);
        }
      },
      (error) => {
        console.error('Voice error:', error);
        setIsListening(false);
        if (error !== 'no-speech') {
          alert('Could not understand. Please try again.');
        }
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const stopVoiceInput = () => {
    voiceService.stopListening();
    setIsListening(false);
  };

  const stopSpeaking = () => {
    voiceService.stopSpeaking();
    setIsSpeaking(false);
  };

  const clearHistory = () => {
    if (window.confirm(t('chat_clear_confirm'))) {
      setMessages([{
        id: Date.now(),
        text: t('chat_welcome'),
        sender: 'bot',
        timestamp: new Date().toISOString()
      }]);
      localStorage.removeItem('harvestify_chat_history');
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const currentQuestions = quickQuestions[i18n.language] || quickQuestions.en;

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Header - Fixed at top */}
      <header className="bg-gradient-to-r from-primary to-green-700 text-white shadow-lg flex-shrink-0">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200"
                aria-label="Go back"
              >
                <FaArrowLeft size={24} />
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-sm">
                  <FaRobot size={28} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Harvestify AI Assistant</h1>
                  <p className="text-sm text-green-100 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                    {simulateOffline ? 'Offline Mode - Local Knowledge' : 'Online • Real-time Data Ready'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSimulateOffline(!simulateOffline)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  simulateOffline 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {simulateOffline ? '📴 OFFLINE' : '🔌 TEST OFFLINE'}
              </button>
              <button
                onClick={clearHistory}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200"
                title={t('chat_clear')}
              >
                <FaTrash size={18} />
              </button>
              {currentUser && (
                <div className="flex items-center gap-2 ml-4">
                  <FaUserCircle size={32} className="text-white" />
                  <span className="text-sm font-medium hidden md:inline">
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Area - Takes remaining space */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full h-full">
          
          {/* Messages Area - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                {msg.sender === 'bot' && (
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary to-green-600 flex items-center justify-center shadow-md">
                      <FaLeaf size={16} className="text-white" />
                    </div>
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-primary to-green-600 text-white rounded-br-none'
                      : msg.error
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                  }`}
                >
                  <ReactMarkdown className="text-sm leading-relaxed">
                    {msg.text}
                  </ReactMarkdown>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/20">
                    <span className="text-xs opacity-60">
                      {formatTime(msg.timestamp)}
                    </span>
                    {msg.sender === 'bot' && !msg.error && voiceService.isSpeechSupported() && (
                      <button
                        onClick={() => speakLastMessage(msg.text)}
                        className="text-xs opacity-60 hover:opacity-100 ml-2 transition-all hover:scale-110"
                        title="Listen to response"
                      >
                        <FaVolumeUp size={12} />
                      </button>
                    )}
                  </div>
                </div>
                {msg.sender === 'user' && (
                  <div className="flex-shrink-0 ml-3 mt-1">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center shadow-md">
                      <FaUserCircle size={18} className="text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary to-green-600 flex items-center justify-center shadow-md">
                    <FaSeedling size={16} className="text-white animate-pulse" />
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-none px-5 py-3 shadow-md">
                  <div className="flex items-center gap-2">
                    <FaSpinner className="animate-spin text-primary" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions - Compact at bottom */}
          <div className="flex-shrink-0 px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2 mb-2">
              <FaRegLightbulb className="text-yellow-500 text-sm" />
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                {t('chat_quick_questions')}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentQuestions.slice(0, 6).map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(q.query)}
                  className="text-xs bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {q.text}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area - Fixed at bottom */}
          <div className="flex-shrink-0 p-5 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex gap-2 items-end">
              {voiceSupported && (
                <button
                  onClick={isListening ? stopVoiceInput : startVoiceInput}
                  className={`p-2.5 rounded-xl transition-all duration-200 ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse shadow-lg' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white'
                  }`}
                  title={isListening ? "Stop listening" : "Speak your question"}
                >
                  {isListening ? <FaStop size={18} /> : <FaMicrophone size={18} />}
                </button>
              )}
              
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isListening ? "🎤 Listening... Speak now" : t('chat_placeholder')}
                  className="w-full resize-none p-3 pr-12 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                  rows={2}
                  disabled={isListening}
                />
              </div>
              
              <button
                onClick={handleSend}
                disabled={isLoading || !inputMessage.trim() || isListening}
                className="p-2.5 rounded-xl bg-gradient-to-r from-primary to-green-600 text-white hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
              >
                <FaPaperPlane size={18} />
              </button>
            </div>
            
            {/* Voice Feedback */}
            {isListening && (
              <div className="mt-2 text-center animate-pulse">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce delay-150"></div>
                  </div>
                  <span className="text-xs text-red-600 dark:text-red-400">
                    🎤 Listening in {i18n.language === 'hi' ? 'हिंदी' : i18n.language === 'mr' ? 'मराठी' : 'English'}...
                  </span>
                </div>
              </div>
            )}
            
            {/* Speaking Indicator */}
            {isSpeaking && (
              <div className="mt-2 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse delay-150"></div>
                  </div>
                  <span className="text-xs text-green-600 dark:text-green-400">
                    🔊 Speaking... 
                    <button onClick={stopSpeaking} className="ml-2 underline">Stop</button>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;