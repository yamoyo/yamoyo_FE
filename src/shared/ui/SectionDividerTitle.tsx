export default function SectionDividerTitle({ title }: { title: string }) {
  return (
    <div className="gap-1 text-body-6 text-white opacity-[0.56] flex-col-center">
      <hr className="h-px w-[60px] bg-white" />
      {title}
    </div>
  );
}
