/**
 * 현재 프로필 이미지 + 사용자 이름 + 프로필 이미지 수정 버튼
 * 세 항목을 합친 공통 컴포넌트 UI
 * @author junyeol
 */
import { useState } from 'react';
import BottomSheet from '@/shared/ui/BottomSheet';

const CHARACTER_IMAGES = [
  '/assets/character/char-1.png',
  '/assets/character/char-2.png',
  '/assets/character/char-3.png',
  '/assets/character/char-4.png',
  '/assets/character/char-5.png',
  '/assets/character/char-6.png',
  '/assets/character/char-7.png',
  '/assets/character/char-8.png',
  '/assets/character/char-9.png',
  '/assets/character/char-10.png',
  '/assets/character/char-11.png',
  '/assets/character/char-12.png',
];

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
        <div className="relative">
          <div className="relative flex-center">
            <img
              src="/assets/icons/char-bg.png"
              width={122}
              height={122}
              alt="프로필 이미지 배경"
            />
            <img
              src={selectedImage}
              width={68}
              height={50}
              alt="프로필 이미지"
              className="absolute"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute bottom-0 right-0 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#383842]"
          >
            <img
              src="/assets/icons/edit.png"
              width={16}
              height={16}
              alt="프로필 이미지 수정"
              draggable="false"
            />
          </button>
        </div>

        <span className="mt-[10px] text-[16px] font-medium text-tx-default">
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
              key={index}
              onClick={() => handleSelectImage(image)}
              className="relative flex h-[85px] w-[85px] items-center justify-center transition hover:scale-105"
            >
              <img
                src="/assets/icons/char-bg.png"
                width={85}
                height={85}
                alt=""
                className="absolute"
              />
              <img
                src={image}
                width={49}
                height={43}
                alt={`캐릭터 ${index + 1}`}
                className="relative"
              />
            </button>
          ))}
        </div>
      </BottomSheet>
    </>
  );
}
