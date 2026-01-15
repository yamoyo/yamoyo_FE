'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-dvh gap-4 flex-col-center">
      <Image
        src="/testImage.png"
        alt="테스트 이미지"
        width={100}
        height={100}
      />
      <h1 className="text-xl font-medium">Test</h1>
      <button
        className="h-[50px] w-[100px] rounded-lg bg-gray-500 text-white"
        onClick={() => {
          router.push('/games/roulette');
        }}
      >
        룰렛
      </button>
      <button
        className="h-[50px] w-[100px] rounded-lg bg-gray-500 text-white"
        onClick={() => {
          router.push('/games/timing-game');
        }}
      >
        타이밍 게임
      </button>
    </main>
  );
}
