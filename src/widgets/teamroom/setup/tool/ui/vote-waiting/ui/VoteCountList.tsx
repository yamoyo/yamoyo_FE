import { ToolVoteDetailCount } from '@/entities/teamroom/setup/tool/model/types';
import BottomButton from '@/shared/ui/button/BottomButton';
import { useNavigate } from 'react-router-dom';

type Props = ToolVoteDetailCount & {
  totalVotes: number;
  openVoteStatusModal: () => void;
};

export default function VoteCountList({
  title,
  description,
  voteList,
  totalVotes,
  openVoteStatusModal,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="mt-[34px] px-6 pb-12">
      <h1 className="mb-1 whitespace-pre-line text-title-2 text-tx-default">
        {title}
      </h1>
      <p className="mb-6 text-body-5 text-tx-default">{description}</p>
      <div className="mb-16 space-y-8">
        {voteList.map((item) => {
          const ratio = Math.min(1, item.voteCount / totalVotes);
          const percent = `${Math.round(ratio * 100)}%`;

          return (
            <div key={item.id} className="flex flex-col items-start gap-[2px]">
              {/* Top row */}
              <div className="flex h-10 w-full items-center justify-between">
                <div className="flex h-full items-start gap-4">
                  <img
                    src={`/assets/tool/${item.id}.png`}
                    alt={item.name}
                    className="h-[26px] w-[26px]"
                  />

                  <p className="shrink-0 text-[15px] font-bold leading-5 text-white">
                    {item.name}
                  </p>
                </div>

                <div className="flex h-full w-[19px] flex-col items-end justify-end">
                  <p className="w-full text-right text-[12px] leading-[18px] text-white">
                    {item.voteCount}명
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full">
                <div className="w-full rounded-full bg-[#3E4463]">
                  <div
                    className="h-[5px] rounded-full bg-[#FDDA08]"
                    style={{ width: percent }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mb-9 flex w-full justify-end">
        <button
          className="text-body-4 text-tx-default_4"
          onClick={openVoteStatusModal}
        >
          투표 현황 &gt;
        </button>
      </div>
      <BottomButton text="팀룸으로 이동" onClick={() => navigate('..')} />
    </div>
  );
}
