import { useNavigate } from 'react-router-dom';
import BottomSheet from '@/shared/ui/BottomSheet';
import type { TeamRoom } from '@/entities/teamroom/model/types';
import { TEAMROOM_IMAGES } from '@/shared/constants/teamroom-images';
import { useTeamRoomEditStore } from '@/entities/teamroom/model/teamroom-edit-store';
import { useModalStore } from '@/shared/ui/modal/model/modal-store';
import { cn } from '@/shared/config/tailwind/cn';
import { isLeader as checkIsLeader } from '@/entities/teamroom/lib/is-leader';

interface TeamRoomOptionsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  teamRoom: TeamRoom | null;
  currentUserId?: number;
}

export default function TeamRoomOptionsBottomSheet({
  isOpen,
  onClose,
  teamRoom,
  currentUserId,
}: TeamRoomOptionsBottomSheetProps) {
  const navigate = useNavigate();
  const openChoiceModal = useModalStore((state) => state.openChoiceModal);

  const bannerSrc =
    TEAMROOM_IMAGES.find((img) => img.id === teamRoom?.bannerId)?.src ?? '';

  const leader = teamRoom?.members.find((member) => checkIsLeader(member.role));

  const isLeader = leader?.id === currentUserId;

  const handleLeaveTeamRoom = () => {
    onClose();
    openChoiceModal({
      title: '팀룸을 나가시겠습니까?',
      description: '다시 팀룸을 들어오려면 링크를\n새로 받아야합니다.',
      leftLabel: '취소',
      rightLabel: '나가기',
      onClickRightBtn: () => {
        // TODO: 팀룸 나가기 API 호출
        navigate('/home', { replace: true });
      },
    });
  };

  const setEditData = useTeamRoomEditStore((state) => state.setEditData);

  const handleEditTeamRoom = () => {
    onClose();
    // 현재 teamRoom 데이터를 전역 상태에 저장
    if (teamRoom) {
      setEditData({
        bannerId: teamRoom.bannerId,
        name: teamRoom.name,
        description: teamRoom.description,
        deadlineDate: teamRoom.deadlineDate,
      });
    }
    navigate(`/teamroom/${teamRoom?.id}/edit`);
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="flex flex-col gap-[20px] px-6 pb-[30px]"
    >
      <div className="flex w-full flex-col items-start gap-10">
        <div className="flex w-full flex-col">
          <button
            onClick={onClose}
            className="h-10 w-10 self-end flex-center"
            aria-label="모달 닫기"
          >
            <img
              src="/assets/icons/cancel.svg"
              width={16}
              height={16}
              alt=""
              draggable="false"
            />
          </button>

          <div className="-mt-[10px] flex items-center gap-4">
            <img
              src={bannerSrc}
              alt="팀룸 배너"
              className="h-16 w-16 rounded-[3.879px] border-[0.97px] border-[#C7B2FF] object-cover [image-rendering:pixelated]"
            />
            <div className="flex flex-col gap-1">
              <span className="text-body-1 text-tx-default">
                {teamRoom?.name}의 팀룸
              </span>
              {leader && (
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/icons/leader-badge.svg"
                    alt="팀장"
                    width={15.83}
                    height={20}
                  />
                  <span className="line-height-[21px] text-[13px] font-bold text-tx-default_4">
                    {leader.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-6">
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate(`/teamroom/${teamRoom?.id}/members`);
            }}
            className="flex items-center gap-4"
          >
            <img
              src="/assets/home/users.png"
              width={20}
              height={20}
              alt="팀원 목록"
            />
            <p className="text-body-4.1 text-tx-default">
              팀원 {teamRoom?.members.length ?? 1}
            </p>
          </button>

          <button
            type="button"
            onClick={handleEditTeamRoom}
            className="flex items-center gap-4"
          >
            <img
              src="/assets/icons/teamroom-edit.svg"
              width={20}
              height={20}
              alt="팀룸 수정"
            />
            <p className="text-body-4.1 text-tx-default">편집</p>
          </button>

          <button
            type="button"
            onClick={handleLeaveTeamRoom}
            className="flex items-center gap-4"
          >
            <img
              src="/assets/icons/teamroom-out.svg"
              width={20}
              height={20}
              alt="팀룸 나가기"
            />
            <p className="text-body-4.1 text-tx-default">팀룸 나가기</p>
          </button>

          {/** TODO(준열) : 로그인 유저의 권한에 따른 팀룸 삭제 활성화 여부 구현 해야함 + 모달 연결*/}
          <button
            type="button"
            disabled={!isLeader}
            className={cn(
              'flex items-center gap-4',
              !isLeader && 'cursor-not-allowed opacity-40',
            )}
          >
            <img
              src="/assets/icons/teamroom-delete.svg"
              width={20}
              height={20}
              alt="팀룸 삭제"
            />
            <p className="text-body-4.1 text-tx-default">팀룸 삭제</p>
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}
