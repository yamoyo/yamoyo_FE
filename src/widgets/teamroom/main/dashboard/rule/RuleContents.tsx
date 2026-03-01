import { useEffect, useState } from 'react';

import { GetTeamRulesResponse } from '@/entities/rule/api/rule-dto';
import {
  useAddTeamRule,
  useDeleteTeamRule,
  useUpdateTeamRule,
} from '@/entities/rule/hooks/useRule';
import type { TeamMemberRole } from '@/entities/teamroom/api/teamroom-dto';
import RuleItem from '@/widgets/teamroom/main/dashboard/rule/RuleItem';
import ContentsHeader from '@/widgets/teamroom/main/ui/ContentsHeader';

type RuleUi = { teamRuleId: number; content: string; isTemp?: boolean };

interface Props {
  rulesData: GetTeamRulesResponse;
  teamRoomId: string | number;
  myRole: TeamMemberRole;
}

export default function Rules({ rulesData, teamRoomId, myRole }: Props) {
  const isLeader = myRole === 'LEADER';

  const { mutateAsync: addRuleMutateAsync } = useAddTeamRule(teamRoomId);
  const { mutateAsync: updateRuleMutateAsync } = useUpdateTeamRule(teamRoomId);
  const { mutateAsync: deleteRuleMutateAsync } = useDeleteTeamRule(teamRoomId);

  const [editMode, setEditMode] = useState(false);
  const [rules, setRules] = useState<RuleUi[]>([]);
  const [editingRuleId, setEditingRuleId] = useState<number | null>(null);

  // 서버 data → state 동기화
  useEffect(() => {
    setRules(
      rulesData.teamRules.map((r) => ({
        teamRuleId: r.teamRuleId,
        content: r.content,
      })),
    );
  }, [rulesData]);

  /** 규칙 추가 */
  const addRule = () => {
    if (!isLeader) {
      alert('팀장만 규칙을 추가할 수 있습니다.');
      return;
    }

    // 임시 id(서버 저장 전)
    const tempId = Date.now();

    setRules((prev) => [
      ...prev,
      { teamRuleId: tempId, content: '', isTemp: true },
    ]);
    setEditingRuleId(tempId);
    setEditMode(true);
  };

  /** 아이콘 클릭 (편집/삭제) */
  const onClickIcon = async (teamRuleId: number) => {
    if (!isLeader) {
      alert('팀장만 규칙을 수정/삭제할 수 있습니다.');
      return;
    }

    if (!editMode) return;

    // 편집 중인 규칙의 삭제 버튼 클릭 → 삭제 처리
    if (editingRuleId === teamRuleId) {
      const target = rules.find((r) => r.teamRuleId === teamRuleId);
      if (!target) return;

      // 임시 규칙이면 서버 호출 없이 로컬에서만 제거
      if (target.isTemp) {
        setRules((prev) => prev.filter((r) => r.teamRuleId !== teamRuleId));
        setEditingRuleId(null);
        return;
      }

      // 서버에 있는 규칙이면 delete 요청 호출
      try {
        await deleteRuleMutateAsync(teamRuleId);
      } finally {
        setEditingRuleId(null);
      }
      return;
    }

    // 다른 규칙을 편집하기 위해 선택
    setEditingRuleId(teamRuleId);
  };

  /**
   * 텍스트 확정 - input blur 동작
   * - 임시 규칙: add 요청
   * - 기존 규칙: update 요청
   */
  const onChangeText = async (teamRuleId: number, changedText: string) => {
    setEditingRuleId(null);
    if (!isLeader) return;

    const target = rules.find((r) => r.teamRuleId === teamRuleId);
    if (!target) return;

    const trimmedText = changedText.trim();

    // UI 즉시 반영
    setRules((prev) =>
      prev.map((r) =>
        r.teamRuleId === teamRuleId ? { ...r, content: trimmedText } : r,
      ),
    );

    try {
      // 임시 규칙 → 서버에 추가 요청
      if (target.isTemp) {
        if (!trimmedText) {
          // 텍스트 내용이 없으면 로컬에서 제거
          setRules((prev) => prev.filter((r) => r.teamRuleId !== teamRuleId));
          return;
        }

        // 서버 저장 요청
        await addRuleMutateAsync({ content: trimmedText });
        return;
      }

      if (!trimmedText) {
        // 빈 내용으로 수정 시 기존 규칙 삭제 처리
        await deleteRuleMutateAsync(teamRuleId);
        setRules((prev) => prev.filter((r) => r.teamRuleId !== teamRuleId));
        return;
      }

      // 기존 규칙 → 서버 수정
      await updateRuleMutateAsync({
        teamRuleId,
        body: { content: trimmedText },
      });
    } catch (error) {
      console.error('규칙 저장 중 오류가 발생했습니다.', error);
      alert('규칙 저장에 실패했습니다. 다시 시도해주세요.');
      return;
    }
  };

  return (
    <div className="space-y-4">
      <ContentsHeader
        id="rule"
        text="팀 규칙"
        editMode={editMode}
        hideRightButton={!isLeader}
        onClickRightButton={() => setEditMode((prev) => !prev)}
      />

      <div className="space-y-2">
        {rules.length === 0 && (
          <p className="whitespace-pre-line text-body-6 text-tx-default">
            {'설정된 규칙이 없습니다.\n팀장만 규칙을 추가할 수 있습니다.'}
          </p>
        )}

        {rules.map((rule, idx) => {
          const isEditing = editMode && editingRuleId === rule.teamRuleId;

          return (
            <RuleItem
              key={rule.teamRuleId}
              text={`${isEditing ? '' : `${idx + 1}. `}${rule.content}`}
              editMode={isEditing}
              isHiddenIcon={!editMode}
              onClickIcon={() => onClickIcon(rule.teamRuleId)}
              onChangeText={(changedText) =>
                onChangeText(rule.teamRuleId, changedText)
              }
              icon={
                editMode && editingRuleId === rule.teamRuleId ? (
                  <img
                    className="m-3 h-4 w-4"
                    src="/assets/icons/cancel.svg"
                    alt="delete Icon"
                    draggable={false}
                  />
                ) : (
                  <img
                    className="m-2.5 h-5 w-5"
                    src="/assets/icons/dashboard/edit.svg"
                    alt="Edit Icon"
                    draggable={false}
                  />
                )
              }
            />
          );
        })}

        {isLeader && (
          <RuleItem
            text="규칙 추가하기"
            className="text-tx-default_4"
            onClickIcon={addRule}
            icon={
              <img
                className="m-2 h-6 w-6"
                src="/assets/icons/dashboard/plus.svg"
                alt="Plus Icon"
                draggable={false}
              />
            }
          />
        )}
      </div>
    </div>
  );
}
