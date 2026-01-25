import { useState } from 'react';
import CalendarHeader from '@/widgets/calendar/ui/CalendarHeader';
import Calendar from '@/shared/ui/Calendar';
import CalendarEventList from '@/widgets/calendar/ui/CalendarEventList';

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleAddEvent = () => {
    // TODO: 일정 추가 모달 열기
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-shrink-0">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
        />

        <Calendar
          currentDate={currentDate}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </div>

      <CalendarEventList
        currentDate={currentDate}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}
