import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import TopBar from '@/shared/ui/header/TopBar';
import BottomButton from '@/shared/ui/button/BottomButton';
import TimePickGrid from '@/widgets/teamroom/timepick/TimePickGrid';
import TimePickControls from '@/widgets/teamroom/timepick/TimePickControls';
import { useModalStore } from '@/shared/ui/modal/model/modal-store';

const createInitialAvailability = () =>
  Array.from({ length: 7 }, () => Array.from({ length: 32 }, () => false));

export default function TimePickPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const openGuideModal = useModalStore((state) => state.openGuideModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const [isEditMode, setIsEditMode] = useState(false);
  const [availability, setAvailability] = useState<boolean[][]>(
    createInitialAvailability,
  );

  const handleReset = () => {
    setAvailability(createInitialAvailability());
  };

  const handleNavigateEverytime = () => {
    navigate(`/teamroom/${id}/timepick/everytime`);
  };

  const handleSubmit = async () => {
    // TODO: teamRoomId를 useParams로 받아와서 API 호출
    // const body = { availability };
    // await authClient.post(`/api/team-rooms/${teamRoomId}/timepick/availability`, body);

    navigate(`/teamroom/${id}/timepick/liketime`, { replace: true });
  };

  const hasSelection = availability.some((day) => day.some((slot) => slot));

  return (
    <div
      style={{
        backgroundImage: 'url(/assets/timepick/timepick-bg.png)',
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
                        <div className="flex items-center gap-[10px]">
                          <div className="h-4 w-4">
                            <img
                              src="/assets/timepick/guide-icon.svg"
                              width={15}
                              height={15}
                            />
                          </div>
                          <p className="text-body-4.1 text-bg-default">
                            장소는
                            <span className="text-body-4 text-bg-primary">
                              {' '}
                              온라인으로 고정
                            </span>
                            한다
                          </p>
                        </div>
                        <div className="flex gap-[10px]">
                          <div className="h-4 w-4">
                            <img
                              src="/assets/timepick/guide-icon.svg"
                              width={15}
                              height={15}
                            />
                          </div>
                          <p className="text-body-4.1 text-bg-default">
                            <span className="text-body-4 text-bg-primary">
                              클릭 또는 드래그
                            </span>
                            로 시간대를 <br />
                            선택하세요
                          </p>
                        </div>
                        <div className="flex items-center gap-[10px]">
                          <div className="h-4 w-4">
                            <img
                              src="/assets/timepick/guide-icon.svg"
                              width={15}
                              height={15}
                            />
                          </div>
                          <p className="text-body-4.1 text-bg-default">
                            선택한 시간은 다시 선택하면 취소돼요
                          </p>
                        </div>
                        <div className="flex items-center gap-[10px]">
                          <div className="h-4 w-4">
                            <img
                              src="/assets/timepick/guide-icon.svg"
                              width={15}
                              height={15}
                            />
                          </div>
                          <p className="text-body-4.1 text-bg-default">
                            본인의
                            <span className="text-body-4 text-bg-primary">
                              {' '}
                              선호 시간대를 선택
                            </span>
                            하세요
                          </p>
                        </div>
                        <div className="flex items-center gap-[10px]">
                          <div className="h-4 w-4">
                            <img
                              src="/assets/timepick/guide-icon.svg"
                              width={15}
                              height={15}
                            />
                          </div>
                          <p className="text-body-4.1 text-bg-default">
                            야모요가
                            <span className="text-body-4 text-bg-primary">
                              {' '}
                              최적의 시간대를
                            </span>
                            를 찾아드려요
                          </p>
                        </div>
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
        <p className="w-[264px] text-title-2 text-tx-default">
          팀원들이 가장
          <span className="text-bg-secondary_2"> 많이 겹치는 시간</span>
          <br />을 찾고 있어요
        </p>
        <div className="flex w-full flex-col items-start gap-4">
          <TimePickControls
            isEditMode={isEditMode}
            onToggleEditMode={() => setIsEditMode((prev) => !prev)}
            onReset={handleReset}
            onImport={handleNavigateEverytime}
          />
        </div>
      </div>

      <TimePickGrid
        isEditMode={isEditMode}
        availability={availability}
        onAvailabilityChange={setAvailability}
      />

      <div className="mb-[48px] mt-[80px] px-5">
        <BottomButton
          text="선호 시간대 설정"
          onClick={handleSubmit}
          disabled={!hasSelection}
          className="h-auto gap-[10px] self-stretch px-[80px] py-4 flex-center"
        />
      </div>
    </div>
  );
}
