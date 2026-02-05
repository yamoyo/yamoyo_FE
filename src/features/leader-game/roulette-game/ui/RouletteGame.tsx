import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { GameResultPayload } from '@/entities/leader-game/api/ws-types';
import { useRouletteGame } from '@/features/leader-game/roulette-game/model/useRouletteGame';
import RouletteBoard from '@/features/leader-game/roulette-game/ui/RouletteBoard';
import { useLeaderSelectionStore } from '@/features/leader-game/ws/model/leader-game-store';
import TopBar from '@/shared/ui/header/TopBar';
import { useModalStore } from '@/shared/ui/modal/model/modal-store';
import GameStartButton from '@/widgets/teamroom/main/ui/GameStartButton';

const MODAL_DELAY_MS = 200;

export function RouletteGame({
  gameResultPayload,
}: {
  gameResultPayload: GameResultPayload;
}) {
  const navigate = useNavigate();
  const { openCharacterModal } = useModalStore();

  const { winnerId, winnerName, participants } = gameResultPayload;

  const { rotation, spin, isSpinning, gameStarted } =
    useRouletteGame(gameResultPayload);

  const timeoutRef = useRef<number | null>(null);
  const setWorkflow = useLeaderSelectionStore((s) => s.setWorkflow);

  // 스핀 완료 후 모달 표시
  useEffect(() => {
    if (!isSpinning && gameStarted) {
      const winnerCharacterId = participants.find(
        (u) => u.userId === winnerId,
      )?.profileImageId;

      if (!winnerCharacterId) return;

      timeoutRef.current = window.setTimeout(() => {
        openCharacterModal({
          title: `${winnerName}님! 팀장으로 선택되었습니다.`,
          subTitle: '축하합니다. 팀 빌딩을 이어가주세요.',
          type: 'CROWN',
          characterId: winnerCharacterId,
          buttonText: '팀룸으로 이동',
          onClick: () => {
            navigate('..', { replace: true });
            setWorkflow('SETUP');
          },
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
    winnerId,
    winnerName,
    participants,
    openCharacterModal,
    navigate,
    setWorkflow,
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
