import { useNavigate, useParams } from 'react-router-dom';

import {
  useDeleteMeeting,
  useMeetingDetail,
} from '@/entities/calendar/hooks/useMeetings';
import { MEETING_COLOR_MAP } from '@/entities/calendar/model/types';
import TopBar from '@/shared/ui/header/TopBar';

export default function MeetingDetailPage() {
  const navigate = useNavigate();
  const { id: teamRoomId, meetingId } = useParams<{
    id: string;
    meetingId: string;
  }>();

  const { data: meeting, isLoading } = useMeetingDetail(
    meetingId ? Number(meetingId) : null,
  );

  const { mutate: deleteMeeting, isPending: isDeleting } = useDeleteMeeting(
    Number(teamRoomId),
  );

  const handleDelete = () => {
    if (!meetingId) return;
    deleteMeeting(
      { meetingId: Number(meetingId) },
      {
        onSuccess: () => {
          navigate(`/teamroom/${teamRoomId}`, { replace: true });
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-tx-default_2">로딩 중...</p>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-tx-default_2">회의를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const meetingDate = new Date(meeting.startTime);
  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];
  const dayLabel = dayLabels[meetingDate.getDay()];

  const dateString = `${meetingDate.getFullYear()}년 ${meetingDate.getMonth() + 1}월 ${meetingDate.getDate()}일 (${dayLabel})`;
  const startTimeStr = meeting.startTime.split('T')[1]?.slice(0, 5);
  const endTimeStr = meeting.endTime.split('T')[1]?.slice(0, 5);
  const timeString = `${startTimeStr} - ${endTimeStr}`;

  const hasLocation = Boolean(meeting.location?.trim());
  const locationLabel = hasLocation ? meeting.location!.trim() : '온라인';

  const colorHex = MEETING_COLOR_MAP[meeting.color];

  const repeatLabel =
    meeting.meetingType === 'ADDITIONAL_RECURRING' ? '주간 반복' : '반복 없음';

  return (
    <div
      className="flex min-h-screen select-none flex-col bg-bg-default"
      draggable="false"
    >
      <TopBar
        title="미팅일정"
        backIcon="arrow"
        rightContent={
          <p className="p-[10px] text-body-4 text-textfiled-line_focus">수정</p>
        }
      />

      <div className="mb-4 mt-5 flex items-center gap-3 px-6">
        <h2 className="text-title-2 text-tx-default">{meeting.title}</h2>
        <div
          className="h-4 w-4 shrink-0 rounded-full"
          style={{ backgroundColor: colorHex }}
        />
      </div>

      <div className="flex flex-col self-stretch px-6">
        <div className="flex items-center gap-2 py-3">
          <div className="p-[10px]">
            <img
              src="/assets/icons/meeting/meeting-team.svg"
              alt="반복"
              width={20}
              height={20}
            />
          </div>
          <span className="text-body-5 text-tx-default">{repeatLabel}</span>
        </div>

        <div className="h-px bg-bg-textfiled" />

        <div className="flex items-center gap-2 py-3">
          <div className="p-[10px]">
            <img
              src="/assets/icons/meeting/meeting-calendar.svg"
              alt="날짜"
              width={20}
              height={20}
            />
          </div>
          <span className="text-body-5 text-tx-default">{dateString}</span>
        </div>

        <div className="h-px bg-bg-textfiled" />

        <div className="flex items-center gap-2 py-3">
          <div className="p-[10px]">
            <img
              src="/assets/icons/meeting/meeting-clock.svg"
              alt="시간"
              width={20}
              height={20}
            />
          </div>
          <span className="text-body-5 text-tx-default">{timeString}</span>
        </div>

        <div className="h-px bg-bg-textfiled" />

        <div className="flex items-center gap-2 py-3">
          <div className="p-[10px]">
            <img
              src="/assets/icons/meeting/meeting-place.svg"
              alt="장소"
              width={20}
              height={20}
            />
          </div>
          <span className="text-body-5 text-tx-default">{locationLabel}</span>
        </div>

        <div className="h-px bg-bg-textfiled" />

        <div className="flex items-center gap-2 py-3">
          <div className="p-[10px]">
            <img
              src="/assets/icons/meeting/meeting-user.svg"
              alt="참여자"
              width={20}
              height={20}
            />
          </div>
          <span className="text-body-5 text-tx-default">
            {meeting.participants.length}명
          </span>
        </div>

        <div className="grid grid-cols-3 gap-[10px] pt-2">
          {meeting.participants.map((participant) => (
            <div
              key={participant.userId}
              className="flex flex-1 items-center gap-[10px] self-stretch rounded-[52px] border border-bd-textfiled_line px-[11px] py-[6px]"
            >
              <div className="flex items-center gap-1">
                <div className="size-[24px] rounded-full bg-bg-textfiled flex-center">
                  <img
                    src={`/assets/character/char-${participant.profileImageId}.png`}
                    alt={participant.name}
                    className="size-3.5 object-contain"
                    draggable="false"
                  />
                </div>
                <span className="min-w-0 truncate text-caption-1 text-tx-default">
                  {participant.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-12 left-1/2 -translate-x-1/2">
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex items-center gap-[10px] rounded-xl bg-tx-default p-[10px] shadow-[0_2px_4px_0_rgba(24,30,57,0.5)] disabled:opacity-50"
        >
          <img
            src="/assets/icons/meeting/meeting-delete.svg"
            alt="삭제"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
}
