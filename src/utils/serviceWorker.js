// Service Worker registration utility
// This module handles the registration and lifecycle of the service worker

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

export function register(config) {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

      if (isLocalhost) {
        // This is running on localhost
        checkValidServiceWorker(swUrl, config);

        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://cra.link/PWA'
          );
        });
      } else {
        // Is not localhost. Register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      console.log('SW registered successfully:', registration);
      
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        
        installingWorker.addEventListener('statechange', () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // New content is available; please refresh
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://cra.link/PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // Content is cached for the first time
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        });
      });
      
      // Enable automatic updates
      setInterval(() => {
        registration.update();
      }, 60000); // Check for updates every minute
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' }
  })
    .then(response => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}

// Performance monitoring for cache effectiveness
export function monitorCachePerformance() {
  if ('serviceWorker' in navigator && 'caches' in window) {
    navigator.serviceWorker.ready.then(async () => {
      try {
        const cacheNames = await caches.keys();
        let totalCacheSize = 0;
        
        for (const cacheName of cacheNames) {
          const cache = await caches.open(cacheName);
          const requests = await cache.keys();
          
          for (const request of requests) {
            const response = await cache.match(request);
            if (response && response.headers.get('content-length')) {
              totalCacheSize += parseInt(response.headers.get('content-length'));
            }
          }
        }
        
        console.log(`Total cache size: ${(totalCacheSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Number of caches: ${cacheNames.length}`);
        
        // Send cache metrics to analytics if available
        if (window.gtag) {
          window.gtag('event', 'cache_performance', {
            custom_parameter_1: totalCacheSize,
            custom_parameter_2: cacheNames.length
          });
        }
      } catch (error) {
        console.error('Cache performance monitoring failed:', error);
      }
    });
  }
}

// Cache management utilities
export async function clearCache() {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('All caches cleared');
  }
}

export async function getCacheStatus() {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    const status = {};
    
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      status[cacheName] = requests.length;
    }
    
    return status;
  }
  return {};
}

// Preload critical resources
export function preloadCriticalResources(resources = []) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      if (registration.active) {
        registration.active.postMessage({
          type: 'PRELOAD_RESOURCES',
          resources: resources
        });
      }
    });
  }
}

// Network status monitoring
export function setupNetworkMonitoring() {
  function updateOnlineStatus() {
    const isOnline = navigator.onLine;
    console.log(`Network status: ${isOnline ? 'Online' : 'Offline'}`);
    
    // Update UI or trigger cache strategies based on network status
    if (window.gtag) {
      window.gtag('event', 'network_status', {
        custom_parameter_1: isOnline ? 'online' : 'offline'
      });
    }
  }

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  // Initial check
  updateOnlineStatus();
}
