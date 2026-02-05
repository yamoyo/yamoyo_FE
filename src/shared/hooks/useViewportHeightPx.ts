import { useEffect, useState } from 'react';

/** 뷰포트 높이(px) 반환 */
export function useViewportHeightPx() {
  const [vh, setVh] = useState(() => window.innerHeight);

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return vh;
}
