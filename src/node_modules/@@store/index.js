import { configureStore } from '@reduxjs/toolkit';
import authorizationReducer from './authorization';

export default configureStore({
  reducer: {
    authorization: authorizationReducer,
  },
});
