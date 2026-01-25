import { useState } from 'react';
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
import {
  useCalendarState,
  useScheduleForm,
} from '@/widgets/calendar/create-schedule/hooks';

export default function CreateSchedulePage() {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isParticipantSheetOpen, setIsParticipantSheetOpen] = useState(false);
  const {
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
  } = useScheduleForm();

  const {
    isCalendarOpen,
    setIsCalendarOpen,
    calendarCurrentDate,
    handlePrevMonth,
    handleNextMonth,
    handleToday,
    handleDateSelect,
  } = useCalendarState(date, setValue);

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
