const CACHE_NAME = 'baic-website-v1';
const RUNTIME_CACHE = 'baic-runtime-v1';
const IMAGE_CACHE = 'baic-images-v1';
const STATIC_CACHE = 'baic-static-v1';

// Assets to cache immediately on install
const PRECACHE_URLS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/images/logos/baic-logo.svg',
  '/images/logos/download.png'
];

// Cache strategies configuration
const CACHE_STRATEGIES = {
  // Cache first for static assets (CSS, JS, images)
  CACHE_FIRST: 'cache-first',
  // Network first for HTML pages
  NETWORK_FIRST: 'network-first',
  // Stale while revalidate for dynamic content
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Cache expiration times (in milliseconds)
const CACHE_EXPIRATION = {
  IMAGES: 30 * 24 * 60 * 60 * 1000, // 30 days
  STATIC: 7 * 24 * 60 * 60 * 1000,  // 7 days
  PAGES: 24 * 60 * 60 * 1000,       // 1 day
  API: 5 * 60 * 1000                // 5 minutes
};

// Install event - precache critical resources
self.addEventListener('install', event => {
  console.log('[SW] Installing Service Worker');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Precaching critical resources');
        return cache.addAll(PRECACHE_URLS.map(url => new Request(url, {
          credentials: 'same-origin'
        })));
      })
      .then(() => {
        console.log('[SW] Precaching complete');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[SW] Precaching failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating Service Worker');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => 
              cacheName !== CACHE_NAME && 
              cacheName !== RUNTIME_CACHE && 
              cacheName !== IMAGE_CACHE && 
              cacheName !== STATIC_CACHE
            )
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      // Take control of all clients immediately
      self.clients.claim()
    ]).then(() => {
      console.log('[SW] Service Worker activated and ready');
    })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Handle different types of requests with appropriate strategies
    
    // 1. HTML Pages - Network First with Cache Fallback
    if (request.headers.get('accept')?.includes('text/html')) {
      return await networkFirstStrategy(request, RUNTIME_CACHE);
    }
    
    // 2. Images - Cache First with Network Fallback
    if (request.url.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/i)) {
      return await cacheFirstStrategy(request, IMAGE_CACHE);
    }
    
    // 3. Static Assets (CSS, JS, Fonts) - Cache First
    if (request.url.match(/\.(css|js|woff|woff2|ttf|eot)$/i)) {
      return await cacheFirstStrategy(request, STATIC_CACHE);
    }
    
    // 4. API Calls and Dynamic Content - Stale While Revalidate
    if (url.pathname.startsWith('/api') || url.search.includes('utm')) {
      return await staleWhileRevalidateStrategy(request, RUNTIME_CACHE);
    }
    
    // 5. PDF and Document Downloads - Cache First
    if (request.url.match(/\.(pdf|doc|docx|xlsx|csv)$/i)) {
      return await cacheFirstStrategy(request, STATIC_CACHE);
    }
    
    // 6. Default - Network First for everything else
    return await networkFirstStrategy(request, RUNTIME_CACHE);
    
  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    
    // Return offline page or cached version if available
    if (request.headers.get('accept')?.includes('text/html')) {
      const cachedResponse = await caches.match('/');
      if (cachedResponse) {
        return cachedResponse;
      }
    }
    
    // Return a basic offline response
    return new Response('Offline - Content not available', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
  }
}

// Cache First Strategy - Check cache first, then network
async function cacheFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Check if cached response is still valid
    const cachedDate = new Date(cachedResponse.headers.get('date') || 0);
    const now = new Date();
    const isExpired = (now - cachedDate) > CACHE_EXPIRATION.IMAGES;
    
    if (!isExpired) {
      console.log('[SW] Serving from cache:', request.url);
      return cachedResponse;
    }
  }
  
  // If not in cache or expired, fetch from network
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Clone the response before caching
      const responseClone = networkResponse.clone();
      cache.put(request, responseClone);
      console.log('[SW] Cached new response:', request.url);
    }
    
    return networkResponse;
  } catch (error) {
    // If network fails, return cached version even if expired
    if (cachedResponse) {
      console.log('[SW] Network failed, serving stale cache:', request.url);
      return cachedResponse;
    }
    throw error;
  }
}

// Network First Strategy - Try network first, fallback to cache
async function networkFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Clone and cache the response
      const responseClone = networkResponse.clone();
      cache.put(request, responseClone);
      console.log('[SW] Updated cache with network response:', request.url);
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('[SW] Network failed, serving from cache:', request.url);
      return cachedResponse;
    }
    
    throw error;
  }
}

// Stale While Revalidate Strategy - Serve from cache while updating in background
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Start network request in background (don't await)
  const networkResponsePromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
      console.log('[SW] Background cache update:', request.url);
    }
    return response;
  }).catch(error => {
    console.log('[SW] Background network request failed:', error);
  });
  
  // Return cached response immediately if available
  if (cachedResponse) {
    console.log('[SW] Serving stale content while revalidating:', request.url);
    return cachedResponse;
  }
  
  // If no cached response, wait for network
  try {
    return await networkResponsePromise;
  } catch (error) {
    throw error;
  }
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle any queued offline actions
  console.log('[SW] Performing background sync tasks');
}

// Push notifications support
self.addEventListener('push', event => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/images/logos/download.png',
      badge: '/images/logos/download.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    
    event.waitUntil(
      self.registration.showNotification('BAIC Automotive', options)
    );
  }
});

// Cache management utilities
async function cleanupExpiredCaches() {
  const cacheNames = await caches.keys();
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const cachedDate = new Date(response.headers.get('date') || 0);
        const now = new Date();
        const isExpired = (now - cachedDate) > CACHE_EXPIRATION.STATIC;
        
        if (isExpired) {
          await cache.delete(request);
          console.log('[SW] Cleaned up expired cache entry:', request.url);
        }
      }
    }
  }
}

// Run cleanup periodically
setInterval(cleanupExpiredCaches, 24 * 60 * 60 * 1000); // Once per day
