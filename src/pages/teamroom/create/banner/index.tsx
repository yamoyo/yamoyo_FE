import { useNavigate } from 'react-router-dom';

import { useTeamRoomCreateStore } from '@/entities/teamroom/model/teamroom-create-store';
import { TEAMROOM_IMAGES } from '@/shared/constants/teamroom-images';
import TopBar from '@/shared/ui/header/TopBar';

const BANNER_IMAGES = TEAMROOM_IMAGES.filter((image) => image.id !== 0);

export default function BannerPage() {
  const navigate = useNavigate();
  const updateCreateData = useTeamRoomCreateStore(
    (state) => state.updateCreateData,
  );

  const handleSelect = (imageId: number) => {
    updateCreateData({ bannerImageId: imageId });
    navigate('/teamroom/create', { replace: true });
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
              alt={`banner-${String(image.id)}`}
              className="size-[128px] object-cover"
              draggable="false"
            />
          </button>
        ))}
      </section>
    </div>
  );
}
