'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { useCustomMutation } from '#/hooks/useCustomMutation';

import API_ENDPOINT from '#/constants/api';
import ROUTE from '#/constants/route';
import { HEADER_ICON_BUTTON } from '#/constants/style';

import Button from '#components/common/Button';

const UserHeader = () => {
  const { i18n } = useTranslation('common');
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useCustomMutation(API_ENDPOINT.AUTH.LOGOUT, 'post', {
    onSuccess: () => {
      localStorage.removeItem('ZimZimLogin');

      router.push(`/${i18n.language}${ROUTE.LOGIN}`);
      queryClient.invalidateQueries();
    },
  });

  const handleLogout = () => mutate();

  return (
    <header className="flex justify-between w-full h-16 bg-white items-center px-8">
      <div className="flex flex-row items-center w-32 justify-center">
        <Link href={`/${i18n.language}${ROUTE.MAIN_PAGE}`}>
          <Image src="/icon/icon.svg" width={48} height={48} alt="user icon" />
        </Link>
      </div>
      <div className="flex flex-row gap-4">
        <Button
          className={twMerge(HEADER_ICON_BUTTON, 'rounded-full')}
          aria-label="change langauge icon"
        >
          <Image
            src="/icon/translate.svg"
            width={20}
            height={20}
            alt="change langauge icon"
          />
        </Button>
        <Link href={ROUTE.USER}>
          <div className={twMerge(HEADER_ICON_BUTTON, 'rounded-full')}>
            <Image
              src="/icon/user.svg"
              width={20}
              height={20}
              alt="user icon"
            />
          </div>
        </Link>
        <Button
          className={twMerge(HEADER_ICON_BUTTON, 'rounded-md')}
          onClick={handleLogout}
          aria-label="log out"
        >
          <Image
            src="/icon/logout.svg"
            width={20}
            height={20}
            alt="logout icon"
          />
        </Button>
      </div>
    </header>
  );
};

export default UserHeader;
