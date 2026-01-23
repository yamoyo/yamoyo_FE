/**
 * 현재 프로필 이미지 + 사용자 이름 + 프로필 이미지 수정 버튼
 * 세 항목을 합친 공통 컴포넌트 UI
 * @author junyeol
 */
import { useState } from 'react';
import BottomSheet from '@/shared/ui/BottomSheet';
import { CHARACTER_IMAGES } from '@/shared/constants/char-images';

export default function UserProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    '/assets/character/char-9.png',
  );

  const handleSelectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(false);
    // TODO: API 호출로 프로필 이미지 업데이트
  };

  return (
    <>
      <div className="flex flex-col items-center pt-[38px]">
        <div className="relative select-none">
          <div className="relative flex-center">
            <img
              src="/assets/character/char-bg.png"
              width={122}
              height={122}
              alt="프로필 이미지 배경"
              draggable="false"
            />
            <img
              src={selectedImage}
              width={68}
              height={50}
              alt="프로필 이미지"
              className="absolute"
              draggable="false"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute bottom-0 right-0 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#383842]"
          >
            <img
              src="/assets/icons/edit.svg"
              width={16}
              height={16}
              alt="프로필 이미지 수정"
              draggable="false"
            />
          </button>
        </div>

        <span
          className="mt-[10px] select-none text-[16px] font-medium text-tx-default"
          draggable="false"
        >
          박서영
        </span>
      </div>

      <BottomSheet
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="프로필 이미지"
      >
        <div className="grid grid-cols-3 place-items-center gap-[16px] pb-4">
          {CHARACTER_IMAGES.map((image, index) => (
            <button
              key={image}
              onClick={() => handleSelectImage(image)}
              className="relative flex h-[85px] w-[85px] select-none items-center justify-center transition hover:scale-105"
            >
              <img
                src="/assets/character/char-bg.png"
                width={85}
                height={85}
                alt=""
                className="absolute"
                draggable="false"
              />
              <img
                src={image}
                width={49}
                height={43}
                alt={`캐릭터 ${index + 1}`}
                className="relative"
                draggable="false"
              />
            </button>
          ))}
        </div>
      </BottomSheet>
    </>
  );
}
