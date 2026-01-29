import TopBar from '@/shared/ui/header/TopBar';
import { TimerBar } from '../TimerBar';
import SelectGameItem from './SelectGameItem';
import { GAMES } from './model/constants';

export default function SelectGame() {
  // TODO: 실제 startedAt 값을 서버에서 받아와야 함
  const startedAt = new Date().toISOString(); // 예시 시작 시간 (현재 시간)

  return (
    <>
      <TopBar title="팀장 정하기" backIcon="cancel" />
      <TimerBar startedAt={startedAt} />
      <div className="mt-8 px-6">
        <h1 className="mb-1 text-title-2 text-tx-default_2">
          팀장을 어떻게 찾을까요?
        </h1>
        <p className="text-body-5 text-tx-default_4">
          방장님, 우리 팀에 가장 어색하지 않은 방식을 골라주세요.
        </p>
        <div className="mt-9 space-y-6">
          {GAMES.map((game) => (
            <SelectGameItem {...game} key={game.id} />
          ))}
        </div>
      </div>
    </>
  );
}
