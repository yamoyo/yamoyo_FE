import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { onAuthExpired } from '@/shared/api/auth/event-bus';
import { useAuthStore } from '@/shared/api/auth/store';
import { useAuthBootstrap } from '@/shared/api/auth/use-auth-bootstrap';

export function AuthGuard() {
  useAuthBootstrap(false);
  const navigate = useNavigate();
  const authReady = useAuthStore((s) => s.authReady);

  useEffect(() => {
    // 페이지 접속 시 토큰 발급 과정이 완료되지 않으면 return
    if (!authReady) return;

    const unsubscribe = onAuthExpired(() => {
      // Todo: 만료 UI 처리는 좀 상의해야할 듯
      alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
      useAuthStore.getState().clear();
      navigate('/');
    });

    return unsubscribe;
  }, [authReady, navigate]);

  if (!authReady) return <div>로딩중...</div>;

  return <Outlet />; // 하위 Route 렌더
}

export default AuthGuard;
