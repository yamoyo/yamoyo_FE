export type ConfirmedToolsByCategory = {
  categoryId: number;
  confirmedToolIds: number[];
};

export type GetConfirmedTools = {
  confirmedTools: ConfirmedToolsByCategory[];
};

export type ToolVoteMember = {
  userId: number;
  userName: string;
  profileImageId: number;
};

export type GetToolVoteParticipation = {
  totalMembers: number;
  votedMembers: number;
  voted: ToolVoteMember[];
  notVoted: ToolVoteMember[];
};

export type ToolVoteCount = {
  toolId: number;
  voteCount: number;
};

export type GetVoteCountByCategory = {
  categoryId: number;
  tools: ToolVoteCount[];
};

export type ToolVoteSubmitItem = {
  categoryId: number;
  toolIds: number[];
};

export type SubmitAllToolVotesRequest = {
  toolVotes: ToolVoteSubmitItem[];
};

export type SubmitAllToolVotes = Record<string, never>;

export type DeleteTeamTool = Record<string, never>;

export type ProposalToolsRequest = {
  categoryId: number;
  toolIds: number[];
};
