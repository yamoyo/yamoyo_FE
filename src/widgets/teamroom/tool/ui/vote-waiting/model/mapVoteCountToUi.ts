import { TOOL_CONTENTS } from '@/entities/teamroom/setup/tool/model/tool-contents';
import type { ToolVoteDetailCount } from '@/entities/teamroom/setup/tool/model/types';
import type { GetVoteCountByCategory } from '@/entities/tool/api/tool-dto';

type VoteList = ToolVoteDetailCount['voteList'];

export function mapVoteCountToUi(
  categoryId: number,
  data?: GetVoteCountByCategory,
): VoteList {
  const category = TOOL_CONTENTS.find((c) => c.categoryId === categoryId);
  if (!category) return [];

  const countMap = new Map<number, number>(
    (data?.tools ?? []).map((t) => [t.toolId, t.voteCount]),
  );

  return category.tools.map((t) => ({
    id: t.id,
    name: t.name,
    slug: t.slug,
    voteCount: countMap.get(t.id) ?? 0,
  }));
}
