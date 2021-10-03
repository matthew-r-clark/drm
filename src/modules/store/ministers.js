/* eslint-disable no-param-reassign */
// param reassign can be used bc redux toolkit handles that under the hood
import { createSlice } from '@reduxjs/toolkit';

export const ministersSlice = createSlice({
  name: 'ministers',
  initialState: {
    list: [],
  },
  reducers: {
    updateMinisters: (state, action) => {
      state.list = action.payload;
    },
    emptyMinisters: (state) => {
      state.list = [];
    },
  },
});

export const { updateMinisters, emptyMinisters } = ministersSlice.actions;

export default ministersSlice.reducer;
