import { formatYearMonth } from '@/entities/calendar/lib/utils/format-date';
import { Schedule, SCHEDULE_COLORS } from '@/entities/calendar/model/types';
import { useScheduleStore } from '@/entities/calendar/model/schedule-store';
import { useTeamStore } from '@/entities/team/model/team-store';

interface CalendarEventListProps {
  currentDate: Date;
  selectedDate?: Date;
  onAddEvent?: () => void;
}

export default function CalendarEventList({
  currentDate,
  selectedDate,
  onAddEvent,
}: CalendarEventListProps) {
  const selectedTeamId = useTeamStore((state) => state.selectedTeamId);
  const getSchedulesByTeam = useScheduleStore(
    (state) => state.getSchedulesByTeam,
  );
  const teamSchedules = getSchedulesByTeam(selectedTeamId);

  const filteredSchedules = teamSchedules.filter((schedule) => {
    if (selectedDate) {
      const dateString = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
      return schedule.date === dateString;
    } else {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const [scheduleYear, scheduleMonth] = schedule.date
        .split('-')
        .map(Number);
      return scheduleYear === year && scheduleMonth === month;
    }
  });

  const formatDisplayDate = (date?: Date) => {
    if (date) {
      return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    }
    return formatYearMonth(currentDate);
  };

  return (
    <div className="mt-8 flex flex-1 flex-col overflow-hidden rounded-2xl bg-bg-textfiled">
      <div className="flex flex-shrink-0 items-center justify-start gap-2 p-6 pb-4">
        <h3 className="text-body-1 text-white">
          {formatDisplayDate(selectedDate)}
        </h3>

        <button
          onClick={onAddEvent}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bg-primary transition-colors hover:bg-[#6B3FD9]"
        >
          <span className="text-lg font-bold text-white">+</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {filteredSchedules.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-6 pt-8">
            <img src={'/assets/calendar/empty.png'} width={214} height={77} />
            <p className="text-body-2 text-tx-default_2">
              팀원들과 일정을 정해보세요
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredSchedules.map((schedule) => (
              <ScheduleItem key={schedule.id} schedule={schedule} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ScheduleItem({ schedule }: { schedule: Schedule }) {
  const colorHex =
    SCHEDULE_COLORS.find((c) => c.id === schedule.color)?.hex || schedule.color;
  const scheduleDate = new Date(schedule.date);
  const dayLabel = ['일', '월', '화', '수', '목', '금', '토'][
    scheduleDate.getDay()
  ];

  return (
    <div className="flex items-stretch gap-4 rounded-2xl bg-[#2a2d3e] p-4">
      <div className="flex min-w-[48px] flex-col items-center justify-center pt-0.5">
        <span className="text-2xl font-bold text-white">
          {scheduleDate.getDate()}
        </span>
        <span className="text-xs text-gray-400">{dayLabel}</span>
      </div>

      <div className="w-px self-stretch bg-[#3a3f52]" />

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 shrink-0 rounded-full"
            style={{ backgroundColor: colorHex }}
          />
          <span className="text-sm font-medium text-white">
            {schedule.title}
          </span>
        </div>

        {schedule.location && (
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <img src="/assets/icons/place.svg" alt="" className="h-3 w-3" />
            <span>{schedule.location}</span>
          </div>
        )}

        {schedule.time && (
          <div className="text-xs text-gray-400">{schedule.time}</div>
        )}
      </div>
    </div>
  );
}
