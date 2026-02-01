import { ToolVoteCount } from './types';

export const TOOL_CONTENTS = [
  {
    title: '우리팀의\n커뮤니케이션 툴을 선택해주세요.',
    description: '복수선택이 가능해요.',
    tools: [
      {
        id: 'discord',
        name: 'Discord',
        description: '우리만의 특별한 커뮤니티 공간',
      },
      {
        id: 'zoom',
        name: 'Zoom',
        description: '화상회의의 표준',
      },
      {
        id: 'slack',
        name: 'Slack',
        description: '업무와 대화를 한곳에서',
      },
      {
        id: 'google-meet',
        name: 'Google Meet',
        description: '설치 없이 즐기는 고화질 회의',
      },
      {
        id: 'microsoft-teams',
        name: 'Microsoft Teams',
        description: '문서 공유와 회의를 동시에',
      },
      {
        id: 'kakao-talk',
        name: 'kakaoTalk',
        description: '일상을 공유하는 가장 쉬운 방법',
      },
    ],
  },
  {
    title: '우리팀의\n문서 관리툴을 선택해주세요.',
    description: '팀룸 대시보드에서 언제든지 수정 가능합니다.',
    tools: [
      {
        id: 'notion',
        name: 'Notion',
        description: '메모부터 프로젝트 관리까지',
      },
      {
        id: 'figma',
        name: 'Figma',
        description: '기획부터 프로토타입까지 한 번에',
      },
      {
        id: 'google-sheets',
        name: 'Google Sheets',
        description: '팀과 동시에 작업하는 스프레드시트',
      },
      {
        id: 'microsoft-word',
        name: 'Microsoft Word',
        description: '전문적인 문서 작성과 편집',
      },
      {
        id: 'microsoft-excel',
        name: 'Microsoft Excel',
        description: '수식과 차트로 스마트한 데이터 정리',
      },
      {
        id: 'google-docs',
        name: 'Google Docs',
        description: '언제 어디서나 실시간 문서 작성',
      },
    ],
  },
] as const;

// 툴 투표 현황 (총 8명 중에서)
export const TOOL_VOTE_COUNT: ToolVoteCount = {
  totalVotes: 8,
  communication: {
    title: '커뮤니케이션 툴의\n현재 투표 현황입니다.',
    description: '모든 팀원이 투표할 때까지 기다려주세요.',
    voteList: [
      { id: 'discord', name: 'Discord', voteCount: 5 },
      { id: 'zoom', name: 'Zoom', voteCount: 3 },
      { id: 'slack', name: 'Slack', voteCount: 4 },
      { id: 'google-meet', name: 'Google Meet', voteCount: 2 },
      { id: 'microsoft-teams', name: 'Microsoft Teams', voteCount: 1 },
      { id: 'kakao-talk', name: 'kakaoTalk', voteCount: 0 },
    ],
  },
  document: {
    title: '문서 관리 툴의\n현재 투표 현황입니다.',
    description: '모든 팀원이 투표할 때까지 기다려주세요.',
    voteList: [
      { id: 'notion', name: 'Notion', voteCount: 6 },
      { id: 'figma', name: 'Figma', voteCount: 5 },
      { id: 'google-sheets', name: 'Google Sheets', voteCount: 3 },
      { id: 'microsoft-word', name: 'Microsoft Word', voteCount: 2 },
      { id: 'microsoft-excel', name: 'Microsoft Excel', voteCount: 1 },
      { id: 'google-docs', name: 'Google Docs', voteCount: 0 },
    ],
  },
};
