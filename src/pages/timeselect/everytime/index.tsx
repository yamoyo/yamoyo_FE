import { useState } from 'react';
import TopBar from '@/shared/ui/header/TopBar';
import TextField from '@/shared/ui/input/TextField';
import BottomButton from '@/shared/ui/button/BottomButton';

export default function EveryTimePage() {
  const [url, setUrl] = useState('');
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
          <BottomButton text="등록" onClick={() => {}} />
        </div>
      </div>
    </>
  );
}
