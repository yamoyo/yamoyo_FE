export const TOOL_CONTENTS = [
  {
    categoryId: 1,
    key: 'communication',
    title: '우리팀의\n커뮤니케이션 툴을 선택해주세요.',
    description: '복수선택이 가능해요.',
    tools: [
      {
        id: 'discord',
        toolId: 1,
        name: 'Discord',
        description: '우리만의 특별한 커뮤니티 공간',
      },
      { id: 'zoom', toolId: 2, name: 'Zoom', description: '화상회의의 표준' },
      {
        id: 'slack',
        toolId: 3,
        name: 'Slack',
        description: '업무와 대화를 한곳에서',
      },
      {
        id: 'google-meet',
        toolId: 4,
        name: 'Google Meet',
        description: '설치 없이 즐기는 고화질 회의',
      },
      {
        id: 'microsoft-teams',
        toolId: 5,
        name: 'Microsoft Teams',
        description: '문서 공유와 회의를 동시에',
      },
      {
        id: 'kakao-talk',
        toolId: 6,
        name: 'kakaoTalk',
        description: '일상을 공유하는 가장 쉬운 방법',
      },
    ],
  },
  {
    categoryId: 2,
    key: 'document',
    title: '우리팀의\n문서 관리툴을 선택해주세요.',
    description: '팀룸 대시보드에서 언제든지 수정 가능합니다.',
    tools: [
      {
        id: 'notion',
        toolId: 10,
        name: 'Notion',
        description: '메모부터 프로젝트 관리까지',
      },
      {
        id: 'figma',
        toolId: 11,
        name: 'Figma',
        description: '기획부터 프로토타입까지 한 번에',
      },
      {
        id: 'google-sheets',
        toolId: 12,
        name: 'Google Sheets',
        description: '팀과 동시에 작업하는 스프레드시트',
      },
      {
        id: 'microsoft-word',
        toolId: 13,
        name: 'Microsoft Word',
        description: '전문적인 문서 작성과 편집',
      },
      {
        id: 'microsoft-excel',
        toolId: 14,
        name: 'Microsoft Excel',
        description: '수식과 차트로 스마트한 데이터 정리',
      },
      {
        id: 'google-docs',
        toolId: 15,
        name: 'Google Docs',
        description: '언제 어디서나 실시간 문서 작성',
      },
    ],
  },
] as const;

export type ToolCategory = (typeof TOOL_CONTENTS)[number];
export type ToolItem = ToolCategory['tools'][number];
export type ToolId = ToolItem['id'];
