'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import Button from '#/components/common/Button';
import Header from '#/components/common/Header';
import Menu from '#/components/common/menu/Menu';
import LanguageSelectModal from '#/components/header/LanguageSelectModal';

import { useCustomMutation } from '#/hooks/useCustomMutation';

import API_ENDPOINT from '#/constants/api';
import { LOCAL_STORAGE, MODAL } from '#/constants/key';
import ROUTE from '#/constants/route';
import { HEADER_ICON_BUTTON } from '#/constants/style';

import { useModal } from '#/app/ModalContext';

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { createModal } = useModal();

  const langugageSelectModal = () => {
    createModal({
      id: MODAL.LANGUGAGE_SELECT,
      component: <LanguageSelectModal />,
    });
  };

  const { mutate } = useCustomMutation(API_ENDPOINT.AUTH.LOGOUT, 'post', {
    onSuccess: () => {
      localStorage.removeItem(LOCAL_STORAGE.LOGIN);

      router.push(`/${i18n.language}${ROUTE.LOGIN}`);
      queryClient.invalidateQueries();
    },
  });

  const handleLogout = () => mutate();

  return (
    <>
      <Header className="bg-none bg-white">
        <div className="flex h-20 justify-end items-center">
          <div className="flex flex-row gap-4">
            <Link href={`/${i18n.language}${ROUTE.USER}`}>
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
            <div className="w-10 relative">
              <Button
                className={twMerge(
                  HEADER_ICON_BUTTON,
                  'rounded-full relative text-center hover:bg-secondary-light',
                )}
                aria-label="change langauge icon"
                onClick={langugageSelectModal}
              >
                <Image
                  src="/icon/translate.svg"
                  width={20}
                  height={20}
                  alt="change langauge icon"
                />
              </Button>
            </div>

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
        </div>
      </Header>

      <main className="w-full h-full flex flex-col bg-secondary-light/50 overflow-auto">
        <div className="w-[12rem] flex justify-center items-center h-20 absolute top-0 left-0">
          <Link href="/">
            <Image src="/icon/icon.svg" width={52} height={52} alt="icon" />
          </Link>
        </div>
        <div className="flex">
          <Menu />
          <section className="w-5/6 flex flex-col justify-between py-4 px-8 min-h-[calc(100vh-5rem)]">
            {children}
          </section>
        </div>
      </main>
    </>
  );
};

export default UserLayout;
