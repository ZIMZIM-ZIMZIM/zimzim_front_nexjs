'use client';

import { QueryKey } from '@tanstack/react-query';
import React from 'react';

import ProfileHeader from '#/components/profile/ProfileHeader';
import UserBMI from '#/components/profile/UserBMI';
import UserBodyInfo from '#/components/profile/UserBodyInfo';

import { useCustomQuery } from '#/hooks/useCustomQuery';

import { Exercise, User } from '#/api/type';

import API_ENDPOINT from '#/constants/api';
import QUERY_KEYS from '#/constants/queryKey';

const ProfilePage = () => {
  const { data: userInfo } = useCustomQuery<QueryKey, Error, User>(
    QUERY_KEYS.USER,
    API_ENDPOINT.USER.INFO,
  );

  const { data: exerciseData } = useCustomQuery<QueryKey, Error, Exercise[]>(
    QUERY_KEYS.EXERCISE.DEFAULT,
    `${API_ENDPOINT.EXERCISE.EXERCISE}?id=${userInfo?.id}`,
  );

  return (
    <div className="flex flex-col gap-8 pt-4">
      <ProfileHeader
        userNickname={userInfo?.nickname ?? ''}
        exerciseDataCount={exerciseData?.length ?? 0}
      />
      <div className="flex flex-row gap-8">
        <UserBodyInfo userInfo={userInfo} exerciseData={exerciseData} />
        <UserBMI
          weight={userInfo?.weight ?? ''}
          height={userInfo?.height ?? ''}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
