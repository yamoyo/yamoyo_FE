export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

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
  '개발자',
  '개발자',
  'PM',
  '개발자',
  '개발자',
  '개발자',
  '디자이너',
  '디자이너',
  '디자이너',
];

const memberAvatars = Array.from(
  { length: 9 },
  (_, i) => `/assets/character/char-${i + 1}.png`,
);

const createMembers = (count: number, offset = 0): TeamMember[] =>
  Array.from({ length: count }, (_, index) => {
    const key = offset + index;
    return {
      id: key + 1,
      name: memberNames[key % memberNames.length],
      role: memberRoles[key % memberRoles.length],
      avatar: memberAvatars[key % memberAvatars.length],
    };
  });

const MAX_MOCK_MEMBERS = Math.max(
  memberNames.length,
  memberRoles.length,
  memberAvatars.length,
);

export function getMockTeamMembers(teamId: number) {
  return createMembers(MAX_MOCK_MEMBERS);
}
