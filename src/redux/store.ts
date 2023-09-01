import { configureStore } from '@reduxjs/toolkit'
import { cookiesSlice, cookiesStoreKey } from './cookies'
import { alertsSlice, alertsStoreKey } from './alerts'
import { authenticationSlice, authenticationStoreKey } from './authentication'
import { userSlice, userStoreKey } from './user'
import { contactListStoreKey } from './contactList/contactList.const'
import { contactListSlice } from './contactList/contactList.slice'
import { subscriptionSlice, subscriptionStoreKey } from './subscription'
 import { teamsSlice, teamsStoreKey } from './teams/index'
 import {
   searchParametersSlice,
   searchParametersStoreKey,
 } from './searchParameters'

 export const store = configureStore({
   reducer: {
     [cookiesStoreKey]: cookiesSlice.reducer,
     [alertsStoreKey]: alertsSlice.reducer,
     [authenticationStoreKey]: authenticationSlice.reducer,
     [userStoreKey]: userSlice.reducer,
     [contactListStoreKey]: contactListSlice.reducer,
     [subscriptionStoreKey]: subscriptionSlice.reducer,
     [searchParametersStoreKey]: searchParametersSlice.reducer,
     [teamsStoreKey]: teamsSlice.reducer,
   },
 })

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
