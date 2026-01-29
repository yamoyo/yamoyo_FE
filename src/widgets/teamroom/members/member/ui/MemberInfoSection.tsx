import { formatDateDot } from '@/entities/calendar/lib/utils/format-date';

interface MemberInfoSectionProps {
  name: string;
  email: string;
  major: string;
  mbti: string;
  joinedAt: Date | string;
}

export default function MemberInfoSection({
  name,
  email,
  major,
  mbti,
  joinedAt,
}: MemberInfoSectionProps) {
  return (
    <section
      className="mb-[172px] flex select-none flex-col items-start gap-[17px] px-6"
      draggable="false"
    >
      <span className="text-title-2 text-tx-default">기본정보</span>
      <div className="flex flex-col items-start gap-[17px]">
        <div className="flex gap-[42px]">
          <span className="w-[42px] text-body-2 text-tx-default_5">이름</span>
          <span className="text-body-4 text-tx-default">{name}</span>
        </div>
        <div className="flex gap-[42px]">
          <span className="w-full text-body-2 text-tx-default_5">이메일</span>
          <span className="text-body-4 text-tx-default">{email}</span>
        </div>
        <div className="flex gap-[42px]">
          <span className="w-[42px] text-body-2 text-tx-default_5">전공</span>
          <span className="text-body-4 text-tx-default">{major}</span>
        </div>
        <div className="flex gap-[42px]">
          <span className="w-[42px] text-body-2 text-tx-default_5">MBTI</span>
          <span className="text-body-4 text-tx-default">{mbti}</span>
        </div>
        <div className="flex gap-[24px]">
          <span className="w-full text-body-2 text-tx-default_5">가입일자</span>
          <span className="text-body-4 text-tx-default">
            {formatDateDot(joinedAt)}
          </span>
        </div>
      </div>
    </section>
  );
}
