import { jwtDecode } from 'jwt-decode';

import { useMeetings } from '@/entities/calendar/hooks/useMeetings';
import {
  useRuleVoteParticipation,
  useTeamRules,
} from '@/entities/rule/hooks/useRule';
import type {
  DashboardStatus,
  TeamMemberRole,
  TeamRoomWorkflow,
} from '@/entities/teamroom/api/teamroom-dto';
import { useTimeSelect } from '@/entities/timeselect/hooks/useTimeSelect';
import {
  useConfirmedTools,
  useToolVoteParticipation,
} from '@/entities/tool/hooks/useTool';
import { useAuthStore } from '@/shared/api/auth/store';
import { PillTabHeader, SwipeTabs, TabsConfig } from '@/shared/ui/tab';
import Rules from '@/widgets/teamroom/main/dashboard/rule/RuleContents';
import ToolContents from '@/widgets/teamroom/main/dashboard/Tool/ToolContents';
import FocusTimerCard from '@/widgets/teamroom/main/dashboard/ui/FocusTimerCard';

import MeetingList from './MeetingList';

interface Props {
  teamRoomId: string | number;
  myRole: TeamMemberRole;
  setupCreatedAt?: number;
  workflow: TeamRoomWorkflow;
}

export function Dashboard({
  teamRoomId,
  myRole,
  setupCreatedAt,
  workflow,
}: Props) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const { data: timeSelectData } = useTimeSelect(Number(teamRoomId));
  const { data: meetingsData } = useMeetings(Number(teamRoomId), year, month);

  const isTimeSelectFinalized = timeSelectData?.status === 'FINALIZED';
  const meetings = meetingsData?.meetings ?? [];

  const fallback = (
    title: string,
    status: keyof DashboardStatus,
    isFinished?: boolean,
  ) =>
    setupCreatedAt ? (
      <FocusTimerCard
        title={title}
        startedAt={setupCreatedAt}
        status={status}
        isFinished={isFinished}
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
          <MeetingList
            meetings={meetings}
            teamRoomId={Number(teamRoomId)}
            showAddButton={isTimeSelectFinalized}
          />
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

        // 내가 투표에 참여했는지 확인
        const hasVotedTools = toolParticipation.voted.some(
          (v) => v.userId === Number(myUserId),
        );

        // 모두가 투표에 참여했는지
        const allVotedTools =
          toolParticipation.votedMembers >= toolParticipation.totalMembers;

        if (!hasVotedTools && workflow === 'SETUP') {
          // 내가 투표를 참여 X, workflow가 SETUP인 경우 -> 투표 참여 가능
          return fallback('협업툴을 설정하세요', 'tool', hasVotedTools);
        }

        if (!allVotedTools && workflow === 'SETUP') {
          // 내가 투표 참여 O, 모두 참여 X, workflow가 SETUP인 경우 -> 투표 현황 조회 가능
          return fallback(
            '아직 투표가 완료되지 않았어요.',
            'tool',
            hasVotedTools,
          );
        }

        return (
          <ToolContents
            confirmedToolsData={confirmedToolsData}
            teamRoomId={teamRoomId}
            isReader={myRole === 'LEADER'}
          />
        );
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

        // 내가 투표에 참여했는지 확인
        const hasVotedRules = ruleParticipation?.voted.some(
          (v) => v.userId === Number(myUserId),
        );

        // 모두가 투표에 참여했는지
        const allVotedRules =
          ruleParticipation.votedMembers >= ruleParticipation.totalMembers;

        if (!hasVotedRules && workflow === 'SETUP') {
          // 내가 투표를 참여 X, workflow가 SETUP인 경우 -> 투표 참여 가능
          return fallback('팀 규칙을 설정하세요', 'rule', hasVotedRules);
        }

        if (!allVotedRules && workflow === 'SETUP') {
          // 내가 투표 참여 O, 모두 참여 X, workflow가 SETUP인 경우 -> 투표 현황 조회 가능
          return fallback(
            '아직 투표가 완료되지 않았어요.',
            'rule',
            hasVotedRules,
          );
        }

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
