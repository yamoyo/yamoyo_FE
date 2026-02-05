import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { parseEverytime } from '@/entities/everytime/api/everytime-api';
import { useAvailabilityStore } from '@/entities/everytime/model/availability-store';

export function useParseEverytime() {
  const navigate = useNavigate();
  const setImportedAvailability = useAvailabilityStore(
    (state) => state.setImportedAvailability,
  );

  return useMutation({
    mutationFn: (url: string) => parseEverytime({ url }),
    onSuccess: (data) => {
      setImportedAvailability(data.availability);
      navigate(-1);
    },
  });
}
