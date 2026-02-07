import { jwtDecode } from 'jwt-decode';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { getOnlineStatus } from '@/entities/leader-game/api/leader-game-api';
import { LeaderGameMessage } from '@/entities/leader-game/api/ws-types';
import { getTeamRoomDetail } from '@/entities/teamroom/api/teamroom-api';
import type { TeamRoomDetail } from '@/entities/teamroom/api/teamroom-dto';
import { useTeamRoomEditStore } from '@/entities/teamroom/model/teamroom-edit-store';
import { useLeaderSelectionStore } from '@/features/leader-game/ws/model/leader-game-store';
import { useTeamRoomWsListener } from '@/features/leader-game/ws/model/useTeamRoomWsListener';
import { useAuthStore } from '@/shared/api/auth/store';
import TeamRoomContents from '@/widgets/teamroom/main/dashboard/ui/TeamRoomContents';
import AddMemberBottomSheet from '@/widgets/teamroom/main/ui/AddMemberBottomSheet';
import MemberListSection from '@/widgets/teamroom/main/ui/MemberListSection';
import TeamRoomBanner from '@/widgets/teamroom/main/ui/TeamRoomBanner';
import TeamRoomOptionsBottomSheet from '@/widgets/teamroom/main/ui/TeamRoomOptionsBottomSheet';

export default function TeamRoomMainPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const accessToken = useAuthStore((s) => s.accessToken);

  const [teamRoom, setTeamRoom] = useState<TeamRoomDetail | null>(null);

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const editData = useTeamRoomEditStore((state) => state.editData);
  const clearEditData = useTeamRoomEditStore((state) => state.clearEditData);

  // 팀장 정하기 게임 상태 관리
  const setPhase = useLeaderSelectionStore((s) => s.setPhase);
  const setPayload = useLeaderSelectionStore((s) => s.setPayload);
  const setRole = useLeaderSelectionStore((s) => s.setRole);
  const setWorkflow = useLeaderSelectionStore((s) => s.setWorkflow);

  const isAllOnline =
    (teamRoom?.members?.length ?? 0) > 1 &&
    teamRoom?.workflow === 'PENDING' &&
    teamRoom?.members?.every((member) => member.status === 'ONLINE');

  //** WS - 유저 상태 변경에 따른 메시지 처리 */
  const handleUserStatusChange = useCallback(
    (msg: LeaderGameMessage) => {
      if (msg.type !== 'USER_STATUS_CHANGE') return;

      const { username, status, userId, profileImageId } = msg;

      if (!teamRoom) return;

      const isNewMember =
        !teamRoom.members.find((member) => member.userId === msg.userId) &&
        profileImageId;

      if (isNewMember) {
        const updatedMembers = [...teamRoom.members];
        updatedMembers.push({
          role: 'MEMBER',
          userId,
          name: username,
          profileImageId,
          status,
        });
        setTeamRoom((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            members: updatedMembers,
          };
        });
        return;
      }

      // 메시지 통해 받아 온 사용자 온라인 상태 변경
      const updatedMembers = teamRoom.members.map((member) => {
        if (member.userId === msg.userId) {
          return {
            ...member,
            status: msg.status,
          };
        }
        return member;
      });
      setTeamRoom((prev) =>
        prev ? { ...prev, members: updatedMembers } : prev,
      );
    },
    [teamRoom, setTeamRoom],
  );

  /** 팀장 지원하기 단계 진입했을 때 처리 */
  const handleVolunteerPhase = useCallback(
    (msg: LeaderGameMessage) => {
      if (
        msg.type !== 'PHASE_CHANGE' ||
        msg.payload.phase !== 'VOLUNTEER' ||
        !teamRoom ||
        !id
      ) {
        return;
      }

      setPhase('LEADER_VOLUNTEER');
      setPayload(msg.payload);
      setRole(teamRoom.myRole);
      navigate('leader-game');
    },
    [navigate, setPhase, setPayload, setRole, teamRoom, id],
  );

  const onRoomMessage = useCallback(
    (msg: LeaderGameMessage) => {
      switch (msg.type) {
        case 'USER_STATUS_CHANGE':
          handleUserStatusChange(msg);
          break;
        case 'PHASE_CHANGE':
          handleVolunteerPhase(msg);
          break;
        default:
          break;
      }
    },
    [handleUserStatusChange, handleVolunteerPhase],
  );

  // WS 메시지 수신 리스너 등록
  useTeamRoomWsListener(onRoomMessage);

  // 팀룸 정보 조회
  useEffect(() => {
    if (!id) return;
    try {
      (async () => {
        const [teamRoomDetail, onlineStatus] = await Promise.all([
          getTeamRoomDetail(id),
          getOnlineStatus(id),
        ]);

        setWorkflow(teamRoomDetail.workflow);

        if (teamRoomDetail.workflow === 'LEADER_SELECTION') {
          navigate('leader-game');
          return;
        }

        const myUserId = accessToken
          ? jwtDecode<{ sub: string }>(accessToken).sub
          : null;

        // 내 상태를 ONLINE으로 강제 설정
        onlineStatus.forEach((status) => {
          if (status.userId.toString() === myUserId) {
            status.status = 'ONLINE';
          }
        });

        setTeamRoom({ ...teamRoomDetail, members: onlineStatus });
      })();
    } catch (error) {
      console.error('팀룸 정보를 불러오는 중 오류가 발생했습니다.', error);
    }
  }, [id, setTeamRoom, navigate, accessToken, setWorkflow]);

  useEffect(() => {
    if (editData) {
      const updatedTeamRoom = teamRoom ? { ...teamRoom, ...editData } : null;

      setTeamRoom(updatedTeamRoom);
      clearEditData();
    }
  }, [editData, clearEditData, setTeamRoom, teamRoom]);

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
      <TeamRoomContents {...teamRoom} isAllOnline={isAllOnline} />
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
