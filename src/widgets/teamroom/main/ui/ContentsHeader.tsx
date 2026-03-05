interface BaseProps {
  text: string;
  hideRightButton?: boolean;
}

type RuleProps = {
  id: 'rule';
  editMode: boolean;
  onClickRightButton: () => void;
};

type ToolProps = {
  id: 'tool';
  editMode?: never;
  onClickRightButton: () => void;
};

type TimeSelectProps = {
  id: 'timepick';
  editMode?: never;
  onClickRightButton?: never;
};

type Props = BaseProps & (RuleProps | ToolProps | TimeSelectProps);

export default function ContentsHeader({
  text,
  id,
  editMode,
  hideRightButton,
  onClickRightButton,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          className="h-6 w-6"
          src={`/assets/icons/dashboard/${id}.svg`}
          alt={`${id} Icon`}
          draggable={false}
        />
        <p className="text-body-2 text-tx-default">{text}</p>
      </div>
      {id === 'rule' &&
        !hideRightButton &&
        onClickRightButton &&
        editMode !== undefined && (
          <button onClick={onClickRightButton} className="p-2.5">
            {editMode ? (
              <img
                className="h-5 w-5"
                src="/assets/icons/check-active.svg"
                alt="Check Active Icon"
                draggable={false}
              />
            ) : (
              <img
                className="h-5 w-5"
                src="/assets/icons/dashboard/edit.svg"
                alt="Edit Icon"
                draggable={false}
              />
            )}
          </button>
        )}
      {id === 'tool' && !hideRightButton && onClickRightButton && (
        <button
          onClick={onClickRightButton}
          className="p-1 text-body-7 text-[#9BA0B9]"
        >
          요청하기
        </button>
      )}
    </div>
  );
}
