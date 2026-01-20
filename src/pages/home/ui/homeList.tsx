import { Link } from 'react-router-dom';

const HomeList = () => {
  return (
    <div className="flex items-end justify-between px-[24px] pt-[50px]">
      <span className="text-[16px] font-bold text-[#EEEFF8]">MY 팀룸 목록</span>
      <Link to="/" className="text-[12px] font-normal text-[#D4C6F8]">
        전체보기
      </Link>
    </div>
  );
};

export default HomeList;
