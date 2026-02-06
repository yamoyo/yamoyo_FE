export const CHARACTER_IMAGE_ID = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
] as const;

export type CharacterImageId = (typeof CHARACTER_IMAGE_ID)[number];
