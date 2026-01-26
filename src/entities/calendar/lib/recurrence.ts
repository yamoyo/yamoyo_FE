import { CreateScheduleFormData } from '@/entities/calendar/model/types';

export function parseDateString(value?: string) {
  // YYYY-MM-DD 문자열을 Date로 변환 (로컬 시간)
  if (!value) return undefined;
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatDateLabel(date: Date) {
  // UI용 날짜 라벨 포맷 (YYYY년 MM월 DD일 (요일))
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'] as const;
  return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}월 ${String(date.getDate()).padStart(2, '0')}일 (${dayNames[date.getDay()]})`;
}

export function formatMonthDayLabel(date: Date) {
  // UI용 날짜 라벨 포맷 (MM월 DD일)
  return `${String(date.getMonth() + 1).padStart(2)}월 ${String(
    date.getDate(),
  ).padStart(2, '0')}일`;
}

export function buildTimeOptions(startHour: number, endHour: number) {
  // 시간 범위 옵션 생성 (예: 08:00-09:00)
  const totalHours = endHour - startHour;
  return Array.from({ length: totalHours }, (_, index) => {
    const start = startHour + index;
    const end = start + 1;
    return `${String(start).padStart(2, '0')}:00-${String(end).padStart(
      2,
      '0',
    )}:00`;
  });
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

export function buildWeeklySchedules(
  base: CreateScheduleFormData,
  startDate: Date,
  endDate: Date,
) {
  // 시작일 포함, 종료일 미포함으로 주간 일정 생성
  const schedules: CreateScheduleFormData[] = [];
  const current = new Date(startDate);
  while (current < endDate) {
    schedules.push({
      ...base,
      date: formatDateString(current),
    });
    current.setDate(current.getDate() + 7);
  }
  return schedules.map((schedule) => ({
    ...schedule,
    id: crypto.randomUUID(),
  }));
}
