import { useMeetings } from '@/entities/calendar/hooks/useMeetings';
import { DashboardStatus } from '@/entities/teamroom/api/teamroom-dto';
import { useTimeSelect } from '@/entities/timeselect/hooks/useTimeSelect';
import { PillTabHeader, SwipeTabs, TabsConfig } from '@/shared/ui/tab';

import FocusTimerCard from './FocusTimerCard';
import Rules from './rule/RuleContents';
import ToolContents from './Tool/ToolContents';
import MeetingList from './ui/MeetingList';

// tool, rule은 아직 하드코딩 (추후 API 연동 필요)
const decided = {
  tool: false,
  rule: true,
};

interface DashboardProps {
  teamRoomId: number;
}

const startedAt = new Date(Date.now() - 3 * 60 * 60 * 1000); // 현재 시간에서 3시간 전 (임시용)

export function Dashboard({ teamRoomId }: DashboardProps) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const { data: timeSelectData } = useTimeSelect(teamRoomId);
  const { data: meetingsData } = useMeetings(teamRoomId, year, month);

  const isTimeSelectFinalized = timeSelectData?.status === 'FINALIZED';
  const meetings = meetingsData?.meetings ?? [];
  /** 각 사항이 결정되지 않았을 때 보여줄 타이머 카드
   *
   * - fallback: “대안”, “대신 보여주는 것”
   */
  const fallback = (title: string, status: keyof DashboardStatus) => (
    <FocusTimerCard title={title} startedAt={startedAt} status={status} />
  );

  const tabs: TabsConfig[] = [
    {
      id: 'timeselect',
      label: '미팅일정',
      render: () =>
        isTimeSelectFinalized ? (
          <MeetingList meetings={meetings} />
        ) : (
          fallback('빠른 미팅일정을 설정하세요', 'timeselect')
        ),
    },
    {
      id: 'tool',
      label: '협업툴',
      render: () =>
        decided.tool ? (
          <ToolContents />
        ) : (
          fallback('협업툴을 설정하세요', 'tool')
        ),
    },
    {
      id: 'rule',
      label: '팀 규칙',
      render: () =>
        decided.rule ? <Rules /> : fallback('팀 규칙을 설정하세요', 'rule'),
    },
  ];

  return (
    <div className="mt-5 flex-grow px-6 pb-5">
      <SwipeTabs
        tabs={tabs}
        Header={(p) => <PillTabHeader className="mb-4" {...p} />}
      />
    </div>
  );
}
