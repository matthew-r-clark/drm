import { configureStore } from '@reduxjs/toolkit';
import authStateReducer from './lib/auth-state-slice';

export default configureStore({
  reducer: {
    authState: authStateReducer,
  },
});
