import { useTimingGame } from '@/features/leader-game/timing-game/model/useTimingGame';
import TopBar from '@/shared/ui/header/TopBar';
import { TimerBar } from '@/widgets/teamroom/leader-game/ui/TimerBar';
import GameStartButton from '@/widgets/teamroom/main/ui/GameStartButton';

interface Props {
  phaseStartTime: number;
  durationSeconds: number;
  submitTimingResult: (timeDifference: number) => void;
}

export function TimingGame({
  phaseStartTime,
  durationSeconds,
  submitTimingResult,
}: Props) {
  const duration = durationSeconds || 30; // 기본값 30초

  const {
    elapsed,
    isRunning,
    difference,
    diffText,
    isGameStartModalOpen,
    handleOnClick,
  } = useTimingGame(phaseStartTime, duration, submitTimingResult);

  return (
    <div
      style={{
        backgroundImage: 'url(/assets/game/timing/bg-timing-game.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '110% auto',
        backgroundPosition: 'center',
      }}
      className="flex flex-1 flex-col"
    >
      <TopBar title="타이밍 맞추기" showBackButton={false} gameFont />
      <TimerBar
        totalMs={15000}
        startedAt={phaseStartTime}
        containerClassName="mt-0.5"
        hideIcon={Boolean(isRunning || difference)}
      />

      <div className="mt-7 flex flex-grow flex-col items-center justify-between pb-[60px]">
        <div>
          <div className="mb-20 flex flex-col items-center">
            <h1
              className="mb-4 whitespace-pre-line font-galmuri-11 text-[24px] font-bold text-tx-default"
              style={{
                WebkitTextFillColor: '#FFFFFF',
                WebkitTextStrokeWidth: '0.8px', // 디자인 상 1px이나 아웃라인이 아닌 인라인으로 적용되어 0.8px로 설정
                WebkitTextStrokeColor: '#4C5377',
              }}
            >
              {'7.777초를 잡아라!\n감각적인 리더 찾기'}
            </h1>
            <p className="text-body-6 text-tx-default_4">
              목표 시간 [7.777초]에 최대한 가깝게 정지를 눌러보세요.
            </p>
          </div>

          <div className="mb-6 text-center font-galmuri-11 text-[17px] font-bold text-tx-default">
            목표 시간: <span className="text-[#FDDA08]">{'[7.777초]'}</span>
          </div>

          <div className="flex h-[110px] w-[298px] items-center rounded-lg border-[1.5px] border-[#929292] bg-bt-disabled pl-[30px]">
            <div>
              <span className="title-g2 mr-[6.29px] leading-[95%] tracking-[8.25px] text-tx-default opacity-[0.93]">
                {elapsed.toFixed(3)}
              </span>
              <span className="pb-[9px] text-body-4 text-tx-default opacity-[0.56]">
                sec
              </span>
            </div>
          </div>

          {/* 결과 메시지 */}
          {difference !== null && (
            <p className="body-g4 mt-6 whitespace-pre-line text-center text-tx-default_2">
              {`${diffText}\n모든 팀원이 완료할 때까지 잠시만 기다려주세요.`}
            </p>
          )}
        </div>

        <div className="relative">
          <GameStartButton
            onClick={handleOnClick}
            color={
              isRunning ? 'yellow' : difference !== null ? 'gray' : 'white'
            }
            text={isRunning || difference !== null ? '정지' : '게임시작'}
            disabled={difference !== null}
          />

          {isGameStartModalOpen && (
            <div className="absolute left-1/2 top-[-60px] flex h-12 w-[342px] -translate-x-1/2 select-none items-center gap-2.5 rounded-xl bg-[#191C2D] pl-[13px] text-body-6 text-white">
              <img
                src="/assets/icons/clock.svg"
                alt="Clock Icon"
                height={22}
                width={22}
              />
              게임 시작 버튼을 5초 안에 눌러주세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
