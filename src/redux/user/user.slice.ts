import { createSlice } from '@reduxjs/toolkit';
import { userStoreKey } from './user.const';
import { IUserData } from '../../types';
import {
  addUserProfileImage,
  deleteUserProfileImage,
  getUserData,
  getUserProfileImage,
} from '.';

interface IState {
  isLoading: boolean;
  userData: IUserData | null;
  userProfileImage: string | null;
  isAdmin: boolean;
}

const initialState: IState = {
  isLoading: false,
  userData: null,
  userProfileImage: null,
  isAdmin: false,
};

export const userSlice = createSlice({
  name: userStoreKey,
  initialState,
  reducers: {},
  extraReducers(builder) {
    // getUserData
    builder.addCase(getUserData.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getUserData.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload?.response;
        state.isAdmin = action.payload?.isAdmin;
      }),
      // getUserProfileImage
      builder.addCase(getUserProfileImage.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(getUserProfileImage.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(getUserProfileImage.fulfilled, (state, action) => {
        if (action.payload?.length) {
          state.userProfileImage = action.payload[0].userimage;
        }
        state.isLoading = false;
      }),
      // addUserProfileImage
      builder.addCase(addUserProfileImage.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(addUserProfileImage.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(addUserProfileImage.fulfilled, (state) => {
        state.isLoading = false;
      }),
      // deleteUserProfileImage
      builder.addCase(deleteUserProfileImage.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(deleteUserProfileImage.rejected, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(deleteUserProfileImage.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});
