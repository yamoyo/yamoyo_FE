import { useOutletContext } from 'react-router-dom';

import { ProfileOnboardingContext } from '@/entities/profile/model/types/types';
import MajorGrid from '@/entities/profile/ui/MajorGrid';

export default function MajorStep() {
  const { form, updateForm } = useOutletContext<ProfileOnboardingContext>();
  return (
    <MajorGrid major={form.major} setMajor={(major) => updateForm({ major })} />
  );
}
