// 기존 VitePWA가 생성한 /sw.js를 제거 코드
// sw.js가 OAuth 로그인 요청을 가로채는 문제를 방지하기 위해 앱 진입 시 한 번 실행
// Firebase 알림용 firebase-messaging-sw.js는 유지하고, PWA용 sw.js만 제거
export const unregisterPwaServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) return;

  const registrations = await navigator.serviceWorker.getRegistrations();

  await Promise.all(
    registrations.map((registration) => {
      const activeUrl = registration.active?.scriptURL;
      const installingUrl = registration.installing?.scriptURL;
      const waitingUrl = registration.waiting?.scriptURL;

      const isPwaSw =
        activeUrl?.endsWith('/sw.js') ||
        installingUrl?.endsWith('/sw.js') ||
        waitingUrl?.endsWith('/sw.js');

      if (isPwaSw) {
        return registration.unregister();
      }

      return Promise.resolve(false);
    }),
  );
};
