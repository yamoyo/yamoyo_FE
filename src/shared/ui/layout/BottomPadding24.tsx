import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

/** 하단 여백 24px만 있는 레이아웃
 *
 * - route element로 쓸 때: <Route element={<BottomPadding24 />} />
 * - 일반 Wrapper로 쓸 때: <BottomPadding24><SomeComponent /></BottomPadding24>
 */
interface BottomPadding24Props {
  children?: ReactNode;
}

export default function BottomPadding24({ children }: BottomPadding24Props) {
  return <div className="pb-6">{children ?? <Outlet />}</div>;
}
