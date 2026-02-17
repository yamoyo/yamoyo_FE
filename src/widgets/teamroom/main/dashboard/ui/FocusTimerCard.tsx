import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { formatTimeString } from '@/entities/calendar/lib/recurrence';
import { DashboardStatus } from '@/entities/teamroom/api/teamroom-dto';
import { cn } from '@/shared/config/tailwind/cn';
import { TimerBar } from '@/widgets/teamroom/leader-game/ui/TimerBar';

interface Props {
  title: string;
  startedAt: number;
  status: keyof DashboardStatus;
  isFinished?: boolean;
}

const MAX_DURATION_MS = 6 * 60 * 60 * 1000; // 6시간

/** 타이머 바가 있는 카드  */
export default function FocusTimerCard({
  title,
  startedAt,
  status,
  isFinished,
}: Props) {
  const navigate = useNavigate();
  const [leftTime, setLeftTime] = useState('');

  const isLeftHour = leftTime.split(':')[0] === '00'; // 남은 시간이 1시간 미만인지 여부

  const navigateToStatus = () => {
    navigate(status);
  };

  useEffect(() => {
    // 남은 시간 = (시작 시각 + 최대 지속 시간) − 현재 시각
    const endAt = startedAt + MAX_DURATION_MS;
    const tick = () => {
      const restMs = Math.max(endAt - Date.now(), 0);
      setLeftTime(formatTimeString(restMs)); // ms -> "HH:MM:SS"
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startedAt]);

  return (
    <div
      className={cn(
        'w-full rounded-xl bg-bg-card px-5 py-[18px]',
        isFinished ? 'cursor-default pb-2.5' : 'cursor-pointer',
      )}
      onClick={isFinished ? undefined : navigateToStatus}
    >
      <div className="mb-[30px] flex items-center gap-2">
        <img
          src={`/assets/icons/dashboard/${status}.svg`}
          alt={status}
          className="h-5 w-5"
        />
        <p className="text-body1 text-tx-default">{title}</p>
      </div>
      <div className="mb-1 flex items-center gap-2">
        <span className="pb-1 text-[13px] font-medium leading-5 text-tx-default">
          Focus Timer
        </span>
        <span
          className={cn(
            'text-body-7',
            isLeftHour ? 'text-textfiled-line_error' : 'text-bg-secondary_2',
          )}
        >
          {leftTime}
        </span>
      </div>
      <TimerBar
        totalMs={MAX_DURATION_MS}
        startedAt={startedAt}
        color="yellow"
        containerClassName="rounded-full"
      />
      {isFinished && (
        <div className="flex w-full justify-end">
          <button
            className="p-2 text-caption-1 text-white"
            onClick={navigateToStatus}
          >
            {'미참여자 보러가기 >'}
          </button>
        </div>
      )}
    </div>
  );
}
