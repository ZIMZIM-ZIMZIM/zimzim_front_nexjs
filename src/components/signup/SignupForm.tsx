'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import Input from '#/components/common/input/Input';

import { useCustomMutation } from '#/hooks/useCustomMutation';

import API_ENDPOINT from '#/constants/api';
import ROUTE from '#/constants/route';
import { PRIMARY_BUTTON } from '#/constants/style';

import Button from '#components/common/Button';

export type SignUpFormInput = {
  id: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
};

const SignupForm = () => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const { mutate } = useCustomMutation<
    { token: string },
    Error,
    { id: string; password: string; nickname: string }
  >(API_ENDPOINT.AUTH.SIGN_UP, 'post', {
    onSuccess: () => {
      router.push(`/${i18n.language}${ROUTE.MAIN_PAGE}`);
    },
    onError: () => {
      console.log('다시 한번 시도해 주세요');
    },
  });

  const schema = yup
    .object()
    .shape({
      id: yup
        .string()
        .matches(/^[A-Za-z0-9]+$/i, t('AUTH.SIGN_UP.FORM.ID.VALIDATION'))
        .required(t('AUTH.SIGN_UP.FORM.ID.REQUIRED')),
      nickname: yup
        .string()
        .max(10, t('AUTH.SIGN_UP.FORM.NICKNAME.MAX_LENGTH'))
        .matches(/^[A-Za-z0-9]+$/i, t('AUTH.SIGN_UP.FORM.NICKNAME.VALIDATION'))
        .required(t('AUTH.SIGN_UP.FORM.NICKNAME.REQUIRED')),
      password: yup
        .string()
        .required(t('AUTH.SIGN_UP.FORM.PASSWORD.REQUIRED'))
        .min(8, t('AUTH.SIGN_UP.FORM.PASSWORD.MIN_LENGTH')),
      passwordConfirm: yup
        .string()
        .oneOf(
          [yup.ref('password')],
          t('AUTH.SIGN_UP.FORM.PASSWORD_CONFIRM.NOT_MATCH'),
        )
        .required(t('AUTH.SIGN_UP.FORM.PASSWORD_CONFIRM.REQUIRED')),
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<SignUpFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === 'password') {
        trigger('passwordConfirm');
      }
      trigger(name);
    });

    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const onSubmit = (data: SignUpFormInput) => mutate(data);

  return (
    <form className="flex flex-col gap-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Input
          label="ID"
          placeholder={t('AUTH.SIGN_UP.FORM.ID.REQUIRED')}
          errorMessage={errors.id?.message}
          autoComplete="off"
          {...register('id')}
        />
        <Input
          label="Nickname"
          placeholder={t('AUTH.SIGN_UP.FORM.NICKNAME.REQUIRED')}
          errorMessage={errors.nickname?.message}
          autoComplete="off"
          {...register('nickname')}
        />
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder={t('AUTH.SIGN_UP.FORM.PASSWORD.REQUIRED')}
          errorMessage={errors.password?.message}
          autoComplete="off"
          {...register('password')}
        >
          <div
            className="absolute inset-y-4 right-4"
            role="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <Image
                width={16}
                height={16}
                src="/icon/eye-regular.svg"
                alt="eye"
              />
            ) : (
              <Image
                width={16}
                height={16}
                src="/icon/eye-slash-regular.svg"
                alt="eye"
              />
            )}
          </div>
        </Input>
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder={t('AUTH.SIGN_UP.FORM.PASSWORD_CONFIRM.REQUIRED')}
          errorMessage={errors.passwordConfirm?.message}
          autoComplete="off"
          {...register('passwordConfirm')}
        >
          <div
            className="absolute inset-y-4 right-4"
            role="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            aria-label={
              showConfirmPassword
                ? 'Hide password confirm'
                : 'Show password confirm'
            }
          >
            {showConfirmPassword ? (
              <Image
                width={16}
                height={16}
                src="/icon/eye-regular.svg"
                alt="eye"
                className="text-gray-dark"
              />
            ) : (
              <Image
                width={16}
                height={16}
                src="/icon/eye-slash-regular.svg"
                alt="eye"
              />
            )}
          </div>
        </Input>
      </div>
      <Button type="submit" className={PRIMARY_BUTTON}>
        {t('AUTH.SIGN_UP.BUTTON')}
      </Button>
    </form>
  );
};

export default SignupForm;
