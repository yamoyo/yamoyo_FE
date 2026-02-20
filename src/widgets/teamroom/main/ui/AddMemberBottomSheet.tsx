import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useCreateInviteLink } from '@/entities/teamroom/hooks/useTeamRoom';
import { BASE_URL } from '@/shared/api/base/request';
import LinkCopyIcon from '@/shared/assets/icons/link-copy.svg?react';
import KaKaoLinkIcon from '@/shared/assets/login/kakao.svg?react';
import { copyText } from '@/shared/lib/copy/copyText';
import { KakaoSdkLoader } from '@/shared/lib/kakao/KakaoSdkLoader';
import BottomSheet from '@/shared/ui/BottomSheet';
import ModalDim from '@/shared/ui/modal/ModalDim';

interface AddMemberBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  teamRoomId: number;
  inviteLink?: string;
  zIndex?: number;
}

interface ShareButtonProps {
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  description?: string;
  onClick: () => void;
}

function ShareButton({
  icon,
  iconBgColor,
  title,
  description,
  onClick,
}: ShareButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-4 self-stretch rounded-full bg-bg-card"
    >
      <div
        className={`h-[60px] w-[60px] rounded-full p-[12.5px] flex-center ${iconBgColor}`}
      >
        {icon}
      </div>
      <div className="flex flex-col items-start gap-1">
        <span className="text-body-6 text-tx-default">{title}</span>
        {description && (
          <span className="text-body-9 text-tx-default_4">{description}</span>
        )}
      </div>
    </button>
  );
}

const QR_CODE_SIZE = 350;
const QR_BG_COLOR = '#D9D9D9';

export default function AddMemberBottomSheet({
  isOpen,
  onClose,
  teamRoomId,
  inviteLink,
  zIndex,
}: AddMemberBottomSheetProps) {
  const navigate = useNavigate();

  const [newInviteLink, setNewInviteLink] = useState<string | null>(
    inviteLink ?? null,
  );
  const [qr, setQr] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { mutateAsync } = useCreateInviteLink();

  const handleCopyLink = async () => {
    try {
      const textPromise =
        newInviteLink ??
        mutateAsync(teamRoomId).then((token) => {
          const url = `${window.location.origin}/invite?token=${token}`;
          setNewInviteLink(url);
          return url;
        });
      const ok = await copyText(textPromise);
      alert(
        ok ? '초대 링크가 복사되었습니다.' : '초대 링크 복사에 실패했습니다.',
      );
    } catch {
      alert('초대 링크 생성에 실패했습니다.');
    }
  };

  const handleKakaoShare = async () => {
    try {
      const inviteUrl = async () => {
        if (newInviteLink) {
          return newInviteLink;
        }
        const token = await mutateAsync(teamRoomId);
        return `${window.location.origin}/invite?token=${token}`;
      };

      window.Kakao?.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '팀룸에 초대되었습니다!',
          description: '얼른 접속하여 팀 빌딩을 함께 하세요!',
          imageUrl: BASE_URL + '/kakao-share-bg.png',
          link: {
            webUrl: await inviteUrl(),
            mobileWebUrl: await inviteUrl(),
          },
        },
        itemContent: {
          profileText: 'YAMOYO',
          profileImageUrl: BASE_URL + '/web-app-manifest-192x192.png',
        },
        buttonTitle: '팀룸 입장하기',
      });
    } catch (error) {
      alert(
        '카카오 공유하기 중 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.',
      );
      console.error(error);
    }
  };

  const handleQRShare = async () => {
    try {
      if (!newInviteLink) {
        const token = await mutateAsync(teamRoomId);
        const url = `${window.location.origin}/invite?token=${token}`;
        setNewInviteLink(url);
        setQr(
          await QRCode.toDataURL(url, {
            width: QR_CODE_SIZE,
            color: { light: QR_BG_COLOR },
          }),
        );
      } else {
        setQr(
          await QRCode.toDataURL(newInviteLink, {
            width: QR_CODE_SIZE,
            color: { light: QR_BG_COLOR },
          }),
        );
      }
      setSearchParams({ qr: 'true' });
    } catch (error) {
      alert(
        'QR 코드 생성 중 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.',
      );
      console.error(error);
    }
  };

  const closeQr = () => {
    setQr(null);
    navigate('.', { replace: true });
  };

  useEffect(() => {
    if (searchParams.get('qr') !== 'true') {
      setQr(null);
    }
  }, [searchParams]);

  return (
    <>
      <KakaoSdkLoader />
      <BottomSheet
        isOpen={isOpen}
        onClose={onClose}
        contentClassName="flex flex-col gap-[20px] px-6 pb-[30px]"
        zIndex={zIndex}
      >
        <div className="flex flex-col">
          <button
            onClick={onClose}
            className="h-10 w-10 self-end flex-center"
            aria-label="모달 닫기"
          >
            <img
              src="/assets/icons/cancel.svg"
              width={16}
              height={16}
              alt=""
              draggable="false"
            />
          </button>
          <h2 className="-mt-[10px] text-title-3 text-tx-default">
            함께하고 있는 팀 멤버를 초대하세요
          </h2>
        </div>

        <ShareButton
          icon={<img src="/assets/icons/qr-code.svg" />}
          iconBgColor="bg-bg-primary"
          title="QR코드"
          description="QR코드로 팀원을 초대하세요."
          onClick={handleQRShare}
        />

        <ShareButton
          icon={
            <LinkCopyIcon className="h-[26.67px] w-[26.67px] text-tx-default" />
          }
          iconBgColor="bg-bg-bt-disabled"
          title="링크복사"
          description="링크로 팀원과 공유하세요."
          onClick={handleCopyLink}
        />

        <ShareButton
          icon={<KaKaoLinkIcon className="h-[33.778px] w-[32px]" />}
          iconBgColor="bg-[#F7E115]"
          title="카카오톡으로 보내기"
          onClick={handleKakaoShare}
        />
      </BottomSheet>

      {qr && (
        <ModalDim
          isActiveCloseModal={false}
          onClickDim={closeQr}
          zIndex={zIndex ? zIndex + 1 : undefined}
        >
          <div className="max-w-[390px] gap-9 px-10 flex-col-center">
            <p className="text-title-1 text-tx-default">
              QR코드로 팀원을 초대하세요
            </p>
            <div className="w-full rounded-[20px] border-[7px] border-bg-primary bg-[#D9D9D9] p-4">
              <img src={qr} alt="QR Code" className="w-full" />
            </div>
          </div>
        </ModalDim>
      )}
    </>
  );
}
