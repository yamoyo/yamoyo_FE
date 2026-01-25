import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CreateScheduleFormData } from '@/entities/calendar/model/types';
import { useScheduleStore } from '@/entities/calendar/model/schedule-store';
import {
  addMonths,
  buildTimeOptions,
  buildWeeklySchedules,
  formatDateLabel,
  parseDateString,
} from '@/entities/calendar/lib/recurrence';
import { getMockTeamMembers } from '@/shared/constants/mock-team-members';
import TopBar from '@/shared/ui/header/TopBar';
import {
  ColorPicker,
  DateSection,
  DescriptionSection,
  FrequencySection,
  LocationSection,
  ParticipantsSection,
  ParticipantSelectSheet,
  SubmitButton,
  TimeSection,
  TitleSection,
} from '@/widgets/calendar/create-schedule';

export default function CreateSchedulePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const teamId = Number(searchParams.get('teamId')) || 0;
  const date = searchParams.get('date') || '';
  const initialCalendarDate = date
    ? new Date(
        Number(date.split('-')[0]),
        Number(date.split('-')[1]) - 1,
        Number(date.split('-')[2]),
      )
    : new Date();

  const addSchedule = useScheduleStore((state) => state.addSchedule);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isParticipantSheetOpen, setIsParticipantSheetOpen] = useState(false);
  const [calendarCurrentDate, setCalendarCurrentDate] =
    useState(initialCalendarDate);

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

  const selectedColor = watch('color');
  const scheduleType = watch('type');
  const titleLength = watch('title')?.length || 0;
  const descLength = watch('description')?.length || 0;
  const participants = watch('participants') ?? [];
  const selectedDateValue = watch('date');
  const selectedParticipantIds = participants
    .map((id) => Number(id))
    .filter((id) => !Number.isNaN(id));
  const teamMembers = getMockTeamMembers(teamId);
  const selectedMembers = selectedParticipantIds
    .map((id) => teamMembers.find((member) => member.id === id))
    .filter((member): member is NonNullable<typeof member> => Boolean(member));
  const selectedDate = parseDateString(selectedDateValue);
  const dateLabel = selectedDate
    ? formatDateLabel(selectedDate)
    : '날짜를 선택해주세요';
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
  const handlePrevMonth = () => {
    setCalendarCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCalendarCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1),
    );
  };

  const handleToday = () => {
    const today = new Date();
    const nextValue = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setCalendarCurrentDate(today);
    setValue('date', nextValue, { shouldValidate: true });
    setIsCalendarOpen(false);
  };

  const handleDateSelect = (selected: Date) => {
    const nextValue = `${selected.getFullYear()}-${String(
      selected.getMonth() + 1,
    ).padStart(2, '0')}-${String(selected.getDate()).padStart(2, '0')}`;
    setValue('date', nextValue, { shouldValidate: true });
    setCalendarCurrentDate(selected);
    setIsCalendarOpen(false);
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-bg-default">
      <TopBar title="미팅 일정" onBack={handleCancel} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-0 flex-1 space-y-4 overflow-y-auto p-6"
      >
        <TitleSection
          selectedColor={selectedColor}
          titleLength={titleLength}
          onToggleColorPicker={() => setIsColorPickerOpen((prev) => !prev)}
          register={register}
          error={errors.title}
        />

        {isColorPickerOpen && (
          <ColorPicker
            selectedColor={selectedColor}
            onSelectColor={(colorId) => setValue('color', colorId)}
          />
        )}

        <FrequencySection
          scheduleType={scheduleType}
          onSelectType={(type) => setValue('type', type)}
        />

        <DescriptionSection
          descLength={descLength}
          register={register}
          error={errors.description}
        />

        <DateSection
          dateLabel={dateLabel}
          isCalendarOpen={isCalendarOpen}
          register={register}
          error={errors.date}
          calendarCurrentDate={calendarCurrentDate}
          selectedDate={selectedDate}
          onToggleCalendar={() => setIsCalendarOpen((prev) => !prev)}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
          onDateSelect={handleDateSelect}
        />

        <TimeSection timeOptions={timeOptions} register={register} />

        <LocationSection register={register} />

        <ParticipantsSection
          selectedMembers={selectedMembers}
          onOpenSheet={() => setIsParticipantSheetOpen(true)}
          onRemove={(id) =>
            setValue(
              'participants',
              selectedParticipantIds
                .filter((item) => item !== id)
                .map((item) => String(item)),
              { shouldValidate: true },
            )
          }
        />

        <SubmitButton />
      </form>

      <ParticipantSelectSheet
        isOpen={isParticipantSheetOpen}
        onClose={() => setIsParticipantSheetOpen(false)}
        members={teamMembers}
        selectedIds={selectedParticipantIds}
        onConfirm={(ids) =>
          setValue(
            'participants',
            ids.map((id) => String(id)),
            { shouldValidate: true },
          )
        }
      />
    </div>
  );
}
