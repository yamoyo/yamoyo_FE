import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center gap-4">
      <Image
        src="/testImage.png"
        alt="테스트 이미지"
        width={100}
        height={100}
      />
      <h1 className="text-xl font-medium">Test</h1>
    </main>
  );
}
