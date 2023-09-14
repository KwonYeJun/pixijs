const CACHE_NAME = 'dotGame';
const urlsToCache = ['/'];


self.addEventListener('install', event => {
  console.log('Service Worker installed');

  event.waitUntil(
    caches.open(CACHE_NAME).then(caches => {
      return caches.addAll(urlsToCache);
    })
  );

  // 새로운 서비스 워커를 활성화하도록 설정
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // 새로운 서비스 워커를 제어하는 컨트롤 메시지를 보냄
      self.clients.claim();
    })
  );
});





self.addEventListener('fetch', event => {
  console.log("fetch intercepted:", event.request.url);

  event.respondWith(
    fetch(event.request).then(response => {
      // 네트워크 요청이 성공하면 응답을 캐시에 저장
      return caches.open(CACHE_NAME).then(cache => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch(() => {
      // 네트워크 요청이 실패하면 캐시에서 찾음
      return caches.match(event.request);
    })
  );
});



