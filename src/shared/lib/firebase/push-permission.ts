import { getToken } from 'firebase/messaging';

import { authClient } from '@/shared/api/auth/client';

import { messaging } from './firebase-config';

function getBrowserName() {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  return 'Unknown Browser';
}

async function registerDevice(fcmToken: string) {
  await authClient.post('/devices', {
    fcmToken,
    deviceType: 'WEB',
    deviceName: getBrowserName(),
  });
}

export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      console.error('알림 권한이 거부되었습니다.');
      return null;
    }

    const fcmToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (!fcmToken) return null;

    await registerDevice(fcmToken);
    return fcmToken;
  } catch (error) {
    console.error('FCM 토큰 발급 실패:', error);
    return null;
  }
}
