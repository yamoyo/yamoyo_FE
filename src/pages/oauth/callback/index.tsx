import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function OAuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 처리가 완료된 후 온보딩 약관 동의 페이지로 이동
    // 백엔드에서 리다이렉트 구현이 완료되면 이 페이지는 삭제 예정
    navigate('/onboarding/terms');
  }, [navigate]);

  return <div>로그인 처리 중입니다...</div>;
}

export default OAuthCallbackPage;
