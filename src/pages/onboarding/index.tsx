// 온보딩이 진행되지 않았을 때 로그인 후 여기로 이동
// onboarding/term으로 리다이렉트

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function OnboardPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/onboarding/term');
  }, [navigate]);

  return null;
}

export default OnboardPage;
