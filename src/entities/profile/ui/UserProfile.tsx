/**
 * 현재 프로필 이미지 + 사용자 이름 + 프로필 이미지 수정 버튼
 * 세 항목을 합친 공통 컴포넌트 UI
 * @author junyeol
 */
import { useState } from 'react';

import {
  CHARACTER_IMAGE_ID,
  CharacterImageId,
} from '@/shared/constants/char-images';
import BottomSheet from '@/shared/ui/BottomSheet';

import { cn } from '../../../shared/config/tailwind/cn';

interface props {
  name: string;
  characterId: CharacterImageId;
  onChangeCharacterId?: (id: CharacterImageId) => void;
  className?: string;
}

export default function UserProfile({
  name,
  characterId,
  onChangeCharacterId,
  className,
}: props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedImage = `/assets/character/char-${characterId}.png`;

  const handleSelectImage = (id: CharacterImageId) => {
    if (!onChangeCharacterId) return;
    onChangeCharacterId(id);
    setIsModalOpen(false);
    // TODO: API 호출로 프로필 이미지 업데이트
  };

  return (
    <>
      <div className={cn('flex flex-col items-center', className)}>
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
            className="absolute bottom-0 right-0 size-[32px] rounded-full bg-[#383842] flex-center"
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
          {name}
        </span>
      </div>

      <BottomSheet
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="프로필 이미지"
      >
        <div className="grid grid-cols-4 place-items-center gap-[16px] pb-4">
          {CHARACTER_IMAGE_ID.map((imageId, index) => (
            <button
              key={imageId}
              onClick={() => handleSelectImage(imageId)}
              className="relative size-[72px] select-none transition flex-center hover:scale-105"
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
                src={`/assets/character/char-${imageId}.png`}
                width={46}
                height={37}
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
