import { formatDateDot } from '@/entities/calendar/lib/utils/format-date';
import BasicInfoItem from '@/entities/profile/ui/edit/BasicInfoItem';

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
      <span className="text-body-1 text-tx-default">기본정보</span>
      <div className="flex flex-col items-start gap-[17px]">
        <BasicInfoItem label="이름" value={name} />
        <BasicInfoItem label="이메일" value={email} />
        <BasicInfoItem label="전공" value={major} />
        <BasicInfoItem label="MBTI" value={mbti} />
        <BasicInfoItem label="가입일자" value={formatDateDot(joinedAt)} />
      </div>
    </section>
  );
}
