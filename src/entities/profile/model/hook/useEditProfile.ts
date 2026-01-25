import { useState, useEffect } from 'react';
import { MAJOR } from '../options/profile-items';
import { majorType } from '../types/types';
import { useNavigate } from 'react-router-dom';

export const validateProfileItem = (type: 'name' | 'MBTI', value: string) => {
  if (type === 'name') {
    if (!/^[0-9A-Za-z가-힣]+$/.test(value) && value.length > 0) {
      return '특수문자는 입력불가입니다.';
    }
  }

  if (type === 'MBTI') {
    if (value.length > 8) {
      return '올바른 MBTI를 입력해 주세요.';
    }
  }
};

export const useEditName = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const errorMessage = validateProfileItem('name', name);

  useEffect(() => {
    // TODO: 초기 데이터 로드
    setName('박서영');
  }, []);

  const handleSaveName = async () => {
    // TODO: API 호출 로직 작성
    navigate('/mypage/profile');
  };

  return { name, setName, errorMessage, handleSaveName };
};

export const useEditMajor = () => {
  const navigate = useNavigate();
  const [major, setMajor] = useState<majorType | null>(null);

  useEffect(() => {
    // TODO: 초기 데이터 로드
    setMajor(MAJOR[1].id);
  }, []);

  const handleSaveMajor = async () => {
    // TODO: API 호출 로직 작성
    navigate('/mypage/profile');
  };

  return { major, setMajor, handleSaveMajor };
};

export const useEditMBTI = () => {
  const navigate = useNavigate();
  const [MBTI, setMBTI] = useState('');
  const errorMessage = validateProfileItem('MBTI', MBTI);

  useEffect(() => {
    // TODO: 초기 데이터 로드
    setMBTI('ESFJ');
  }, []);

  const handleSaveMBTI = async () => {
    // TODO: API 호출 로직 작성
    navigate('/mypage/profile');
  };

  return { MBTI, setMBTI, errorMessage, handleSaveMBTI };
};
