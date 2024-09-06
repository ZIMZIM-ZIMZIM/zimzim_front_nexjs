'use client';

import React from 'react';
// import { NavLink, useNavigate } frosm 'react-router-dom';
import { useDispatch } from 'react-redux';

import Button from '#components/common/Button';

import { authApi, usePostLogoutMutation } from '#/api/services/authApi';

import ROUTE from '#/constants/route';

import { twMerge } from 'tailwind-merge';
import { HEADER_ICON, HEADER_ICON_BUTTON } from '#/constants/style';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

const UserHeader = () => {
  // const navigate = useNavigate();
  // const router = useRouter();

  // const dispatch = useDispatch();
  // const [logout] = usePostLogoutMutation();

  const handleLogout = async () => {
    try {
      // await logout().unwrap();
      // dispatch(authApi.util.invalidateTags([{ type: 'User', id: 'User' }]));
      // router.push(ROUTE.LOGIN);
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
        >
          <Image
            src="/icon/logout.svg"
            width={20}
            height={20}
            alt="user icon"
          />
        </Button>
      </div>
    </div>
  );
};

export default UserHeader;
