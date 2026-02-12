import { useAvailability } from '@/entities/timeselect/hooks/useAvailability';
import BottomButton from '@/shared/ui/button/BottomButton';
import TopBar from '@/shared/ui/header/TopBar';
import { useModalStore } from '@/shared/ui/modal/model/modal-store';
import TimeSelectControls from '@/widgets/teamroom/timeselect/TimeSelectControls';
import TimeSelectGrid from '@/widgets/teamroom/timeselect/TimeSelectGrid';
import TimeSelectGuideContent from '@/widgets/teamroom/timeselect/TimeSelectGuideContent';

export default function TimeSelectPage() {
  const openGuideModal = useModalStore((state) => state.openGuideModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const {
    isEditMode,
    availability,
    setAvailability,
    isPending,
    hasSelection,
    handleReset,
    handleNavigateEverytime,
    handleSubmit,
    handleToggleEditMode,
  } = useAvailability();

  return (
    <div
      style={{
        backgroundImage: 'url(/assets/timeselect/timeselect-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <TopBar
        title="시간 설정"
        backIcon="arrow"
        rightContent={
          <button
            type="button"
            className="h-[22px] w-[50px] flex-center"
            onClick={() =>
              openGuideModal({
                title: '정기미팅 설정 가이드',
                children: <TimeSelectGuideContent onClose={closeModal} />,
              })
            }
          >
            <img
              src="/assets/icons/badge-guide.svg"
              width={50}
              height={22}
              className="select-none"
              draggable="false"
            />
          </button>
        }
      />

      <div className="mt-5 flex flex-col items-start gap-[30px] px-5">
        <p
          className="w-[264px] select-none text-title-2 text-tx-default"
          draggable="false"
        >
          팀원들이 가장
          <span className="text-bg-secondary_2"> 많이 겹치는 시간</span>
          <br />을 찾고 있어요
        </p>
        <div className="flex w-full flex-col items-start gap-4">
          <TimeSelectControls
            isEditMode={isEditMode}
            onToggleEditMode={handleToggleEditMode}
            onReset={handleReset}
            onImport={handleNavigateEverytime}
          />
        </div>
      </div>

      <TimeSelectGrid
        isEditMode={isEditMode}
        availability={availability}
        onAvailabilityChange={setAvailability}
      />

      <div className="mb-[48px] mt-[80px] select-none px-5" draggable="false">
        <BottomButton
          text={isPending ? '제출 중...' : '선호 시간대 설정'}
          onClick={handleSubmit}
          disabled={!hasSelection || isPending}
        />
      </div>
    </div>
  );
}
