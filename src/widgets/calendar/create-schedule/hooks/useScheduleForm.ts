import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import type { CreateMeetingRequest } from '@/entities/calendar/api/meeting-dto';
import { useCreateMeeting } from '@/entities/calendar/hooks/useMeetings';
import {
  buildTimeOptions,
  formatDateLabel,
  parseDateString,
} from '@/entities/calendar/lib/recurrence';
import type { CreateScheduleFormData } from '@/entities/calendar/model/types';
import { useTeamRoomMembers } from '@/entities/teamroom/hooks/useTeamMember';

// 일정 생성/수정 폼 상태/파생값/제출 로직을 묶은 훅
export default function useScheduleForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const teamId = Number(searchParams.get('teamId')) || 0;
  const date = searchParams.get('date') || '';

  const createMeeting = useCreateMeeting(teamId);
  const { data: teamMembers = [] } = useTeamRoomMembers(teamId);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateScheduleFormData>({
    defaultValues: {
      teamId,
      color: 'YELLOW',
      isRecurring: false,
      startDate: date,
      startTime: '',
      endTime: '',
      participantUserIds: [],
    },
  });

  useEffect(() => {
    reset({
      teamId,
      color: 'YELLOW',
      isRecurring: false,
      startDate: date,
      startTime: '',
      endTime: '',
      participantUserIds: [],
    });
  }, [teamId, date, reset]);

  // 선택된 색상/반복 여부
  const selectedColor = watch('color');
  const isRecurring = watch('isRecurring');
  const startTime = watch('startTime');
  const endTime = watch('endTime');

  // 입력 길이 표시용 카운트
  const titleLength = watch('title')?.length || 0;
  const descLength = watch('description')?.length || 0;

  // 참가자 userId 리스트
  const participantUserIds = watch('participantUserIds') ?? [];

  // 선택된 날짜 문자열
  const selectedDateValue = watch('startDate');

  // 선택된 참가자에 해당하는 멤버 객체 리스트
  const selectedMembers = participantUserIds
    .map((userId) => teamMembers.find((m) => m.userId === userId))
    .filter((member): member is NonNullable<typeof member> => Boolean(member));

  // 선택된 날짜 객체(없으면 undefined)
  const selectedDate = parseDateString(selectedDateValue);

  // 날짜 표시용 라벨
  const dateLabel = selectedDate
    ? formatDateLabel(selectedDate)
    : '날짜를 선택해주세요';

  // 시간 드롭다운 옵션 (30분 단위, 08:00 ~ 24:00)
  const timeOptions = buildTimeOptions(8, 24);

  const onSubmit = async (data: CreateScheduleFormData) => {
    const requestBase: CreateMeetingRequest = {
      title: data.title,
      startDate: data.startDate,
      startTime: data.startTime,
      endTime: data.endTime,
      color: data.color,
      isRecurring: data.isRecurring,
      participantUserIds: data.participantUserIds,
      ...(data.description && { description: data.description }),
      ...(data.location && { location: data.location }),
    };

    await createMeeting.mutateAsync(requestBase);
    navigate(-1);
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
  };

  return {
    teamId,
    date,
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
    selectedColor,
    isRecurring,
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
    isPending: createMeeting.isPending,
  };
}
