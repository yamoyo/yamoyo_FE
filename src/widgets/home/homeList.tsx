import { Link } from 'react-router-dom';
import HomeListItem from '@/widgets/home/homeListItem';
import HomeListEmptyItem from '@/widgets/home/homeListEmptyItem';

// 프론트단에서 미리 넣은 사용자 프로필 이미지 12개 불러오는 로직
const characterAvatars = Array.from(
  { length: 12 },
  (_, i) => `/assets/character/char-${i + 1}.png`,
);

// 멤버 수를 기준으로 사용자 프로필 이미지 가져와서 넣어주는 로직
const createMembers = (count: number) =>
  characterAvatars.slice(0, count).map((avatar, index) => ({
    id: index + 1, // 이미지 파일명이 1번부터 시작이라 index + 1 형태로 변경 ( 통일감을 위해서 )
    avatar,
  }));

const teams = [
  // TODO(준열): 임시 목업 데이터 추후에 서버 데이터로 변경 예정
  {
    id: 1,
    name: '미디어 문화와 디자인 A조',
    members: createMembers(12),
    dday: 'D-2',
  },
  {
    id: 2,
    name: '콘텐츠 마케팅 2분반',
    members: createMembers(7),
    dday: 'D-5',
  },
  {
    id: 3,
    name: '광고 PR 3조',
    members: createMembers(5),
    dday: 'D-7',
  },
];

export function HomeList() {
  return (
    <div className="flex flex-1 flex-col gap-[13px] rounded-t-[20px] bg-[#282D4D] px-[24px] pb-[30px] pt-[30px]">
      {/** 헤더 + 팀 단일 아이템 스타일 래퍼 */}
      <div className="flex select-none items-end justify-between">
        <span className="text-[16px] font-bold text-[#EEEFF8]">
          MY 팀룸 목록
        </span>
        <Link
          to="/"
          className="text-[12px] font-bold text-[#AA89FF]"
          draggable="false"
        >
          전체보기
        </Link>
      </div>
      {teams.map((team, index) => (
        <HomeListItem
          key={team.id}
          teamName={team.name}
          members={team.members}
          dday={team.dday}
          bannerImage={`/assets/banner/banner-${index + 1}.png`}
        />
      ))}
      <HomeListEmptyItem />
    </div>
  );
}

export default HomeList;
