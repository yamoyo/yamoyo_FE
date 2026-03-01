import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ToolVoteDetailCount } from '@/entities/teamroom/setup/tool/model/types';
import { GetToolVoteParticipation } from '@/entities/tool/api/tool-dto';
import { useVoteCountByCategory } from '@/entities/tool/hooks/useTool';
import TopBar from '@/shared/ui/header/TopBar';
import { SwipeTabs, type TabsConfig } from '@/shared/ui/tab';
import FullWidthUnderlineTabHeader from '@/shared/ui/tab/ui/headers/FullWidthUnderlineTabHeader';
import { mapVoteCountToUi } from '@/widgets/teamroom/tool/ui/vote-waiting/model/mapVoteCountToUi';
import VoteStatus from '@/widgets/vote/ui/VoteStatus';

import VoteCountList from './ui/VoteCountList';

export default function ToolVoteWaiting({
  participation,
}: {
  participation: GetToolVoteParticipation;
}) {
  const { id } = useParams<{ id: string }>();
  const [isVoteStatusModalOpen, setIsVoteStatusModalOpen] = useState(false);

  const communicationQuery = useVoteCountByCategory(id, 1);
  const documentQuery = useVoteCountByCategory(id, 2);

  const totalVotes = participation?.totalMembers ?? 0;

  const communicationVoteList = useMemo(
    () => mapVoteCountToUi(1, communicationQuery.data),
    [communicationQuery.data],
  );
  const documentVoteList = useMemo(
    () => mapVoteCountToUi(2, documentQuery.data),
    [documentQuery.data],
  );

  const communicationProps: ToolVoteDetailCount = {
    title: '커뮤니케이션 툴의\n현재 투표 현황입니다.',
    description: '모든 팀원이 투표할 때까지 기다려주세요.',
    voteList: communicationVoteList,
  };

  const documentProps: ToolVoteDetailCount = {
    title: '문서 관리 툴의\n현재 투표 현황입니다.',
    description: '모든 팀원이 투표할 때까지 기다려주세요.',
    voteList: documentVoteList,
  };

  const tabs: TabsConfig[] = [
    {
      id: 'communication',
      label: '커뮤니케이션 툴',
      render: () => (
        <VoteCountList
          {...communicationProps}
          totalVotes={totalVotes}
          openVoteStatusModal={() => setIsVoteStatusModalOpen(true)}
        />
      ),
    },
    {
      id: 'document',
      label: '문서정리 툴',
      render: () => (
        <VoteCountList
          {...documentProps}
          totalVotes={totalVotes}
          openVoteStatusModal={() => setIsVoteStatusModalOpen(true)}
        />
      ),
    },
  ];

  if (isVoteStatusModalOpen) {
    return (
      <VoteStatus
        votedUsers={(participation?.voted ?? []).map((u) => ({
          userId: u.userId,
          name: u.userName,
          profileImageId: u.profileImageId,
        }))}
        unVotedUsers={(participation?.notVoted ?? []).map((u) => ({
          userId: u.userId,
          name: u.userName,
          profileImageId: u.profileImageId,
        }))}
        onClose={() => setIsVoteStatusModalOpen(false)}
      />
    );
  }

  return (
    <>
      <TopBar title="투표 현황" />
      <SwipeTabs
        tabs={tabs}
        Header={(p) => <FullWidthUnderlineTabHeader {...p} />}
      />
    </>
  );
}
