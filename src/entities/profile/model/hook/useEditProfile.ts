import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MajorId } from '@/entities/profile/model/types/types';
import {
  useCurrentUser,
  useUpdateUser,
} from '@/entities/user/hooks/useCurrentUser';

import { MAJOR } from '../options/profile-items';

export const validateProfileItem = (type: 'name' | 'MBTI', value: string) => {
  if (type === 'name') {
    if (!/^[0-9A-Za-z가-힣]+$/.test(value) && value.length > 0) {
      return '특수문자는 입력불가입니다.';
    }
  }

  if (type === 'MBTI') {
    // 최대 8자 이내이며, 영문자와 한글만 허용
    if (
      value.length > 8 ||
      (value.length > 0 && !/^[A-Za-z가-힣]+$/.test(value))
    ) {
      return '올바른 MBTI를 입력해 주세요.';
    }
  }
};

// 서버와 클라이언트 사이에서의 major 형식 변환
const getMajorIdByLabel = (label: string): MajorId | null => {
  const entry = Object.entries(MAJOR).find(([, v]) => v.label === label);
  return entry ? (Number(entry[0]) as MajorId) : null;
};

export const useEditName = () => {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const [name, setName] = useState('');
  const errorMessage = validateProfileItem('name', name);

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  const handleSaveName = () => {
    updateUser(
      { name },
      { onSuccess: () => navigate('/mypage/profile', { replace: true }) },
    );
  };

  return { name, setName, errorMessage, handleSaveName, isLoading: isPending };
};

export const useEditMajor = () => {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const [major, setMajor] = useState<MajorId | null>(null);

  useEffect(() => {
    if (user) {
      const majorId = getMajorIdByLabel(user.major);
      setMajor(majorId);
    }
  }, [user]);

  const handleSaveMajor = () => {
    if (!major) return;
    const majorLabel = MAJOR[major].label;
    updateUser(
      { major: majorLabel },
      { onSuccess: () => navigate('/mypage/profile', { replace: true }) },
    );
  };

  return { major, setMajor, handleSaveMajor, isLoading: isPending };
};

export const useEditMBTI = () => {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const [MBTI, setMBTI] = useState('');
  const errorMessage = validateProfileItem('MBTI', MBTI);

  useEffect(() => {
    if (user) setMBTI(user.mbti);
  }, [user]);

  const handleSaveMBTI = () => {
    updateUser(
      { mbti: MBTI },
      { onSuccess: () => navigate('/mypage/profile', { replace: true }) },
    );
  };

  return { MBTI, setMBTI, errorMessage, handleSaveMBTI, isLoading: isPending };
};
