const GUIDE_ITEMS: { text: string; highlight?: string; suffix?: string }[] = [
  { text: '장소는', highlight: '온라인으로 고정', suffix: '한다' },
  {
    text: '',
    highlight: '클릭 또는 드래그',
    suffix: '로 시간대를\n선택하세요',
  },
  { text: '선택한 시간은 다시 선택하면 취소돼요' },
  { text: '본인의', highlight: '선호 시간대를 선택', suffix: '하세요' },
  { text: '야모요가', highlight: '최적의 시간대를', suffix: ' 찾아드려요' },
];

interface TimeSelectGuideContentProps {
  onClose: () => void;
}

export default function TimeSelectGuideContent({
  onClose,
}: TimeSelectGuideContentProps) {
  return (
    <div className="flex flex-col items-center gap-[30px]">
      <div className="flex flex-col items-center gap-5">
        <p className="text-body-1 text-tx-default_black">시간 설정 방법</p>
        <div className="flex flex-col items-start gap-5">
          {GUIDE_ITEMS.map((item, index) => (
            <div key={index} className="flex items-center gap-[10px]">
              <div className="h-4 w-4">
                <img
                  src="/assets/timeselect/guide-icon.svg"
                  width={15}
                  height={15}
                />
              </div>
              <p className="whitespace-pre-line text-body-4.1 text-bg-default">
                {item.text}
                {item.highlight && (
                  <span className="text-body-4 text-bg-primary">
                    {' '}
                    {item.highlight}
                  </span>
                )}
                {item.suffix}
              </p>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="text-body-1 text-bg-primary"
        onClick={onClose}
      >
        확인
      </button>
    </div>
  );
}
