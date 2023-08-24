import { configureStore } from '@reduxjs/toolkit';
import { cookiesSlice, cookiesStoreKey } from './cookies';
import { alertsSlice, alertsStoreKey } from './alerts';
import { authenticationSlice, authenticationStoreKey } from './authentication';
import { userSlice, userStoreKey } from './user';

export const store = configureStore({
  reducer: {
    [cookiesStoreKey]: cookiesSlice.reducer,
    [alertsStoreKey]: alertsSlice.reducer,
    [authenticationStoreKey]: authenticationSlice.reducer,
    [userStoreKey]: userSlice.reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
