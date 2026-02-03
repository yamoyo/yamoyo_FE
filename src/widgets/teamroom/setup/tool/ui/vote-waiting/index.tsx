import { useState } from 'react';

import { TOOL_VOTE_COUNT } from '@/entities/teamroom/setup/tool/model/tool-contents';
import TopBar from '@/shared/ui/header/TopBar';
import { SwipeTabs, type TabsConfig } from '@/shared/ui/tab';
import FullWidthUnderlineTabHeader from '@/shared/ui/tab/ui/headers/FullWidthUnderlineTabHeader';
import { DUMMY_UNVOTED, DUMMY_VOTED } from '@/widgets/vote/model/vote-dummy';
import VoteStatus from '@/widgets/vote/ui/VoteStatus';

import VoteCountList from './ui/VoteCountList';

export default function ToolVoteWaiting() {
  const [isVoteStatusModalOpen, setIsVoteStatusModalOpen] = useState(false);

  const tabs: TabsConfig[] = [
    {
      id: 'communication',
      label: '커뮤니케이션 툴',
      render: () => (
        <VoteCountList
          {...TOOL_VOTE_COUNT.communication}
          totalVotes={TOOL_VOTE_COUNT.totalVotes}
          openVoteStatusModal={() => setIsVoteStatusModalOpen(true)}
        />
      ),
    },
    {
      id: 'document',
      label: '문서정리 툴',
      render: () => (
        <VoteCountList
          {...TOOL_VOTE_COUNT.document}
          totalVotes={TOOL_VOTE_COUNT.totalVotes}
          openVoteStatusModal={() => setIsVoteStatusModalOpen(true)}
        />
      ),
    },
  ];

  if (isVoteStatusModalOpen) {
    return (
      <VoteStatus
        votedUsers={DUMMY_VOTED}
        unVotedUsers={DUMMY_UNVOTED}
        isCompleted={false}
        // TODO: 투표가 완료된 후 자동으로 페이지 이동
        handleVoteComplete={() => {}}
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
