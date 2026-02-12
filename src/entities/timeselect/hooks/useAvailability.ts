import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  availabilityDataToGrid,
  useAvailabilityStore,
} from '@/entities/everytime/model/availability-store';
import { useAvailabilityDefault } from '@/entities/timeselect/hooks/useAvailabilityDefault';
import { useSubmitAvailability } from '@/entities/timeselect/hooks/useSubmitAvailability';
import { useTimeSelect } from '@/entities/timeselect/hooks/useTimeSelect';

const createInitialAvailability = () =>
  Array.from({ length: 7 }, () => Array.from({ length: 32 }, () => false));

export function useAvailability() {
  const { id } = useParams();
  const navigate = useNavigate();

  const importedAvailability = useAvailabilityStore(
    (state) => state.importedAvailability,
  );
  const clearImportedAvailability = useAvailabilityStore(
    (state) => state.clearImportedAvailability,
  );

  const { mutate: submitAvailability, isPending } = useSubmitAvailability();
  const { data: timeSelectData } = useTimeSelect(Number(id));
  const { data: defaultAvailability } = useAvailabilityDefault();

  const [isEditMode, setIsEditMode] = useState(false);
  const [availability, setAvailability] = useState<boolean[][]>(
    createInitialAvailability,
  );
  const defaultAppliedRef = useRef(false);

  // 에브리타임에서 불러온 데이터가 있으면 적용 (우선순위 높음)
  useEffect(() => {
    if (importedAvailability) {
      setAvailability(importedAvailability);
      clearImportedAvailability();
      defaultAppliedRef.current = true;
    }
  }, [importedAvailability, clearImportedAvailability]);

  // 에브리타임 데이터가 없고, 서버에 저장된 기본값이 있으면 적용
  useEffect(() => {
    if (defaultAppliedRef.current) return;
    if (!defaultAvailability?.availability) return;

    const grid = availabilityDataToGrid(defaultAvailability.availability);
    const hasAnySlot = grid.some((day) => day.some((slot) => slot));
    if (hasAnySlot) {
      setAvailability(grid);
      defaultAppliedRef.current = true;
    }
  }, [defaultAvailability]);

  // 상태에 따른 자동 네비게이션
  useEffect(() => {
    if (!timeSelectData) return;
    if (timeSelectData.status === 'FINALIZED') {
      navigate(`/teamroom/${id}`, { replace: true });
      return;
    }

    const { availabilityStatus, preferredBlockStatus } =
      timeSelectData.myStatus;
    if (
      availabilityStatus === 'SUBMITTED' &&
      preferredBlockStatus === 'SUBMITTED'
    ) {
      navigate(`/teamroom/${id}/timeselect/loading`, { replace: true });
      return;
    }

    if (
      availabilityStatus === 'SUBMITTED' &&
      preferredBlockStatus === 'PENDING'
    ) {
      navigate(`/teamroom/${id}/timeselect/liketime`, { replace: true });
    }
  }, [timeSelectData, id, navigate]);

  const handleReset = () => {
    setAvailability(createInitialAvailability());
  };

  const handleNavigateEverytime = () => {
    navigate(`/teamroom/${id}/timeselect/everytime`);
  };

  const handleSubmit = () => {
    submitAvailability(availability);
  };

  const handleToggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const hasSelection = availability.some((day) => day.some((slot) => slot));

  return {
    isEditMode,
    availability,
    setAvailability,
    isPending,
    hasSelection,
    handleReset,
    handleNavigateEverytime,
    handleSubmit,
    handleToggleEditMode,
  };
}
