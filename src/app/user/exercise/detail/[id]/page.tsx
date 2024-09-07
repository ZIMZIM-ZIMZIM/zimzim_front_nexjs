import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';

import Button from '#/components/common/Button';
import ContentBox from '#/components/common/ContentBox';

import { useFetch } from '#/hooks/useFetch';

import { ACTION_BUTTON } from '#/constants/style';
import FORMAT from '#/constants/format';
import API_ENDPOINT from '#/constants/api';

const ExerciseDetailPage = async ({ params }: { params: { id: string } }) => {
  const exerciseId = params.id;
  const { customFetch } = useFetch();

  const { data } = await customFetch(API_ENDPOINT.EXERCISE.DETAIL(exerciseId));

  return (
    <div className=" flex flex-row justify-center">
      <div className="flex flex-col gap-8 w-2/5">
        <div className="flex justify-end">
          <Link href={`/user/exercise/update/${exerciseId}`}>
            <Button className={twMerge(ACTION_BUTTON, 'bg-primary')}>
              수정
            </Button>
          </Link>
        </div>
        <div className="flex justify-center w-full">
          <ContentBox className="rounded-2xl w-full">
            <h1 className="text-center pb-8">
              🏋️‍♀️ {dayjs(data?.date).format(FORMAT.DATE)} 운동기록 🏋️‍♀️
            </h1>
            <hr />
            <div className="flex justify-between">
              <div className="flex flex-col gap-9 pt-8">
                <p>PT 여부</p>
                <p>종류</p>
                <p>시간(분)</p>
                <p>강도</p>
              </div>
              {data && (
                <div className="flex flex-col gap-9 pt-8">
                  <p>{data.isPT === 'Y' ? 'PT' : '개인운동'}</p>
                  <p>{data.detail[0]?.type || '정보 없음'}</p>
                  <p>
                    {data.detail[0]?.duration
                      ? `${data.detail[0]?.duration}분`
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
