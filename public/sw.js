// Vasquez Law Firm Progressive Web App Service Worker
// Aggressive caching strategy for maximum performance

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAMES = {
  static: `static-${CACHE_VERSION}`,
  dynamic: `dynamic-${CACHE_VERSION}`,
  images: `images-${CACHE_VERSION}`,
  fonts: `fonts-${CACHE_VERSION}`,
};

// Critical resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html',
  // Add critical CSS and JS files here
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Network first, fallback to cache
  networkFirst: ['/api/', '/contact', '/attorneys/'],
  // Cache first, fallback to network
  cacheFirst: ['/fonts/', '/images/', '/_next/static/', '/favicon'],
  // Stale while revalidate
  staleWhileRevalidate: ['/practice-areas/', '/locations/', '/near-me/', '/blog/'],
};

// Install event - cache critical resources
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');

  event.waitUntil(
    caches
      .open(CACHE_NAMES.static)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!Object.values(CACHE_NAMES).includes(cacheName)) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all clients immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) return;

  // Determine caching strategy
  const strategy = getCacheStrategy(url.pathname);

  switch (strategy) {
    case 'networkFirst':
      event.respondWith(networkFirst(request));
      break;
    case 'cacheFirst':
      event.respondWith(cacheFirst(request));
      break;
    case 'staleWhileRevalidate':
      event.respondWith(staleWhileRevalidate(request));
      break;
    default:
      event.respondWith(networkFirst(request));
  }
});

// Network first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);

    // Clone the response before caching
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAMES.dynamic);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fallback to offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }

    throw error;
  }
}

// Cache first strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    // Determine appropriate cache based on request type
    let cacheName = CACHE_NAMES.dynamic;
    if (request.url.includes('/fonts/')) {
      cacheName = CACHE_NAMES.fonts;
    } else if (request.url.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/)) {
      cacheName = CACHE_NAMES.images;
    }

    const cache = await caches.open(cacheName);
    cache.put(request, networkResponse.clone());

    return networkResponse;
  } catch (error) {
    // Return offline fallback for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }
    throw error;
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);

  // Return cached version immediately if available
  const fetchPromise = fetch(request)
    .then(networkResponse => {
      if (networkResponse.ok) {
        const cache = caches.open(CACHE_NAMES.dynamic);
        cache.then(c => c.put(request, networkResponse.clone()));
      }
      return networkResponse;
    })
    .catch(() => {
      // Silently fail - we already returned cached response
    });

  return cachedResponse || fetchPromise;
}

// Determine cache strategy based on URL
function getCacheStrategy(pathname) {
  for (const [strategy, patterns] of Object.entries(CACHE_STRATEGIES)) {
    if (patterns.some(pattern => pathname.includes(pattern))) {
      return strategy;
    }
  }
  return 'networkFirst';
}

// Message event for cache management
self.addEventListener('message', event => {
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data.type === 'CLEAR_CACHE') {
    caches.keys().then(cacheNames => {
      cacheNames.forEach(cacheName => {
        caches.delete(cacheName);
      });
    });
  }

  if (event.data.type === 'CACHE_URLS') {
    const urls = event.data.urls || [];
    caches.open(CACHE_NAMES.dynamic).then(cache => {
      cache.addAll(urls);
    });
  }
});

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag.startsWith('form-submit-')) {
    event.waitUntil(handleFormSync(event.tag));
  }
});

async function handleFormSync(tag) {
  const formData = await getFormDataFromIndexedDB(tag);
  if (formData) {
    try {
      await fetch(formData.url, {
        method: 'POST',
        body: formData.body,
        headers: formData.headers,
      });
      // Clear from IndexedDB on success
      await clearFormDataFromIndexedDB(tag);
    } catch (error) {
      // Will retry on next sync
      console.error('[SW] Form sync failed:', error);
    }
  }
}

// Placeholder functions for IndexedDB operations
async function getFormDataFromIndexedDB(tag) {
  // Implement IndexedDB retrieval
  return null;
}

async function clearFormDataFromIndexedDB(tag) {
  // Implement IndexedDB clearing
}

// Performance monitoring
self.addEventListener('fetch', event => {
  const startTime = performance.now();

  event.waitUntil(
    event.respondWith(
      fetch(event.request).then(response => {
        const endTime = performance.now();
        const duration = endTime - startTime;

        // Log slow requests
        if (duration > 1000) {
          console.warn(`[SW] Slow request: ${event.request.url} took ${duration}ms`);
        }

        return response;
      })
    )
  );
});
