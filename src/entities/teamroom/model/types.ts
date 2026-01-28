export interface TeamRoom {
  id: string;
  name: string;
  description: string;
  bannerId: string;
  deadlineDate: string; // ISO string
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
