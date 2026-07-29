/**
 * Service Worker for RCI-WEAR
 * v3 — Stale-While-Revalidate for hashed assets, Network-First for HTML
 *
 * Strategy:
 *  - HTML pages  → Network-first (always try to get latest index.html)
 *  - Hashed JS/CSS (/assets/*.js, /assets/*.css)
 *                → Cache-first (Vite content-hashes guarantee freshness)
 *  - Images      → Stale-while-revalidate (fast load, refreshes in bg)
 *  - Fonts       → Cache-first with long TTL (rarely change)
 */

const CACHE_NAME = 'rci-wear-v4'

// ── Install: only pre-cache the shell; nothing that changes per-deploy ──
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([
        '/logo.webp',
        '/logo.jpg',
        '/about_img.webp',
      ])
    )
  )
  // Take over immediately so new SW activates without waiting for old tabs to close
  self.skipWaiting()
})

// ── Activate: delete ALL old caches ──
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((n) => n !== CACHE_NAME)
          .map((n) => caches.delete(n))
      )
    )
  )
  self.clients.claim()
})

// ── Fetch ──
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Only intercept same-origin GET requests
  if (request.method !== 'GET') return
  if (url.origin !== self.location.origin) return

  // ── 1. Hashed Vite assets: cache-first (content-hash = always fresh) ──
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(cacheFirst(request))
    return
  }

  // ── 2. Images: stale-while-revalidate ──
  if (/\.(webp|avif|jpg|jpeg|png|gif|svg|ico)(\?.*)?$/.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request))
    return
  }

  // ── 3. Fonts: cache-first (very stable) ──
  if (/\.(woff2|woff|ttf)(\?.*)?$/.test(url.pathname)) {
    event.respondWith(cacheFirst(request))
    return
  }

  // ── 4. HTML / navigation: network-first (ensures users see latest deploy) ──
  event.respondWith(networkFirst(request))
})

// ─────────────────────────────────────────
//  Strategies
// ─────────────────────────────────────────

/** Cache-first: serve from cache; fetch and store if missing */
async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached) return cached

  const response = await fetch(request)
  if (response.ok) {
    const cache = await caches.open(CACHE_NAME)
    cache.put(request, response.clone())
  }
  return response
}

/** Network-first: fetch from network; fall back to cache on failure */
async function networkFirst(request) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    const cached = await caches.match(request)
    if (cached) return cached
    // Last resort: serve index.html for SPA navigation
    return caches.match('/index.html')
  }
}

/** Stale-while-revalidate: serve cache immediately, refresh in background */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(request)

  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone())
    return response
  }).catch(() => null)

  return cached || fetchPromise
}

// ── Message: allow app to force-skip waiting ──
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting()
})
