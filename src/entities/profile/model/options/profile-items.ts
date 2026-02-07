import Major1Icon from '@/shared/assets/major/major-1.svg?react';
import Major2Icon from '@/shared/assets/major/major-2.svg?react';
import Major3Icon from '@/shared/assets/major/major-3.svg?react';
import Major4Icon from '@/shared/assets/major/major-4.svg?react';
import Major5Icon from '@/shared/assets/major/major-5.svg?react';
import Major6Icon from '@/shared/assets/major/major-6.svg?react';
import Major7Icon from '@/shared/assets/major/major-7.svg?react';
import Major8Icon from '@/shared/assets/major/major-8.svg?react';
import Major9Icon from '@/shared/assets/major/major-9.svg?react';

export const MAJOR = {
  1: { label: '컴퓨터/IT', Icon: Major1Icon },
  2: { label: '디자인', Icon: Major2Icon },
  3: { label: '미디어/콘텐츠', Icon: Major3Icon },
  4: { label: '경영/경제', Icon: Major4Icon },
  5: { label: '인문/교육', Icon: Major5Icon },
  6: { label: '자연과학', Icon: Major6Icon },
  7: { label: '교육/심리', Icon: Major7Icon },
  8: { label: '의료/보건', Icon: Major8Icon },
  9: { label: '기타/비전공', Icon: Major9Icon },
} as const;

export const BASIC_INFO_ITEMS = [
  { label: '이름', key: 'name', editable: true },
  { label: '이메일', key: 'email', editable: false },
  { label: '전공', key: 'major', editable: true },
  { label: 'MBTI', key: 'mbti', editable: true },
  { label: '가입일자', key: 'joinDate', editable: false },
] as const;

export const MBTI = [
  'ISTJ',
  'ISFJ',
  'INFJ',
  'INTJ',
  'ISTP',
  'ISFP',
  'INFP',
  'INTP',
  'ESTP',
  'ESFP',
  'ENFP',
  'ENTP',
  'ESTJ',
  'ESFJ',
  'ENFJ',
  'ENTJ',
];
