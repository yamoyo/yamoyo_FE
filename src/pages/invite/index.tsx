import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  useInviteTeamRoomInfo,
  useJoinTeamRoom,
} from '@/entities/teamroom/hooks/useTeamRoom';
import { useCurrentUser } from '@/entities/user/hooks/useCurrentUser';
import { useAuthStore } from '@/shared/api/auth/store';

export default function InvitePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const accessToken = useAuthStore((s) => s.accessToken);

  const { data: user } = useCurrentUser(!!accessToken);
  const { data: teamRoomInfo } = useInviteTeamRoomInfo(token!);
  const joinMutation = useJoinTeamRoom();

  const handleJoin = () => {
    if (!token) {
      alert('유효하지 않은 초대 링크입니다.');
      return;
    }
    joinMutation.mutate(token);
  };

  const handleDecline = () => {
    sessionStorage.removeItem('redirectAfterLogin');
    navigate('/home', { replace: true });
  };

  return (
    <div className="relative flex flex-1 flex-col items-center overflow-hidden pt-[120px]">
      <img
        src="/assets/onboarding/purple-earth.png"
        alt="background decoration"
        className="pointer-events-none absolute bottom-[-114px] left-1/2 h-[536px] max-w-none -translate-x-1/2 select-none"
      />

      {user ? (
        <div className="w-[120px]">
          <div className="relative">
            <img
              src="/assets/character/char-bg.png"
              width={120}
              height={120}
              alt="프로필 이미지 배경"
              draggable={false}
            />
            <img
              src={`/assets/character/char-${user.profileImageId}.png`}
              alt={user.name}
              className="absolute left-1/2 top-1/2 w-[68px] -translate-x-1/2 -translate-y-1/2"
              draggable={false}
            />
          </div>
          <p className="mt-2 text-center font-bold leading-6 text-tx-default">
            {user.name}
          </p>
        </div>
      ) : (
        <div className="h-[120px] w-[120px] rounded-full bg-bg-textfiled flex-center">
          <img
            src="/assets/icons/user.svg"
            width={60}
            height={60}
            alt="기본 캐릭터"
            draggable={false}
          />
        </div>
      )}

      <div className="mt-9 text-center text-title-1 text-tx-default">
        <span className="text-bg-secondary_2">{teamRoomInfo?.title}</span>
        <span>팀에</span>
        <p>합류할 준비가 되셨나요?</p>
      </div>

      <button
        type="button"
        onClick={handleJoin}
        disabled={joinMutation.isPending}
        className="z-10 mt-[60px] h-[56px] w-[168px] rounded-lg bg-bg-primary text-body-1 text-white"
      >
        {joinMutation.isPending ? '참여 중...' : '참여하기'}
      </button>
      <button
        type="button"
        onClick={handleDecline}
        className="mt-5 w-[168px] py-1 text-body-5 text-tx-default_3"
      >
        지금은 아니에요
      </button>
    </div>
  );
}
