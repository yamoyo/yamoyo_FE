import type { MeetingSummary } from '@/entities/calendar/api/meeting-dto';
import { formatYearMonth } from '@/entities/calendar/lib/utils/format-date';
import { MEETING_COLOR_MAP } from '@/entities/calendar/model/types';

interface CalendarEventListProps {
  meetings: MeetingSummary[];
  currentDate: Date;
  selectedDate?: Date;
  onAddEvent?: () => void;
}

export default function CalendarEventList({
  meetings,
  currentDate,
  selectedDate,
  onAddEvent,
}: CalendarEventListProps) {
  const filteredMeetings = meetings.filter((meeting) => {
    const meetingDate = meeting.startTime.split('T')[0]; // "2025-02-15"
    if (selectedDate) {
      const dateString = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
      return meetingDate === dateString;
    } else {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const [meetingYear, meetingMonth] = meetingDate.split('-').map(Number);
      return meetingYear === year && meetingMonth === month;
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
        {filteredMeetings.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-6 pt-8">
            <img src={'/assets/calendar/empty.png'} width={214} height={77} />
            <p className="text-body-2 text-tx-default_2">
              팀원들과 일정을 정해보세요
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredMeetings.map((meeting) => (
              <MeetingItem key={meeting.meetingId} meeting={meeting} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function MeetingItem({ meeting }: { meeting: MeetingSummary }) {
  const colorHex = MEETING_COLOR_MAP[meeting.color];
  const meetingDate = new Date(meeting.startTime);
  const dayLabel = ['일', '월', '화', '수', '목', '금', '토'][
    meetingDate.getDay()
  ];

  const startTimeStr = meeting.startTime.split('T')[1]?.slice(0, 5); // "14:00"
  const endTimeStr = meeting.endTime.split('T')[1]?.slice(0, 5); // "15:30"
  const hasLocation = Boolean(meeting.location?.trim());
  const locationLabel = hasLocation ? meeting.location!.trim() : '온라인';
  const locationIconSrc = hasLocation
    ? '/assets/icons/place.svg'
    : '/assets/icons/online.svg';

  return (
    <div className="flex items-center justify-between rounded-2xl bg-bg-card p-4">
      <div className="flex items-stretch gap-4">
        <div className="w-[22px] flex-col pt-0.5 flex-center">
          <span className="text-title-3 text-tx-default">
            {meetingDate.getDate()}
          </span>
          <span className="text-body-7 text-tx-default_3">{dayLabel}</span>
        </div>

        <div className="w-[1.5px] self-stretch bg-bg-textfiled" />

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: colorHex }}
            />
            <span className="text-body-5 text-tx-default_3">
              {meeting.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <img
              src={locationIconSrc}
              alt={hasLocation ? '오프라인' : '온라인'}
              width={12}
              height={12}
            />
            <div className="text-body-5 text-tx-default_3">{locationLabel}</div>
          </div>

          {startTimeStr && endTimeStr && (
            <div className="text-body-5 text-tx-default_3">
              {startTimeStr} - {endTimeStr}
            </div>
          )}
        </div>
      </div>

      <div className="h-10 w-8 shrink-0 px-[1px] flex-center">
        <img
          src="/assets/icons/arrow-left.svg"
          alt="상세보기"
          className="rotate-180"
        />
      </div>
    </div>
  );
}
