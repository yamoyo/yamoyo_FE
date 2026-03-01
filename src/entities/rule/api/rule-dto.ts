export type TeamRule = {
  teamRuleId: number;
  content: string;
};

export type GetTeamRulesResponse = {
  teamRules: TeamRule[];
};

export type AddOrUpdateTeamRuleRequest = {
  content: string;
};

export type SubmitRuleVoteRequest = {
  ruleId: number;
  agreement: boolean;
};

export type RuleVoteMember = {
  userId: number;
  name: string;
  profileImageId: number; // null 가능하면 number | null 로 바꾸기
};

export type GetRuleVoteParticipationResponse = {
  totalMembers: number;
  votedMembers: number;
  voted: RuleVoteMember[];
  notVoted: RuleVoteMember[];
};
