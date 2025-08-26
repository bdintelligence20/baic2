import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as serviceWorker from './utils/serviceWorker';

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
