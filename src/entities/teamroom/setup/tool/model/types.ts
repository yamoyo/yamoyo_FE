import { TOOL_CONTENTS } from '@/entities/teamroom/setup/tool/model/tool-contents';

export type ToolSlug = (typeof TOOL_CONTENTS)[number]['tools'][number]['slug'];
export type ToolName = (typeof TOOL_CONTENTS)[number]['tools'][number]['name'];

export interface Tools {
  id: number;
  slug: ToolSlug;
  name: ToolName;
  description: string;
}

export interface ToolVoteDetailCount {
  title: string;
  description: string;
  voteList: {
    id: number;
    slug: ToolSlug;
    name: ToolName;
    voteCount: number;
  }[];
}

export interface ToolVoteCount {
  totalVotes: number;
  communication: ToolVoteDetailCount;
  document: ToolVoteDetailCount;
}
