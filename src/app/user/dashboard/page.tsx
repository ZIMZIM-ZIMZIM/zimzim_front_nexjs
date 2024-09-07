'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

import TotalChart from '#components/dashboard/TotalChart';
import ExerciseChart from '#/components/dashboard/ExerciseChart';
import WaterChart from '#/components/dashboard/WaterChart';
import LoadingBar from '#/components/common/LoadingBar';
import FallbackView from '#/components/common/FallbackView';

import { useCustomQuery } from '#/hooks/useCustomQuery';

import { Exercise, User } from '#/api/types';

import FORMAT from '#/constants/format';
import ROUTE from '#/constants/route';
import { PRIMARY_BUTTON } from '#/constants/style';
import API_ENDPOINT from '#/constants/api';
import QUERY_KEYS from '#/constants/queryKey';

const DashboardPage = () => {
  const { data: userInfo } = useCustomQuery<User>(
    QUERY_KEYS.USER,
    API_ENDPOINT.USER.INFO,
  );

  const {
    data: exerciseData,
    isLoading,
    isSuccess,
  } = useCustomQuery<{ token: string }, Error, Exercise[]>(
    QUERY_KEYS.EXERCISE.DATE_RANGE(userInfo?.id ?? ''),
    `${API_ENDPOINT.EXERCISE.EXERCISE}?id=${userInfo?.id}&startDate=${dayjs().subtract(7, 'day').format(FORMAT.DATE)}&endDate=${dayjs().format(FORMAT.DATE)}`,
  );

  const totalDuration = useMemo(
    () =>
      exerciseData?.reduce(
        (acc: number, cur: { totalDuration: string }) =>
          acc + parseFloat(cur.totalDuration),
        0,
      ),
    [exerciseData],
  );

  return (
    <div className="flex flex-col gap-4 h-full relative">
      {isLoading && (
        <FallbackView>
          <p className="text-xl">
            🏋🏻 잠시만 기다려주세요... 운동 기록을 확인하고 있습니다 🏋🏻
          </p>
          <LoadingBar />
        </FallbackView>
      )}
      {isSuccess && exerciseData && exerciseData.length && (
        <div className="flex flex-col gap-4 px-10 h-full">
          <p className="text-lg h-1/12">
            ✅ {userInfo?.nickname}님, 이번주 {exerciseData?.length}회{' '}
            {totalDuration}분 운동했어요
          </p>

          <div className="flex flex-col gap-6 h-11/12">
            <div className="flex flex-row justify-between items-cetner gap-6">
              <TotalChart exerciseData={exerciseData} />
              <ExerciseChart exerciseData={exerciseData} />
            </div>
            <WaterChart />
          </div>
        </div>
      )}
      {isSuccess && !exerciseData.length && (
        <FallbackView>
          <p className="text-xl">
            🏋🏻 {userInfo?.nickname}님, 운동 기록을 등록하고 이번주의 운동량을
            확인해 보세요 🏋🏻
          </p>
          <Link
            href={ROUTE.EXERCISE.POST}
            className={twMerge(
              PRIMARY_BUTTON,
              'w-52 flex justify-center items-center hover:bg-primary/75 animate-bounce',
            )}
          >
            운동 기록 등록하기
          </Link>
        </FallbackView>
      )}
    </div>
  );
};

export default DashboardPage;
