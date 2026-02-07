import { useState } from 'react';

import type { UpdateScope } from '@/entities/calendar/api/meeting-dto';
import { formatDateString } from '@/entities/calendar/lib/recurrence';
import {
  MEETING_COLOR_MAP,
  SCHEDULE_COLORS,
} from '@/entities/calendar/model/types';
import BottomSheet from '@/shared/ui/BottomSheet';
import TopBar from '@/shared/ui/header/TopBar';
import {
  DateSection,
  DescriptionSection,
  LocationSection,
  ParticipantSelectSheet,
  ParticipantsSection,
  SubmitButton,
  TimeSection,
} from '@/widgets/calendar/create-schedule';
import { useEditScheduleForm } from '@/widgets/calendar/edit-schedule';

export default function EditSchedulePage() {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isParticipantSheetOpen, setIsParticipantSheetOpen] = useState(false);
  const [isScopeSheetOpen, setIsScopeSheetOpen] = useState(false);

  const {
    meeting,
    isMeetingLoading,
    register,
    handleSubmit,
    setValue,
    errors,
    selectedColor,
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
    validateParticipants,
    isPending,
    isRecurringMeeting,
    isInitialRegular,
  } = useEditScheduleForm();

  const handleDateSelect = (selected: Date) => {
    setValue('startDate', formatDateString(selected), {
      shouldValidate: true,
    });
  };

  // 폼 제출 핸들러
  const handleFormSubmit = handleSubmit((data) => {
    // 참석자 필수 검증
    if (!validateParticipants(data.participantUserIds)) {
      return;
    }

    if (isRecurringMeeting) {
      // 반복 회의면 scope 선택 바텀시트 열기
      setIsScopeSheetOpen(true);
    } else {
      // 일회성 회의면 바로 SINGLE로 수정
      onSubmit(data, 'SINGLE');
    }
  });

  // scope 선택 후 실제 제출
  const handleScopeSubmit = (scope: UpdateScope) => {
    handleSubmit((data) => {
      onSubmit(data, scope);
    })();
    setIsScopeSheetOpen(false);
  };

  if (isMeetingLoading) {
    return (
      <div className="flex h-dvh flex-col bg-bg-default">
        <TopBar title="미팅 일정 수정" onBack={handleCancel} />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-tx-default_2">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="flex h-dvh flex-col bg-bg-default">
        <TopBar title="미팅 일정 수정" onBack={handleCancel} />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-tx-default_2">회의를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  // 색상 hex 값
  const colorHex =
    SCHEDULE_COLORS.find((c) => c.id === selectedColor)?.hex ??
    MEETING_COLOR_MAP[selectedColor];

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-bg-default">
      <TopBar title="미팅 일정 수정" onBack={handleCancel} />

      <form
        onSubmit={handleFormSubmit}
        className="min-h-0 flex-1 space-y-10 overflow-y-auto p-6"
      >
        {/* 제목 섹션 - INITIAL_REGULAR일 경우 색상 변경 숨김 */}
        <div>
          <label className="mb-2 block text-body-4.1 text-tx-default_3">
            미팅제목
          </label>
          <div className="flex items-center gap-2">
            {!isInitialRegular && (
              <button
                type="button"
                onClick={() => setIsColorPickerOpen((prev) => !prev)}
                className="h-5 w-5 shrink-0 rounded-full"
                style={{ backgroundColor: colorHex }}
                aria-label="일정 색상 선택"
              />
            )}
            {isInitialRegular && (
              <div
                className="h-5 w-5 shrink-0 rounded-full"
                style={{ backgroundColor: colorHex }}
              />
            )}
            <div className="relative flex-1">
              <input
                {...register('title', {
                  required: '미팅 제목을 입력해주세요',
                  maxLength: {
                    value: 20,
                    message: '최대 20자까지 입력 가능합니다',
                  },
                })}
                placeholder="미팅 제목을 입력하세요"
                maxLength={20}
                className="w-full rounded-lg bg-bg-textfiled px-4 py-3 pr-14 text-body-5 text-tx-default outline-none placeholder:text-tx-textfiled_disabled"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-medium text-tx-default_4">
                {titleLength}/20
              </span>
            </div>
          </div>
          {isColorPickerOpen && !isInitialRegular && (
            <div className="mt-3 flex items-center gap-[10px]">
              <button
                type="button"
                onClick={() => setIsColorPickerOpen(false)}
                className="h-6 w-6 shrink-0"
                aria-label="색상 선택 닫기"
              >
                <img
                  src="/assets/icons/color-select.svg"
                  alt=""
                  className="h-6 w-6"
                />
              </button>
              <div className="flex gap-[9px]">
                {SCHEDULE_COLORS.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setValue('color', color.id)}
                    className={`h-9 w-9 rounded-full transition-all ${
                      selectedColor === color.id
                        ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-[#202540]'
                        : ''
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`${color.name} 색상`}
                  />
                ))}
              </div>
            </div>
          )}
          {errors.title && (
            <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>
          )}
        </div>

        {/* 내용 설명 */}
        <DescriptionSection
          name="description"
          descLength={descLength}
          register={register}
          error={errors.description}
        />

        {/* 날짜 선택 */}
        <DateSection
          title="미팅 날짜"
          dateLabel={dateLabel}
          name="startDate"
          register={register}
          error={errors.startDate}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />

        {/* 시간 선택 */}
        <TimeSection
          timeOptions={timeOptions}
          startTimeName="startTime"
          endTimeName="endTime"
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

        {/* 장소 */}
        <LocationSection
          name="location"
          register={register}
          placeholder="온라인"
        />

        {/* 참석자 */}
        <ParticipantsSection
          selectedMembers={selectedMembers}
          onOpenSheet={() => setIsParticipantSheetOpen(true)}
          onRemove={removeParticipant}
          error={errors.participantUserIds?.message}
        />

        <SubmitButton label={isPending ? '수정 중...' : '수정하기'} />
      </form>

      {/* 참석자 선택 바텀시트 */}
      <ParticipantSelectSheet
        isOpen={isParticipantSheetOpen}
        onClose={() => setIsParticipantSheetOpen(false)}
        members={teamMembers}
        selectedIds={participantUserIds}
        onConfirm={setParticipants}
      />

      {/* 수정 범위 선택 바텀시트 */}
      <BottomSheet
        isOpen={isScopeSheetOpen}
        onClose={() => setIsScopeSheetOpen(false)}
        contentClassName="px-6 pb-6"
      >
        <div className="flex h-[34px] items-start justify-end self-stretch px-[10px] pt-[10px]">
          <button
            type="button"
            onClick={() => setIsScopeSheetOpen(false)}
            className="flex-center"
          >
            <img
              src="/assets/icons/cancel.svg"
              width={15}
              height={15}
              alt="닫기"
              draggable="false"
            />
          </button>
        </div>

        <h2 className="pb-6 text-left text-title-3 text-tx-default">
          어떤 일정을 수정할까요?
        </h2>

        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => handleScopeSubmit('SINGLE')}
            disabled={isPending}
            className="w-full rounded-xl bg-bg-card py-4 text-body-1 text-bg-primary transition-colors hover:bg-bg-card/80 disabled:opacity-50"
          >
            이 일정만
          </button>
          <button
            type="button"
            onClick={() => handleScopeSubmit('THIS_AND_FUTURE')}
            disabled={isPending}
            className="w-full rounded-xl bg-bg-card py-4 text-body-1 text-bg-primary transition-colors hover:bg-bg-card/80 disabled:opacity-50"
          >
            이번 및 향후 모든 일정
          </button>
        </div>
      </BottomSheet>
    </div>
  );
}
