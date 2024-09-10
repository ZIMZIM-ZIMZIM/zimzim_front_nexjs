'use client';

import dayjs from 'dayjs';
import i18n from 'i18n';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import FallbackView from '#/components/common/FallbackView';
import LoadingBar from '#/components/common/LoadingBar';
import ExerciseChart from '#/components/dashboard/ExerciseChart';
import TotalChart from '#/components/dashboard/TotalChart';
import WaterChart from '#/components/dashboard/WaterChart';

import { useCustomQuery } from '#/hooks/useCustomQuery';

import { Exercise, User } from '#/api/types';

import API_ENDPOINT from '#/constants/api';
import FORMAT from '#/constants/format';
import QUERY_KEYS from '#/constants/queryKey';
import ROUTE from '#/constants/route';
import { PRIMARY_BUTTON } from '#/constants/style';

const DashboardPage = () => {
  const { t } = useTranslation();

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
    <div className="flex flex-col h-full gap-4 relative justify-between items-center w-full">
      {isLoading && (
        <FallbackView>
          <p className="text-xl">🏋🏻{t('DASHBOARD.WAITING_MESSAGE')}🏋🏻</p>
          <LoadingBar />
        </FallbackView>
      )}
      {isSuccess && exerciseData && exerciseData.length && (
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-lg h-1/12">
            ✅
            {t('DASHBOARD.WELCOME_MESSAGE', {
              name: userInfo?.nickname,
              count: exerciseData?.length,
              min: totalDuration,
            })}
          </h1>

          <div className="flex flex-col gap-6">
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
            🏋🏻
            {t('DASHBOARD.NO_DATA_MESSAGE', {
              name: userInfo?.nickname,
            })}
            🏋🏻
          </p>
          <Link
            href={`/${i18n.language}${ROUTE.EXERCISE.POST}`}
            className={twMerge(
              PRIMARY_BUTTON,
              'w-52 flex justify-center items-center hover:bg-primary/75 animate-bounce',
            )}
          >
            {t('DASHBOARD.REGISTER_BUTTON')}
          </Link>
        </FallbackView>
      )}
    </div>
  );
};

export default DashboardPage;
