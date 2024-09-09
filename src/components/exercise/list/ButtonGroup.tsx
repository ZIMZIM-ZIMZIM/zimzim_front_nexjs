'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { useCustomMutation } from '#/hooks/useCustomMutation';
import { useCustomQuery } from '#/hooks/useCustomQuery';

import {
  DeleteExerciseDetailPayload,
  Exercise,
  ExerciseDetail,
  ExerciseList,
  User,
} from '#/api/types';

import API_ENDPOINT from '#/constants/api';
import QUERY_KEYS from '#/constants/queryKey';
import ROUTE from '#/constants/route';
import { ACTION_BUTTON } from '#/constants/style';

import Button from '#components/common/Button';

interface ButtonGroupProps {
  checkedExercise: string[];
  page: number;
}

const ButtonGroup = ({ checkedExercise, page }: ButtonGroupProps) => {
  const { t, i18n } = useTranslation('common');
  const queryClient = useQueryClient();
  const isDeleteDisabled = checkedExercise.length === 0;

  const router = useRouter();

  const { data: userInfo } = useCustomQuery<User>(
    QUERY_KEYS.USER,
    API_ENDPOINT.USER.INFO,
  );
  const { data: exerciseData } = useCustomQuery<ExerciseList>(
    ['exercise'],
    `${API_ENDPOINT.EXERCISE.LIST}?id=${userInfo?.id}&page=${page}&limit=10`,
  );

  const { mutate } = useCustomMutation<
    { token: string },
    Error,
    {
      exerciseDetails: DeleteExerciseDetailPayload[];
    }
  >(API_ENDPOINT.EXERCISE.DETAILS, 'post', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EXERCISE.LIST() });
    },
  });

  const handleDeleteExercise = async () => {
    if (checkedExercise.length && exerciseData && exerciseData?.items.length) {
      const temp = checkedExercise.flatMap((exercise) =>
        exerciseData.items.filter((item: Exercise) =>
          item.detail.find((ele: ExerciseDetail) => ele._id === exercise),
        ),
      );

      const ids = Array.from(new Set(temp.map((ele) => ele?._id)));

      const payload = ids.map((exerciseId) => {
        const exercise = temp.find((exercise) => exercise._id === exerciseId);

        const detailIds = exercise?.detail
          .filter((detail: ExerciseDetail) =>
            checkedExercise.includes(detail._id ?? ''),
          )
          .map((detail: ExerciseDetail) => detail._id)
          .filter((id): id is string => !!id);

        return {
          exerciseId,
          detailIds: detailIds ?? [],
        };
      });

      mutate({ exerciseDetails: payload });
    }
  };

  return (
    <section className="flex flex-row justify-end gap-4">
      <Button
        className={twMerge(
          ACTION_BUTTON,
          `bg-red-500 
          ${isDeleteDisabled && 'cursor-not-allowed'}`,
        )}
        disabled={isDeleteDisabled}
        onClick={handleDeleteExercise}
      >
        {t('EXERCISE.LIST.BUTTON.DELETE')}
      </Button>
      <Button
        className={twMerge(ACTION_BUTTON, 'bg-primary')}
        onClick={() => router.push(`/${i18n.language}${ROUTE.EXERCISE.POST}`)}
      >
        {t('EXERCISE.LIST.BUTTON.REGISTER')}
      </Button>
    </section>
  );
};

export default ButtonGroup;
