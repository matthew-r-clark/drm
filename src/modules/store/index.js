import { configureStore } from '@reduxjs/toolkit';
import authorizationReducer from './authorization';
import partnersReducer from './partners';

export default configureStore({
  reducer: {
    authorization: authorizationReducer,
    partners: partnersReducer,
  },
});
