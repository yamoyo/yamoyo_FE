import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { BASE_URL } from '@/shared/api/base/request';

import type { WsClient, WsClientOptions, WsMessageHandler } from './types';

// 대기중인 구독 타입
type PendingSub = {
  destination: string;
  callback: (msg: IMessage) => void; // 구독 콜백
  sub?: { unsubscribe: () => void };
  cancelled?: boolean;
};

// 대기중인 발행 타입
type PendingPub = {
  destination: string;
  body?: unknown;
  cancelled?: boolean;
};

/** JSON 파싱 */
function parseJson<T>(raw: string): T | undefined {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

/**
 * ### createStompClient란?
 * - STOMP + SockJS를 감싼 웹소켓 클라이언트 생성 함수
 *
 */
export function createStompClient(options: WsClientOptions): WsClient {
  const { accessToken, onConnect, onError } = options;

  let isConnected = false;
  const pendingSubs: PendingSub[] = [];
  const pendingPubs: PendingPub[] = [];

  // stomp 클라이언트 생성
  const client = new Client({
    webSocketFactory: () => new SockJS(`${BASE_URL}/ws-stomp`),
    connectHeaders: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {},
  });

  // 연결 완료
  client.onConnect = () => {
    isConnected = true;

    // 연결되면 그동안 요청된 subscribe를 모두 등록
    for (const p of pendingSubs) {
      if (p.cancelled) continue;
      p.sub = client.subscribe(p.destination, p.callback);
    }

    for (const p of pendingPubs) {
      if (p.cancelled) continue;
      client.publish({
        destination: p.destination,
        body: p.body ? JSON.stringify(p.body) : '{}',
      });
    }

    pendingSubs.length = 0;
    pendingPubs.length = 0;

    onConnect?.();
  };

  client.onDisconnect = () => {
    isConnected = false;
  };
  client.onWebSocketClose = () => {
    isConnected = false;
  };

  // 에러 발생
  client.onStompError = (frame) => onError?.(frame);

  // 연결
  function connect() {
    client.activate();
  }

  // 연결 종료
  function disconnect() {
    // 연결 끊을 때 pending 정리
    pendingSubs.length = 0;
    pendingPubs.length = 0;
    client.deactivate();
  }

  // 구독
  // destination: 구독 주소
  function subscribe<T>(destination: string, handler: WsMessageHandler<T>) {
    // cb:
    const callback = (msg: IMessage) => {
      const raw = msg.body ?? '';
      handler({ raw, json: parseJson<T>(raw) });
    };

    // 아직 연결 전이면 pending에 추가 / 연결되면 구독 시작
    const p: PendingSub = { destination, callback };
    if (isConnected) {
      p.sub = client.subscribe(destination, callback);
    } else {
      pendingSubs.push(p);
    }

    // unsubscribe는 언제든 안전하게 동작
    return () => {
      if (p.sub) p.sub.unsubscribe();
      else p.cancelled = true;
    };
  }

  // 메시지 보내기
  // destination: 구독 주소
  function publish(destination: string, body?: unknown) {
    if (!isConnected) {
      // 연결 전이면 pending에 추가
      pendingPubs.push({ destination, body });
      return;
    }
    client.publish({
      destination,
      body: body ? JSON.stringify(body) : '{}',
    });
  }

  return {
    connect,
    disconnect,
    subscribe,
    publish,
  };
}
