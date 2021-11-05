/* eslint-disable no-param-reassign */
// param reassign can be used bc redux toolkit handles that under the hood
import { createSlice } from '@reduxjs/toolkit';
import { findIndex, propEq, reject } from 'ramda';

export const partnersSlice = createSlice({
  name: 'partners',
  initialState: {
    list: [],
  },
  reducers: {
    updatePartners: (state, action) => {
      state.list = action.payload;
    },
    deletePartnerById: (state, action) => {
      state.list = reject(propEq('id', action.payload), state.list);
    },
    updateOnePartner: (state, action) => {
      const index = findIndex(propEq('id', action.payload.id))(state.list);
      state.list[index] = action.payload;
    },
    emptyPartners: (state) => {
      state.list = [];
    },
  },
});

export const {
  updatePartners,
  emptyPartners,
  deletePartnerById,
  updateOnePartner,
} = partnersSlice.actions;

export default partnersSlice.reducer;
