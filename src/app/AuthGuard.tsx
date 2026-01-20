import { onAuthExpired } from '@/shared/lib/auth-event-bus';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthExpired(() => {
      // Todo: 만료 UI 처리는 좀 상의해야할 듯
      alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
      navigate('/login');
    });

    return unsubscribe;
  }, [navigate]);

  return <>{children}</>;
}
