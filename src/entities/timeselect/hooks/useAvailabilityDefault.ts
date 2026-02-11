import { useQuery } from '@tanstack/react-query';

import { getAvailabilityDefault } from '@/entities/timeselect/api/timeselect-api';
import type { AvailabilityDefaultResponse } from '@/entities/timeselect/api/timeselect-dto';

async function fetchAvailabilityDefault(): Promise<AvailabilityDefaultResponse | null> {
  try {
    return await getAvailabilityDefault();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function useAvailabilityDefault() {
  return useQuery({
    queryKey: ['availabilityDefault'],
    queryFn: fetchAvailabilityDefault,
    retry: false,
  });
}
