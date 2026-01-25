interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export default function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
}: CalendarHeaderProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  return (
    <div className="flex items-center justify-between px-5">
      <div className="flex items-center gap-2">
        <button onClick={onPrevMonth} className="select-none p-1">
          <img
            src={'/assets/icons/arrow-left.svg'}
            width={9}
            height={16}
            draggable="false"
          />
        </button>

        <span className="min-w-[101px] text-center font-galmuri-11 text-title-2 text-white">
          {year}년 {month}월
        </span>

        <button onClick={onNextMonth} className="select-none p-1">
          <img
            src={'/assets/icons/arrow-left.svg'}
            className="scale-x-[-1]"
            width={9}
            height={16}
            draggable="false"
          />
        </button>
      </div>

      <button
        onClick={onToday}
        className="rounded-2xl bg-bd-textfiled_line px-[14px] py-[5px] text-body-4 text-tx-default_3"
      >
        오늘
      </button>
    </div>
  );
}
