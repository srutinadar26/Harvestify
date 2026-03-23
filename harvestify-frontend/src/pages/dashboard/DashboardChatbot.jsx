// src/pages/dashboard/DashboardChatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaRobot, FaPaperPlane, FaTrash, FaSpinner, 
  FaMicrophone, FaStop, FaVolumeUp, 
  FaRegLightbulb, FaSeedling, FaCommentDots,
  FaUserCircle, FaLeaf
} from 'react-icons/fa';
import { sendMessageToAI, quickQuestions } from '../../services/chatService';
import voiceService from '../../services/voiceService';
import { useAuth } from '../../context/FirebaseAuthContext';
import ReactMarkdown from 'react-markdown';

const DashboardChatbot = () => {
  const { t, i18n } = useTranslation();
  const { currentUser } = useAuth();
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
    <div className="h-full flex flex-col bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-green-700 text-white flex-shrink-0">
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <FaRobot size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold">Harvestify AI Assistant</h2>
                <p className="text-xs text-green-100 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></span>
                  {simulateOffline ? '📴 Offline Mode' : '🌐 Online • Real-time Ready'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSimulateOffline(!simulateOffline)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  simulateOffline 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {simulateOffline ? '📴 OFFLINE' : '🔌 TEST'}
              </button>
              <button
                onClick={clearHistory}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-all duration-200"
                title={t('chat_clear')}
              >
                <FaTrash size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            {msg.sender === 'bot' && (
              <div className="flex-shrink-0 mr-2 mt-1">
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-primary to-green-600 flex items-center justify-center shadow-sm">
                  <FaLeaf size={12} className="text-white" />
                </div>
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-primary to-green-600 text-white rounded-br-none'
                  : msg.error
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
              }`}
            >
              {/* FIXED: Removed className from ReactMarkdown */}
              <ReactMarkdown>
                {msg.text}
              </ReactMarkdown>
              <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-white/20">
                <span className="text-[10px] opacity-60">
                  {formatTime(msg.timestamp)}
                </span>
                {msg.sender === 'bot' && !msg.error && voiceService.isSpeechSupported() && (
                  <button
                    onClick={() => speakLastMessage(msg.text)}
                    className="text-[10px] opacity-60 hover:opacity-100 ml-2 transition-all hover:scale-110"
                    title="Listen to response"
                  >
                    <FaVolumeUp size={10} />
                  </button>
                )}
              </div>
            </div>
            {msg.sender === 'user' && (
              <div className="flex-shrink-0 ml-2 mt-1">
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center shadow-sm">
                  <FaUserCircle size={14} className="text-white" />
                </div>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex-shrink-0 mr-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-primary to-green-600 flex items-center justify-center shadow-sm">
                <FaSeedling size={12} className="text-white animate-pulse" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-xl rounded-bl-none px-3 py-2 shadow-sm">
              <div className="flex items-center gap-1.5">
                <FaSpinner className="animate-spin text-primary text-xs" />
                <span className="text-xs text-gray-500 dark:text-gray-400">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-1.5 mb-1.5">
          <FaRegLightbulb className="text-yellow-500 text-xs" />
          <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            {t('chat_quick_questions')}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {currentQuestions.slice(0, 4).map((q, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(q.query)}
              className="text-[10px] bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-primary hover:text-white transition-all duration-200 shadow-sm"
            >
              {q.text.length > 30 ? q.text.slice(0, 30) + '...' : q.text}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex gap-2 items-end">
          {voiceSupported && (
            <button
              onClick={isListening ? stopVoiceInput : startVoiceInput}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse shadow-md' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white'
              }`}
              title={isListening ? "Stop listening" : "Speak your question"}
            >
              {isListening ? <FaStop size={14} /> : <FaMicrophone size={14} />}
            </button>
          )}
          
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isListening ? "🎤 Listening... Speak now" : t('chat_placeholder')}
              className="w-full resize-none p-2 pr-8 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white text-xs"
              rows={2}
              disabled={isListening}
            />
          </div>
          
          <button
            onClick={handleSend}
            disabled={isLoading || !inputMessage.trim() || isListening}
            className="p-2 rounded-lg bg-gradient-to-r from-primary to-green-600 text-white hover:shadow-md transition-all duration-200 disabled:opacity-50"
          >
            <FaPaperPlane size={14} />
          </button>
        </div>
        
        {/* Voice Feedback */}
        {isListening && (
          <div className="mt-2 text-center">
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded-full">
              <div className="flex gap-0.5">
                <div className="w-1 h-1 bg-red-500 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-red-500 rounded-full animate-bounce delay-75"></div>
                <div className="w-1 h-1 bg-red-500 rounded-full animate-bounce delay-150"></div>
              </div>
              <span className="text-[10px] text-red-600 dark:text-red-400">
                🎤 Listening in {i18n.language === 'hi' ? 'हिंदी' : i18n.language === 'mr' ? 'मराठी' : 'English'}...
              </span>
            </div>
          </div>
        )}
        
        {/* Speaking Indicator */}
        {isSpeaking && (
          <div className="mt-2 text-center">
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
              <div className="flex gap-0.5">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse delay-75"></div>
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse delay-150"></div>
              </div>
              <span className="text-[10px] text-green-600 dark:text-green-400">
                🔊 Speaking... 
                <button onClick={stopSpeaking} className="ml-1 underline">Stop</button>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardChatbot;