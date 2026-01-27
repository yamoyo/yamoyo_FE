import { TeamRoom } from './types';

// 프론트단에서 미리 넣은 사용자 프로필 이미지 12개 불러오는 로직
const characterAvatars = Array.from(
  { length: 12 },
  (_, i) => `/assets/character/char-${i + 1}.png`,
);

// 멤버 수를 기준으로 사용자 프로필 이미지 가져와서 넣어주는 로직
const createMembers = (count: number) =>
  characterAvatars.slice(0, count).map((avatar, index) => ({
    id: index + 1, // 이미지 파일명이 1번부터 시작이라 index + 1 형태로 변경 ( 통일감을 위해서 )
    avatar,
  }));

/** 팀룸 목록 */
export const MOCK_TEAM_ROOMS: TeamRoom[] = [
  {
    id: 1,
    name: '미디어 문화와 디자인 A조',
    members: createMembers(12),
    createdAt: '2026-02-06',
    isProgress: true,
    dday: 'D-2',
    imgId: 1,
  },
  {
    id: 2,
    name: '콘텐츠 마케팅 2분반',
    members: createMembers(7),
    createdAt: '2026-02-07',
    isProgress: true,
    dday: 'D-5',
    imgId: 2,
  },
  {
    id: 3,
    name: '광고 PR 3조',
    members: createMembers(5),
    createdAt: '2026-02-08',
    isProgress: false,
    dday: 'D-7',
    imgId: 3,
  },
  {
    id: 4,
    name: 'UX기획 1팀',
    members: createMembers(8),
    createdAt: '2026-02-09',
    isProgress: true,
    dday: 'D-1',
    imgId: 4,
  },
  {
    id: 5,
    name: 'AI 콘텐츠 4조',
    members: createMembers(6),
    createdAt: '2026-02-10',
    isProgress: false,
    dday: 'D-3',
    imgId: 5,
  },
];
