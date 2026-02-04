interface FrequencySectionProps {
  isRecurring: boolean;
  onSelectRecurring: (isRecurring: boolean) => void;
}

export default function FrequencySection({
  isRecurring,
  onSelectRecurring,
}: FrequencySectionProps) {
  return (
    <div>
      <label className="mb-2 block text-body-4.1 text-tx-default_3">
        미팅 빈도
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSelectRecurring(false)}
          className={`flex-1 rounded-lg py-3 text-body-4 transition-colors ${
            !isRecurring
              ? 'bg-bg-secondary_2 text-black'
              : 'bg-bg-textfiled text-white'
          }`}
        >
          반복하지 않음
        </button>
        <button
          type="button"
          onClick={() => onSelectRecurring(true)}
          className={`flex-1 rounded-lg py-3 text-body-4 transition-colors ${
            isRecurring
              ? 'bg-bg-secondary_2 text-black'
              : 'bg-bg-textfiled text-white'
          }`}
        >
          매주
        </button>
      </div>
    </div>
  );
}
