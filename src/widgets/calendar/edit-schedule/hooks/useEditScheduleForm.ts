import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import type {
  DayOfWeek,
  MeetingDetailResponse,
  UpdateMeetingRequest,
  UpdateScope,
} from '@/entities/calendar/api/meeting-dto';
import {
  useMeetingDetail,
  useUpdateMeeting,
} from '@/entities/calendar/hooks/useMeetings';
import {
  buildTimeOptions,
  formatDateLabel,
  parseDateString,
} from '@/entities/calendar/lib/recurrence';
import type { EditScheduleFormData } from '@/entities/calendar/model/types';
import { useTeamRoomMembers } from '@/entities/teamroom/hooks/useTeamMember';

/** startTime ISO 문자열에서 날짜(YYYY-MM-DD) 추출 */
function extractDate(isoString: string): string {
  return isoString.split('T')[0];
}

/** startTime ISO 문자열에서 시간(HH:mm) 추출 */
function extractTime(isoString: string): string {
  return isoString.split('T')[1]?.slice(0, 5) ?? '';
}

/** 회의 상세 정보를 폼 데이터로 변환 */
function meetingToFormData(
  meeting: MeetingDetailResponse,
): EditScheduleFormData {
  return {
    teamId: meeting.teamRoomId,
    meetingId: meeting.meetingId,
    title: meeting.title,
    color: meeting.color,
    description: meeting.description ?? '',
    startDate: extractDate(meeting.startTime),
    dayOfWeek: meeting.dayOfWeek ?? undefined,
    startTime: extractTime(meeting.startTime),
    endTime: extractTime(meeting.endTime),
    location: meeting.location ?? '',
    participantUserIds: meeting.participants.map((p) => p.userId),
  };
}

export default function useEditScheduleForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const meetingId = Number(searchParams.get('meetingId')) || 0;

  const { data: meeting, isLoading: isMeetingLoading } = useMeetingDetail(
    meetingId || null,
  );

  const teamId = meeting?.teamRoomId ?? 0;
  const updateMeeting = useUpdateMeeting(teamId);
  const { data: teamMembers = [] } = useTeamRoomMembers(teamId);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<EditScheduleFormData>();

  // 회의 데이터가 로드되면 폼 초기화
  useEffect(() => {
    if (meeting) {
      reset(meetingToFormData(meeting));
    }
  }, [meeting, reset]);

  // 선택된 값들
  const selectedColor = watch('color');
  const startTime = watch('startTime');
  const endTime = watch('endTime');
  const titleLength = watch('title')?.length || 0;
  const descLength = watch('description')?.length || 0;
  const participantUserIds = watch('participantUserIds') ?? [];
  const selectedDateValue = watch('startDate');

  // 파생 값들
  const selectedMembers = participantUserIds
    .map((userId) => teamMembers.find((m) => m.userId === userId))
    .filter((member): member is NonNullable<typeof member> => Boolean(member));

  const selectedDate = parseDateString(selectedDateValue);

  const dateLabel = selectedDate
    ? formatDateLabel(selectedDate)
    : '날짜를 선택해주세요';

  const timeOptions = buildTimeOptions(8, 24);

  // 회의 타입 관련
  const meetingType = meeting?.meetingType;
  const isRecurringMeeting = meetingType !== 'ADDITIONAL_ONE_TIME';
  const isInitialRegular = meetingType === 'INITIAL_REGULAR';

  // 요일 라벨 (반복 회의용)
  const dayOfWeekLabel = useMemo(() => {
    const dayLabels: Record<DayOfWeek, string> = {
      MON: '월요일',
      TUE: '화요일',
      WED: '수요일',
      THU: '목요일',
      FRI: '금요일',
      SAT: '토요일',
      SUN: '일요일',
    };
    return meeting?.dayOfWeek ? dayLabels[meeting.dayOfWeek] : '';
  }, [meeting?.dayOfWeek]);

  const onSubmit = async (data: EditScheduleFormData, scope: UpdateScope) => {
    // API는 HH:mm:ss 형식을 기대하므로 초(:00) 추가
    const formatTimeWithSeconds = (time: string) =>
      time.length === 5 ? `${time}:00` : time;

    const request: UpdateMeetingRequest = {
      title: data.title,
      description: data.description,
      location: data.location,
      startTime: formatTimeWithSeconds(data.startTime),
      endTime: formatTimeWithSeconds(data.endTime),
      color: data.color,
      participantUserIds: data.participantUserIds,
    };

    // scope에 따라 필수 필드 추가
    if (scope === 'SINGLE') {
      request.startDate = data.startDate;
    } else {
      // THIS_AND_FUTURE - 기존 요일 유지 또는 날짜에서 요일 계산
      request.dayOfWeek =
        data.dayOfWeek ?? getDayOfWeekFromDate(data.startDate);
    }

    const response = await updateMeeting.mutateAsync({
      meetingId: data.meetingId,
      data: request,
      scope,
    });

    // 수정 후 새로운 meetingId로 상세 페이지 이동 (SINGLE scope로 수정 시 새 ID 생성 가능)
    const newMeetingId = response.updatedMeetingIds[0] ?? data.meetingId;
    navigate(`/teamroom/${teamId}/meeting/${newMeetingId}`, { replace: true });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const removeParticipant = (userId: number) => {
    setValue(
      'participantUserIds',
      participantUserIds.filter((id) => id !== userId),
      { shouldValidate: true },
    );
  };

  const setParticipants = (userIds: number[]) => {
    setValue('participantUserIds', userIds, { shouldValidate: true });
    if (userIds.length > 0) {
      clearErrors('participantUserIds');
    }
  };

  const validateParticipants = (participantIds: number[]): boolean => {
    if (!participantIds || participantIds.length === 0) {
      setError('participantUserIds', {
        type: 'manual',
        message: '참석자를 1명 이상 선택해주세요.',
      });
      return false;
    }
    return true;
  };

  return {
    meetingId,
    teamId,
    meeting,
    isMeetingLoading,
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
    selectedColor,
    startTime,
    endTime,
    titleLength,
    descLength,
    selectedDate,
    dateLabel,
    timeOptions,
    participantUserIds,
    selectedMembers,
    teamMembers,
    onSubmit,
    handleCancel,
    removeParticipant,
    setParticipants,
    validateParticipants,
    isPending: updateMeeting.isPending,
    // 회의 타입 관련
    meetingType,
    isRecurringMeeting,
    isInitialRegular,
    dayOfWeekLabel,
  };
}

/** 날짜 문자열에서 DayOfWeek 추출 */
function getDayOfWeekFromDate(dateStr: string): DayOfWeek {
  const date = new Date(dateStr);
  const dayIndex = date.getDay(); // 0=일, 1=월, ...
  const days: DayOfWeek[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return days[dayIndex];
}
