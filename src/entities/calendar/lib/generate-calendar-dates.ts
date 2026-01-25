/**
 * 캘린더에 표시할 날짜 배열을 생성합니다 (5주 × 7일 = 35일)
 *
 * 이전 달의 마지막 날짜들부터 시작하여 일요일부터 시작하는 완전한 주 단위 캘린더를 구성합니다.
 * @author junyeol
 * @param date - 기준이 되는 날짜 (해당 월의 캘린더 생성)
 * @returns 캘린더에 표시할 35개의 Date 객체 배열
 */

export const generateCalendarDates = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const dates: Date[] = [];
  const current = new Date(startDate);

  for (let i = 0; i < 42; i++) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
};
