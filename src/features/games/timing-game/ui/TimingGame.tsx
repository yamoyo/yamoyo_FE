'use client';

import { useEffect, useRef, useState } from 'react';

import TopBar from '@/shared/ui/header/TopBar';
import { TimerBar } from '@/widgets/teamroom/leader/ui/TimerBar';

import GameStartButton from '../../ui/GameStartButton';
import { useTimingGame } from '../model/useTimingGame';

export function TimingGame() {
  const { elapsed, isRunning, difference, diffText, onClickButton } =
    useTimingGame();

  // TODO: 실제 startedAt 값을 서버에서 받아와야 함
  const [startedAt] = useState(() => new Date().toISOString());

  // 10초 지나도 시작 안 했을 때 보여줄 모달 상태
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);

  const isRunningRef = useRef(isRunning);
  const differenceRef = useRef(difference);

  // 이미 10초 모달을 한 번 보여줬는지 여부
  const hasShownTimeoutModalRef = useRef(false);

  // 다음 두 경우가 일어나는 예외처리가 겹치지 않게 막는 플래그
  // 1. 15초 동안 게임을 시작하지 않음
  // 2. 게임 시작 후 10초 동안 정지 버튼을 누르지 않음
  const hasHandledTimeoutRef = useRef(false);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    differenceRef.current = difference;
  }, [difference]);

  const handleTimeout = () => {
    if (hasHandledTimeoutRef.current) return;
    hasHandledTimeoutRef.current = true;

    // TODO: 15초 동안 게임을 하지 않거나,
    //       게임 시작 후 10초 동안 정지 버튼을 누르지 않으면
    //       서버에 max 시간을 넘겨주고 다음 단계로 넘어가도록 구현
  };

  // startedAt 기준 10초 / 15초 타이머
  useEffect(() => {
    const startMs = new Date(startedAt).getTime();
    const now = Date.now();

    const tenSecDelay = Math.max(startMs + 10000 - now, 0);
    const fifteenSecDelay = Math.max(startMs + 15000 - now, 0);

    const tenSecTimer = window.setTimeout(() => {
      // 이미 모달 보여준 적 있으면 무시
      if (hasShownTimeoutModalRef.current) return;

      // 아직 게임 시작 전 + 결과도 없는 상태일 때만 모달 표시
      if (!isRunningRef.current && differenceRef.current === null) {
        hasShownTimeoutModalRef.current = true; // 다시는 안 뜨게 플래그
        setShowTimeoutModal(true);
      }
    }, tenSecDelay);

    // 15초 동안 게임을 하지 않으면 실행되어야 할 동작
    const fifteenSecTimer = window.setTimeout(() => {
      // 15초가 되었을 때도 여전히
      // - 게임을 시작하지 않았고 (isRunning === false)
      // - 결과도 없는 상태(difference === null)라면
      if (!isRunningRef.current && differenceRef.current === null) {
        handleTimeout();
      }
    }, fifteenSecDelay);

    return () => {
      clearTimeout(tenSecTimer);
      clearTimeout(fifteenSecTimer);
    };
  }, [startedAt]);

  // 게임을 시작한 시점에서 10초가 지나도 정지하지 않으면 타임아웃 처리
  useEffect(() => {
    if (!isRunning) return;

    const timerId = window.setTimeout(() => {
      // 10초가 지났는데도 여전히
      // - 게임이 돌아가는 중이고 (isRunning === true)
      // - 결과가 없는 상태라면 (difference === null)
      if (isRunningRef.current && differenceRef.current === null) {
        handleTimeout();
      }
    }, 10000);

    return () => {
      clearTimeout(timerId);
    };
  }, [isRunning]);

  const handleOnClick = () => {
    if (showTimeoutModal) {
      setShowTimeoutModal(false);
    }
    onClickButton();
  };

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
        startedAt={startedAt}
        containerClassName="mt-0.5"
        hideIcon={isRunning}
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

          {/** 타임아웃 경고 모달 */}
          {showTimeoutModal && (
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
