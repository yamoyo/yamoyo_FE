import { useEffect, useState } from 'react';

const MAIN_W = 390;
const QR_W = 212;
const QR_H = 216;

const style = {
  width: `${QR_W}px`,
  height: `${QR_H}px`,
  backgroundImage: "url('/assets/background/earth.png')",
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
} as const;

export function EventQRCode() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;

      const mainRight = (vw + MAIN_W) / 2;
      const qrLeft = vw - QR_W;

      setShow(qrLeft >= mainRight);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed left-0 top-0 flex h-screen w-screen">
      <div className="flex-1" />
      <div className="h-full w-[390px]" />
      <div className="flex flex-1 justify-center pl-[clamp(0px,4vw,50px)] pt-[clamp(40px,12vh,140px)]">
        <div
          className="flex flex-col items-center justify-center gap-2"
          style={style}
        >
          <p className="font-bold leading-[1.7] tracking-[8%] text-tx-default">
            모바일 체험하기
          </p>
          <img
            src="/assets/background/QR-code.png"
            alt="QR Code"
            className="h-[99.63px] w-[100px]"
          />
        </div>
      </div>
    </div>
  );
}
