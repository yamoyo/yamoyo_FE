interface MemberProfileSectionProps {
  avatar: string;
  name: string;
}

export default function MemberProfileSection({
  avatar,
  name,
}: MemberProfileSectionProps) {
  return (
    <section
      className="mb-[50px] mt-5 flex select-none flex-col items-center"
      draggable="false"
    >
      {/* 프로필 이미지 */}
      <div className="relative h-[120px] w-[120px] flex-center">
        <img
          src="/assets/character/char-bg.png"
          width={120}
          height={120}
          alt="프로필 배경"
          draggable={false}
        />
        <img
          src={avatar}
          width={68}
          height={49}
          alt={name}
          className="absolute"
          draggable={false}
        />
      </div>

      {/* 이름 */}
      <span className="mt-[10px] text-body-1 text-tx-default">{name}</span>
    </section>
  );
}
