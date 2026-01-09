// - 도메인과 무관하므로 shared/styles에 둠
import '@/shared/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // lang - seo + 접근성 개선
    <html lang="ko">
      <body className="bg-neutral-100">
        {/*
          모바일 전용 컨테이너
          - max-w-[430px]: 모바일 최대 폭 제한 ( 아이폰 Pro Max )
          - mx-auto: 데스크톱에서 가운데 정렬
          - min-h-dvh: 모바일 주소창 변화 대응 (vh 대신 dvh)
          - bg-white: 실제 앱 영역
        */}
        <div className="mx-auto min-h-dvh max-w-[430px] bg-white">
          {/* 
            실제 페이지 콘텐츠
            - app/page.tsx 또는 route group의 page.tsx
            - 여기서는 조합만 담당
          */}
          {children}
        </div>
      </body>
    </html>
  );
}
