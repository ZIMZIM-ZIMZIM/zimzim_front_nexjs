import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '#/api/axios';

export const getUserInfo = createAsyncThunk(
  'user/info',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('user/info');

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data);
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  },
);

export const getExercise = createAsyncThunk(
  'user/exercise',
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `user/exercise?id=user2&startDate=2024-08-15&endDate=2024-08-22`,
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data);
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  },
);

export const postExercise = createAsyncThunk(
  'user/exercise',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post('user/exercise', {
        userId: 'user2',
        date: '2024-08-23T08:30:00Z',
        duration: 30,
        type: 1,
        force: 1,
      });

      console.log(response, 'reponse~');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data);
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  },
);
