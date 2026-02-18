export default function SplashPage() {
  return (
    <div className="min-h-dvh">
      <div className="mx-auto flex min-h-dvh max-w-[390px] bg-bg-default flex-col-center">
        <h1 className="gap-4 flex-col-center">
          <img
            src="/assets/gif/onboarding.gif"
            alt="로딩"
            className="h-[220px] w-[300px]"
          />
          <span className="text-[22px] font-bold text-tx-default">
            모이자마자 완성되는
          </span>
          <span className="text-[22px] font-bold text-tx-default">
            팀 세팅 플랫폼
          </span>
        </h1>
      </div>
    </div>
  );
}
