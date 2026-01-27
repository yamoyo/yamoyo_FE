import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import TeamRoomSelectSheet from '@/widgets/calendar/ui/TeamRoomSelectSheet';
import { MOCK_TEAM_ROOMS } from '@/widgets/teamroom/model/constants';
import { useTeamStore } from '@/entities/team/model/team-store';

export default function MainHeader() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { selectedTeamId, setSelectedTeamId } = useTeamStore();

  useEffect(() => {
    const teamIdFromUrl = searchParams.get('teamId');
    if (teamIdFromUrl) {
      setSelectedTeamId(Number(teamIdFromUrl));
    } else if (MOCK_TEAM_ROOMS.length > 0) {
      const firstTeamId = MOCK_TEAM_ROOMS[0].id;
      setSearchParams({ teamId: String(firstTeamId) });
      setSelectedTeamId(firstTeamId);
    }
  }, [searchParams, setSearchParams, setSelectedTeamId]);

  const handleSelectTeamRoom = (id: number) => {
    setSearchParams({ teamId: String(id) });
    setSelectedTeamId(id);
  };

  return (
    <>
      <header className="grid grid-cols-3 items-center">
        <Link to="/home" className="flex select-none justify-start pl-6">
          <img
            src={'/assets/home/home-logo.png'}
            width={72}
            height={36}
            draggable="false"
          />
        </Link>

        <div className="flex justify-center">
          <p className="text-body-1 text-white">캘린더</p>
        </div>

        <div className="flex select-none justify-end pr-8">
          <button onClick={() => setIsSheetOpen(true)}>
            <img
              src={'/assets/icons/team-select.svg'}
              width={28}
              height={28}
              draggable="false"
            />
          </button>
        </div>
      </header>

      <TeamRoomSelectSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        teamRooms={MOCK_TEAM_ROOMS}
        selectedId={selectedTeamId ?? undefined}
        onSelect={handleSelectTeamRoom}
      />
    </>
  );
}
