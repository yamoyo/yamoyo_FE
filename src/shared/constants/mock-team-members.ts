import type { TeamMember } from '@/entities/teamroom/model/types';

const memberNames = [
  '김준열',
  '김민혁',
  '박서영',
  '한상엽',
  '송우진',
  '정종현',
  '김재현',
  '김우인',
  '유지우',
];

const memberRoles = [
  '방장',
  '팀원',
  '팀원',
  '팀원',
  '팀원',
  '팀원',
  '팀원',
  '팀원',
  '팀원',
];

const memberEmails = [
  'junyeol@example.com',
  'minhyuk@example.com',
  'seoyoung@example.com',
  'sangyeop@example.com',
  'woojin@example.com',
  'jonghyun@example.com',
  'jaehyun@example.com',
  'wooin@example.com',
  'jiwoo@example.com',
];

const memberMajors = [
  '개발',
  '개발',
  '기획',
  '개발',
  '개발',
  '개발',
  '디자인',
  '디자인',
  '디자인',
];

const memberMbtis = [
  'INTJ',
  'ENFP',
  'ENTJ',
  'ISTP',
  'INFP',
  'INTP',
  'ISFJ',
  'ESFP',
  'ENFJ',
];

const memberAvatars = Array.from(
  { length: 9 },
  (_, i) => `/assets/character/char-${i + 1}.png`,
);

const memberJoinedDates = [
  '2025-01-10T09:00:00.000Z',
  '2025-01-11T14:30:00.000Z',
  '2025-01-12T10:00:00.000Z',
  '2025-01-13T16:45:00.000Z',
  '2025-01-14T11:20:00.000Z',
  '2025-01-15T09:30:00.000Z',
  '2025-01-16T13:00:00.000Z',
  '2025-01-17T15:15:00.000Z',
  '2025-01-18T10:45:00.000Z',
];

const createMembers = (count: number, offset = 0): TeamMember[] =>
  Array.from({ length: count }, (_, index) => {
    const key = offset + index;
    return {
      id: key + 1,
      name: memberNames[key % memberNames.length],
      role: memberRoles[key % memberRoles.length],
      avatar: memberAvatars[key % memberAvatars.length],
      email: memberEmails[key % memberEmails.length],
      major: memberMajors[key % memberMajors.length],
      mbti: memberMbtis[key % memberMbtis.length],
      joinedAt: memberJoinedDates[key % memberJoinedDates.length],
    };
  });

const MAX_MOCK_MEMBERS = memberNames.length;

export function getMockTeamMembers(_teamId: number) {
  return createMembers(MAX_MOCK_MEMBERS);
}
