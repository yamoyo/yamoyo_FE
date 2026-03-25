import DashboardRuleItem from '@/entities/teamroom/rule/ui/DashboardItem';
import DashboardSectionHeader from '@/shared/ui/header/DashboardSection';

import { DashboardRuleSectionProps } from '../../model/DashboardRuleSectionProps';
import { useDashboardRuleSection } from '../../model/useDashboardRuleSection';

export default function DashboardRuleSection(props: DashboardRuleSectionProps) {
  const {
    isLeader,
    editMode,
    rules,
    editingRuleId,
    toggleEditMode,
    addRule,
    clickRuleAction,
    changeRuleText,
  } = useDashboardRuleSection(props);

  return (
    <div className="space-y-4">
      <DashboardSectionHeader
        id="rule"
        text="팀 규칙"
        editMode={editMode}
        hideRightButton={!isLeader}
        onClickRightButton={toggleEditMode}
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
            <DashboardRuleItem
              key={rule.teamRuleId}
              order={idx + 1}
              text={rule.content}
              editMode={isEditing}
              showActionButton={editMode}
              onClickAction={() => clickRuleAction(rule.teamRuleId)}
              onChangeText={(changedText) =>
                changeRuleText(rule.teamRuleId, changedText)
              }
            />
          );
        })}

        {isLeader && <DashboardRuleItem isAddButton onClickAction={addRule} />}
      </div>
    </div>
  );
}
