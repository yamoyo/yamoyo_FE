import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAvailabilityStore } from '@/entities/everytime/model/availability-store';
import { useSubmitAvailability } from '@/entities/timeselect/hooks/useSubmitAvailability';
import BottomButton from '@/shared/ui/button/BottomButton';
import TopBar from '@/shared/ui/header/TopBar';
import { useModalStore } from '@/shared/ui/modal/model/modal-store';
import TimeSelectControls from '@/widgets/teamroom/timeselect/TimeSelectControls';
import TimeSelectGrid from '@/widgets/teamroom/timeselect/TimeSelectGrid';

const createInitialAvailability = () =>
  Array.from({ length: 7 }, () => Array.from({ length: 32 }, () => false));

const GUIDE_ITEMS: { text: string; highlight?: string; suffix?: string }[] = [
  { text: '장소는', highlight: '온라인으로 고정', suffix: '한다' },
  {
    text: '',
    highlight: '클릭 또는 드래그',
    suffix: '로 시간대를\n선택하세요',
  },
  { text: '선택한 시간은 다시 선택하면 취소돼요' },
  { text: '본인의', highlight: '선호 시간대를 선택', suffix: '하세요' },
  { text: '야모요가', highlight: '최적의 시간대를', suffix: '를 찾아드려요' },
];

export default function TimeSelectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const openGuideModal = useModalStore((state) => state.openGuideModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const importedAvailability = useAvailabilityStore(
    (state) => state.importedAvailability,
  );
  const clearImportedAvailability = useAvailabilityStore(
    (state) => state.clearImportedAvailability,
  );

  const { mutate: submitAvailability, isPending } = useSubmitAvailability();

  const [isEditMode, setIsEditMode] = useState(false);
  const [availability, setAvailability] = useState<boolean[][]>(
    createInitialAvailability,
  );

  // 에브리타임에서 불러온 데이터가 있으면 적용
  useEffect(() => {
    if (importedAvailability) {
      setAvailability(importedAvailability);
      clearImportedAvailability();
    }
  }, [importedAvailability, clearImportedAvailability]);

  const handleReset = () => {
    setAvailability(createInitialAvailability());
  };

  const handleNavigateEverytime = () => {
    navigate(`/teamroom/${id}/timeselect/everytime`);
  };

  const handleSubmit = () => {
    submitAvailability(availability);
  };

  const hasSelection = availability.some((day) => day.some((slot) => slot));

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
                children: (
                  <div className="flex flex-col items-center gap-[30px]">
                    <div className="flex flex-col items-center gap-5">
                      <p className="text-body-1 text-tx-default_black">
                        시간 설정 방법
                      </p>
                      <div className="flex flex-col items-start gap-5">
                        {GUIDE_ITEMS.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-[10px]"
                          >
                            <div className="h-4 w-4">
                              <img
                                src="/assets/timeselect/guide-icon.svg"
                                width={15}
                                height={15}
                              />
                            </div>
                            <p className="whitespace-pre-line text-body-4.1 text-bg-default">
                              {item.text}
                              {item.highlight && (
                                <span className="text-body-4 text-bg-primary">
                                  {' '}
                                  {item.highlight}
                                </span>
                              )}
                              {item.suffix}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-body-1 text-bg-primary"
                      onClick={closeModal}
                    >
                      확인
                    </button>
                  </div>
                ),
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
            onToggleEditMode={() => setIsEditMode((prev) => !prev)}
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
