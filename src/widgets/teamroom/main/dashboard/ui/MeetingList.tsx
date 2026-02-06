import type { MeetingSummary } from '@/entities/calendar/api/meeting-dto';
import { MeetingItem } from '@/widgets/calendar/ui/CalendarEventList';

interface MeetingListProps {
  meetings: MeetingSummary[];
  teamRoomId: number;
}

export default function MeetingList({
  meetings,
  teamRoomId,
}: MeetingListProps) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yearMonth = `${now.getFullYear()}년 ${now.getMonth() + 1}월`;

  const upcomingMeetings = meetings.filter((meeting) => {
    const meetingDate = new Date(meeting.startTime);
    return meetingDate >= today;
  });

  return (
    <div className="flex max-h-[400px] flex-col overflow-hidden">
      <div className="flex-shrink-0 pb-2">
        <h3 className="text-body-1 text-tx-default">{yearMonth}</h3>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        <div className="flex flex-col gap-3">
          {upcomingMeetings.map((meeting) => (
            <MeetingItem
              key={meeting.meetingId}
              meeting={meeting}
              teamRoomId={teamRoomId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
