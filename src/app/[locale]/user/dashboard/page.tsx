import React from 'react';

import { WaterData } from '#/components/dashboard/WaterChart';

import customFetch from '#/util/customFetch';

import { Exercise, User } from '#/api/type';

import API_ENDPOINT from '#/constants/api';

import DashboardPage from '#/app/[locale]/user/dashboard/DashboardPage';
import { getSevenDays } from '#/util';

const fetchUserInfo = async (): Promise<User> => {
  const response = await customFetch(API_ENDPOINT.USER.INFO);

  return response.data;
};

const fetchExerciseData = async (
  userId: string,
  startDate: string,
  endDate: string,
): Promise<Exercise[]> => {
  const response = await customFetch(
    `${API_ENDPOINT.EXERCISE.EXERCISE}?id=${userId}&startDate=${startDate}&endDate=${endDate}`,
  );
  return response.data;
};

const fetchWaterData = async (
  userId: string,
  startDate: string,
  endDate: string,
): Promise<WaterData> => {
  const response = await customFetch(
    `${API_ENDPOINT.WATER.WATER}?id=${userId}&startDate=${startDate}&endDate=${endDate}`,
  );

  return response.data;
};

const DashboardPageWrapper = async () => {
  const { startDate, endDate } = getSevenDays();

  const userInfo = await fetchUserInfo();
  const exerciseData = await fetchExerciseData(userInfo.id, startDate, endDate);
  const waterData = await fetchWaterData(userInfo.id, startDate, endDate);

  return (
    <DashboardPage
      userInfo={userInfo}
      exerciseData={exerciseData}
      waterData={waterData}
    />
  );
};

export default DashboardPageWrapper;
