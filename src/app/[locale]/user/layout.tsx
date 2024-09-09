'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import Button from '#/components/common/Button';
import Header from '#/components/common/header/Header';
import Menu from '#/components/common/menu/Menu';

import { useCustomMutation } from '#/hooks/useCustomMutation';

import API_ENDPOINT from '#/constants/api';
import { LOCAL_STORAGE } from '#/constants/key';
import ROUTE from '#/constants/route';
import { HEADER_ICON_BUTTON } from '#/constants/style';

const UserLayout = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation('common');
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useCustomMutation(API_ENDPOINT.AUTH.LOGOUT, 'post', {
    onSuccess: () => {
      localStorage.removeItem(LOCAL_STORAGE.LOGIN);

      router.push(`/${i18n.language}${ROUTE.LOGIN}`);
      queryClient.invalidateQueries();
    },
  });

  const handleLogout = () => mutate();

  return (
    <main className="min-h-screen w-screen flex flex-col bg-secondary-light/50">
      <Header className="bg-none bg-white ">
        <div className="flex flex-row gap-8 ">
          <div className="w-10 relative ml-2">
            <Button
              className={twMerge(
                HEADER_ICON_BUTTON,
                'rounded-full relative text-center hover:bg-secondary-light',
              )}
              aria-label="change langauge icon"
            >
              <Image
                src="/icon/translate.svg"
                width={20}
                height={20}
                alt="change langauge icon"
              />
            </Button>
          </div>

          <Link href={ROUTE.USER}>
            <div
              className={twMerge(
                HEADER_ICON_BUTTON,
                'rounded-full hover:bg-secondary-light',
              )}
            >
              <Image
                src="/icon/user.svg"
                width={20}
                height={20}
                alt="user icon"
              />
            </div>
          </Link>
          <Button
            className={twMerge(
              HEADER_ICON_BUTTON,
              'rounded-md hover:bg-secondary-light',
            )}
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
      </Header>
      <div className="flex flex-1 overflow-hidden min-h-[calc(100vh-7rem)] items-center">
        <Menu />
        <section className="flex-1 overflow-auto h-full">{children}</section>
      </div>
    </main>
  );
};

export default UserLayout;
