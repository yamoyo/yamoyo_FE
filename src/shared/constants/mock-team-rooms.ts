// TODO(준열): 임시 목업 데이터 추후에 서버 데이터로 변경 예정

// 프론트단에서 미리 넣은 사용자 프로필 이미지 12개 불러오는 로직
const characterAvatars = Array.from(
  { length: 12 },
  (_, i) => `/assets/character/char-${i + 1}.png`,
);

// 멤버 수를 기준으로 사용자 프로필 이미지 가져와서 넣어주는 로직
const createMembers = (count: number) =>
  characterAvatars.slice(0, count).map((avatar, index) => ({
    id: index + 1,
    avatar,
  }));

export interface TeamRoomMember {
  id: number;
  avatar: string;
}

export interface TeamRoom {
  id: number;
  name: string;
  image: string;
  members: TeamRoomMember[];
  dday: string;
}

export const MOCK_TEAM_ROOMS: TeamRoom[] = [
  {
    id: 1,
    name: '미디어 문화와 디자인 A조',
    image: '/assets/banner/banner-1.png',
    members: createMembers(12),
    dday: 'D-2',
  },
  {
    id: 2,
    name: '콘텐츠 마케팅 2분반',
    image: '/assets/banner/banner-2.png',
    members: createMembers(7),
    dday: 'D-5',
  },
  {
    id: 3,
    name: '광고 PR 3조',
    image: '/assets/banner/banner-3.png',
    members: createMembers(5),
    dday: 'D-7',
  },
];
