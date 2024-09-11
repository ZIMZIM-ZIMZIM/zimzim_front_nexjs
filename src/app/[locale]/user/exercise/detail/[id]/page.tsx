'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import Button from '#/components/common/Button';
import ContentBox from '#/components/common/ContentBox';

import { useCustomQuery } from '#/hooks/useCustomQuery';

import { Exercise } from '#/api/type';

import API_ENDPOINT from '#/constants/api';
import FORMAT from '#/constants/format';
import QUERY_KEYS from '#/constants/queryKey';
import { ACTION_BUTTON } from '#/constants/style';

const ExerciseDetailPage = () => {
  const { t, i18n } = useTranslation();

  const pathname = usePathname();
  const id = pathname.split('detail/')[1];

  const { data } = useCustomQuery<Exercise>(
    QUERY_KEYS.EXERCISE.DETAIL(id),
    API_ENDPOINT.EXERCISE.DETAIL(id),
  );

  return (
    <article className="flex flex-row justify-center">
      <div className="flex flex-col gap-8 w-2/5">
        <header className="flex justify-end">
          <Link href={`/${i18n.language}/user/exercise/update/${id}`}>
            <Button className={twMerge(ACTION_BUTTON, 'bg-primary')}>
              {t('EXERCISE.DETAIL.BUTTON')}
            </Button>
          </Link>
        </header>

        <section className="flex justify-center w-full">
          <ContentBox
            className="rounded-2xl w-full"
            contentTitle="exercise detail"
          >
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
        </section>
      </div>
    </article>
  );
};

export default ExerciseDetailPage;
