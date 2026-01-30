import { RouletteGameResponse } from './types';

const DUMMY_PARTICIPANTS = [
  { userId: 1, characterId: 1, name: '박서영' },
  { userId: 2, characterId: 2, name: '김준열' },
  { userId: 3, characterId: 3, name: '김민혁' },
  { userId: 4, characterId: 4, name: '김재형' },
  { userId: 5, characterId: 5, name: '유지우' },
  { userId: 6, characterId: 6, name: '한상엽' },
  { userId: 7, characterId: 7, name: '김우인' },
  { userId: 8, characterId: 8, name: '정종현' },
];

export const DUMMY_ROULETTE: RouletteGameResponse = {
  winnerId: 3,
  winnerName: '김민혁',
  participants: DUMMY_PARTICIPANTS,
};
