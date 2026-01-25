import { SCHEDULE_COLORS } from '@/entities/calendar/model/types';

interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (colorId: string) => void;
}

export default function ColorPicker({
  selectedColor,
  onSelectColor,
}: ColorPickerProps) {
  return (
    <div>
      <div className="flex gap-3">
        {SCHEDULE_COLORS.map((color) => (
          <button
            key={color.id}
            type="button"
            onClick={() => onSelectColor(color.id)}
            className={`h-5 w-5 rounded-full transition-all ${
              selectedColor === color.id
                ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-[#202540]'
                : ''
            }`}
            style={{ backgroundColor: color.hex }}
            aria-label={`${color.name} 색상`}
          />
        ))}
      </div>
    </div>
  );
}
