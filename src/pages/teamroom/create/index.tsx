import TopBar from '@/shared/ui/header/TopBar';
import BottomButton from '@/shared/ui/button/BottomButton';
import {
  DEFAULT_TEAMROOM_IMAGE_ID,
  TEAMROOM_IMAGES,
} from '@/shared/constants/teamroom-images';

export default function TeamRoomCreatePage() {
  const selectedImageId = DEFAULT_TEAMROOM_IMAGE_ID;
  const previewImage =
    TEAMROOM_IMAGES.find((image) => image.id === selectedImageId)?.src ?? '';
  const isDefaultImage = selectedImageId === DEFAULT_TEAMROOM_IMAGE_ID;

  // 이미지 미리보기 화면 + 이미지 선택하는 페이지로 이동하는 버튼 + 이미지 없을 때 경우 미리보기 화면
  // 팀 이름 ( 일단 20자 제한 ) + 인풋 필드 + 플레이스 홀더 (예시 : 스위프 웹 12기)
  // 마감일 + 캘린더 모달로 나오게하는 UI 컴포넌트 사용
  // 한 줄 소개를 해주세요. + 인풋 필드 ( 50 자 제한 )

  return (
    <div className="flex min-h-dvh flex-col bg-bg-default">
      <header>
        <TopBar title={'팀룸 설정'} backIcon="arrow" />
      </header>

      <section className="w-full pt-2">
        <div className="relative h-[200px] w-full select-none flex-center">
          <img
            src={previewImage}
            alt="팀룸 배너 미리보기"
            className="h-full w-full object-cover"
            draggable="false"
          />
          <button
            type="button"
            onClick={() => {}}
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

      {/* <div className="px-6 pb-6">
        <BottomButton text={'만들기'} onClick={() => {}} disabled={false} />
      </div> */}
    </div>
  );
}
