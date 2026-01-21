import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function OAuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home');
  }, [navigate]);

  return <div>로그인 처리 중입니다...</div>;
}

export default OAuthCallbackPage;
