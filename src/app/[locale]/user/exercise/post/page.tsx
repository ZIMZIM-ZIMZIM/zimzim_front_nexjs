'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ExerciseForm, {
  ExercisePostFormInput,
} from '#/components/exercise/ExerciseForm';

import { useCustomMutation } from '#/hooks/useCustomMutation';
import { useCustomQuery } from '#/hooks/useCustomQuery';

import {
  EXERCISE_FORCE_TYPE,
  EXERCISE_TYPE,
  PostExercisePayload,
  User,
} from '#/api/types';

import API_ENDPOINT from '#/constants/api';
import MESSAGE from '#/constants/message';
import QUERY_KEYS from '#/constants/queryKey';
import ROUTE from '#/constants/route';

import { getKoreaDate } from '#/util';
import ContentBox from '#components/common/ContentBox';

const ExercisePostPage = () => {
  const { i18n, t } = useTranslation();

  const today = getKoreaDate();

  const router = useRouter();

  const { data: userInfo } = useCustomQuery<User>(
    QUERY_KEYS.USER,
    API_ENDPOINT.USER.INFO,
  );
  const { mutateAsync } = useCustomMutation<
    { token: string },
    Error,
    PostExercisePayload
  >(API_ENDPOINT.EXERCISE.EXERCISE, 'post', {
    onSuccess: () => {
      alert(MESSAGE.COMPLETED('등록이'));
      router.push(`/${i18n.language}${ROUTE.MAIN_PAGE}`);
    },
  });

  const createExercisePayload = (exercise: ExercisePostFormInput) => ({
    userId: userInfo?.id ?? '',
    totalDuration: exercise.duration,
    date: exercise.date,
    isPT: exercise.isPT,
    detail: [
      {
        type: exercise.type as EXERCISE_TYPE,
        duration: exercise.duration,
        force: exercise.force as EXERCISE_FORCE_TYPE,
      },
    ],
  });

  const handleSameDateExercises = (exerciseList: ExercisePostFormInput[]) => {
    const totalDuration = exerciseList.reduce(
      (acc: number, cur: ExercisePostFormInput) => acc + Number(cur.duration),
      0,
    );
    const detail = exerciseList.map((exercise: ExercisePostFormInput) => ({
      type: exercise.type as EXERCISE_TYPE,
      duration: exercise.duration,
      force: exercise.force as EXERCISE_FORCE_TYPE,
    }));

    return {
      date: exerciseList[0].date,
      totalDuration: totalDuration.toString(),
      userId: userInfo?.id ?? '',
      detail,
      isPT: exerciseList[0].isPT,
    };
  };

  const handleSubmit = async (
    exerciseList: ExercisePostFormInput[] | ExercisePostFormInput,
  ) => {
    if (Array.isArray(exerciseList)) {
      try {
        const promises: Promise<void>[] = [];

        const isSameDate =
          exerciseList.length > 1 &&
          exerciseList[0].date === exerciseList[1].date;

        if (isSameDate) {
          const payload = handleSameDateExercises(exerciseList);
          promises.push(mutateAsync(payload).then(() => {})); // 반환 값을 무시
        } else {
          exerciseList.forEach((exercise) => {
            promises.push(
              mutateAsync(createExercisePayload(exercise)).then(() => {}),
            );
          });
        }

        await Promise.allSettled(promises);
      } catch (error) {
        console.log(error, 'error');
      }
    }
  };

  return (
    <div className="flex justify-center">
      <ContentBox
        className="rounded-2xl gap-8 w-5/12"
        contentTitle="exercise post"
      >
        <ExerciseForm
          submitButtonTitle={t('EXERCISE.POST.BUTTON')}
          isUseBadge
          submitFunction={(
            exerciseList: ExercisePostFormInput | ExercisePostFormInput[],
          ) => handleSubmit(exerciseList)}
          defaultValues={{
            date: today,
            duration: '',
            type: undefined,
            force: undefined,
            isPT: 'Y',
          }}
        />
      </ContentBox>
    </div>
  );
};

export default ExercisePostPage;
