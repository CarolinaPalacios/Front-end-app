import { configureStore } from '@reduxjs/toolkit';

import noteReducer from './slice/noteSlice';
import authenticationReducer from './slice/loginSlice';

export const store = configureStore({
  reducer: {
    note: noteReducer,
    authentication: authenticationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
