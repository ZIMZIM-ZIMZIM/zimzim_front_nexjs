'use client';

import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ContentBox from '#components/common/ContentBox';
import LoginForm from '#components/login/LoginForm';
import SignUpLink from '#components/login/SignUpLink';
import SocialLoginButton from '#components/login/SocialLoginButton';

const LoginPage = () => {
  const { t } = useTranslation('common');

  return (
    <section className="flex flex-row h-full justify-between px-24 max-xl:justify-center max-md:px-0">
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

      <ContentBox
        contentTitle="login"
        className=" rounded-t-2xl w-5/12 flex flex-col gap-8 max-xl:w-2/3 max-lg:w-11/12 max-md:w-full"
      >
        <h1 className="text-center text-2xl">{t('AUTH.LOGIN.TITLE')}</h1>

        <div className="flex flex-col gap-8">
          <LoginForm />
          <hr />
          <SocialLoginButton />
        </div>

        <div className="text-center">
          <SignUpLink />
        </div>
      </ContentBox>
    </section>
  );
};

export default LoginPage;
