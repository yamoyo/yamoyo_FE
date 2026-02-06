// --- 룰렛 회전 관련 --- //

/** 룰렛 회전 기본 바퀴 수 */
export const BASE_TURNS = 5;

/** 룰렛 회전 애니메이션 시간 (ms) */
export const SPIN_DURATION_MS = 2000;

// --- 룰렛 크기 관련 --- //

/** 룰렛 휠 크기 (px) */
export const WHEEL_SIZE_PX = 459;

/** 룰렛 테두리 이미지 크기 (px) */
export const BORDER_SIZE_PX = 462;

/** 화살표 래퍼 높이 (px) */
export const ARROW_WRAPPER_HEIGHT_PX = 70;

/** 화살표 이미지 높이 (px) */
export const ARROW_HEIGHT_PX = 58;

/** 화살표 이미지 너비 (px) */
export const ARROW_WIDTH_PX = 48;

/** 화살표 X축 오프셋 - 중앙 정렬 미세 조정용 (px) */
export const ARROW_OFFSET_X_PX = 1;

// --- 룰렛 세그먼트 관련 --- //

/** 라벨이 중심에서 떨어진 비율 (0.5 = 반지름의 50% 지점) */
export const LABEL_RADIUS_RATIO = 0.5;

/** 세그먼트 테두리 색상 */
export const SEGMENT_STROKE = 'rgba(0, 0, 0, 0.12)';

/** 세그먼트 배경 색상 (순서대로 반복) */
export const SEGMENT_COLORS = ['#4CE9F1', '#F8676B', '#EBE558', '#5CF559'];
