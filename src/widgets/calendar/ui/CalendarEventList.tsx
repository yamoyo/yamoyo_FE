import { formatYearMonth } from '@/entities/calendar/lib/utils/format-date';

interface CalendarEventListProps {
  currentDate: Date;
  onAddEvent?: () => void;
}

export default function CalendarEventList({
  currentDate,
  onAddEvent,
}: CalendarEventListProps) {
  return (
    <div className="mt-4 flex flex-1 flex-col overflow-hidden rounded-2xl bg-bg-textfiled">
      <div className="flex flex-shrink-0 items-center justify-start gap-2 p-6 pb-4">
        <h3 className="text-body-1 text-white">
          {formatYearMonth(currentDate)}
        </h3>

        <button
          onClick={onAddEvent}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bg-primary transition-colors hover:bg-[#6B3FD9]"
        >
          <span className="text-lg font-bold text-white">+</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6 pt-8">
        <div className="flex h-full flex-col items-center gap-6">
          <img src={'/assets/calendar/empty.png'} width={214} height={77} />
          <p className="text-body-2 text-tx-default_2">
            팀원들과 일정을 정해보세요
          </p>
        </div>

        {/* 나중에 일정이 많으면 여기서 스크롤됨 */}
      </div>
    </div>
  );
}
