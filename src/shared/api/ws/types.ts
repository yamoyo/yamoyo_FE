// 메시지를 받았을 때 프론트가 처리하는 형태
export type WsMessage<T = unknown> = {
  raw: string; // 서버에서 온 원본 문자열
  json?: T; // JSON이면 파싱된 값
};

// 구독 핸들러
export type WsMessageHandler<T = unknown> = (msg: WsMessage<T>) => void;

// 클라이언트가 제공하는 기능
export type WsClient = {
  connect: () => void;
  disconnect: () => void;

  // destination: 구독 주소
  subscribe: <T = unknown>(
    destination: string,
    handler: WsMessageHandler<T>,
  ) => () => void;
  publish: (destination: string, body?: unknown) => void;
};

export type WsClientOptions = {
  accessToken?: string;
  onConnect?: () => void; // 연결 완료 후 실행
  onError?: (err: unknown) => void;
};
