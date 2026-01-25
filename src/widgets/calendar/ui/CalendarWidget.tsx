import { useState } from 'react';
import CalendarHeader from '@/widgets/calendar/ui/CalendarHeader';
import Calendar from '@/shared/ui/Calendar';

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

  return (
    <div className="mt-[25px] overflow-hidden">
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
  );
}
