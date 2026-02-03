import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { userApi } from '@/entities/user/api/user-api';
import { UpdateUserParams } from '@/entities/user/api/user-dto';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => userApi.getMe(),
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    // 이미지 변경하면 API 호출 후 캐시를 무효화한다. -> 자동으로 최신 데이터 반영
    mutationFn: (params: UpdateUserParams) => userApi.updateMe(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    },
  });
}
