import { createSlice } from '@reduxjs/toolkit';
import { authenticationStoreKey } from './authentication.const';
import {
  processEmailConfiguration,
  processRegularAuthentication,
  processSignConfiguration,
  processSocialAuthentication,
  requestSocialAuthentication
} from '.';

interface IState {
  isLoading: boolean;
}

const initialState: IState = {
  isLoading: false,
};

export const authenticationSlice = createSlice({
  name: authenticationStoreKey,
  initialState,
  reducers: {},
  extraReducers(builder) {
    // requestSocialAuthentication
    builder.addCase(requestSocialAuthentication.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(requestSocialAuthentication.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(requestSocialAuthentication.fulfilled, (state) => {
      state.isLoading = false;
    }),
    // processSocialAuthentication
    builder.addCase(processSocialAuthentication.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(processSocialAuthentication.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(processSocialAuthentication.fulfilled, (state) => {
      state.isLoading = false;
    }),
    // processRegularAuthentication      
    builder.addCase(processRegularAuthentication.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(processRegularAuthentication.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(processRegularAuthentication.fulfilled, (state) => {
      state.isLoading = false;
    }),
    // processSignConfiguration
    builder.addCase(processSignConfiguration.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(processSignConfiguration.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(processSignConfiguration.fulfilled, (state) => {
      state.isLoading = false;
    }),
    // processEmailConfiguration
    builder.addCase(processEmailConfiguration.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(processEmailConfiguration.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(processEmailConfiguration.fulfilled, (state) => {
      state.isLoading = false;
    })
    
  },
});