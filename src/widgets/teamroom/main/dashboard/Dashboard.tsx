import { jwtDecode } from 'jwt-decode';

import { useMeetings } from '@/entities/calendar/hooks/useMeetings';
import {
  useRuleVoteParticipation,
  useTeamRules,
} from '@/entities/setup/rule/hooks/useRule';
import {
  useConfirmedTools,
  useToolVoteParticipation,
} from '@/entities/setup/tool/hooks/useTool';
import type {
  DashboardStatus,
  TeamMemberRole,
} from '@/entities/teamroom/api/teamroom-dto';
import { useTimeSelect } from '@/entities/timeselect/hooks/useTimeSelect';
import { useAuthStore } from '@/shared/api/auth/store';
import { PillTabHeader, SwipeTabs, TabsConfig } from '@/shared/ui/tab';
import FocusTimerCard from '@/widgets/teamroom/main/dashboard/FocusTimerCard';
import Rules from '@/widgets/teamroom/main/dashboard/rule/RuleContents';
import ToolContents from '@/widgets/teamroom/main/dashboard/Tool/ToolContents';

import MeetingList from './ui/MeetingList';

interface Props {
  teamRoomId: string | number;
  myRole: TeamMemberRole;
  setupCreatedAt?: string;
}

export function Dashboard({ teamRoomId, myRole, setupCreatedAt }: Props) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const { data: timeSelectData } = useTimeSelect(Number(teamRoomId));
  const { data: meetingsData } = useMeetings(Number(teamRoomId), year, month);

  const isTimeSelectFinalized = timeSelectData?.status === 'FINALIZED';
  const meetings = meetingsData?.meetings ?? [];

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

  // 확정된 규칙 조회
  const {
    data: rulesData,
    isLoading: isRulesLoading,
    isError: isRulesError,
  } = useTeamRules(teamRoomId);

  // 규칙 투표 참여 현황 조회 (내 투표 여부 확인용)
  const {
    data: ruleParticipation,
    isLoading: isRuleParticipationLoading,
    isError: isRuleParticipationError,
  } = useRuleVoteParticipation(myUserId ? teamRoomId : undefined);

  // 협업툴 조회
  const {
    data: confirmedToolsData,
    isLoading: isToolsLoading,
    isError: isToolsError,
  } = useConfirmedTools(teamRoomId);

  // 협업툴 투표 참여 현황 조회 (내 투표 여부 확인용)
  const {
    data: toolParticipation,
    isLoading: isToolParticipationLoading,
    isError: isToolParticipationError,
  } = useToolVoteParticipation(myUserId ? teamRoomId : undefined);

  const tabs: TabsConfig[] = [
    {
      id: 'timeselect',
      label: '미팅일정',
      render: () =>
        isTimeSelectFinalized ? (
          <MeetingList meetings={meetings} teamRoomId={Number(teamRoomId)} />
        ) : (
          fallback('빠른 미팅일정을 설정하세요', 'timeselect')
        ),
    },
    {
      id: 'tool',
      label: '협업툴',
      render: () => {
        if (isToolsLoading || isToolParticipationLoading) {
          return <div>협업툴을 불러오는 중이에요...</div>;
        }

        const isParticipationRequired = !!myUserId;

        if (
          !toolParticipation ||
          isToolsError ||
          !confirmedToolsData ||
          (isParticipationRequired &&
            (isToolParticipationError || !toolParticipation))
        ) {
          return <div>협업툴을 불러오지 못했어요.</div>;
        }

        // 내가 투표에 참여한 기록이 없으면 fallback
        const hasVotedTools = toolParticipation.voted.some(
          (v) => v.userId === Number(myUserId),
        );

        if (!hasVotedTools) {
          return fallback('협업툴을 설정하세요', 'tool');
        }

        return <ToolContents confirmedToolsData={confirmedToolsData} />;
      },
    },
    {
      id: 'rule',
      label: '팀 규칙',
      render: () => {
        if (isRulesLoading || isRuleParticipationLoading)
          return <div>규칙을 불러오는 중이에요...</div>;
        if (
          isRulesError ||
          isRuleParticipationError ||
          !rulesData ||
          !ruleParticipation
        )
          return <div>규칙을 불러오지 못했어요.</div>;

        const hasVotedRules = ruleParticipation?.voted.some(
          (v) => v.userId === Number(myUserId),
        );

        if (!hasVotedRules) return fallback('팀 규칙을 설정하세요', 'rule');

        return (
          <Rules
            rulesData={rulesData}
            teamRoomId={teamRoomId}
            myRole={myRole}
          />
        );
      },
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
