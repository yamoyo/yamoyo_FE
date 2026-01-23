interface Props {
  current: number;
  total: number;
}

/** 단계 진행 바 컴포넌트
 *
 * @param current - 현재 단계 (1부터 시작)
 * @param total - 전체 단계 수
 *
 */
export default function StepProgressBar({ current, total }: Props) {
  const segmentWidth = `${100 / total}%`;
  const progressLeft = `${((current - 1) / total) * 100}%`;

  return (
    <div className="relative h-[5px] w-full bg-bd-default">
      <div
        className="absolute top-0 h-[5px] rounded-full bg-bg-primary"
        style={{ width: segmentWidth, left: progressLeft }}
      />
    </div>
  );
}
