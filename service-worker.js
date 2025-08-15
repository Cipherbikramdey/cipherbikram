
const CACHE_NAME = 'cipherbikram-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/js/main.js',
  // add more assets as needed
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        return caches.open(CACHE_NAME).then(cache => {
          // Optionally cache fetched files
          if (e.request.url.startsWith(self.location.origin)) {
            cache.put(e.request, res.clone());
          }
          return res;
        });
      }).catch(()=>caches.match('/index.html'));
    })
  );
});
