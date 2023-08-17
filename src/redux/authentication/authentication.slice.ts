import { createSlice } from '@reduxjs/toolkit';
import { authenticationStoreKey } from './authentication.const';
import { processSignConfiguration, requestSocialAuthentication } from '.';

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
    builder.addCase(requestSocialAuthentication.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(requestSocialAuthentication.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(requestSocialAuthentication.fulfilled, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(processSignConfiguration.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(processSignConfiguration.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(processSignConfiguration.fulfilled, (state) => {
      state.isLoading = false;
    })      
    
  },
});