import BottomButton from '@/shared/ui/button/BottomButton';

interface Props {
  children: React.ReactNode;
  isLoading: boolean;
  showBackCharacter?: boolean;
  onClickBtn: () => void;
  disabled: boolean;
}

export default function EditProfileLayout({
  children,
  showBackCharacter = false,
  onClickBtn,
  isLoading,
  disabled,
}: Props) {
  return (
    <div className="relative flex flex-grow flex-col justify-between overflow-hidden px-6 pb-[60px] pt-[30px]">
      {children}
      <BottomButton
        onClick={onClickBtn}
        text="적용"
        loadingText="처리중..."
        isLoading={isLoading}
        className="z-10"
        disabled={disabled}
      />
      {showBackCharacter && (
        <img
          src="/assets/character/big-char-1.png"
          alt="Character"
          className="absolute bottom-[-16px] right-[-84px] h-[354px] w-[352px]"
        />
      )}
    </div>
  );
}
