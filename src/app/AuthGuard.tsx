import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { onAuthBlocked, resetAuthBlocked } from '@/shared/api/auth/event-bus';
import { useAuthStore } from '@/shared/api/auth/store';
import { useAuthBootstrap } from '@/shared/api/auth/use-auth-bootstrap';

export default function AuthGuard() {
  useAuthBootstrap(false);
  const navigate = useNavigate();
  const location = useLocation();
  const authReady = useAuthStore((s) => s.authReady);

  useEffect(() => {
    // 페이지 접속 시 토큰 발급 과정이 완료되지 않으면 return
    if (!authReady) return;

    const unsubscribe = onAuthBlocked('AUTH_EXPIRED', () => {
      useAuthStore.getState().clear();

      // 플래그 초기화
      resetAuthBlocked(['AUTH_EXPIRED']);

      if (location.pathname !== '/invite') {
        navigate('/', { replace: true });
      }
    });

    return unsubscribe;
  }, [authReady, navigate, location]);

  // TERMS_PENDING / PROFILE_PENDING 이벤트를 한 곳에서 구독, 발생 시 각 온보딩 화면으로 이동
  useEffect(() => {
    const saveRedirectUrl = () => {
      // 온보딩 완료 후 현재 페이지로 돌아올 수 있도록 URL 저장
      // 이미 저장된 값이 있으면 덮어쓰지 않음 (초대 링크 등 보존)
      if (!sessionStorage.getItem('redirectAfterLogin')) {
        sessionStorage.setItem(
          'redirectAfterLogin',
          location.pathname + location.search,
        );
      }
    };

    const offTerms = onAuthBlocked('TERMS_PENDING', () => {
      saveRedirectUrl();
      navigate('/onboarding/terms', { replace: true });
    });

    const offProfile = onAuthBlocked('PROFILE_PENDING', () => {
      saveRedirectUrl();
      navigate('/onboarding/profile/name', { replace: true });
    });

    return () => {
      offTerms();
      offProfile();
    };
  }, [navigate, location]);

  if (!authReady && location.pathname !== '/invite') {
    return <div>로딩중...</div>;
  }

  return <Outlet />; // 하위 Route 렌더
}
