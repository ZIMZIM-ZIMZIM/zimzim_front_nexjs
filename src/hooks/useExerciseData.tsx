import { useEffect, useState } from 'react';

import { useCustomQuery } from '#hooks/useCustomQuery';

import { Exercise } from '#/api/types';
import API_ENDPOINT from '#/constants/api';

export type FlattenedExercise = Pick<Exercise, 'date' | 'isPT'> &
  Pick<Exercise['detail'][number], 'type' | 'duration' | 'force' | '_id'>;

const useExerciseData = (page: number) => {
  const { data: userInfo } = useCustomQuery(['user'], API_ENDPOINT.USER.INFO);
  const { data: exerciseData } = useCustomQuery(
    ['exercise'],
    `${API_ENDPOINT.EXERCISE.LIST}?userId=${userInfo?.id}&page=${page}&limit=10`,
  );
  const [flattenedData, setFlattenData] = useState<FlattenedExercise[] | []>(
    [],
  );

  useEffect(() => {
    if (exerciseData?.items) {
      setFlattenData(
        exerciseData?.items.flatMap((exercise) =>
          exercise.detail.map((element) => ({
            _id: element._id,
            date: exercise.date,
            type: element.type,
            force: element.force,
            duration: element.duration,
            isPT: exercise.isPT,
          })),
        ),
      );
    }
  }, [exerciseData]);

  return { flattenedData, exerciseData, userInfo };
};

export default useExerciseData;
