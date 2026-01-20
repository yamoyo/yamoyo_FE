import { useNavigate } from 'react-router-dom';

export function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col justify-between px-6 pb-[42px]">
      Onboarding
      <div className="flex w-full flex-col gap-2">
        <button
          className="h-[55px] w-full gap-2.5 rounded-xl bg-[#FEE500] text-body-1 flex-center"
          onClick={() =>
            navigate('http://localhost:8080/oauth2/authorization/kakao')
          }
        >
          <img src="/assets/login/kakao.svg" alt="kakao" />
          카카오톡 로그인
        </button>
        <button
          className="h-[55px] w-full gap-2.5 rounded-xl border-[1.5px] border-[#686D89] text-body-1 flex-center"
          onClick={() =>
            navigate('http://localhost:8080/oauth2/authorization/google')
          }
        >
          <img src="/assets/login/google.svg" alt="google" />
          Google로 시작하기
        </button>
      </div>
    </div>
  );
}

export default OnboardingPage;
