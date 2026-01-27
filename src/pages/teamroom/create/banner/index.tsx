import { useNavigate } from 'react-router-dom';
import TopBar from '@/shared/ui/header/TopBar';
import { TEAMROOM_IMAGES } from '@/shared/constants/teamroom-images';

const BANNER_IMAGES = TEAMROOM_IMAGES.filter(
  (image) => image.id !== 'banner-empty',
);

export default function BannerPage() {
  const navigate = useNavigate();

  const handleSelect = (imageId: string) => {
    navigate('/teamroom/create', {
      replace: true,
      state: { bannerId: imageId },
    });
  };

  return (
    <div className="flex flex-col">
      <TopBar title={'팀룸 설정'} backIcon="arrow" />

      <section className="grid grid-cols-3 gap-[3px] pt-2">
        {BANNER_IMAGES.map((image) => (
          <button
            key={image.id}
            type="button"
            className="w-full select-none"
            onClick={() => handleSelect(image.id)}
          >
            <img
              src={image.src}
              alt={image.id}
              className="size-[128px] object-cover"
              draggable="false"
            />
          </button>
        ))}
      </section>
    </div>
  );
}
