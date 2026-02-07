import { useNavigate } from 'react-router-dom';

import type { MeetingSummary } from '@/entities/calendar/api/meeting-dto';
import { MeetingItem } from '@/widgets/calendar/ui/CalendarEventList';

interface MeetingListProps {
  meetings: MeetingSummary[];
  teamRoomId: number;
  showAddButton?: boolean;
}

export default function MeetingList({
  meetings,
  teamRoomId,
  showAddButton = false,
}: MeetingListProps) {
  const navigate = useNavigate();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yearMonth = `${now.getFullYear()}년 ${now.getMonth() + 1}월`;

  const upcomingMeetings = meetings.filter((meeting) => {
    const meetingDate = new Date(meeting.startTime);
    return meetingDate >= today;
  });

  const handleAddMeeting = () => {
    navigate(`/calendar/create-schedule?teamId=${teamRoomId}`);
  };

  return (
    <div className="flex flex-col pb-6">
      <div className="pb-2">
        <h3 className="text-body-1 text-tx-default">{yearMonth}</h3>
      </div>

      <div className="flex flex-col gap-3">
        {upcomingMeetings.map((meeting) => (
          <MeetingItem
            key={meeting.meetingId}
            meeting={meeting}
            teamRoomId={teamRoomId}
          />
        ))}

        {showAddButton && (
          <button
            type="button"
            onClick={handleAddMeeting}
            className="inline-flex h-[79px] max-w-[342px] items-center justify-between rounded-xl bg-bg-card px-[18px] text-left"
          >
            <div className="flex flex-col gap-1">
              <span className="text-body-1 text-tx-default">추가 미팅</span>
              <span className="text-body-6 text-tx-default_3">
                팀원들과 빠르게 일정을 조율해보세요
              </span>
            </div>
            <div className="h-6 w-6 shrink-0">
              <img src="/assets/icons/calendar-plus.svg" alt="추가 회의" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
