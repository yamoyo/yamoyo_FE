import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import {
  formatDateString,
  parseDateString,
} from '@/entities/calendar/lib/recurrence';
import { CreateScheduleFormData } from '@/entities/calendar/model/types';

// 달력 UI 상태(열림/현재월)와 이동/선택 핸들러를 묶은 훅
export default function useCalendarState(
  initialDate: string,
  setValue: UseFormSetValue<CreateScheduleFormData>,
) {
  // 초기 표시할 캘린더 날짜
  const initialCalendarDate = parseDateString(initialDate) ?? new Date();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarCurrentDate, setCalendarCurrentDate] =
    useState(initialCalendarDate);

  const handlePrevMonth = () => {
    // 이전 달로 이동
    setCalendarCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    // 다음 달로 이동
    setCalendarCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1),
    );
  };

  const handleToday = () => {
    // 오늘 날짜로 이동 + 폼 날짜값 업데이트 + 달력 닫기
    const today = new Date();
    setCalendarCurrentDate(today);
    setValue('startDate', formatDateString(today), { shouldValidate: true });
    setIsCalendarOpen(false);
  };

  const handleDateSelect = (selected: Date) => {
    // 날짜 선택 시 폼 값 반영 + 달력 닫기
    setValue('startDate', formatDateString(selected), { shouldValidate: true });
    setCalendarCurrentDate(selected);
    setIsCalendarOpen(false);
  };

  return {
    isCalendarOpen,
    setIsCalendarOpen,
    calendarCurrentDate,
    handlePrevMonth,
    handleNextMonth,
    handleToday,
    handleDateSelect,
  };
}
