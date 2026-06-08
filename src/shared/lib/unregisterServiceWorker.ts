// 기존 VitePWA가 생성한 /sw.js를 제거하는 코드다.
// sw.js가 OAuth 로그인 요청을 가로채는 문제를 방지하기 위해 앱 진입 시 한 번 실행한다.
// Firebase 알림용 firebase-messaging-sw.js는 유지하고, PWA용 sw.js만 제거한다.
export const unregisterPwaServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) return;

  const isPwaServiceWorker = (url?: string) => {
    if (!url) return false;

    try {
      return new URL(url).pathname === '/sw.js';
    } catch {
      return url.endsWith('/sw.js');
    }
  };

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();

    await Promise.all(
      registrations.map(async (registration) => {
        const activeUrl = registration.active?.scriptURL;
        const installingUrl = registration.installing?.scriptURL;
        const waitingUrl = registration.waiting?.scriptURL;

        const isPwaSw =
          isPwaServiceWorker(activeUrl) ||
          isPwaServiceWorker(installingUrl) ||
          isPwaServiceWorker(waitingUrl);

        if (isPwaSw) {
          await registration.unregister();
        }
      }),
    );
  } catch (error) {
    console.warn('PWA Service Worker 해제 중 오류가 발생했습니다.', error);
  }
};
