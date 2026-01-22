interface Props {
  title: string;
  onBackClick?: () => void;
}

export function TopBar({ title, onBackClick }: Props) {
  return (
    <header className="relative w-full pb-[17px] pt-[19px] text-body-1 text-tx-default flex-center">
      {onBackClick && (
        <button
          onClick={onBackClick}
          aria-label="뒤로가기"
          type="button"
          className="absolute left-5 top-1/2 translate-y-[-50%]"
        >
          <img src="/assets/arrow/arrow-header-back.svg" alt="back" />
        </button>
      )}
      {title}
    </header>
  );
}

export default TopBar;
