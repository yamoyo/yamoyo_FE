import { jwtDecode } from 'jwt-decode';

import type {
  DashboardStatus,
  TeamMemberRole,
} from '@/entities/teamroom/api/teamroom-dto';
import { useAuthStore } from '@/shared/api/auth/store';
import { PillTabHeader, SwipeTabs, TabsConfig } from '@/shared/ui/tab';
import FocusTimerCard from '@/widgets/teamroom/main/dashboard/FocusTimerCard';
import Rules from '@/widgets/teamroom/main/dashboard/rule/RuleContents';
import ToolContents from '@/widgets/teamroom/main/dashboard/Tool/ToolContents';

interface Props {
  teamRoomId: string | number;
  myRole: TeamMemberRole;
  setupCreatedAt?: string;
}

export function Dashboard({ teamRoomId, myRole, setupCreatedAt }: Props) {
  const fallback = (title: string, status: keyof DashboardStatus) =>
    setupCreatedAt ? (
      <FocusTimerCard
        title={title}
        startedAt={new Date(setupCreatedAt)}
        status={status}
      />
    ) : null;

  const accessToken = useAuthStore((s) => s.accessToken);

  const myUserId = accessToken
    ? jwtDecode<{ sub: string }>(accessToken).sub
    : null;


  const tabs: TabsConfig[] = [
    {
      id: 'timeselect',
      label: '미팅일정',
      render: () =>
        false ? <></> : fallback('빠른 미팅일정을 설정하세요', 'timeselect'),
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
