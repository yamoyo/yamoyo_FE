import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import type { AvailabilityGrid } from '@/entities/everytime/model/availability-store';
import { gridToAvailabilityData } from '@/entities/everytime/model/availability-store';
import { submitAvailability } from '@/entities/timeselect/api/timeselect-api';

export function useSubmitAvailability() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const teamRoomId = Number(id);

  return useMutation({
    mutationFn: (grid: AvailabilityGrid) =>
      submitAvailability(teamRoomId, {
        availability: gridToAvailabilityData(grid),
      }),
    onSuccess: () => {
      navigate(`/teamroom/${id}/timeselect/liketime`, { replace: true });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['timeselect', teamRoomId] });
    },
  });
}
