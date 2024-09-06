import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

import {
  exerciseApi,
  useGetExerciseDetailQuery,
  useUpdateExerciseMutation,
} from '#/api/services/exerciseApi';

import ContentBox from '#/components/common/ContentBox';
import ExerciseForm, {
  ExercisePostFormInput,
} from '#/components/exercise/post/ExerciseForm';

import { AppDispatch } from '#/stores/store';
import { EXERCISE_FORCE_TYPE, EXERCISE_TYPE } from '#/api/types';

import MESSAGE from '#/constants/message';
import FORMAT from '#/constants/format';
import ROUTE from '#/constants/route';

const ExerciseUpdatePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data } = useGetExerciseDetailQuery(id as string);
  const [updateExercise] = useUpdateExerciseMutation();

  const [defaultValues, setDefaultValues] = useState<ExercisePostFormInput>();

  const handleSubmit = async (
    data: ExercisePostFormInput | ExercisePostFormInput[],
  ) => {
    if (!Array.isArray(data)) {
      const { duration, force, isPT, type } = data;

      try {
        await updateExercise({
          id: id ?? '',
          payload: {
            duration,
            force: force as EXERCISE_FORCE_TYPE,
            isPT,
            type: type as EXERCISE_TYPE,
          },
        }).unwrap();

        dispatch(
          exerciseApi.util.invalidateTags([
            { type: 'Exercise', id: 'LIST' },
            { type: 'Exercise', id: 'DETAIL' },
          ]),
        );
        alert(MESSAGE.COMPLETED('수정'));
        navigate(ROUTE.EXERCISE.DEFAULT);
      } catch (error) {
        console.log('Error updating exercise:', error);
      }
    }
  };

  useEffect(() => {
    if (data) {
      setDefaultValues({
        date: dayjs(data.date).format(FORMAT.DATE),
        isPT: data.isPT,
        duration: data.detail[0].duration,
        type: data.detail[0].type,
        force: data.detail[0].force,
      });
    }
  }, [data]);

  return (
    <div className="flex justify-center">
      <ContentBox className="rounded-2xl">
        {defaultValues && (
          <ExerciseForm
            submitButtonTitle="수정"
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
