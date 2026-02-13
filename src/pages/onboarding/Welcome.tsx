import { useLocation, useNavigate } from 'react-router-dom';

import BottomButton from '@/shared/ui/button/BottomButton';

export default function WelcomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const name = (location.state as { name?: string })?.name || '회원';

  const handleStart = () => {
    const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
    if (redirectUrl) {
      sessionStorage.removeItem('redirectAfterLogin');
      navigate(redirectUrl, { replace: true });
    } else {
      navigate('/home', { replace: true });
    }
  };

  return (
    <div className="relative flex h-dvh flex-col px-6 pb-[60px]">
      <div className="flex-1 flex-col gap-9 flex-center">
        <img
          src="/assets/onboarding/onboarding-welcome.png"
          alt="환영"
          className="h-[186px] w-[209px] select-none"
          draggable={false}
        />
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-title-3 text-tx-default">{name}님, 환영해요!</h1>
          <p className="text-title-1 text-textfiled-line_focus">
            성공적으로 가입되었어요!
          </p>
        </div>
      </div>
      <BottomButton text="시작하기" onClick={handleStart} />
    </div>
  );
}
