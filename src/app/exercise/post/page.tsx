import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ContentBox from '#components/common/ContentBox';
import ExerciseForm, {
  ExercisePostFormInput,
} from '#components/exercise/post/ExerciseForm';

import { AppDispatch } from '#/stores/store';

import { useGetUserInfoQuery } from '#/api/services/userApi';
import {
  exerciseApi,
  usePostExerciseMutation,
} from '#/api/services/exerciseApi';

import { getKoreaDate } from '#/util';

import ROUTE from '#/constants/route';
import MESSAGE from '#/constants/message';

import { EXERCISE_FORCE_TYPE, EXERCISE_TYPE } from '#/api/types';

const ExercisePostPage = () => {
  const today = getKoreaDate();

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const [postExercise] = usePostExerciseMutation();
  const { data: userInfo } = useGetUserInfoQuery();

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
          promises.push(postExercise(payload));
        } else {
          exerciseList.forEach((exercise) => {
            promises.push(postExercise(createExercisePayload(exercise)));
          });
        }

        await Promise.allSettled(promises);

        dispatch(
          exerciseApi.util.invalidateTags([
            { type: 'Exercise', id: 'LIST' },
            { type: 'Exercise', id: 'Exercise' },
          ]),
        );
        alert(MESSAGE.COMPLETED('등록이'));
        navigate(ROUTE.MAIN_PAGE);
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
