import { configureStore } from '@reduxjs/toolkit';
import partnersReducer from './partners';
import ministersReducer from './ministers';

export default configureStore({
  reducer: {
    partners: partnersReducer,
    ministers: ministersReducer,
  },
});
