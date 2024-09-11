'use client';

import i18n from 'i18n';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import FallbackView from '#/components/common/FallbackView';
import ExerciseChart from '#/components/dashboard/ExerciseChart';
import TotalChart from '#/components/dashboard/TotalChart';
import WaterChart from '#/components/dashboard/WaterChart';

import { Exercise, User } from '#/api/type';

import ROUTE from '#/constants/route';
import { PRIMARY_BUTTON } from '#/constants/style';

interface DashboardPageProps {
  exerciseData: Exercise[];
  userInfo: User;
}

const DashboardPage = ({ exerciseData, userInfo }: DashboardPageProps) => {
  const { t } = useTranslation();

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
      {exerciseData && exerciseData.length && (
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
      {!exerciseData.length && (
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
