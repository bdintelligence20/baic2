import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as serviceWorker from './utils/serviceWorker';
import { loadAnalyticsOnInteraction } from './utils/scriptLoader';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Register service worker for caching and performance
serviceWorker.register({
  onSuccess: () => {
    console.log('Service Worker registered successfully');
    // Monitor cache performance
    serviceWorker.monitorCachePerformance();
    // Setup network monitoring
    serviceWorker.setupNetworkMonitoring();
    // Preload critical resources
    serviceWorker.preloadCriticalResources([
      '/images/logos/baic-logo.svg',
      '/images/homehero/WEBSITE LANDSCAPE3 (1) (1).png',
      '/images/homehero/WEBSITE LANDSCAPE2 (1).jpg',
      '/images/homehero/WEBSITE LANDSCAPE4 (1).jpg'
    ]);
  },
  onUpdate: (registration) => {
    console.log('New content available, please refresh');
    // Optionally show update notification to user
  }
});

// Initialize deferred analytics loading
loadAnalyticsOnInteraction();

// Load Cookiebot when needed (on first form interaction or after 10 seconds)
setTimeout(() => {
  if (window.loadCookiebot) {
    window.loadCookiebot();
  }
}, 10000);

// Also load on form focus
document.addEventListener('focusin', function(e) {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
    if (window.loadCookiebot) {
      window.loadCookiebot();
    }
  }
}, { once: true });
