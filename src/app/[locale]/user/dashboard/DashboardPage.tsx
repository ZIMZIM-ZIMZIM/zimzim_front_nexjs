'use client';

import i18n from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import FallbackView from '#/components/common/FallbackView';
import ExerciseChart from '#/components/dashboard/ExerciseChart';
import TotalChart from '#/components/dashboard/TotalChart';
import WaterChart, { WaterData } from '#/components/dashboard/WaterChart';

import { Exercise, User } from '#/api/type';

import ROUTE from '#/constants/route';
import { PRIMARY_BUTTON } from '#/constants/style';

interface DashboardPageProps {
  exerciseData: Exercise[];
  userInfo: User;
  waterData: WaterData;
}

const DashboardPage = ({
  exerciseData,
  userInfo,
  waterData,
}: DashboardPageProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const totalDuration = useMemo(() => {
    if (!exerciseData || exerciseData.length === 0) return null;

    return exerciseData?.reduce(
      (acc: number, cur: { totalDuration: string }) =>
        acc + parseFloat(cur.totalDuration),
      0,
    );
  }, [exerciseData]);

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <div className="flex flex-col h-full gap-4 relative justify-between items-center w-full">
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
          <div className="flex flex-row justify-between items-center gap-6 relative">
            {exerciseData && !exerciseData.length && (
              <FallbackView>
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

            <TotalChart exerciseData={exerciseData} />
            <ExerciseChart exerciseData={exerciseData} />
          </div>
          <WaterChart waterData={waterData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
