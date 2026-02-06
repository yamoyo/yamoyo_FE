type Listener = () => void;

const listeners = new Set<Listener>();

let expiredEmitted = false;

export function onAuthExpired(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** 만료 이벤트는 1회만 발행 (중복 alert/navigate 방지) */
export function notifyAuthExpired() {
  if (expiredEmitted) return;
  expiredEmitted = true;

  listeners.forEach((listener) => listener());
}

/** 로그인 성공/토큰 재발급 성공 등 “정상 상태 복귀” 시 호출 */
export function resetAuthExpired() {
  expiredEmitted = false;
}

/** 현재 상태 확인용 */
export function isAuthExpiredEmitted() {
  return expiredEmitted;
}
