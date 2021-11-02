/* eslint-disable no-param-reassign */
// param reassign can be used bc redux toolkit handles that under the hood
import { createSlice } from '@reduxjs/toolkit';
import { propEq, reject } from 'ramda';

export const partnersSlice = createSlice({
  name: 'partners',
  initialState: {
    list: [],
  },
  reducers: {
    updatePartners: (state, action) => {
      state.list = action.payload;
    },
    deletePartner: (state, action) => {
      state.list = reject(propEq('id', action.payload), state.list);
    },
    emptyPartners: (state) => {
      state.list = [];
    },
  },
});

export const { updatePartners, emptyPartners, deletePartner } = partnersSlice.actions;

export default partnersSlice.reducer;
