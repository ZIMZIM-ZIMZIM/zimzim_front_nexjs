'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import LoginForm from '#components/login/LoginForm';
import SocialLoginButton from '#components/login/SocialLoginButton';
import SignUpLink from '#components/login/SignUpLink';
import ContentBox from '#components/common/ContentBox';

const LoginPage = () => {
  const { t } = useTranslation('common');

  return (
    <main className="flex flex-row h-full justify-between px-24 max-xl:justify-center max-md:px-0">
      <div className="flex flex-row relative items-center max-xl:hidden">
        <div className="z-1 absolute pt-2.5 ">
          <Image
            src="/image/landing_exercise.svg"
            alt="babel"
            className="max-xl:w-2/3"
            width={480}
            height={357}
          />
        </div>

        <div className="bg-[#9FACDD] w-[426px] h-[426px] rounded-full" />
      </div>

      <ContentBox className="rounded-t-2xl w-5/12 flex flex-col gap-8 max-xl:w-2/3 max-lg:w-11/12 max-md:w-full">
        <p className="text-center text-2xl">{t('AUTH.LOGIN.TITLE')}</p>

        <div className="flex flex-col gap-8">
          <LoginForm />
          <hr />
          <SocialLoginButton />
        </div>

        <div className="text-center">
          <SignUpLink />
        </div>
      </ContentBox>
    </main>
  );
};

export default LoginPage;
