import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { BASE_URL } from '@/shared/api/base/request';

import type { WsClient, WsClientOptions, WsMessageHandler } from './types';

/**
 * JSON 파싱
 */
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

  // stomp 클라이언트 생성
  const client = new Client({
    webSocketFactory: () => new SockJS(`${BASE_URL}/ws-stomp`),
    connectHeaders: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {},
  });

  // 연결 완료
  client.onConnect = () => {
    onConnect?.();
  };

  // 에러 발생
  client.onStompError = (frame) => {
    onError?.(frame);
  };

  // 연결
  function connect() {
    client.activate();
  }

  // 연결 종료
  function disconnect() {
    client.deactivate();
  }

  // 구독
  // destination: 구독 주소
  function subscribe<T>(destination: string, handler: WsMessageHandler<T>) {
    // 메시지 수신 핸들러 등록
    const sub = client.subscribe(destination, (msg: IMessage) => {
      const raw = msg.body ?? '';
      handler({
        raw,
        json: parseJson<T>(raw),
      });
    });

    // unsubscribe 함수 반환
    return () => sub.unsubscribe();
  }

  // 메시지 보내기
  // destination: 구독 주소
  function publish(destination: string, body?: unknown) {
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
