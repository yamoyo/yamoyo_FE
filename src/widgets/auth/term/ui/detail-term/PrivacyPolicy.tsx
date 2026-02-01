export function PrivacyPolicy() {
  return (
    <div className="flex flex-col gap-14 px-6 text-tx-default">
      <p className="w-full text-center text-title-2">개인정보 처리방침</p>

      <div className="flex flex-col gap-9">
        <section className="flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            <p className="text-body-1">제1조 (수집하는 개인정보)</p>
            <p className="text-[14px] leading-[21px]">
              본 서비스는 다음의 개인정보를 수집합니다.
            </p>
          </div>

          <ul className="list-disc pl-5 text-[13px] font-light leading-7">
            <li>이메일 주소</li>
            <li>이름 및 프로필 정보</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            <p className="text-body-1">제2조 (개인정보 이용 목적)</p>
            <p className="text-[14px] leading-[21px]">
              수집한 개인정보는 다음 목적을 위해 이용됩니다.
            </p>
          </div>

          <ul className="list-disc pl-5 text-[13px] font-light leading-7">
            <li>회원 식별 및 로그인 처리</li>
            <li>팀 협업 및 회의 관리 서비스 제공</li>
            <li>서비스 운영 및 안내 알림 제공</li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-body-1">제3조 (보유 및 이용 기간)</p>
          </div>

          <ul className="list-disc pl-5 text-[13px] font-light leading-7">
            <li>개인정보는 회원 탈퇴 시까지 보유합니다.</li>
            <li>회원 탈퇴 시 개인정보는 즉시 삭제되며 복구되지 않습니다.</li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-body-1">제4조 (개인정보 제공)</p>
          </div>

          <ul className="list-disc pl-5 text-[13px] font-light leading-7">
            <li className="whitespace-pre-wrap">
              이용자의 개인정보를 제3자에게 제공하지 않습니다.
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-body-1">제5조 (이용자의 권리)</p>
          </div>

          <ul className="list-disc pl-5 text-[13px] leading-7">
            <li className="whitespace-pre-wrap">
              이용자는 언제든지 개인정보 열람, 수정 및 삭제를 요청할 수
              있습니다.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
