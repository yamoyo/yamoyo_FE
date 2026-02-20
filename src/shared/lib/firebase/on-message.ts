import { onMessage } from 'firebase/messaging';

import type { FcmPayload } from '@/entities/notification/model/fcm-payload';
import { messaging } from '@/shared/lib/firebase/firebase-config';

export function listenForegroundMessages(
  handler: (payload: FcmPayload) => void,
) {
  return onMessage(messaging, (raw) => {
    const payload = raw as unknown as FcmPayload;
    handler(payload);
  });
}
