// --- sw.js content START ---
self.addEventListener('install', event => {
  const CACHE_NAME = 'offline-math-editor-v1';
  const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon.png',
    '/vendor/mathjax/es5/tex-mml-chtml.js'
  ];
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request).then(r => {
      // ネットワークから取得できたらキャッシュに入れる（オプション）
      return caches.open('offline-math-editor-v1').then(cache=>{ cache.put(event.request, r.clone()); return r; });
    }).catch(()=>{
      // フォールバック
      if(event.request.destination === 'document') return caches.match('/index.html');
    }))
  );
});
