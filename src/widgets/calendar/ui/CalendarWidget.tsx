import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CalendarHeader from '@/widgets/calendar/ui/CalendarHeader';
import Calendar from '@/shared/ui/Calendar';
import CalendarEventList from '@/widgets/calendar/ui/CalendarEventList';
import { useScheduleStore } from '@/entities/calendar/model/schedule-store';
import { useTeamStore } from '@/entities/team/model/team-store';

export default function CalendarWidget() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>();

  const selectedTeamId = useTeamStore((state) => state.selectedTeamId);
  const getSchedulesByTeam = useScheduleStore(
    (state) => state.getSchedulesByTeam,
  );
  const teamSchedules = getSchedulesByTeam(selectedTeamId);

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
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    navigate(`/calendar/create-schedule?teamId=${teamId}&date=${today}`);
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
          schedules={teamSchedules}
          onDateSelect={setSelectedDate}
        />
      </div>

      <CalendarEventList
        currentDate={currentDate}
        selectedDate={selectedDate}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}
