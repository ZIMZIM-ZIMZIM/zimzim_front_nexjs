'use client';

import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ROUTE from '#/constants/route';

const SignUpLink = () => {
  const { t } = useTranslation();

  return (
    <p className="flex space-x-2 justify-center">
      <span className="text-[#757575] text-sm self-end">
        {t('AUTH.LOGIN.NEW_USER')}
      </span>
      <Link
        href={ROUTE.SIGN_UP}
        className="font-semibold underline"
        aria-label={t('AUTH.LOGIN.SIGN_UP')}
      >
        {t('AUTH.LOGIN.SIGN_UP')}
      </Link>
    </p>
  );
};

export default SignUpLink;
