import { CreateScheduleFormData } from '@/entities/calendar/model/types';

interface FrequencySectionProps {
  scheduleType: CreateScheduleFormData['type'];
  onSelectType: (type: CreateScheduleFormData['type']) => void;
}

export default function FrequencySection({
  scheduleType,
  onSelectType,
}: FrequencySectionProps) {
  return (
    <div>
      <label className="mb-2 block text-body-4.1 text-tx-default_3">
        미팅 빈도
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSelectType('none')}
          className={`flex-1 rounded-lg py-3 text-body-4 transition-colors ${
            scheduleType === 'none'
              ? 'bg-bg-secondary_2 text-black'
              : 'bg-bg-textfiled text-white'
          }`}
        >
          반복하지 않음
        </button>
        <button
          type="button"
          onClick={() => onSelectType('weekly')}
          className={`flex-1 rounded-lg py-3 text-body-4 transition-colors ${
            scheduleType === 'weekly'
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
