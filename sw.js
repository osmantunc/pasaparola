const CACHE_NAME = 'pasaparola-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/words_vertical.txt',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/mammoth@1.4.21/mammoth.browser.min.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache'de varsa cache'den döndür
        if (response) {
          return response;
        }
        
        // Cache'de yoksa network'ten fetch et
        return fetch(event.request);
      }
    )
  );
});
