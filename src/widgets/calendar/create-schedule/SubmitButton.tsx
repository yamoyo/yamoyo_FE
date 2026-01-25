interface SubmitButtonProps {
  label?: string;
}

export default function SubmitButton({
  label = '회의 설정',
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="w-full rounded-lg bg-bg-primary py-3 font-medium text-white transition-colors hover:bg-purple-700"
    >
      {label}
    </button>
  );
}
