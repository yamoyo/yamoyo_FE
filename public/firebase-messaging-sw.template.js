importScripts(
  'https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js',
);

firebase.initializeApp({
  apiKey: '__FIREBASE_API_KEY__',
  authDomain: '__FIREBASE_AUTH_DOMAIN__',
  projectId: '__FIREBASE_PROJECT_ID__',
  storageBucket: '__FIREBASE_STORAGE_BUCKET__',
  messagingSenderId: '__FIREBASE_MESSAGING_SENDER_ID__',
  appId: '__FIREBASE_APP_ID__',
});
const messaging = firebase.messaging();

/**
 * 백그라운드 메시지 처리
 * - payload.notification 이 없을 수도 있어서 안전 처리
 * - data 메시지 기반으로 title/body를 내려주는 경우도 대응
 */
messaging.onBackgroundMessage((payload) => {
  const title = payload?.notification?.title || payload?.data?.title || '알림';
  const body = payload?.notification?.body || payload?.data?.body || '';
  const type = payload?.data?.type;
  const teamRoomId = payload?.data?.teamRoomId;
  const targetId = payload?.data?.targetId;

  self.registration.showNotification(title, {
    body,
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    data: { type, teamRoomId, targetId },
    tag: type && teamRoomId ? `${type}-${teamRoomId}` : undefined,
  });
});

/**
 * 알림 클릭 처리
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  // 추후 추가 예정
});
