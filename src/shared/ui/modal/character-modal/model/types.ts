type Base = {
  title: string;
  subTitle: string;
};

type Button =
  | {
      buttonText: string;
      onClick: () => void;
    }
  | {
      buttonText?: never;
      onClick?: never;
    };

export type Character =
  | {
      type: 'PINK_CHARACTER';
      characterId?: never;
    }
  | {
      type: 'CROWN';
      characterId: number;
    };

export type CharacterModalOptions = Base & Button & Character;
