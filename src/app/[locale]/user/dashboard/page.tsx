import dayjs from 'dayjs';
import React from 'react';

import customFetch from '#/util/customFetch';

import { Exercise, User } from '#/api/type';

import API_ENDPOINT from '#/constants/api';
import FORMAT from '#/constants/format';

import DashboardPage from '#/app/[locale]/user/dashboard/DashboardPage';

const fetchUserInfo = async (): Promise<User> => {
  const response = await customFetch(API_ENDPOINT.USER.INFO);

  return response.data;
};

const fetchExerciseData = async (userId: string): Promise<Exercise[]> => {
  const response = await customFetch(
    `${API_ENDPOINT.EXERCISE.EXERCISE}?id=${userId}&startDate=${dayjs().subtract(7, 'day').format(FORMAT.DATE)}&endDate=${dayjs().format(FORMAT.DATE)}`,
  );

  return response.data;
};

const DashboardPageWrapper = async () => {
  const userInfo = await fetchUserInfo();
  const exerciseData = await fetchExerciseData(userInfo.id);

  return <DashboardPage userInfo={userInfo} exerciseData={exerciseData} />;
};

export default DashboardPageWrapper;
