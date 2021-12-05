import { configureStore } from '@reduxjs/toolkit';
import authorizationReducer from './authorization';
import partnersReducer from './partners';
import ministersReducer from './ministers';
import alertsReducer from './alerts';

export default configureStore({
  reducer: {
    authorization: authorizationReducer,
    partners: partnersReducer,
    ministers: ministersReducer,
    alerts: alertsReducer,
  },
});
