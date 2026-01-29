export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
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
