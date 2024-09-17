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
      <Header className="flex bg-none bg-white px-16 shadow-lg">
        <div className="flex justify-center items-center h-20 gap-16">
          <Link href="/">
            <Image src="/icon/icon.svg" width={52} height={52} alt="icon" />
          </Link>
          <Menu />
        </div>
        <div className="flex flex-row gap-4 items-center">
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
      </Header>

      <main className="w-full h-full flex flex-col bg-secondary-light/50 overflow-auto">
        <section className="flex flex-col py-8 px-16 h-[calc(100vh-5rem)]">
          {children}
        </section>
      </main>
    </>
  );
};

export default UserLayout;
