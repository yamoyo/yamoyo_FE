import { Character } from './model/types';

export default function CharacterModalMainVisual(props: Character) {
  const { type, characterId } = props;

  if (type === 'CROWN') {
    return (
      <>
        <div className="relative z-10 h-[105px] w-[280px]">
          <img
            src="/assets/character/mini-char-group.png"
            alt="Background Character"
            className="absolute left-1/2 top-0 -translate-x-1/2"
            width={280}
          />
          <img
            src={`/assets/character/crown/crown-char-${characterId}.png`}
            alt="Character"
            className="absolute bottom-0 left-1/2 h-[110px] -translate-x-1/2"
          />
        </div>
        <img
          src="/assets/modal/bg-confetti.png"
          className="absolute left-1/2 top-4 -translate-x-1/2"
          width={320}
        />
      </>
    );
  }

  if (type === 'PINK_CHARACTER') {
    return (
      <>
        <div className="relative z-10 h-[100px] w-[280px]">
          <img
            src="/assets/character/mini-char-group.png"
            alt="Background Character"
            className="absolute left-1/2 top-0 -translate-x-1/2"
            width={280}
          />
          <img
            src="/assets/character/pink-char.png"
            alt="Pink Character"
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            width={57}
          />
        </div>
        <img
          src="/assets/modal/bg-gray-lines.png"
          className="absolute left-1/2 top-0 -translate-x-1/2"
          width={342}
        />
      </>
    );
  }

  return null;
}
