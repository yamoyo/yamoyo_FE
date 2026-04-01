/**
 *
 * 두 날짜가 같은 날인지 비교합니다 (시간 제외)
 * @author junyeol
 * @param date1 - 비교할 첫 번째 날짜
 * @param date2 - 비교할 두 번째 날짜
 * @returns 같은 날이면 true, 다르면 false
 */

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
