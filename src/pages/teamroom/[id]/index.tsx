import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getTeamRoomDetail } from '@/entities/teamroom/api/teamroom-api';
import type { TeamRoomDetail } from '@/entities/teamroom/api/teamroom-dto';
import { useTeamRoomEditStore } from '@/entities/teamroom/model/teamroom-edit-store';
import { useLeaderGameSocket } from '@/features/leader-game/ws/model/useLeaderGameSocket';
import TeamRoomContents from '@/widgets/teamroom/main/dashboard/TeamRoomContents';
import AddMemberBottomSheet from '@/widgets/teamroom/main/ui/AddMemberBottomSheet';
import MemberListSection from '@/widgets/teamroom/main/ui/MemberListSection';
import TeamRoomBanner from '@/widgets/teamroom/main/ui/TeamRoomBanner';
import TeamRoomOptionsBottomSheet from '@/widgets/teamroom/main/ui/TeamRoomOptionsBottomSheet';

export default function TeamRoomMainPage() {
  const { id } = useParams<{ id: string }>();
  const [teamRoom, setTeamRoom] = useState<TeamRoomDetail | null>(null);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const editData = useTeamRoomEditStore((state) => state.editData);
  const clearEditData = useTeamRoomEditStore((state) => state.clearEditData);

  const onRoomMessage = useCallback((_msg: unknown) => {
    // console.log('팀룸 전체 메시지 수신:', msg);
  }, []);

  const onError = useCallback((err: unknown) => {
    console.error('WebSocket 오류 발생:', err);
  }, []);

  useLeaderGameSocket({
    teamRoomId: id ?? '', // id가 없으면 빈값
    enabled: Boolean(id) && (teamRoom?.members?.length ?? 0) > 1, // 연결 여부 제어
    onRoomMessage,
    // onJoinSuccess: (msg) => {
    //   console.log('팀룸 참가 성공 메시지 수신:', msg);
    // },
    // onVoteUpdated: (msg) => {
    //   console.log('투표 업데이트 메시지 수신:', msg);
    // },
    onError,
  });

  useEffect(() => {
    if (!id) return;
    try {
      (async () => {
        const data = await getTeamRoomDetail(id);
        setTeamRoom(data);
        // TODO: 팀룸 멤버 온라인 상태 조회 후 상태관리 저장
        // const gameMembers = await leaderGameApi.getLeaderGameMembers(id);
      })();
    } catch (error) {
      console.error('팀룸 정보를 불러오는 중 오류가 발생했습니다.', error);
    }
  }, [id]);

  useEffect(() => {
    if (editData) {
      const { title, description, bannerImageId, deadline } = editData;
      setTeamRoom((prev) =>
        prev
          ? {
              ...prev,
              title,
              description,
              bannerImageId,
              deadline,
            }
          : null,
      );
      clearEditData();
    }
  }, [editData, clearEditData]);

  if (!teamRoom) return <p>팀룸 정보를 불러오는 중입니다...</p>;

  return (
    <>
      <TeamRoomBanner
        teamRoom={teamRoom}
        onSettingsClick={() => setIsOptionsOpen(true)}
      />
      <MemberListSection
        members={teamRoom.members}
        onAddMember={() => setIsAddMemberOpen(true)}
      />
      <TeamRoomContents {...teamRoom} />
      <AddMemberBottomSheet
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        teamRoomId={Number(id)}
      />
      <TeamRoomOptionsBottomSheet
        isOpen={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
        teamRoom={teamRoom}
      />
    </>
  );
}
