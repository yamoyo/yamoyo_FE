import { useState } from 'react';
import TopBar from '@/shared/ui/header/TopBar';
import {
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
import { useScheduleForm } from '@/widgets/calendar/create-schedule/hooks';
import { formatDateString } from '@/entities/calendar/lib/recurrence';

export default function CreateSchedulePage() {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isParticipantSheetOpen, setIsParticipantSheetOpen] = useState(false);
  const {
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
  } = useScheduleForm();

  const handleDateSelect = (selected: Date) => {
    setValue('date', formatDateString(selected), { shouldValidate: true });
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
          scheduleType={scheduleType}
          onSelectType={(type) => setValue('type', type)}
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
          error={errors.date}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />

        <TimeSection timeOptions={timeOptions} register={register} />

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
        selectedIds={selectedParticipantIds}
        onConfirm={setParticipants}
      />
    </div>
  );
}
