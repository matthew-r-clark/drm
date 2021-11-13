/* eslint-disable no-param-reassign */
// param reassign can be used bc redux toolkit handles that under the hood
import { createSlice } from '@reduxjs/toolkit';

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState: {
    error: '',
    success: '',
  },
  reducers: {
    setGlobalError: (state, action) => {
      state.error = action.payload;
    },
    clearGlobalError: (state) => {
      state.error = '';
    },
    setGlobalSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearGlobalSuccess: (state) => {
      state.success = '';
    },
  },
});

export const {
  setGlobalError,
  setGlobalSuccess,
  clearGlobalError,
  clearGlobalSuccess,
} = alertsSlice.actions;

export default alertsSlice.reducer;
