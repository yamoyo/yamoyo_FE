import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useMeetings } from '@/entities/calendar/hooks/useMeetings';
import { MEETING_COLOR_MAP } from '@/entities/calendar/model/types';
import { useTeamStore } from '@/entities/team/model/team-store';
import Calendar from '@/shared/ui/Calendar';
import CalendarHeader from '@/shared/ui/CalendarHeader';
import CalendarEventList from '@/widgets/calendar/ui/CalendarEventList';

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
          events={meetings.map((m) => ({
            id: m.meetingId,
            date: m.startTime.split('T')[0],
            colorHex: MEETING_COLOR_MAP[m.color],
          }))}
          onDateSelect={setSelectedDate}
        />
      </div>

      <CalendarEventList
        meetings={meetings}
        currentDate={currentDate}
        selectedDate={selectedDate}
        teamRoomId={selectedTeamId ?? undefined}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}
