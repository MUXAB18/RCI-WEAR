/**
 * Service Worker for RCI-WEAR
 * 
 * Provides:
 * - Offline support
 * - Instant repeat visits (cache-first)
 * - Background sync
 */

const CACHE_NAME = 'rci-wear-v2'
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/logo.webp',
  '/logo.jpg',
  '/favicon.svg',
  '/about_img.webp',
]

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE)
    })
  )
  self.skipWaiting()
})

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    })
  )
  self.clients.claim()
})

// Fetch event - cache-first strategy with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Skip cross-origin requests
  if (!request.url.startsWith(self.location.origin)) {
    return
  }
  
  // Cache-first strategy for static assets
  if (
    request.url.includes('.js') ||
    request.url.includes('.css') ||
    request.url.includes('.jpg') ||
    request.url.includes('.png') ||
    request.url.includes('.webp') ||
    request.url.includes('.avif') ||
    request.url.includes('.svg') ||
    request.url.includes('.woff2')
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          console.log(`✅ Cache hit: ${request.url}`)
          return response
        }
        
        return fetch(request)
          .then((response) => {
            // Cache successful responses
            if (response.ok) {
              const clone = response.clone()
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, clone)
              })
            }
            return response
          })
          .catch(() => {
            console.warn(`❌ Fetch failed: ${request.url}`)
            // Return cached version or offline page
            return caches.match(request)
          })
      })
    )
    return
  }
  
  // Network-first strategy for HTML pages
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone)
          })
        }
        return response
      })
      .catch(() => {
        console.warn(`⚠️  Network failed, using cache: ${request.url}`)
        return caches.match(request)
      })
  )
})

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
