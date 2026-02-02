import { useOutletContext } from 'react-router-dom';
import { ProfileOnboardingContext } from '../../model/types/types';
import TextField from '@/shared/ui/input/TextField';
import UserProfile from '@/entities/profile/ui/UserProfile';
import { validateProfileItem } from '../../model/hook/useEditProfile';

export default function PersonaStep() {
  const { form, updateForm } = useOutletContext<ProfileOnboardingContext>();
  const selectedMBTI = form.persona.mbti;
  const errorMessage = validateProfileItem('MBTI', selectedMBTI);

  return (
    <div className="space-y-[22px]">
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
