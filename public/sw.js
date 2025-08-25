const CACHE_NAME = 'baic-v1.0.0';
const STATIC_CACHE = 'baic-static-v1.0.0';
const IMAGE_CACHE = 'baic-images-v1.0.0';
const API_CACHE = 'baic-api-v1.0.0';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png'
];

// Critical images to cache immediately
const CRITICAL_IMAGES = [
  '/images/hero/web banners/optimized/WEBSITE LANDSCAPE88.webp',
  '/images/hero/web banners/optimized/WEBSITE LANDSCAPE82.webp',
  '/images/homehero/optimized/WEBSITE LANDSCAPE3 (1) (1).webp',
  '/images/homehero/optimized/WEBSITE LANDSCAPE B40 LOGO (1).webp'
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(STATIC_ASSETS.concat(CRITICAL_IMAGES));
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName.startsWith('baic-') && 
                ![CACHE_NAME, STATIC_CACHE, IMAGE_CACHE, API_CACHE].includes(cacheName)) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Claim all clients immediately
      self.clients.claim()
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests (except for known CDNs)
  if (url.origin !== location.origin && 
      !url.hostname.includes('fonts.googleapis.com') &&
      !url.hostname.includes('fonts.gstatic.com') &&
      !url.hostname.includes('cdnjs.cloudflare.com')) {
    return;
  }

  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);
  
  // Strategy 1: Cache First for static assets and images
  if (isStaticAsset(url) || isImage(url)) {
    return cacheFirst(request, isImage(url) ? IMAGE_CACHE : STATIC_CACHE);
  }
  
  // Strategy 2: Network First for API calls
  if (isApiCall(url)) {
    return networkFirst(request, API_CACHE);
  }
  
  // Strategy 3: Stale While Revalidate for HTML pages
  if (isHTMLPage(request)) {
    return staleWhileRevalidate(request, CACHE_NAME);
  }
  
  // Default: Network only for everything else
  return fetch(request);
}

// Cache First Strategy - good for static assets
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    // Return cached version immediately
    return cached;
  }
  
  try {
    // Fetch from network and cache
    const response = await fetch(request);
    if (response.status === 200) {
      const responseClone = response.clone();
      await cache.put(request, responseClone);
    }
    return response;
  } catch (error) {
    console.log('Cache first failed:', error);
    throw error;
  }
}

// Network First Strategy - good for API calls
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    // Try network first
    const response = await fetch(request);
    if (response.status === 200) {
      const responseClone = response.clone();
      await cache.put(request, responseClone);
    }
    return response;
  } catch (error) {
    // Fallback to cache
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// Stale While Revalidate Strategy - good for HTML pages
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  // Always fetch from network (don't await)
  const networkPromise = fetch(request).then((response) => {
    if (response.status === 200) {
      const responseClone = response.clone();
      cache.put(request, responseClone);
    }
    return response;
  }).catch(() => {
    // Network failed, that's ok for SWR
  });
  
  // Return cached version immediately if available
  if (cached) {
    return cached;
  }
  
  // If no cache, wait for network
  return networkPromise;
}

// Helper functions
function isStaticAsset(url) {
  return url.pathname.includes('/static/') ||
         url.pathname.endsWith('.js') ||
         url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.woff2') ||
         url.pathname.endsWith('.woff') ||
         url.hostname.includes('fonts.googleapis.com') ||
         url.hostname.includes('fonts.gstatic.com') ||
         url.hostname.includes('cdnjs.cloudflare.com');
}

function isImage(url) {
  return /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(url.pathname);
}

function isApiCall(url) {
  return url.pathname.startsWith('/api/') || 
         url.pathname.includes('/graphql') ||
         url.hostname !== location.hostname;
}

function isHTMLPage(request) {
  return request.headers.get('Accept')?.includes('text/html');
}

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle background synchronization
  console.log('Background sync triggered');
}

// Push notifications (if needed in future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/logo192.png',
      badge: '/logo192.png',
      data: {
        url: '/'
      }
    };
    
    event.waitUntil(
      self.registration.showNotification('BAIC Automotive', options)
    );
  }
});

// Message handling
self.addEventListener('message', (event) => {
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'SKIP_WAITING':
        self.skipWaiting();
        break;
      case 'GET_VERSION':
        event.ports[0].postMessage({ version: CACHE_NAME });
        break;
      default:
        break;
    }
  }
});
