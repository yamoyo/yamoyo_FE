import { useState } from 'react';
import Calendar from '@/shared/ui/Calendar';
import CalendarHeader from '@/widgets/calendar/ui/CalendarHeader';
import ModalDim from '@/shared/ui/modal/ModalDim';
import { useModalStore } from './model/modal-store';
import { CalendarModalOptions } from './model/types';

export default function CalendarModal({
  initialDate,
  selectedDate,
  onSelectDate,
}: CalendarModalOptions) {
  const closeModal = useModalStore((s) => s.closeModal);
  const baseDate = selectedDate ?? initialDate ?? new Date();
  const [currentDate, setCurrentDate] = useState(baseDate);
  const [highlightDate, setHighlightDate] = useState<Date | undefined>(
    selectedDate,
  );

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setHighlightDate(today);
    onSelectDate(today);
    closeModal();
  };

  const handleDateSelect = (date: Date) => {
    setHighlightDate(date);
    onSelectDate(date);
    closeModal();
  };

  return (
    <ModalDim>
      <div className="h-[52vh] max-h-[358px] w-[92vw] max-w-[342px] overflow-hidden rounded-2xl bg-bg-default">
        <div className="flex justify-center">
          <div className="w-full origin-top">
            <CalendarHeader
              currentDate={currentDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onToday={handleToday}
              className="px-3 pt-4"
              labelClassName="min-w-[88px]"
              todayButtonClassName="px-3"
            />
            <Calendar
              currentDate={currentDate}
              selectedDate={highlightDate}
              onDateSelect={handleDateSelect}
              containerClassName="px-2 pt-3"
            />
          </div>
        </div>
      </div>
    </ModalDim>
  );
}
