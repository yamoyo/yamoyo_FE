import { PillTabHeader, SwipeTabs, TabsConfig } from '@/shared/ui/tab';
import FocusTimerCard from './FocusTimerCard';
import { DashboardStatus } from '@/entities/teamroom/model/types';
import Rules from './rule/RuleContents';
import ToolContents from './Tool/ToolContents';

const decided: DashboardStatus = {
  timepick: false,
  tool: false,
  rule: true,
};

const startedAt = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(); // 현재 시간에서 3시간 전

export function Dashboard() {
  /** 각 사항이 결정되지 않았을 때 보여줄 타이머 카드
   *
   * - fallback: “대안”, “대신 보여주는 것”
   */
  const fallback = (title: string, status: keyof DashboardStatus) => (
    <FocusTimerCard title={title} startedAt={startedAt} status={status} />
  );

  const tabs: TabsConfig[] = [
    {
      id: 'timepick',
      label: '미팅일정',
      render: () =>
        decided.timepick ? (
          <></>
        ) : (
          fallback('빠른 미팅일정을 설정하세요', 'timepick')
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
