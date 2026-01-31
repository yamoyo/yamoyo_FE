import TopBar from '@/shared/ui/header/TopBar';
import BottomButton from '@/shared/ui/button/BottomButton';

export default function TimePickPage() {
  return (
    <>
      <TopBar
        title="시간 설정"
        backIcon="arrow"
        rightContent={
          <button type="button" className="h-[22px] w-[50px] flex-center">
            <img
              src="/assets/icons/badge-guide.svg"
              width={50}
              height={22}
              className="select-none"
              draggable="false"
            />
          </button>
        }
      />

      <div className="mt-5 flex flex-col items-start gap-[30px] px-6">
        <p className="w-[264px] text-title-2 text-tx-default">
          팀원들이 가장
          <span className="text-bg-secondary_2"> 많이 겹치는 시간</span>
          <br />을 찾고 있어요
        </p>
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1">
              <BottomButton
                text="시간 설정"
                onClick={() => {}}
                className="h-[40px] w-[88px] rounded-lg text-body-4 text-tx-default"
              />
              <button
                type="button"
                className="size-[40px] gap-[10px] rounded-[5.714px] bg-bd-textfiled_line flex-center"
              >
                <img
                  src="/assets/icons/timepick-reset.svg"
                  alt="reset"
                  width={28}
                  height={28}
                />
              </button>
            </div>

            <button
              type="button"
              className="flex h-[40px] w-[110px] items-center justify-center gap-1 rounded-lg bg-[#4C5377]"
            >
              <img
                src="/assets/icons/everytime.svg"
                alt="에브리타임"
                className="size-5"
              />
              <span className="text-body-4 text-tx-default">불러오기</span>
            </button>
          </div>
          {/* 일 월 화 수 목 금 토*/}
          {/* 08:00 ~ 24:00 까지 30분 단위로*/}
          {/* 각 요일 별로 32개씩 버튼을 표시하고 시간 설정 버튼 상태에 따라 toggle 상태 가능하게 끔.*/}
        </div>
      </div>
    </>
  );
}
