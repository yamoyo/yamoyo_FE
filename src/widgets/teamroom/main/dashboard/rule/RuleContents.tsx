import { useEffect, useState } from 'react';
import RuleItem from './ruleItem';

const RULES = [
  {
    id: 1,
    content: '회의 불참은 최소 하루 전 공유하기',
  },
  {
    id: 2,
    content: '작업 중 문제가 생기면 바로 공유',
  },
  {
    id: 3,
    content: '읽고 씹지 않기',
  },
];

export default function Rules() {
  const [editMode, setEditMode] = useState(false);
  const [rules, setRules] = useState<{ id: number; content: string }[]>([]);
  const [editingRuleId, setEditingRuleId] = useState<number | null>(null);

  const addRule = () => {
    const newId = Date.now();
    setRules((prev) => [...prev, { id: newId, content: '새로운 규칙' }]);
    setEditingRuleId(newId);
  };

  const onClickIcon = (ruleId: number) => {
    if (editMode) {
      if (editingRuleId === ruleId) {
        // 규칙 삭제
        setRules((prev) => prev.filter((r) => r.id !== ruleId));
        return;
      }
      // 편집 모드로 전환
      setEditingRuleId(ruleId);
    }
  };

  /** input에서 포커스가 벗어날 때 호출 */
  const onChangeText = (ruleId: number, nextText: string) => {
    setEditingRuleId(null);
    setRules((prev) =>
      prev.map((r) => (r.id === ruleId ? { ...r, content: nextText } : r)),
    );
  };

  useEffect(() => {
    // TODO: 서버에서 팀 규칙 불러오기
    setRules(RULES);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            className="h-6 w-6"
            src="/assets/icons/dashboard/rule.svg"
            alt="Rule Icon"
            draggable={false}
          />
          <p className="text-body-2 text-tx-default">팀 규칙</p>
        </div>
        <button onClick={() => setEditMode((prev) => !prev)} className="p-2.5">
          {editMode ? (
            <img
              className="h-5 w-5"
              src="/assets/icons/check-active.svg"
              alt="Check Active Icon"
              draggable={false}
            />
          ) : (
            <img
              className="h-5 w-5"
              src="/assets/icons/dashboard/edit.svg"
              alt="Edit Icon"
              draggable={false}
            />
          )}
        </button>
      </div>
      <div className="space-y-2">
        {rules.map((rule, i) => (
          <RuleItem
            key={rule.id}
            text={`${editingRuleId === rule.id ? '' : i + 1 + '. '}${rule.content}`}
            editMode={editMode && editingRuleId === rule.id}
            isHiddenIcon={!editMode}
            onClickIcon={() => onClickIcon(rule.id)}
            onChangeText={(nextText) => onChangeText(rule.id, nextText)}
            icon={
              editMode && editingRuleId === rule.id ? (
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
        ))}
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
      </div>
    </div>
  );
}
