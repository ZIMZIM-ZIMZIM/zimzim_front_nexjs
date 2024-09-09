'use client';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ContentBox from '#/components/common/ContentBox';
import ExerciseForm, {
  ExercisePostFormInput,
} from '#/components/exercise/post/ExerciseForm';

import { useCustomMutation } from '#/hooks/useCustomMutation';
import { useCustomQuery } from '#/hooks/useCustomQuery';

import { Exercise, EXERCISE_FORCE_TYPE, EXERCISE_TYPE } from '#/api/types';

import API_ENDPOINT from '#/constants/api';
import FORMAT from '#/constants/format';
import MESSAGE from '#/constants/message';
import QUERY_KEYS from '#/constants/queryKey';
import ROUTE from '#/constants/route';

const ExerciseUpdatePage = () => {
  const { i18n, t } = useTranslation('common');
  const router = useRouter();

  const queryClient = useQueryClient();
  const pathname = usePathname();
  const id = pathname.split('update/')[1];

  const { data: exerciseDetail } = useCustomQuery<Exercise>(
    QUERY_KEYS.EXERCISE.DETAIL(id),
    API_ENDPOINT.EXERCISE.DETAIL(id),
  );

  const { mutate } = useCustomMutation<
    { token: string },
    Error,
    {
      duration: string;
      force: EXERCISE_FORCE_TYPE;
      type: EXERCISE_TYPE;
      isPT: string;
    }
  >(API_ENDPOINT.EXERCISE.DETAIL(id), 'post', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EXERCISE.LIST() });
    },
  });

  const [defaultValues, setDefaultValues] = useState<ExercisePostFormInput>();

  const handleSubmit = async (
    data: ExercisePostFormInput | ExercisePostFormInput[],
  ) => {
    if (!Array.isArray(data)) {
      const { duration, force, isPT, type } = data;

      try {
        mutate({
          duration: duration,
          force: force as EXERCISE_FORCE_TYPE,
          isPT,
          type: type as EXERCISE_TYPE,
        });

        alert(MESSAGE.COMPLETED('수정'));
        router.push(`/${i18n.language}${ROUTE.EXERCISE.DEFAULT}`);
      } catch (error) {
        console.log('Error updating exercise:', error);
      }
    }
  };

  useEffect(() => {
    if (exerciseDetail) {
      setDefaultValues({
        date: dayjs(exerciseDetail.date).format(FORMAT.DATE),
        isPT: exerciseDetail.isPT,
        duration: exerciseDetail.detail[0].duration,
        type: exerciseDetail.detail[0].type,
        force: exerciseDetail.detail[0].force,
      });
    }
  }, [exerciseDetail]);

  return (
    <div className="flex justify-center">
      <ContentBox className="rounded-2xl" contentTitle="exercise update">
        {defaultValues && (
          <ExerciseForm
            submitButtonTitle={t('EXERCISE.UPDATE.BUTTON')}
            defaultValues={defaultValues}
            isUseBadge={false}
            submitFunction={(
              data: ExercisePostFormInput | ExercisePostFormInput[],
            ) => handleSubmit(data)}
          />
        )}
      </ContentBox>
    </div>
  );
};

export default ExerciseUpdatePage;
