export default function ParticipantsSection() {
  return (
    <div>
      <label className="mb-2 flex items-center justify-between text-sm text-white">
        <span>참석자</span>
        <button type="button" className="text-xs text-purple-400">
          추가하기
        </button>
      </label>
      <div className="min-h-[60px] rounded-lg bg-bg-textfiled p-4">
        <p className="text-body-5 text-gray-500">참석자를 추가해주세요</p>
      </div>
    </div>
  );
}
