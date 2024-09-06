import React from 'react';
import dayjs from 'dayjs';

import TotalChart from '#components/dashboard/TotalChart';
import ExerciseChart from '#/components/dashboard/ExerciseChart';
import WaterChart from '#/components/dashboard/WaterChart';
import ContentBox from '#/components/common/ContentBox';
import Button from '#/components/common/Button';

import FORMAT from '#/constants/format';
import Link from 'next/link';
import ROUTE from '#/constants/route';
import { useCustomQuery } from '#/hooks/useCustomQuery';
import axiosInstance from '#/api/axios';
import API_ENDPOINT from '#/constants/api';

import axios from 'axios';
import { cookies } from 'next/headers'; // Next.js에서 서버 측 쿠키를 가져오는 유틸리티

const fetchUserInfo = async (url: string) => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value; // 쿠키에서 토큰 가져오기
  console.log(token, 'token~!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  const response = await axios.get(`http://localhost:4000/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`, // 쿠키에서 가져온 토큰을 헤더에 추가
    },
  });
  console.log(response);
  return response.data;
};

const DashboardPage = async () => {
  try {
    const { data: userInfo } = await fetchUserInfo('user/info');

    const { data: exerciseData } = await fetchUserInfo(
      `exercise?id=${userInfo?.id}&startDate=${dayjs().subtract(7, 'day').format(FORMAT.DATE)}&endDate=${dayjs().format(FORMAT.DATE)}`,
    );

    const totalDuration = exerciseData?.reduce(
      (acc: number, cur: { totalDuration: string }) =>
        acc + parseFloat(cur.totalDuration),
      0,
    );

    return (
      <div className="flex flex-col gap-4 px-10 h-full">
        <p className="text-lg h-1/12">
          ✅ {userInfo.nickname}님, 이번주 {exerciseData?.length}회{' '}
          {totalDuration}분 운동했어요
        </p>
        {exerciseData?.length ? (
          <div className="flex flex-col gap-6 h-11/12">
            <div className="flex flex-row justify-between items-cetner gap-6">
              <TotalChart exerciseData={exerciseData} />
              <ExerciseChart exerciseData={exerciseData} />
            </div>
            <WaterChart />
          </div>
        ) : (
          <ContentBox className="w-full h-full text-lg">
            <p>운동 기록을 추가하고 일주일간 얼마나 운동했는지 알아보세요</p>
            <div className="flex flex-col items-center">
              <div>image</div>
              <Link href={ROUTE.EXERCISE.POST}>
                <Button className="bg-primary w-[120px] h-12 rounded-lg text-white font-bold text-md border-1 border-gray-light">
                  추가
                </Button>
              </Link>
            </div>
          </ContentBox>
        )}
      </div>
    );
  } catch (error) {
    console.log('error', error);
  }
};

export default DashboardPage;
