var params = new URLSearchParams(self.location.search);
var APP_VERSION = params.get('v') || 'v0.2.6';
var CACHE_NAME = 'clock-cache-' + APP_VERSION;
var ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

// 서비스 워커 설치 이벤트 - 핵심 리소스들을 로컬 캐시에 저장
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('서비스 워커: 필수 자원 캐싱 중...');
        return cache.addAll(ASSETS);
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
});

// 서비스 워커 활성화 이벤트 - 이전 캐시 정리 및 제어 권한 획득
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cache) {
          if (cache !== CACHE_NAME) {
            console.log('서비스 워커: 오래된 캐시 정리 중 - ' + cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// 네트워크 요청 가로채기 이벤트 - 오프라인 지원을 위한 캐시 우선 반환 패턴 (오프라인 모드 대응)
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          // 캐시 저장소에서 일치하는 파일 반환
          return response;
        }
        
        // 캐시에 존재하지 않으면 네트워크에서 직접 불러옴
        return fetch(event.request).catch(function(err) {
          console.error('서비스 워커: 네트워크 요청 실패 ' + event.request.url, err);
        });
      })
  );
});

// 메시지 수신 이벤트 - 즉시 활성화 요청 처리
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
