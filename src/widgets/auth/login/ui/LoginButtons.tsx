import { BASE_URL } from '@/shared/api/base/request';

export default function LoginButtons() {
  return (
    <div className="flex w-full flex-col gap-2">
      <button
        className="h-[55px] w-full gap-2.5 rounded-xl bg-[#FEE500] text-body-1 text-[#241D00] flex-center"
        onClick={() =>
          (window.location.href = `${BASE_URL}/oauth2/authorization/kakao`)
        }
      >
        <img src="/assets/login/kakao.svg" alt="kakao" />
        카카오톡 로그인
      </button>
      <button
        className="h-[55px] w-full gap-2.5 rounded-xl border-[1.5px] border-[#686D89] text-body-1 text-white flex-center"
        onClick={() =>
          (window.location.href = `${BASE_URL}/oauth2/authorization/google`)
        }
      >
        <img src="/assets/login/google.svg" alt="google" />
        Google로 시작하기
      </button>
    </div>
  );
}
