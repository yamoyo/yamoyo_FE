import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useMeetings } from '@/entities/calendar/hooks/useMeetings';
import { useTeamStore } from '@/entities/team/model/team-store';
import Calendar from '@/shared/ui/Calendar';
import CalendarEventList from '@/widgets/calendar/ui/CalendarEventList';
import CalendarHeader from '@/widgets/calendar/ui/CalendarHeader';

export default function CalendarWidget() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>();

  const selectedTeamId = useTeamStore((state) => state.selectedTeamId);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const { data } = useMeetings(selectedTeamId, year, month);
  const meetings = data?.meetings ?? [];

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
    setSelectedDate(undefined);
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
    setSelectedDate(undefined);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const handleAddEvent = () => {
    const teamId = searchParams.get('teamId') || '';
    navigate(`/calendar/create-schedule?teamId=${teamId}`);
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
          meetings={meetings}
          onDateSelect={setSelectedDate}
        />
      </div>

      <CalendarEventList
        meetings={meetings}
        currentDate={currentDate}
        selectedDate={selectedDate}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}
