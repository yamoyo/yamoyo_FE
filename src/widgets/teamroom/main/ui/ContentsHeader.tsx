interface BaseProps {
  text: string;
  id: 'rule' | 'tool' | 'meeting';
}

type EditProps =
  | {
      editMode: boolean;
      onClickIcon: () => void;
    }
  | {
      editMode?: never;
      onClickIcon?: never;
    };

type Props = BaseProps & EditProps;

export default function ContentsHeader({
  text,
  id,
  editMode,
  onClickIcon,
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
      {onClickIcon && editMode !== undefined && (
        <button onClick={onClickIcon} className="p-2.5">
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
    </div>
  );
}
