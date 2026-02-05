import { useState } from 'react';

import { useLeaderGameStore } from '@/features/leader-game/ws/model/leader-game-store';
import BottomButton from '@/shared/ui/button/BottomButton';
import TopBar from '@/shared/ui/header/TopBar';

import { TimerBar } from '../TimerBar';
import LeaderApplicationButton from './LeaderApplicationButton';

const BUTTON_ITEMS = [
  {
    title: '제가 해볼게요!',
    subTitle: '프로젝트를 이끌고 싶어요.',
    value: 'APPLICATION',
  },
  {
    title: '부담스러워요..',
    subTitle: '게임으로 정하고 싶어요.',
    value: 'NOT_APPLICATION',
  },
] as const;

interface Props {
  volunteerAsLeader: () => void;
  passAsLeader: () => void;
}

/** 팀장 지원 컴포넌트 */
export default function LeaderApplication({
  volunteerAsLeader,
  passAsLeader,
}: Props) {
  const [selected, setSelected] = useState<
    (typeof BUTTON_ITEMS)[number]['value'] | null
  >(null);

  const payload = useLeaderGameStore((s) => s.payload);
  const setPhase = useLeaderGameStore((s) => s.setPhase);
  const clearPayload = useLeaderGameStore((s) => s.clearPayload);

  const startedAt = new Date(payload?.phaseStartTime ?? Date.now());
  const durationSeconds = payload?.durationSeconds ?? 0;

  const onNext = () => {
    if (!selected) return;

    if (selected === 'APPLICATION') {
      volunteerAsLeader();
    } else {
      passAsLeader();
    }

    // // 다음 단계로
    setPhase('LEADER_APPLICATION_WAIT');
    clearPayload();
  };

  return (
    <>
      <TopBar title="팀장 정하기" />
      <TimerBar startedAt={startedAt} totalMs={durationSeconds * 1000} />
      <div className="flex flex-grow flex-col justify-between px-6 pb-12 pt-[34px]">
        <div>
          <p className="mb-2 text-title-2 text-white">
            이 팀의 멋진 리더가 되어 주시겠어요?
          </p>
          <p className="whitespace-pre-line text-tx-default_4">
            {'지원이 없더라도 걱정 마세요.\n야모요가 공정하게 도와드릴게요!'}
          </p>
          <div className="mt-12 flex justify-between">
            {BUTTON_ITEMS.map((item, index) => (
              <LeaderApplicationButton
                key={item.value}
                selected={selected === item.value}
                onSelect={setSelected}
                imgSrcSelected={`/assets/character/char-leader-application-selected-${index + 1}.png`}
                imgSrcUnselected={`/assets/character/char-leader-application-unselected-${index + 1}.png`}
                {...item}
              />
            ))}
          </div>
        </div>
        <BottomButton text="선택 완료" disabled={!selected} onClick={onNext} />
      </div>
    </>
  );
}
