interface MenuListItemProps {
  icon: string;
  label: string;
  onClick: () => void;
}

export default function MenuListItem({
  icon,
  label,
  onClick,
}: MenuListItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full select-none items-center justify-between border-b border-[#454858] p-4 text-tx-default last:border-b-0"
      draggable="false"
    >
      <div className="flex items-center gap-3">
        <img src={icon} width={24} height={24} alt="" />
        <span className="text-[14px] font-bold text-tx-default">{label}</span>
      </div>
      <img src="/assets/icons/arrow-right.svg" width={8} height={14} alt="" />
    </button>
  );
}
