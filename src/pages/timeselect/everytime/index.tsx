import { useState } from 'react';

import { useParseEverytime } from '@/entities/everytime/hooks/useParseEverytime';
import BottomButton from '@/shared/ui/button/BottomButton';
import TopBar from '@/shared/ui/header/TopBar';
import TextField from '@/shared/ui/input/TextField';

export default function EveryTimePage() {
  const [url, setUrl] = useState('');
  const { mutate, isPending, isError } = useParseEverytime();

  const handleSubmit = () => {
    if (!url.trim()) return;
    mutate(url.trim());
  };

  return (
    <>
      <TopBar title="에브리타임 시간 등록" backIcon="arrow" />

      <div className="flex flex-col gap-10">
        <div className="mt-[30px] flex flex-col items-start gap-2 px-6">
          <p className="text-body-1 text-tx-default">
            URL 공유로 복사한 링크를 입력해주세요
          </p>
          <TextField
            value={url}
            onChange={setUrl}
            placeholder="링크 붙혀넣기"
          />
          {isError && (
            <p className="text-sm text-red-400">
              시간표를 불러오는데 실패했습니다. URL을 확인해주세요.
            </p>
          )}
        </div>

        <div className="mb-4 flex flex-col gap-[66px] px-6">
          <div className="flex flex-col items-start gap-5">
            <div className="text-body-4.1 text-tx-default_2">
              <p>* 시간표의 공개 범위를 잠시 동안 '전체 공개'로 바꿔주세요.</p>
              <p>
                (설정 아이콘 -{'>'} 공개 범위 변경 -{'>'} 전체 공개
              </p>
            </div>
            <img
              src="/assets/timeselect/guide-everytime.png"
              alt="에브리타임 가이드"
            />
          </div>
          <BottomButton
            text={isPending ? '불러오는 중...' : '등록'}
            onClick={handleSubmit}
            disabled={isPending || !url.trim()}
          />
        </div>
      </div>
    </>
  );
}
