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

export type FcmDataPayload = {
  type: NotificationType;
  teamRoomId: string;
  targetId?: string;
};

export type FcmPayload = {
  notification: {
    title: string;
    body: string;
  };
  data: FcmDataPayload;
  messageId: string;
};
