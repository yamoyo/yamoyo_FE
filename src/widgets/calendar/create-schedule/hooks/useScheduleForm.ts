import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  addMonths,
  buildTimeOptions,
  buildWeeklySchedules,
  formatDateLabel,
  parseDateString,
} from '@/entities/calendar/lib/recurrence';
import { useScheduleStore } from '@/entities/calendar/model/schedule-store';
import { CreateScheduleFormData } from '@/entities/calendar/model/types';
import { getMockTeamMembers } from '@/shared/constants/mock-team-members';

// 일정 생성 폼 상태/파생값/제출 로직을 묶은 훅
export default function useScheduleForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const teamId = Number(searchParams.get('teamId')) || 0;
  const date = searchParams.get('date') || '';
  const addSchedule = useScheduleStore((state) => state.addSchedule);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateScheduleFormData>({
    defaultValues: {
      teamId,
      color: 'yellow',
      type: 'none',
      date,
      participants: [],
    },
  });

  // 선택된 색상/타입 값
  const selectedColor = watch('color');
  const scheduleType = watch('type');

  // 입력 길이 표시용 카운트
  const titleLength = watch('title')?.length || 0;
  const descLength = watch('description')?.length || 0;

  // 참가자 id 리스트(문자열)를 안전하게 가져옴
  const participants = watch('participants') ?? [];

  // 선택된 날짜 문자열
  const selectedDateValue = watch('date');

  // 참가자 id를 number로 변환하고 유효한 값만 남김
  const selectedParticipantIds = participants
    .map((id) => Number(id))
    .filter((id) => !Number.isNaN(id));

  // 팀 멤버 목업 목록
  const teamMembers = getMockTeamMembers(teamId);

  // 선택된 참가자 id에 해당하는 멤버 객체 리스트
  const selectedMembers = selectedParticipantIds
    .map((id) => teamMembers.find((member) => member.id === id))
    .filter((member): member is NonNullable<typeof member> => Boolean(member));

  // 선택된 날짜 객체(없으면 undefined)
  const selectedDate = parseDateString(selectedDateValue);

  // 날짜 표시용 라벨
  const dateLabel = selectedDate
    ? formatDateLabel(selectedDate)
    : '날짜를 선택해주세요';

  // 시간 드롭다운 옵션
  const timeOptions = buildTimeOptions(8, 24);

  const onSubmit = (data: CreateScheduleFormData) => {
    if (data.type === 'weekly') {
      const startDate = parseDateString(data.date);
      if (!startDate) return;
      const endDate = addMonths(startDate, 3);
      const weeklySchedules = buildWeeklySchedules(data, startDate, endDate);
      weeklySchedules.forEach(addSchedule);
    } else {
      const newSchedule = {
        ...data,
        id: crypto.randomUUID(),
      };
      addSchedule(newSchedule);
    }
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const removeParticipant = (id: number) => {
    setValue(
      'participants',
      selectedParticipantIds
        .filter((item) => item !== id)
        .map((item) => String(item)),
      { shouldValidate: true },
    );
  };

  const setParticipants = (ids: number[]) => {
    setValue(
      'participants',
      ids.map((id) => String(id)),
      { shouldValidate: true },
    );
  };

  return {
    teamId,
    date,
    register,
    handleSubmit,
    setValue,
    errors,
    selectedColor,
    scheduleType,
    titleLength,
    descLength,
    selectedDate,
    dateLabel,
    timeOptions,
    selectedParticipantIds,
    selectedMembers,
    teamMembers,
    onSubmit,
    handleCancel,
    removeParticipant,
    setParticipants,
  };
}
