'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import Button from '#/components/common/Button';
import Header from '#/components/common/Header';
import Menu from '#/components/common/menu/Menu';
import Modal from '#/components/common/Modal';

import { useCustomMutation } from '#/hooks/useCustomMutation';

import API_ENDPOINT from '#/constants/api';
import { LOCAL_STORAGE } from '#/constants/key';
import ROUTE from '#/constants/route';
import { HEADER_ICON_BUTTON } from '#/constants/style';

const UserLayout = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation('common');
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const { mutate } = useCustomMutation(API_ENDPOINT.AUTH.LOGOUT, 'post', {
    onSuccess: () => {
      localStorage.removeItem(LOCAL_STORAGE.LOGIN);

      router.push(`/${i18n.language}${ROUTE.LOGIN}`);
      queryClient.invalidateQueries();
    },
  });

  const handleLogout = () => mutate();

  return (
    <main className="h-screen w-screen flex flex-col bg-secondary-light/50 overflow-hidden">
      <Header className="bg-none bg-white">
        <div className="flex flex-row gap-8 ">
          <div className="w-10 relative ml-2">
            <Button
              className={twMerge(
                HEADER_ICON_BUTTON,
                'rounded-full relative text-center hover:bg-secondary-light',
              )}
              aria-label="change langauge icon"
              onClick={() => setIsOpen(true)}
            >
              <Image
                src="/icon/translate.svg"
                width={20}
                height={20}
                alt="change langauge icon"
              />
            </Button>
            {isOpen && (
              <Modal closeModal={() => setIsOpen(false)}>
                <div className="modal flex flex-col items-center gap-4">
                  <h1 className="text-xl">언어 선택</h1>
                  <section className="modal flex flex-col gap-2">
                    <Button className="modal bg-primary/25 border-1 rounded-md px-24 py-2 hover:bg-primary/75">
                      English
                    </Button>
                    <Button className="modal bg-primary/25 border-1 rounded-md px-24 py-2 hover:bg-primary/75">
                      한국어
                    </Button>
                  </section>
                </div>
              </Modal>
            )}
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
      <div className="flex h-full h-[calc(100vh-5rem)]">
        <Menu />
        <section className="h-full w-5/6 flex flex-col justify-between p-8">
          {children}
        </section>
      </div>
    </main>
  );
};

export default UserLayout;
