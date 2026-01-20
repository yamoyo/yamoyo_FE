/**
 * 홈 뷰 페이지 팀룸 생성 카드 컴포넌트
 * @author junyeol
 */

const HomeCard = () => {
  return (
    <div className="mx-[24px] my-[24px] rounded-xl border border-[#6A7194] bg-[#3D4366] px-[24px] py-[24px]">
      {' '}
      {/* 텍스트 + 이미지 / 버튼 위 아래 배치 */}
      <div className="grid grid-cols-[1fr_auto] items-start">
        {' '}
        {/* 텍스트 + 이미지 grid 배치 */}
        <div className="flex flex-col gap-[18px]">
          <div className="min-w-[170px] text-[18px] font-bold text-white">
            {' '}
            {/* 두 문장 한 묶음 스타일링 적용*/}
            <p>팀 프로젝트 초기 세팅,</p>
            <p>쉽고 빠르게!</p>
          </div>

          <div className="text-[14px] font-medium text-[#D5D6E1]">
            {' '}
            {/* 두 문장 한 묶음 스타일링 적용*/}
            <p>야모요와 함께</p>
            <p>지금 바로 시작해보세요.</p>
          </div>
        </div>
        <div className="gap-6 flex-col-center">
          <img src="/assets/home/crown.png" width={48} height={39} />
          <img src="/assets/home/crown-bottom.png" width={142} height={57} />
        </div>
      </div>
      {/** TODO(준열) : 추후 팀룸 생성 로직 작업 시 연결 예정 */}
      <button className="mt-[37px] gap-[14px] rounded-xl bg-[#804FFF] px-[20px] py-[13px] text-[15px] font-bold text-white flex-center">
        <img src="/assets/home/users.png" width={30} height={30} alt="" />
        팀룸 생성하기
      </button>
    </div>
  );
};

export default HomeCard;
