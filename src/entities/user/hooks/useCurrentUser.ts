import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getMe, updateMe } from '@/entities/user/api/user-api';
import { UpdateUserParams } from '@/entities/user/api/user-dto';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => getMe(),
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateUserParams) => updateMe(params),
    onSuccess: (data) => {
      // 서버 응답 데이터로 캐시를 즉시 업데이트 (refetch 없이 바로 반영)
      queryClient.setQueryData(['user', 'me'], data);
      queryClient.invalidateQueries({ queryKey: ['teamrooms'] });
      queryClient.invalidateQueries({ queryKey: ['teamroom'] });
    },
  });
}
