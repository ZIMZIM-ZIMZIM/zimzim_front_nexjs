'use client';

import { useRouter } from 'next/navigation';
import React, { useRef, useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import Button from '#/components/common/Button';
import ErrorMessage from '#/components/common/ErrorMessage';
import Input from '#/components/common/input/Input';

import { useCustomMutation } from '#/hooks/useCustomMutation';

import API_ENDPOINT from '#/constants/api';
import MESSAGE from '#/constants/message';
import ROUTE from '#/constants/route';
import { PRIMARY_BUTTON } from '#/constants/style';

const LoginForm = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const { mutate } = useCustomMutation<
    { token: string },
    Error,
    { id: string; password: string }
  >(API_ENDPOINT.AUTH.LOGIN, 'post', {
    onSuccess: () => {
      if (i18n.language) {
        router.push(`/${i18n.language}${ROUTE.MAIN_PAGE}`);
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
      <fieldset className="flex flex-col gap-4">
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
        <div aria-live="polite">
          <ErrorMessage message={hasError ? MESSAGE.FORM.LOGIN.FAILURE : ''} />
        </div>
      </fieldset>
      <Button type="submit" className={twMerge(PRIMARY_BUTTON, 'h-14')}>
        {t('AUTH.LOGIN.BUTTON')}
      </Button>
    </form>
  );
};

export default LoginForm;
