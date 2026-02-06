import { GameOption } from './model/types';

export default function SelectGameItem({
  gameType,
  title,
  description,
  onSelect,
}: GameOption) {
  if (!onSelect) return null;
  return (
    <button
      onClick={() => onSelect(gameType)}
      className="group flex h-[100px] w-full items-center gap-4 rounded-xl bg-bg-card px-5 transition-colors hover:bg-bg-secondary_2"
    >
      <img
        className="w-16"
        src={`/assets/game/icons/icon-${gameType.toLowerCase()}.png`}
        alt={`${title} 아이콘`}
      />
      <div className="space-y-1 text-start">
        <p className="text-body-1 text-tx-default group-hover:text-tx-default_black">
          {title}
        </p>
        <p className="text-caption-2 text-tx-default_4 group-hover:text-tx-default_black">
          {description}
        </p>
      </div>
    </button>
  );
}
