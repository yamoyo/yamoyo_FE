'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center gap-4">
      <Image
        src="/testImage.png"
        alt="테스트 이미지"
        width={100}
        height={100}
      />
      <h1 className="text-xl font-medium">Test</h1>
      <button
        className="bg-gray-500 w-[100px] h-[50px] rounded-lg text-white"
        onClick={() => {
          router.push('/roulette');
        }}
      >
        룰렛
      </button>
    </main>
  );
}
