interface BannerSectionProps {
  imageSrc: string;
  isDefaultImage: boolean;
  onEdit: () => void;
}

export default function BannerSection({
  imageSrc,
  isDefaultImage,
  onEdit,
}: BannerSectionProps) {
  return (
    <section className="w-full pt-2">
      <div className="relative h-[200px] w-full select-none flex-center">
        <img
          src={imageSrc}
          alt="팀룸 배너 미리보기"
          className="h-full w-full object-cover [image-rendering:pixelated]"
          draggable="false"
        />
        <button
          type="button"
          onClick={onEdit}
          className="absolute bottom-4 right-6"
          aria-label="이미지 변경"
        >
          <img
            src={`/assets/icons/${isDefaultImage ? 'image-none-select' : 'image-selected'}.svg`}
            alt={isDefaultImage ? '이미지 없음' : '이미지 선택됨'}
            className="size-[40px]"
            draggable="false"
          />
        </button>
      </div>
    </section>
  );
}
