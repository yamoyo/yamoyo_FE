import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // 폰트 사이즈 토큰들을 font-size 그룹으로 분리
      'font-size': [
        'text-title-1',
        'text-title-2',
        'text-body-1',
        'text-body-2',
        'text-body-3',
        'text-body-3.9',
        'text-body-4',
        'text-body-4.1',
        'text-body-5',
        'text-body-6',
        'text-body-7',
        'text-body-8',
        'text-body-9',
        'text-caption-1',
        'text-caption-2',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
