/** 둥근 네모 형태의 캐릭터 카드
 *
 * 팀장 투표 현황 화면에서 미참여자에 사용
 */
export default function CharacterCard({
  characterId,
  name,
}: {
  characterId: number;
  name: string;
}) {
  return (
    <div className="h-[74px] w-[74px] select-none rounded-xl border border-[#6A719400] bg-bg-card py-1.5 flex-col-center">
      <div className="h-[50px] w-[50px] flex-center">
        <img
          src={`/assets/character/char-${characterId}.png`}
          alt={name}
          className="w-10 scale-x-[-1]" // scale-x-[-1]: 좌우 반전
          draggable={false}
        />
      </div>
      <p className="text-caption-2-2 text-tx-default">{name}</p>
    </div>
  );
}
