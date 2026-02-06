import { useQuery } from '@tanstack/react-query';

import { getTimeSelect } from '@/entities/timeselect/api/timeselect-api';

export function useTimeSelect(teamRoomId: number) {
  return useQuery({
    queryKey: ['timeselect', teamRoomId],
    queryFn: () => getTimeSelect(teamRoomId),
    enabled: !!teamRoomId,
  });
}
