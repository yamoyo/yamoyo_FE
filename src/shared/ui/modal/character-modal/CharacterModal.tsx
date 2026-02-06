import ModalDim from '../ModalDim';
import { useModalStore } from '../model/modal-store';
import CharacterModalMainVisual from './MainVisual';
import { CharacterModalOptions } from './model/types';

/** 가운데 캐릭터가 있는 모달
 *
 * - 팀장 선정 단계에서 주로 사용
 * - 버튼 있을 수도 있고 없을 수도 있음
 *
 *
 */
export default function CharacterModal(props: CharacterModalOptions) {
  const { title, subTitle, buttonText, onClick, ...character } = props;
  const { closeModal } = useModalStore();

  const hasButton = Boolean(buttonText);

  const paddingTop =
    character.type === 'CROWN' ? (hasButton ? 44 : 53) : hasButton ? 28 : 44;
  const paddingBottom = buttonText ? 20 : 26;

  const handleOnClick = () => {
    if (!onClick) return;
    onClick();
    closeModal();
  };

  return (
    <ModalDim isActiveCloseModal={false}>
      <div
        className="relative w-[342px] select-none rounded-xl bg-tx-default flex-col-center"
        style={{
          boxShadow: '0 0 12px 0 rgba(0, 0, 0, 0.33)',
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
        }}
      >
        <CharacterModalMainVisual {...character} />

        <div className="mt-2 w-full px-4 text-center">
          <p className="mb-1 text-body-1 text-tx-default_black">{title}</p>
          <p className="text-body-6 text-tx-default_black">{subTitle}</p>
          {buttonText && (
            <button
              className="mt-4 h-[52px] w-full rounded-lg bg-bg-primary text-body-1 text-tx-default"
              onClick={handleOnClick}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </ModalDim>
  );
}
