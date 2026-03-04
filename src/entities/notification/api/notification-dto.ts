export type NotificationType =
  | 'TEAM_JOIN'
  | 'TEAM_LEADER_CONFIRM'
  | 'TEAM_LEADER_CHANGE'
  | 'TEAM_DEADLINE_REMIND'
  | 'TEAM_ARCHIVED'
  | 'RULE_CONFIRM'
  | 'RULE_CHANGE'
  | 'MEETING_CHANGE'
  | 'MEETING_REMIND'
  | 'TOOL_SUGGESTION'
  | 'TOOL_APPROVED'
  | 'TOOL_REJECTED';

export interface GetNotificationsResponse {
  notificationId: number;
  teamRoomId: number;
  targetId: number;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
