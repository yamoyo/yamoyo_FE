/**
 * 현재 프로필 이미지 + 사용자 이름 + 프로필 이미지 수정 버튼
 * 세 항목을 합친 공통 컴포넌트 UI
 * @author junyeol
 */

export default function UserProfile() {
  return (
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
            src="/assets/character/char-9.png"
            width={68}
            height={50}
            alt="프로필 이미지"
            className="absolute"
          />
        </div>

        <button className="absolute bottom-0 right-0 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#383842]">
          <img
            src="/assets/icons/edit.png"
            width={16}
            height={16}
            alt="프로필 이미지 수정"
            draggable="false"
          />
        </button>
      </div>

      {/* 사용자 이름 */}
      <span className="mt-[10px] text-[16px] font-medium text-tx-default">
        박서영
      </span>
    </div>
  );
}
