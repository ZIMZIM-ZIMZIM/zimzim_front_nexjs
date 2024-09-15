import { yupResolver } from '@hookform/resolvers/yup';
import { UseMutateFunction } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';

import Button from '#/components/common/Button';
import ControllerInput from '#/components/common/input/ControllerInput';

import { PRIMARY_BUTTON } from '#/constants/style';

export interface WaterRegisterFormInput {
  date: string;
  amount: string;
}

interface WaterFormProps {
  defaultValue: WaterRegisterFormInput;
  mutate: UseMutateFunction<unknown, unknown, WaterRegisterFormInput, unknown>;
  id?: string;
}

const WaterRegisterForm = ({ defaultValue, mutate }: WaterFormProps) => {
  const { t } = useTranslation();

  const schema: yup.ObjectSchema<WaterRegisterFormInput> = yup.object().shape({
    date: yup.string().required(t('WATER.FORM.DATE.REQUIRED')),
    amount: yup.string().required(t('WATER.FORM.AMOUNT.REQUIRED')),
  });

  const {
    watch,
    trigger,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValue,
  });

  const onSubmit = (data: WaterRegisterFormInput) => mutate(data);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      trigger(name);
    });

    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  useEffect(() => {
    reset(defaultValue);
  }, [defaultValue, reset]);

  return (
    <div className="pt-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <ControllerInput<WaterRegisterFormInput>
            name="date"
            control={control}
            value={defaultValue.date ?? ''}
            label={t('WATER.FORM.DATE.LABEL')}
            type="date"
            placeholder={t('WATER.FORM.DATE.REQUIRED')}
            inputClassName={twMerge(`w-52`)}
            max={defaultValue.date}
            error={errors?.date}
          />
          <ControllerInput<WaterRegisterFormInput>
            value={defaultValue.amount}
            name="amount"
            control={control}
            label={t('WATER.FORM.AMOUNT.LABEL')}
            type="number"
            placeholder={t('WATER.FORM.AMOUNT.REQUIRED')}
            inputClassName="w-52"
            error={errors?.amount}
            min={1}
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" className={twMerge(PRIMARY_BUTTON, 'w-32')}>
            {t('WATER.REGISTER')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WaterRegisterForm;
