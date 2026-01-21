import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/shared/store/auth-store';
import { refreshAccessToken } from '@/shared/api/refresh-token';

export function useAuthBootstrap(isGuest: boolean) {
  const navigate = useNavigate();
  const accessToken = useAuthStore((s) => s.accessToken);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setIsAuthenticated = useAuthStore((s) => s.setIsAuthenticated);
  const setAuthReady = useAuthStore((s) => s.setAuthReady);

  // 한 번만 부팅 로직 실행하도록 막는 플래그
  const hasBootstrappedRef = useRef(false);

  useEffect(() => {
    if (hasBootstrappedRef.current) return;
    hasBootstrappedRef.current = true;
    setAuthReady(false);

    // 1. Guest 페이지(로그인/회원가입 등)
    if (isGuest) {
      // accessToken이나 isAuthenticated이 있을 때, 현재 Guest 페이지라면 home으로 이동
      if (accessToken || isAuthenticated) {
        setIsAuthenticated(true);
        navigate('/home', { replace: true });
      } else {
        setAuthReady(true);
        setIsAuthenticated(false);
      }
      return;
    }

    // 2. 로그인 이후 페이지 (home 등)
    // 로그인 이후 페이지이며 토큰이 있을 때 → 이미 accessToken 있으니 refresh 안 해도 됨
    if (accessToken) {
      setAuthReady(true);
      setIsAuthenticated(true);
      return;
    }

    (async () => {
      const ok = await refreshAccessToken();
      if (!ok) {
        // refresh 토큰 없거나 만료된 상황
        navigate('/', { replace: true });
      }
      setAuthReady(true);
    })();
    return;
  }, [
    isGuest,
    accessToken,
    isAuthenticated,
    setAuthReady,
    setIsAuthenticated,
    navigate,
  ]);
}
