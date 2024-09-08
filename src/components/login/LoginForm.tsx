'use client';

import React, { useRef, useState, FormEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import Button from '#components/common/Button';
import Input from '#/components/common/input/Input';
import ErrorMessage from '#components/common/ErrorMessage';

import { useCustomMutation } from '#/hooks/useCustomMutation';

import ROUTE from '#/constants/route';
import MESSAGE from '#/constants/message';
import { PRIMARY_BUTTON } from '#/constants/style';
import API_ENDPOINT from '#/constants/api';

const LoginForm = () => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();

  const { mutate } = useCustomMutation<
    { token: string },
    Error,
    { id: string; password: string }
  >(API_ENDPOINT.AUTH.LOGIN, 'post', {
    onSuccess: () => {
      if (i18n.language) {
        router.push(ROUTE.MAIN_PAGE);
      }
    },
    onError: (error) => {
      console.error('Error during login:', error);

      setHasError(true);
    },
  });

  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [hasError, setHasError] = useState<boolean>(false);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    if (idRef.current?.value === '' || passwordRef.current?.value === '') {
      setHasError(true);
    } else {
      mutate({
        id: idRef.current?.value ?? '',
        password: passwordRef.current?.value ?? '',
      });
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleLogin}>
      <div className="flex flex-col gap-4">
        <Input
          label="ID"
          placeholder={t('AUTH.LOGIN.ID')}
          autoComplete="username"
          defaultValue=""
          name="id"
          ref={idRef}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder={t('AUTH.LOGIN.PASSWORD')}
          autoComplete="current-password"
          defaultValue=""
          ref={passwordRef}
        />
        {<ErrorMessage message={hasError ? MESSAGE.FORM.LOGIN.FAILURE : ''} />}
      </div>
      <Button type="submit" className={twMerge(PRIMARY_BUTTON, 'h-14')}>
        {t('AUTH.LOGIN.BUTTON')}
      </Button>
    </form>
  );
};

export default LoginForm;
