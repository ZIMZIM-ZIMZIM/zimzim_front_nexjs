'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { twMerge } from 'tailwind-merge';

import Button from '#components/common/Button';

import { useCustomMutation } from '#/hooks/useCustomMutation';

import ROUTE from '#/constants/route';
import { HEADER_ICON_BUTTON } from '#/constants/style';
import API_ENDPOINT from '#/constants/api';

const UserHeader = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useCustomMutation(API_ENDPOINT.AUTH.LOGOUT, 'post', {
    onSuccess: () => {
      router.push(ROUTE.LOGIN);
      queryClient.invalidateQueries();
    },
  });

  const handleLogout = async () => {
    try {
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between w-full h-16 bg-white items-center px-8">
      <div className="flex flex-row items-center w-32 justify-center">
        <Link href={ROUTE.MAIN_PAGE}>
          <Image src="/icon/icon.svg" width={48} height={48} alt="user icon" />
        </Link>
      </div>
      <div className="flex flex-row gap-4">
        <Button
          className={twMerge(
            HEADER_ICON_BUTTON,
            'rounded-full hover:bg-secondary-light',
          )}
        >
          <Image
            src="/icon/translate.svg"
            width={20}
            height={20}
            alt="translate icon"
          />
        </Button>
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
  );
};

export default UserHeader;
