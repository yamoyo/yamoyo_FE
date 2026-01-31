import TopBar from '@/shared/ui/header/TopBar';
import BottomButton from '@/shared/ui/button/BottomButton';

const DAYS = ['일', '월', '화', '수', '금', '토', '일'] as const;
// 단순한 시간 배열

const TIMES = Array.from({ length: 33 }, (_, i) => {
  const hour = Math.floor(i / 2) + 8;
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
}); // 30분 단위로 시간을 배열로 만든다.

export default function TimePickPage() {
  return (
    <div
      style={{
        backgroundImage: 'url(/assets/timepick/timepick-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
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

      <div className="mt-5 flex flex-col items-start gap-[30px] px-5">
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
              className="h-[40px] w-[110px] gap-1 rounded-lg bg-bd-textfiled_line flex-center"
            >
              <img
                src="/assets/icons/everytime.svg"
                alt="에브리타임"
                className="size-5"
              />
              <span className="text-body-4 text-tx-default">불러오기</span>
            </button>
          </div>
        </div>
      </div>

      {/* 시간표 그리드 - 별도 섹션으로 분리 */}
      <div className="mt-4 flex justify-center px-5">
        {/* 시간 라벨 컬럼 */}
        <div className="mr-[6px] mt-[18px] flex flex-col gap-[2px]">
          {TIMES.map((time, i) => (
            <span
              key={time}
              className="body-g11-2 flex h-[30px] items-center justify-end text-tx-default_3"
            >
              {i % 2 === 0 ? time : ''}
            </span>
          ))}
        </div>

        {/* 요일 + 버튼 그리드 */}
        <div className="flex gap-[2px]">
          {DAYS.map((day, dayIndex) => (
            <div key={dayIndex} className="flex flex-col items-center">
              <span className="body-g11 mb-[10px] text-tx-default_3">
                {day}
              </span>
              <div className="flex flex-col gap-[2px]">
                {TIMES.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className="h-[30px] w-[42px] rounded bg-tx-default_5"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-[48px] mt-[80px] px-5">
        <BottomButton
          text="선호 시간대 설정"
          onClick={() => {}}
          className="h-auto gap-[10px] self-stretch px-[80px] py-4 flex-center"
        />
      </div>
    </div>
  );
}
