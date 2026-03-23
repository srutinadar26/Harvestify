import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './context/ThemeContext';
import './i18n';

// Add language change listener to force re-render
import i18n from './i18n';

// Listen for language changes and reload the page (optional)
i18n.on('languageChanged', (lng) => {
  console.log('Language changed to:', lng);
  // You can optionally reload the page or let React handle it
  // window.location.reload(); // Uncomment if needed
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();