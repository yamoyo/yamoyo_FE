import { useEffect, useMemo, useState } from 'react';
import PageTabs, { TabsConfig } from '@/shared/ui/tab/PageTabs';
import HomeListItem from '@/widgets/home/HomeListItem';

import { MOCK_TEAM_ROOMS } from '../model/constants';
import { TeamRoom } from '../model/types';
import { sortTeams, SortType } from '../utils/sortTeams';
import ArrowDropdown, {
  ArrowDropdownOption,
} from '@/shared/ui/dropdown/ArrowDropdown';

const SORT_OPTIONS: ArrowDropdownOption<SortType>[] = [
  { label: '최신순', value: 'latest' },
  { label: '마감임박순', value: 'deadline' },
];

type TeamListPanelProps = {
  teams: TeamRoom[];
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

      {teams.map((team, index) => (
        <HomeListItem
          key={team.id}
          {...team}
          bannerImage={`/assets/banner/banner-${index + 1}.png`}
        />
      ))}
    </div>
  );
}

export default function MyTeams() {
  const [allTeams, setAllTeams] = useState<TeamRoom[]>([]);

  const [loading, setLoading] = useState(true);

  const [sortType, setSortType] = useState<SortType>('latest');

  useEffect(() => {
    // TODO: API 연동 및 로딩 처리
    setLoading(true);
    setAllTeams(MOCK_TEAM_ROOMS);
    setLoading(false);
  }, []);

  const progressTeams = useMemo(
    () => allTeams.filter((team) => team.isProgress),
    [allTeams],
  );

  const doneTeams = useMemo(
    () => allTeams.filter((team) => !team.isProgress),
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

  if (loading) {
    return <div className="p-4">로딩 중...</div>;
  }

  const renderPanel = (teams: TeamRoom[]) => (
    <TeamListPanel
      teams={teams}
      sortType={sortType}
      onChangeSortType={setSortType}
    />
  );

  const tabs: TabsConfig[] = [
    { id: 'all', label: '전체', teams: sortedAll },
    { id: 'progress', label: '진행중', teams: sortedProgress },
    { id: 'done', label: '완료', teams: sortedDone },
  ].map(({ id, label, teams }) => ({
    id,
    label,
    render: () => renderPanel(teams),
  }));

  return <PageTabs tabs={tabs} />;
}
