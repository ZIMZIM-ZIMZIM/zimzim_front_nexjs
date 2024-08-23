import { createSlice } from '@reduxjs/toolkit';

import { getExercise, getUserInfo } from '#stores/user/actions';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  exercise: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.user = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(getExercise.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getExercise.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.exercise = action.payload;
      })
      .addCase(getExercise.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export default userSlice.reducer;
