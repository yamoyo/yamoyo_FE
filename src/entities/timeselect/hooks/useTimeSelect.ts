import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { getTimeSelect } from '@/entities/timeselect/api/timeselect-api';

export function useTimeSelect(teamRoomId: number) {
  const queryClient = useQueryClient();
  const prevStatusRef = useRef<string | null>(null);
  const query = useQuery({
    queryKey: ['timeselect', teamRoomId],
    queryFn: () => getTimeSelect(teamRoomId),
    enabled: !!teamRoomId,
  });

  useEffect(() => {
    const status = query.data?.status ?? null;
    if (!status) return;
    if (prevStatusRef.current !== 'FINALIZED' && status === 'FINALIZED') {
      queryClient.invalidateQueries({ queryKey: ['meetings', teamRoomId] });
    }
    prevStatusRef.current = status;
  }, [query.data?.status, queryClient, teamRoomId]);

  return query;
}
