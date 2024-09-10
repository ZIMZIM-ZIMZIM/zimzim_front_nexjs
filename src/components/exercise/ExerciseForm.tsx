'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';

import Button from '#/components/common/Button';
import ControllerSelectBox from '#/components/common/dropDown/ControllerSelectBox';
import ControllerInput from '#/components/common/input/ControllerInput';
import RadioInput from '#/components/common/input/RadioInput';
import Badge from '#/components/exercise/post/Badge';

import { EXERCISE_FORCE_TYPE, EXERCISE_TYPE } from '#/api/types';

import MESSAGE from '#/constants/message';
import {
  EXERCISE_FORCE_OPTION,
  EXERCISE_TYPE_OPTION,
} from '#/constants/option';
import { PRIMARY_BUTTON } from '#/constants/style';

export type ExercisePostFormInput = {
  _id?: string | null;
  date: string;
  duration: string;
  type?: EXERCISE_TYPE;
  force?: EXERCISE_FORCE_TYPE;
  isPT: string;
};

interface ExerciseFormProps {
  submitButtonTitle: string;
  defaultValues?: ExercisePostFormInput;
  isUseBadge: boolean;
  submitFunction: (
    exerciseList: ExercisePostFormInput | ExercisePostFormInput[],
  ) => void;
}

const ExerciseForm = ({
  submitButtonTitle,
  defaultValues,
  isUseBadge,
  submitFunction,
}: ExerciseFormProps) => {
  const { t } = useTranslation();

  const [exerciseList, setExerciseList] = useState<ExercisePostFormInput[]>([]);

  const schema: yup.ObjectSchema<ExercisePostFormInput> = yup.object().shape({
    _id: yup.string().notRequired(),
    date: yup.string().required(t('EXERCISE.FORM.REQUIRED.DATE')),
    isPT: yup.string().required(t('EXERCISE.FORM.REQUIRED.PT')),
    duration: yup.string().required(t('EXERCISE.FORM.REQUIRED.DURATION')),
    type: yup
      .mixed<EXERCISE_TYPE>()
      .oneOf(Object.values(EXERCISE_TYPE))
      .required(t('EXERCISE.FORM.REQUIRED.TYPE')),
    force: yup
      .mixed<EXERCISE_FORCE_TYPE>()
      .oneOf(Object.values(EXERCISE_FORCE_TYPE))
      .required(t('EXERCISE.FORM.REQUIRED.FORCE')),
  });

  const {
    watch,
    trigger,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExercisePostFormInput>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const values = Object.values(value);

      const hasAllValue = values.every(
        (value) => value !== undefined && value !== '',
      );

      if (isUseBadge && hasAllValue && values.length === 5) {
        const newExerciseList = [
          ...exerciseList,
          value,
        ] as ExercisePostFormInput[];

        if (newExerciseList.length > 2) {
          alert(MESSAGE.FORM.MAX_LENGTH('2개'));
        } else {
          setExerciseList([...newExerciseList]);
          trigger();
        }
      }
      trigger(name);
    });

    return () => subscription.unsubscribe();
  }, [watch, trigger, reset, exerciseList]);

  const renderBadge = () =>
    exerciseList.map((exercise: ExercisePostFormInput) => {
      const info = Object.entries(exercise).map((element) =>
        element[0] === 'duration'
          ? (element = [
              element[0],
              element[1] + t('EXERCISE.DETAIL..CONTENT.UNIT'),
            ])
          : element,
      );
      const content = info?.reduce((acc, cur) => acc + ' ' + cur[1], '');

      return (
        <Badge content={content} key={content}>
          <Button
            className="px-1"
            onClick={() => {
              setExerciseList((prev: ExercisePostFormInput[]) =>
                prev.filter((element) => element !== exercise),
              );
            }}
          >
            <Image
              alt="delete icon"
              src="/icon/delete.svg"
              width={8}
              height={8}
            />
          </Button>
        </Badge>
      );
    });

  const onSubmit = (data: ExercisePostFormInput) =>
    submitFunction(
      isUseBadge ? (exerciseList as ExercisePostFormInput[]) : data,
    );

  return (
    <form
      onSubmit={handleSubmit((data: ExercisePostFormInput) => onSubmit(data))}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-8">
        <ControllerInput
          name="date"
          control={control}
          value={defaultValues?.date ?? ''}
          label={t('EXERCISE.FORM.LABEL.DATE')}
          type="date"
          placeholder={t('EXERCISE.FORM.PLACEHOLDER.DATE')}
          inputClassName={twMerge(
            `w-52 ${!isUseBadge && 'cursor-not-allowed'}`,
          )}
          max={defaultValues?.date}
          disabled={!isUseBadge}
          error={errors?.date}
        />
        <Controller
          name="isPT"
          control={control}
          render={({ field }) => (
            <div {...field} className="flex justify-between gap-1">
              <label className="text-neutral-500">
                {t('EXERCISE.FORM.LABEL.PT.')}
              </label>
              <div className="flex gap-4">
                <RadioInput
                  label={t('EXERCISE.FORM.LABEL.PT.YES')}
                  name="isPT"
                  value="Y"
                  checked={field.value === 'Y'}
                  onChange={field.onChange}
                />
                <RadioInput
                  label={t('EXERCISE.FORM.LABEL.PT.NO')}
                  name="isPT"
                  value="N"
                  checked={field.value === 'N'}
                  onChange={field.onChange}
                />
              </div>
            </div>
          )}
        />
        <ControllerSelectBox
          name="type"
          control={control}
          label={t('EXERCISE.FORM.LABEL.TYPE')}
          options={EXERCISE_TYPE_OPTION}
          selectId="type"
          selectName="type"
          placeHolder={t('EXERCISE.FORM.PLACEHOLDER.TYPE')}
          error={errors?.type}
          selectClassName="w-52"
        />
        <ControllerInput
          value=""
          name="duration"
          control={control}
          label={t('EXERCISE.FORM.LABEL.DURATION')}
          type="number"
          placeholder={t('EXERCISE.FORM.PLACEHOLDER.DURATION')}
          inputClassName="w-52"
          error={errors?.duration}
          min={1}
          max={60}
        />
        <ControllerSelectBox
          name="force"
          control={control}
          label={t('EXERCISE.FORM.LABEL.FORCE')}
          options={EXERCISE_FORCE_OPTION}
          selectId="force"
          selectName="force"
          selectClassName="w-52"
          placeHolder={t('EXERCISE.FORM.PLACEHOLDER.FORCE')}
          error={errors?.force}
        />
      </div>
      <div className="flex flex-row gap-2 h-6">
        {isUseBadge && renderBadge()}
      </div>

      <Button type="submit" className={PRIMARY_BUTTON}>
        {submitButtonTitle}
      </Button>
    </form>
  );
};

export default ExerciseForm;
