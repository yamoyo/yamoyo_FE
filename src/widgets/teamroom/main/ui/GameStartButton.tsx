interface Props {
  onClick: () => void;
  color: 'yellow' | 'white' | 'gray';
  text: '게임시작' | '정지';
  disabled: boolean;
}

export default function GameStartButton({
  onClick,
  color,
  text,
  disabled,
}: Props) {
  const buttonBackgroundImage = `/assets/game/timing/button-bg-${color}.png`;

  return (
    <button
      type="button"
      onClick={onClick}
      className="h-[70px] w-[170px]"
      disabled={disabled}
      style={{
        backgroundImage: `url(${buttonBackgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain', // or 'cover'
        filter: 'drop-shadow(2px 2px 0 #000)',
      }}
    >
      <p
        className="body-g1 text-center text-tx-default_black"
        style={{
          WebkitTextStrokeWidth: '0.5px',
          WebkitTextStrokeColor: '#171719',
        }}
      >
        {text}
      </p>
    </button>
  );
}
