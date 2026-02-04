export function parseDateString(value?: string) {
  // YYYY-MM-DD 문자열을 Date로 변환 (로컬 시간)
  if (!value) return undefined;
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatDateLabel(date: Date) {
  // UI용 날짜 라벨 포맷 (YYYY.M.D(요일))
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'] as const;
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}(${dayNames[date.getDay()]})`;
}

export function formatMonthDayLabel(date: Date) {
  // UI용 날짜 라벨 포맷 (MM월 DD일)
  return `${String(date.getMonth() + 1).padStart(2)}월 ${String(
    date.getDate(),
  ).padStart(2, '0')}일`;
}

/** 30분 단위 시간 옵션 생성 (예: "08:00", "08:30", "09:00", ...) */
export function buildTimeOptions(startHour: number, endHour: number) {
  const options: string[] = [];
  for (let h = startHour; h < endHour; h++) {
    options.push(`${String(h).padStart(2, '0')}:00`);
    options.push(`${String(h).padStart(2, '0')}:30`);
  }
  options.push(`${String(endHour).padStart(2, '0')}:00`);
  return options;
}

export function addMonths(date: Date, months: number) {
  // 반복 생성 범위(예: 3개월) 계산을 위해 월 더하기
  return new Date(date.getFullYear(), date.getMonth() + months, date.getDate());
}

export function formatDateString(date: Date) {
  // Date를 YYYY-MM-DD 문자열로 변환
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(date.getDate()).padStart(2, '0')}`;
}

/** ms -> HH:MM:SS */
export function formatTimeString(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )}:${String(seconds).padStart(2, '0')}`;
}
