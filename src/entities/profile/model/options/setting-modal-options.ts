import { ChoiceModalOptions } from 'src/shared/ui/modal/model/types';

export const SETTINGS_MODAL_OPTIONS: {
  label: string;
  modalOptions: Omit<ChoiceModalOptions, 'onClickLeftBtn' | 'onClickRightBtn'>;
}[] = [
  {
    label: '로그아웃',
    modalOptions: {
      title: '로그아웃 전에 확인해주세요.',
      description:
        '다음 로그인 시, 가입했던 소셜 계정으로\n야모요에 로그인하실 수 있습니다.',
      leftLabel: '취소',
      rightLabel: '로그아웃',
      rightBtnClassName: 'bg-bg-primary',
    },
  },
  {
    label: '회원탈퇴',
    modalOptions: {
      title: '정말로 탈퇴하시겠습니까?',
      description:
        '탈퇴시 계정 및 이용 기록은 모두 삭제되며,\n삭제된 데이터는 복구가 불가능합니다.\n정말로 탈퇴하시겠습니까?',
      leftLabel: '취소',
      rightLabel: '탈퇴하기',
    },
  },
];
