'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import ContentBox from '#components/common/ContentBox';
import ExerciseForm, {
  ExercisePostFormInput,
} from '#components/exercise/post/ExerciseForm';

import { useCustomMutation } from '#/hooks/useCustomMutation';
import { useCustomQuery } from '#/hooks/useCustomQuery';

import { getKoreaDate } from '#/util';

import ROUTE from '#/constants/route';
import MESSAGE from '#/constants/message';
import API_ENDPOINT from '#/constants/api';

import { EXERCISE_FORCE_TYPE, EXERCISE_TYPE } from '#/api/types';

const ExercisePostPage = () => {
  const today = getKoreaDate();

  const router = useRouter();

  const { data: userInfo } = useCustomQuery(['user'], API_ENDPOINT.USER.INFO);
  const { mutate } = useCustomMutation<ExercisePostFormInput[]>(
    API_ENDPOINT.EXERCISE.EXERCISE,
    'post',
    {
      onSuccess: () => {
        alert(MESSAGE.COMPLETED('등록이'));
        router.push(ROUTE.MAIN_PAGE);
      },
    },
  );

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
        const promises = [];

        const isSameDate =
          exerciseList.length > 1 &&
          exerciseList[0].date === exerciseList[1].date;

        if (isSameDate) {
          const payload = handleSameDateExercises(exerciseList);
          promises.push(mutate(payload));
        } else {
          exerciseList.forEach((exercise) => {
            promises.push(mutate(createExercisePayload(exercise)));
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
      <ContentBox className="rounded-2xl gap-8 w-2/5">
        <ExerciseForm
          submitButtonTitle="등록"
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
