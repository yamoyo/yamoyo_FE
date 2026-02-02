import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '@/shared/ui/header/TopBar';
import { TEAMROOM_IMAGES } from '@/shared/constants/teamroom-images';
import { useTeamRoomEditStore } from '@/entities/teamroom/model/teamroom-edit-store';

const BANNER_IMAGES = TEAMROOM_IMAGES.filter((image) => image.id !== 0);

export default function TeamRoomEditBannerPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const updateEditData = useTeamRoomEditStore((state) => state.updateEditData);

  const handleSelect = (imageId: number) => {
    updateEditData({ bannerImageId: imageId });
    navigate(`/teamroom/${id}/edit`, { replace: true });
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
