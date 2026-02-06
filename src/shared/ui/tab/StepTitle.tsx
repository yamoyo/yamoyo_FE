interface Props {
  step: number;
  totalSteps: number;
  title: string;
  description: string;
}

export default function StepTitle({
  step,
  totalSteps,
  title,
  description,
}: Props) {
  return (
    <div className="w-full space-y-1 text-tx-default">
      <div>
        <span className="text-body4">{step}</span>
        <span className="text-body-5 text-tx-default_3">/{totalSteps}</span>
      </div>
      <p className="whitespace-pre-line text-title-2">{title}</p>
      <p className="text-body-5">{description}</p>
    </div>
  );
}
