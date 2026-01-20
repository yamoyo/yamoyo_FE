export default function SplashPage() {
  return (
    <div className="min-h-dvh bg-neutral-100">
      <div className="mx-auto flex min-h-dvh max-w-[430px] bg-black flex-col-center">
        <h1 className="gap-4 flex-col-center">
          <span className="text-[24px] font-medium text-white">
            모이자마자 완성되는
          </span>
          <span className="text-[24px] font-medium text-white">
            팀 세팅 플랫폼
          </span>
        </h1>
        <img
          src="/assets/gif/onbording.gif"
          alt="로딩"
          className="h-[220px] w-[300px]"
        />
      </div>
    </div>
  );
}
