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




// self.addEventListener('install', event => {
//   console.log('Service Worker installed');

//   event.waitUntil(
    
//     caches.open('keyTypers').then(caches => {
//       return caches.addAll(['/'])
  
//     }).then(() => {
//       console.log('Resources 뭐시기')
//     })

//   )
// });


// self.addEventListener('activate', event => {
//   console.log('Service Worker activated');
//   event.waitUntil(caches.keys().then(cacheNames => {  // 오타 수정: cacheNames로 변경
//     return Promise.all(cacheNames.map(cacheName => {
//       if (cacheName !== 'keyTypers') {  // 오타 수정: 'Ripple'에서 'keyTypers'로 변경
//         return caches.delete(cacheName);
//       }
//     }));
//   }).then(() => {
//     console.log('delete cache');
//   }));
// });



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






// 네트워크 요청 가로채기
// self.addEventListener('fetch', event => {
//   console.log('Fetch intercepted:', event.request.url);
//   // 캐시에서 리소스 반환 또는 네트워크 요청 수정 가능
// });


// 알림 수신
self.addEventListener('push', event => {
  console.log('Push notification received');
  // 알림을 처리하는 로직 작성 가능
  const options = {
    body: '핸들 이빠이 돌려',
    icon: './key.ico',
    // 기타 옵션들 설정 가능하다.
  };
  event.waitUntil(
    self.ServiceWorkerRegistration.showNotification('Notification Tite', options)
  )
});