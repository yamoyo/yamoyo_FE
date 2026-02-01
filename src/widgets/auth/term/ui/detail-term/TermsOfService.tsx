export function TermsOfService() {
  return (
    <div className="flex flex-col gap-14 px-6 text-tx-default">
      <h1 className="w-full text-center text-title-2">서비스 이용약관</h1>

      <div className="flex flex-col gap-9">
        <section className="flex flex-col gap-4">
          <p className="text-body1">제1조 (목적)</p>
          <p className="text-[13px] font-light leading-7">
            본 약관은 야모요가 제공하는 팀 협업 및 회의 관리 서비스의 이용과
            관련하여 회사와 이용자 간의 기본적인 권리, 의무 및 책임사항을
            규정함을 목적으로 합니다
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <p className="text-body1">제2조 (회원가입 및 이용)</p>
          <ol className="list-decimal pl-4 text-[13px] font-light leading-7">
            <li>본 서비스는 소셜 로그인 방식으로 회원가입이 가능합니다.</li>
            <li>동일한 이메일 주소는 하나의 계정으로 관리됩니다.</li>
            <li>이용자는 가입 시 정확한 정보를 제공해야 합니다.</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <p className="text-body1">제3조 (서비스 제공)</p>
          <ol className="list-decimal pl-4 text-[13px] font-light leading-7">
            <li>본 서비스는 팀 협업 및 회의 관리를 위한 기능을 제공합니다.</li>
            <li>
              서비스의 일부 기능을 운영상 필요에 따라 변경하거나 종료할 수
              있습니다.
            </li>
          </ol>
        </section>

        <section className="flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            <p className="text-body1">제4조 (회원의 책임)</p>
            <p className="text-[14px] leading-[21px]">
              이용자는 다음 행위를 하여서는 안 됩니다.
            </p>
          </div>
          <ol className="list-decimal pl-4 text-[13px] font-light leading-7">
            <li>타인의 계정 도용 또는 부정 사용</li>
            <li>서비스 운영을 방해하는 행위</li>
            <li>관련 법령을 위반하는 행위</li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <p className="text-body1">제5조 (서비스 중단)</p>
          <p className="text-[13px] leading-7">
            시스템 점검, 장애 등 불가피한 사유가 발생한 경우 서비스 제공을
            일시적으로 중단할 수 있습니다.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <p className="text-body1">제6조 (탈퇴 및 이용 종료)</p>
          <ol className="list-decimal pl-4 text-[13px] font-light leading-7">
            <li>
              이용자는 언제든지 서비스 내 탈퇴 기능을 통해 이용 계약을 해지할 수
              있습니다.
            </li>
            <li>
              탈퇴 시 계정 정보는 즉시 삭제되며, 삭제된 정보는 복구되지
              않습니다.
            </li>
          </ol>
        </section>

        <section className="flex flex-col gap-4">
          <p className="text-body1">제7조 (준거법)</p>
          <p className="text-[13px] font-light leading-7">
            본 약관은 대한민국 법률을 준거법으로 합니다.
          </p>
        </section>
      </div>
    </div>
  );
}
