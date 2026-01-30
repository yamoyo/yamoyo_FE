import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useModalStore } from '@/shared/ui/modal/model/modal-store';
import TopBar from '@/shared/ui/header/TopBar';

import GameStartButton from '../../ui/GameStartButton';
import { useRouletteGame } from '../model/useRouletteGame';
import { DUMMY_ROULETTE } from '../model/user-dummy';
import RouletteBoard from './RouletteBoard';

const MODAL_DELAY_MS = 200;

export function RouletteGame() {
  const { openCharacterModal } = useModalStore();
  const navigate = useNavigate();

  // TODO: 서버에서 룰렛 게임 데이터 받아오는 로직
  const data = DUMMY_ROULETTE;

  const { rotation, spin, isSpinning, gameStarted, participants } =
    useRouletteGame(data);

  const timeoutRef = useRef<number | null>(null);

  // 스핀 완료 후 모달 표시
  useEffect(() => {
    if (!isSpinning && gameStarted && data) {
      const winnerCharacterId = participants.find(
        (u) => u.userId === data.winnerId,
      )?.characterId;

      if (!winnerCharacterId) return;

      timeoutRef.current = window.setTimeout(() => {
        openCharacterModal({
          title: `${data.winnerName}님! 팀장으로 선택되었습니다.`,
          subTitle: '축하합니다. 팀 빌딩을 이어가주세요.',
          type: 'CROWN',
          characterId: winnerCharacterId,
          buttonText: '확인',
          onClick: () => navigate('..', { replace: true }),
        });
      }, MODAL_DELAY_MS);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    isSpinning,
    gameStarted,
    data,
    participants,
    openCharacterModal,
    navigate,
  ]);

  return (
    <div
      className="flex min-h-dvh flex-col overflow-hidden"
      style={{
        backgroundImage: 'url(/assets/game/roulette/bg-roulette-game.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'right',
      }}
    >
      <TopBar title="룰렛게임" showBackButton={false} gameFont />

      <h1
        className="title-g outside-stroke mx-auto whitespace-pre-line text-center text-tx-default"
        style={{ ['--stroke' as string]: '#4C5377' }}
      >
        {'돌려돌려 돌림판!'}
      </h1>

      <div className="flex flex-grow flex-col items-center pb-[75px]">
        <RouletteBoard participants={participants} rotation={rotation} />

        <GameStartButton
          onClick={spin}
          color={isSpinning ? 'gray' : 'white'}
          text="게임시작"
          disabled={isSpinning}
        />
      </div>
    </div>
  );
}
