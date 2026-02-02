import { useOutletContext } from 'react-router-dom';

import { ProfileOnboardingContext } from '../../model/types/types';
import MajorGrid from '../MajorGrid';

export default function MajorStep() {
  const { form, updateForm } = useOutletContext<ProfileOnboardingContext>();
  return (
    <MajorGrid major={form.major} setMajor={(major) => updateForm({ major })} />
  );
}
