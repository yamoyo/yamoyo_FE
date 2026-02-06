import { useState } from 'react';

import { formatDateString } from '@/entities/calendar/lib/recurrence';
import TopBar from '@/shared/ui/header/TopBar';
import {
  DateSection,
  DescriptionSection,
  FrequencySection,
  LocationSection,
  ParticipantSelectSheet,
  ParticipantsSection,
  SubmitButton,
  TimeSection,
  TitleSection,
} from '@/widgets/calendar/create-schedule';
import { useScheduleForm } from '@/widgets/calendar/create-schedule/hooks';

export default function CreateSchedulePage() {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isParticipantSheetOpen, setIsParticipantSheetOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    errors,
    selectedColor,
    isRecurring,
    titleLength,
    descLength,
    selectedDate,
    dateLabel,
    timeOptions,
    startTime,
    endTime,
    participantUserIds,
    selectedMembers,
    teamMembers,
    onSubmit,
    handleCancel,
    removeParticipant,
    setParticipants,
  } = useScheduleForm();

  const handleDateSelect = (selected: Date) => {
    setValue('startDate', formatDateString(selected), {
      shouldValidate: true,
    });
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-bg-default">
      <TopBar title="미팅 일정" onBack={handleCancel} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-0 flex-1 space-y-10 overflow-y-auto p-6"
      >
        <TitleSection
          selectedColor={selectedColor}
          titleLength={titleLength}
          isColorPickerOpen={isColorPickerOpen}
          onToggleColorPicker={() => setIsColorPickerOpen((prev) => !prev)}
          onSelectColor={(colorId) => setValue('color', colorId)}
          register={register}
          error={errors.title}
        />

        <FrequencySection
          isRecurring={isRecurring}
          onSelectRecurring={(value) => setValue('isRecurring', value)}
        />

        <DescriptionSection
          descLength={descLength}
          register={register}
          error={errors.description}
        />

        <DateSection
          title="미팅 날짜"
          dateLabel={dateLabel}
          register={register}
          error={errors.startDate}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />

        <TimeSection
          timeOptions={timeOptions}
          register={register}
          startTime={startTime}
          endTime={endTime}
          startTimeError={errors.startTime}
          endTimeError={errors.endTime}
          onStartTimeChange={() => setValue('endTime', '')}
          onSelectStartTime={(value) =>
            setValue('startTime', value, { shouldValidate: true })
          }
          onSelectDuration={(value) =>
            setValue('endTime', value, { shouldValidate: true })
          }
        />

        <LocationSection register={register} />

        <ParticipantsSection
          selectedMembers={selectedMembers}
          onOpenSheet={() => setIsParticipantSheetOpen(true)}
          onRemove={removeParticipant}
        />

        <SubmitButton />
      </form>

      <ParticipantSelectSheet
        isOpen={isParticipantSheetOpen}
        onClose={() => setIsParticipantSheetOpen(false)}
        members={teamMembers}
        selectedIds={participantUserIds}
        onConfirm={setParticipants}
      />
    </div>
  );
}
