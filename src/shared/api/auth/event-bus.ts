/**
 * 토큰만료/온보딩 X 상태를 전역으로 알리기 위한 이벤트 버스
 *
 * 예)
 * - AUTH_EXPIRED: 토큰 만료(재발급 실패) → 로그인 화면으로 이동
 * - TERMS_PENDING: 약관 동의 필요 → 약관 화면으로 이동
 * - PROFILE_PENDING: 프로필 입력 필요 → 프로필 화면으로 이동
 */

/** 라우팅(Blocked)이 필요한 이유들 */
export type AuthBlockReason =
  | 'AUTH_EXPIRED'
  | 'TERMS_PENDING'
  | 'PROFILE_PENDING';

type Listener = () => void;

/** reason(이유)별로 실행할 함수(리스너) 목록 */
const listeners: Record<AuthBlockReason, Listener[]> = {
  AUTH_EXPIRED: [],
  TERMS_PENDING: [],
  PROFILE_PENDING: [],
};

/** 각 reason 마다 한 번만 처리하기 위해 플래그 저장 (같은 이유 중복 처리 X) */
const notified: Record<AuthBlockReason, boolean> = {
  AUTH_EXPIRED: false,
  TERMS_PENDING: false,
  PROFILE_PENDING: false,
};

/** 현재 처리 중인 reason (동시에 여러 reason이 들어올 경우 1개만 처리) */
let activeReason: AuthBlockReason | null = null;

/** reason 우선순위 (값이 작을수록 우선순위 높음) */
const priority: Record<AuthBlockReason, number> = {
  AUTH_EXPIRED: 0,
  TERMS_PENDING: 1,
  PROFILE_PENDING: 2,
};

/**
 * ### reason 발생 시 실행할 함수를 등록
 * - '이벤트가 오면 무엇을 할지' 미리 등록해두는 용도
 *
 * 사용 예)
 * ```ts
 * const off = onAuthBlocked('TERMS_PENDING', () => navigate('/terms'));
 * ...
 * off(); // 구독 해제
 * ```
 */
export function onAuthBlocked(reason: AuthBlockReason, listener: Listener) {
  listeners[reason].push(listener);

  // 구독 해제 함수 반환
  return () => {
    listeners[reason] = listeners[reason].filter((l) => l !== listener);
  };
}

/**
 * reason 발생했음을 전역에 알림
 * - 이미 한 번 알렸다면(notified[reason] === true) 다시 알리지 않음
 * - 동시에 여러 reason이 발생한 경우, 우선순위가 높은 reason만 처리
 *
 * 사용 예)
 * notifyAuthBlocked('TERMS_PENDING');
 */
export function notifyAuthBlocked(reason: AuthBlockReason) {
  // 이미 처리 중인 reason이 있다면, 우선순위가 더 높은 경우만 교체
  if (activeReason) {
    const isHigherPriority = priority[reason] < priority[activeReason];

    if (!isHigherPriority) return;

    activeReason = reason;
  } else {
    activeReason = reason;
  }

  if (notified[reason]) return;
  notified[reason] = true;

  // 등록된 리스너 실행
  listeners[reason].forEach((listener) => listener());
}

/**
 * 처리가 끝났을 때 플래그 초기화
 *
 * 인자를 주면 해당 reason만 초기화
 * 인자가 없으면 전체 reason 초기화
 */
export function resetAuthBlocked(reasons?: AuthBlockReason[]) {
  const targets = reasons ?? (Object.keys(notified) as AuthBlockReason[]);
  targets.forEach((reason) => {
    notified[reason] = false;
  });

  // 현재 처리 중인 reason 초기화
  activeReason = null;
}

/** 특정 reason이 이미 플래그 되었는지 확인 (혹시 몰라 추가) */
export function isAuthBlockedNotified(reason: AuthBlockReason) {
  return notified[reason];
}
