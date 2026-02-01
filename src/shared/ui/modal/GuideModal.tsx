import ModalDim from './ModalDim';
import { GuideModalOptions } from './model/types';

export default function GuideModal({ title, children }: GuideModalOptions) {
  return (
    <ModalDim>
      <div className="flex flex-col items-center gap-5">
        <div
          className="h-[40px] w-[220px] bg-cover bg-center flex-center"
          style={{
            backgroundImage: 'url(/assets/timeselect/guide-title-bg.png)',
          }}
        >
          <h2 className="body-g2 text-[#C7B2FF]">{title}</h2>
        </div>

        <div className="rounded-xl bg-white px-[22px] py-[26px]">
          {children}
        </div>
      </div>
    </ModalDim>
  );
}
