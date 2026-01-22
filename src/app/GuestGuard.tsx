import { Outlet } from 'react-router-dom';
import { useAuthBootstrap } from '@/entities/auth/model/useAuthBootstrap';
import { useAuthStore } from '@/entities/auth/model/auth-store';

export function GuestGuard() {
  useAuthBootstrap(true);

  const authReady = useAuthStore((s) => s.authReady);
  if (!authReady) return <div>로딩중...</div>;

  return <Outlet />; // 하위 Route 렌더
}

export default GuestGuard;
