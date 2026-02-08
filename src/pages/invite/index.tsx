import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { useJoinTeamRoom } from '@/entities/teamroom/hooks/useTeamRoom';
import { onAuthBlocked, resetAuthBlocked } from '@/shared/api/auth/event-bus';
import { useAuthStore } from '@/shared/api/auth/store';

export default function InvitePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const joinMutation = useJoinTeamRoom();

  useEffect(() => {
    const unsubscribe = onAuthBlocked('AUTH_EXPIRED', () => {
      useAuthStore.getState().clear();

      sessionStorage.setItem(
        'redirectAfterLogin',
        location.pathname + location.search,
      );
      // 플래그 초기화
      resetAuthBlocked(['AUTH_EXPIRED']);

      navigate('/');
    });

    return unsubscribe;
  }, [navigate, location]);

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
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <img
        src="/assets/onboarding/purple-earth.png"
        alt="background decoration"
        className="pointer-events-none absolute bottom-[-114px] left-1/2 h-[536px] max-w-none -translate-x-1/2 select-none"
      />

      <div className="z-10 flex flex-1 flex-col items-center justify-center px-6">
        <h1 className="text-title-1 text-tx-default">팀에 합류하시겠습니까?</h1>
      </div>

      <div className="z-10 flex flex-col gap-3 px-6 pb-[60px]">
        <button
          type="button"
          onClick={handleJoin}
          disabled={joinMutation.isPending}
          className="bg-primary h-[56px] w-full rounded-[16px] text-body-3 text-white disabled:opacity-50"
        >
          {joinMutation.isPending ? '참여 중...' : '참여하기'}
        </button>
        <button
          type="button"
          onClick={handleDecline}
          className="h-[56px] w-full text-body-4 text-tx-default_4"
        >
          지금은 아니에요
        </button>
      </div>
    </div>
  );
}
