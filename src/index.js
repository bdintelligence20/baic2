import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { register, measureCoreWebVitals, addResourceHints } from './utils/serviceWorker';

// Load non-critical CSS asynchronously
const loadCSS = (href) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
};

// Load slick carousel CSS when needed
if (document.querySelector('.slick-carousel')) {
  import('slick-carousel/slick/slick.css');
  import('slick-carousel/slick/slick-theme.css');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for caching and offline support
register({
  onSuccess: () => {
    console.log('✅ Service Worker registered successfully');
  },
  onUpdate: () => {
    console.log('🔄 New version available - refresh to update');
  }
});

// Add resource hints for performance
addResourceHints();

// Start measuring Core Web Vitals
measureCoreWebVitals();

// Performance monitoring
reportWebVitals((metric) => {
  // Log performance metrics
  console.log(`Performance: ${metric.name}`, metric);
  
  // Send to Google Analytics if available
  if (window.gtag && process.env.NODE_ENV === 'production') {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
});
