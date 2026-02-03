// ========== 팀원 관련 ==========
export type TeamMemberRole = 'HOST' | 'LEADER' | 'MEMBER';

export interface TeamMember {
  userId: number;
  name: string;
  profileImageId: number;
  role: TeamMemberRole;
}

/** 팀룸 멤버 목록 조회 응답 (GET /api/team-rooms/{teamRoomId}/members) */
export interface TeamRoomMember {
  memberId: number;
  userId: number;
  name: string;
  major: string;
  profileImageId: number;
  role: TeamMemberRole;
}

// 팀룸 목록 조회 시 사용되는 간소화된 멤버 정보
export interface TeamMemberSummary {
  userId: number;
  profileImageId: number;
}

// ========== 팀룸 생명주기/워크플로우 ==========
export type TeamRoomLifecycle = 'ACTIVE' | 'ARCHIVED';
export type TeamRoomWorkflow =
  | 'PENDING'
  | 'LEADER_SELECTION'
  | 'SETUP'
  | 'COMPLETED';

// ========== 팀룸 관련 ==========

/** 팀룸 목록 조회 응답 (GET /api/team-rooms) */
export interface TeamRoomListItem {
  teamRoomId: number;
  title: string;
  bannerImageId: number;
  createdAt: string;
  deadline: string;
  status: TeamRoomLifecycle;
  memberCount: number;
  members: TeamMemberSummary[];
}

/** 팀룸 상세 조회 응답 (GET /api/team-rooms/{teamRoomId}) */
export interface TeamRoomDetail {
  teamRoomId: number;
  title: string;
  description: string;
  deadline: string;
  bannerImageId: number;
  createdAt: string;
  lifecycle: TeamRoomLifecycle;
  workflow: TeamRoomWorkflow;
  memberCount: number;
  members: TeamMember[];
  myRole: TeamMemberRole;
}

/** 팀룸 생성 요청 (POST /api/team-rooms) */
export interface CreateTeamRoomRequest {
  title: string;
  description?: string;
  deadline: string; // ISO-8601 형식, 서버에서 23:59:59로 변환
  bannerImageId?: number;
}

/** 팀룸 생성 응답 */
export interface CreateTeamRoomResponse {
  teamRoomId: number;
  inviteToken: string;
  expiresInSeconds: number;
}

/** 팀룸 수정 요청 (PUT /api/team-rooms/{teamRoomId}) */
export interface UpdateTeamRoomRequest {
  title: string;
  description?: string;
  deadline: string;
  bannerImageId?: number;
}

/** 초대링크 생성 응답 (POST /api/team-rooms/{teamRoomId}/invite-link) */
export interface InviteLinkResponse {
  token: string;
  expiresInSeconds: number;
}

/** 팀룸 입장 요청 (POST /api/team-rooms/join) */
export interface JoinTeamRoomRequest {
  token: string;
}

/** 팀룸 입장 응답 */
export type JoinResult = 'JOINED' | 'ENTERED' | 'BANNED';

export interface JoinTeamRoomResponse {
  result: JoinResult;
  teamRoomId: number;
  memberId: number;
}

/** 팀장 변경 요청 (PUT /api/team-rooms/{teamRoomId}/leader) */
export interface ChangeLeaderRequest {
  newLeaderMemberId: number;
}

/** 팀원 상세 조회 응답 (GET /api/team-rooms/{teamRoomId}/members/{memberId}) */
export interface TeamMemberDetail {
  memberId: number;
  userId: number;
  name: string;
  email: string;
  major: string;
  mbti: string;
  profileImageId: number;
  role: TeamMemberRole;
  joinedAt: string;
}

/** TeamMember + TeamMemberDetail 조합 (목록 UI에서 사용) */
export interface TeamMemberWithDetail {
  memberId: number;
  userId: number;
  name: string;
  profileImageId: number;
  role: TeamMemberRole;
  major: string;
}

// ========== 대시보드 상태 (기존 호환) ==========
export interface DashboardStatus {
  timeselect: boolean;
  tool: boolean;
  rule: boolean;
}

// ========== Legacy 타입 (하위 호환용, 점진적 제거 예정) ==========
/** @deprecated TeamRoomDetail 사용 권장 */
export interface TeamRoom {
  id: string;
  name: string;
  description: string;
  bannerId: string;
  deadlineDate: string;
  members: LegacyTeamMember[];
}

/** @deprecated TeamMember 사용 권장 */
export interface LegacyTeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  email: string;
  major: string;
  mbti: string;
  joinedAt: string;
}
