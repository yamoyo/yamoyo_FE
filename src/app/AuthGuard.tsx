import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { onAuthBlocked, resetAuthBlocked } from '@/shared/api/auth/event-bus';
import { useAuthStore } from '@/shared/api/auth/store';
import { useAuthBootstrap } from '@/shared/api/auth/use-auth-bootstrap';

export default function AuthGuard() {
  useAuthBootstrap(false);
  const navigate = useNavigate();
  const authReady = useAuthStore((s) => s.authReady);

  useEffect(() => {
    // 페이지 접속 시 토큰 발급 과정이 완료되지 않으면 return
    if (!authReady) return;

    const unsubscribe = onAuthBlocked('AUTH_EXPIRED', () => {
      // Todo: 만료 UI 처리는 좀 상의해야할 듯
      alert('로그인이 만료되었습니다. 다시 로그인해주세요.');

      useAuthStore.getState().clear();

      // 플래그 초기화
      resetAuthBlocked(['AUTH_EXPIRED']);

      navigate('/', { replace: true });
    });

    return unsubscribe;
  }, [authReady, navigate]);

  // TERMS_PENDING / PROFILE_PENDING 이벤트를 한 곳에서 구독, 발생 시 각 온보딩 화면으로 이동
  useEffect(() => {
    const offTerms = onAuthBlocked('TERMS_PENDING', () =>
      navigate('/onboarding/terms', { replace: true }),
    );

    const offProfile = onAuthBlocked('PROFILE_PENDING', () =>
      navigate('/onboarding/profile/name', { replace: true }),
    );

    return () => {
      offTerms();
      offProfile();
    };
  }, [navigate]);

  if (!authReady) return <div>로딩중...</div>;

  return <Outlet />; // 하위 Route 렌더
}
