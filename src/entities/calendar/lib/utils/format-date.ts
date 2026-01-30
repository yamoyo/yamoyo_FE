/**
 * 날짜를 "YYYY년 M월" 형식으로 포맷팅합니다
 * @author junyeol
 * @param date - 포맷팅할 날짜
 * @returns "2026년 1월" 형식의 문자열
 * @example
 * formatYearMonth(new Date('2026-01-25')) // "2026년 1월"
 */
export const formatYearMonth = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}년 ${month}월`;
};

/**
 * 날짜를 "YYYY.MM.DD" 형식으로 포맷팅합니다
 * @param date - 포맷팅할 날짜 (Date 객체 또는 날짜 문자열)
 * @returns "2025.01.11" 형식의 문자열
 * @example
 * formatDateDot(new Date('2025-01-11')) // "2025.01.11"
 * formatDateDot('2025-01-11') // "2025.01.11"
 */
export const formatDateDot = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};
