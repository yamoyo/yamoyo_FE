export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  email: string;
  major: string;
  mbti: string;
  joinedAt: string;
}

export interface TeamRoom {
  id: string;
  name: string;
  description: string;
  bannerId: string;
  deadlineDate: string;
  members: TeamMember[];
}

export interface CreateTeamRoomRequest {
  name: string;
  description: string;
  bannerId: string;
  deadlineDate: string;
}

export interface CreateTeamRoomResponse {
  teamRoomId: string;
  inviteLink: string;
}

export interface DashboardStatus {
  timeselect: boolean;
  tool: boolean;
  rule: boolean;
}
