import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { useTeamStore } from '@/entities/team/model/team-store';
import { useTeamRoomList } from '@/entities/teamroom/hooks/useTeamRoom';
import TeamRoomSelectSheet from '@/widgets/calendar/ui/TeamRoomSelectSheet';

export default function MainHeader() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { selectedTeamId, setSelectedTeamId } = useTeamStore();
  const { data: teamRooms = [] } = useTeamRoomList('ACTIVE');

  useEffect(() => {
    const teamIdFromUrl = searchParams.get('teamId');
    if (teamIdFromUrl) {
      const nextId = Number(teamIdFromUrl);
      if (selectedTeamId !== nextId) {
        setSelectedTeamId(nextId);
      }
      return;
    }

    if (teamRooms.length > 0) {
      const persistedId = selectedTeamId;
      const hasPersisted =
        persistedId &&
        teamRooms.some((room) => room.teamRoomId === persistedId);
      const fallbackId = hasPersisted ? persistedId : teamRooms[0].teamRoomId;
      if (selectedTeamId !== fallbackId) {
        setSelectedTeamId(fallbackId);
      }
      if (teamIdFromUrl !== String(fallbackId)) {
        setSearchParams({ teamId: String(fallbackId) });
      }
    }
  }, [
    searchParams,
    setSearchParams,
    setSelectedTeamId,
    teamRooms,
    selectedTeamId,
  ]);

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
        teamRooms={teamRooms}
        selectedId={selectedTeamId ?? undefined}
        onSelect={handleSelectTeamRoom}
      />
    </>
  );
}
