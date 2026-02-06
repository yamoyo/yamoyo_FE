import { useMemo, useState } from 'react';

import type { TeamRoomListItem } from '@/entities/teamroom/api/teamroom-dto';
import { useTeamRoomList } from '@/entities/teamroom/hooks/useTeamRoom';
import ArrowDropdown, {
  ArrowDropdownOption,
} from '@/shared/ui/dropdown/ArrowDropdown';
import { TabsConfig } from '@/shared/ui/tab/model/types';
import FullWidthUnderlineTabHeader from '@/shared/ui/tab/ui/headers/FullWidthUnderlineTabHeader';
import SwipeTabs from '@/shared/ui/tab/ui/SwipeTabs';
import HomeListItem from '@/widgets/home/HomeListItem';

import { sortTeams, SortType } from './utils/sortTeams';

const SORT_OPTIONS: ArrowDropdownOption<SortType>[] = [
  { label: '최신순', value: 'latest' },
  { label: '마감임박순', value: 'deadline' },
];

type TeamListPanelProps = {
  teams: TeamRoomListItem[];
  sortType: SortType;
  onChangeSortType: (value: SortType) => void;
};

function TeamListPanel({
  teams,
  sortType,
  onChangeSortType,
}: TeamListPanelProps) {
  return (
    <div className="space-y-5 px-6 py-7">
      <ArrowDropdown<SortType>
        options={SORT_OPTIONS}
        value={sortType}
        onChange={onChangeSortType}
      />

      {teams.map((team) => (
        <HomeListItem key={team.teamRoomId} teamRoom={team} />
      ))}
    </div>
  );
}

export default function MyTeams() {
  const [sortType, setSortType] = useState<SortType>('latest');

  const { data: activeTeams, isLoading: isLoadingActive } =
    useTeamRoomList('ACTIVE');
  const { data: archivedTeams, isLoading: isLoadingArchived } =
    useTeamRoomList('ARCHIVED');

  const allTeams = useMemo(
    () => [...(activeTeams ?? []), ...(archivedTeams ?? [])],
    [activeTeams, archivedTeams],
  );

  const isLoading = isLoadingActive || isLoadingArchived;

  const progressTeams = useMemo(
    () => allTeams.filter((team) => team.status === 'ACTIVE'),
    [allTeams],
  );

  const doneTeams = useMemo(
    () => allTeams.filter((team) => team.status === 'ARCHIVED'),
    [allTeams],
  );

  // 각 탭별 정렬된 리스트를 미리 계산
  const sortedAll = useMemo(
    () => sortTeams(allTeams, sortType),
    [allTeams, sortType],
  );
  const sortedProgress = useMemo(
    () => sortTeams(progressTeams, sortType),
    [progressTeams, sortType],
  );
  const sortedDone = useMemo(
    () => sortTeams(doneTeams, sortType),
    [doneTeams, sortType],
  );

  if (isLoading) {
    return <div className="p-4">로딩 중...</div>;
  }

  const renderPanel = (teams: TeamRoomListItem[]) => {
    if (teams.length === 0) {
      return (
        <p className="flex justify-center pt-10 text-body-3.9 text-tx-default_4">
          프로젝트가 없습니다.
        </p>
      );
    }

    return (
      <TeamListPanel
        teams={teams}
        sortType={sortType}
        onChangeSortType={setSortType}
      />
    );
  };

  const tabs: TabsConfig[] = [
    { id: 'all', label: '전체', teams: sortedAll },
    { id: 'progress', label: '진행중', teams: sortedProgress },
    { id: 'done', label: '완료', teams: sortedDone },
  ].map(({ id, label, teams }) => ({
    id,
    label,
    render: () => renderPanel(teams),
  }));

  return (
    <SwipeTabs
      tabs={tabs}
      Header={(p) => <FullWidthUnderlineTabHeader {...p} />}
    />
  );
}
