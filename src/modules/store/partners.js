/* eslint-disable no-param-reassign */
// param reassign can be used bc redux toolkit handles that under the hood
import { createSlice } from '@reduxjs/toolkit';

export const partnersSlice = createSlice({
  name: 'partners',
  initialState: {
    list: null,
  },
  reducers: {
    updatePartners: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { updatePartners } = partnersSlice.actions;

export default partnersSlice.reducer;
