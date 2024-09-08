'use client';

import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import Button from '#/components/common/Button';
import ContentBox from '#/components/common/ContentBox';

import { ACTION_BUTTON } from '#/constants/style';
import FORMAT from '#/constants/format';
import API_ENDPOINT from '#/constants/api';
import { useCustomQuery } from '#/hooks/useCustomQuery';
import QUERY_KEYS from '#/constants/queryKey';
import { usePathname } from 'next/navigation';
import { Exercise } from '#/api/types';

const ExerciseDetailPage = () => {
  const { t } = useTranslation('common');

  const pathname = usePathname();
  const id = pathname.split('detail/')[1];

  const { data } = useCustomQuery<Exercise>(
    QUERY_KEYS.EXERCISE.DETAIL(id),
    API_ENDPOINT.EXERCISE.DETAIL(id),
  );

  return (
    <div className=" flex flex-row justify-center">
      <div className="flex flex-col gap-8 w-2/5">
        <div className="flex justify-end">
          <Link href={`/user/exercise/update/${id}`}>
            <Button className={twMerge(ACTION_BUTTON, 'bg-primary')}>
              {t('EXERCISE.DETAIL.BUTTON')}
            </Button>
          </Link>
        </div>
        <div className="flex justify-center w-full">
          <ContentBox className="rounded-2xl w-full">
            <h1 className="text-center pb-8">
              🏋️‍♀️ {dayjs(data?.date).format(FORMAT.DATE)}{' '}
              {t('EXERCISE.DETAIL..TITLE')} 🏋️‍♀️
            </h1>
            <hr />
            <div className="flex justify-between">
              <div className="flex flex-col gap-9 pt-8">
                <p>{t('EXERCISE.DETAIL..CONTENT.IS_PT')}</p>
                <p>{t('EXERCISE.DETAIL..CONTENT.TYPE')}</p>
                <p>
                  {t('EXERCISE.DETAIL..CONTENT.MIN')}(
                  {t('EXERCISE.DETAIL..CONTENT.UNIT')})
                </p>
                <p>{t('EXERCISE.DETAIL..CONTENT.FORCE')}</p>
              </div>
              {data && (
                <div className="flex flex-col gap-9 pt-8">
                  <p>{data.isPT === 'Y' ? 'PT' : '개인운동'}</p>
                  <p>{data.detail[0]?.type || '정보 없음'}</p>
                  <p>
                    {data.detail[0]?.duration
                      ? `${data.detail[0]?.duration}${t('EXERCISE.DETAIL..CONTENT.UNIT')}`
                      : '정보 없음'}
                  </p>
                  <p>{data.detail[0]?.force || '정보 없음'}</p>
                </div>
              )}
            </div>
          </ContentBox>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailPage;
