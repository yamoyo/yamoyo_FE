import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function OAuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 저장된 리다이렉트 URL이 있으면 그곳으로, 없으면 온보딩으로
    const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
    if (redirectUrl) {
      sessionStorage.removeItem('redirectAfterLogin');
      navigate(redirectUrl, { replace: true });
    } else {
      navigate('/onboarding/terms', { replace: true });
    }
  }, [navigate]);

  return <div>로그인 처리 중입니다...</div>;
}

export default OAuthCallbackPage;
