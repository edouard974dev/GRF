self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('grf-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/app.js',
        '/data.json',
        '/manifest.json',
        '/icon.png'
      ])
    })
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
