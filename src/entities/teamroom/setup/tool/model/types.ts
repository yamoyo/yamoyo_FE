import { TOOL_CONTENTS } from '@/entities/teamroom/setup/tool/model/tool-contents';

export type ToolId = (typeof TOOL_CONTENTS)[number]['tools'][number]['id'];
export type ToolName = (typeof TOOL_CONTENTS)[number]['tools'][number]['name'];

export interface ToolVoteDetailCount {
  title: string;
  description: string;
  voteList: {
    id: ToolId;
    name: ToolName;
    voteCount: number;
  }[];
}

export interface ToolVoteCount {
  totalVotes: number;
  communication: ToolVoteDetailCount;
  document: ToolVoteDetailCount;
}
