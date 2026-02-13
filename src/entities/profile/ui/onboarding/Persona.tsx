import { useOutletContext } from 'react-router-dom';

import { validateProfileItem } from '@/entities/profile/model/hook/useEditProfile';
import { ProfileOnboardingContext } from '@/entities/profile/model/types/types';
import UserProfile from '@/entities/profile/ui/UserProfile';
import TextField from '@/shared/ui/input/TextField';

export default function PersonaStep() {
  const { form, updateForm } = useOutletContext<ProfileOnboardingContext>();
  const selectedMBTI = form.persona.mbti;
  const errorMessage = validateProfileItem('MBTI', selectedMBTI || '');

  return (
    <div className="select-none space-y-[22px]" draggable="false">
      <h2 className="pb-[26px] text-title-2 text-tx-default_3">
        팀 합류 전, 나를 설정해볼까요?
      </h2>
      <UserProfile
        name={form.name}
        characterId={form.persona.profileImageId}
        onChangeCharacterId={(id) =>
          updateForm({ persona: { ...form.persona, profileImageId: id } })
        }
      />
      <div className="space-y-2">
        <h2 className="text-body-1 text-tx-default_2">나의 MBTI는?</h2>
        <TextField
          value={selectedMBTI || ''}
          onChange={(value) =>
            updateForm({ persona: { ...form.persona, mbti: value } })
          }
          placeholder="성향 코드를 알려주세요.(선택사항)"
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
