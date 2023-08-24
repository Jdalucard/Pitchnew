
import { createSlice } from '@reduxjs/toolkit';
import { userStoreKey } from './user.const';
import { IUserData } from '../../types';
import { getUserData } from '.';

interface IState {
  isLoading: boolean;
  userData: IUserData | null; 
}

const initialState: IState = {
  isLoading: false,
  userData: null,
};

export const userSlice = createSlice({
  name: userStoreKey,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserData.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(getUserData.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
    })  
  },
});