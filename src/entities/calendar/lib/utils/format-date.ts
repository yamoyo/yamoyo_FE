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
