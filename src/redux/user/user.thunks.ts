import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userStoreKey } from ".";
import { removeCookies } from "../cookies";
import { errorAlert, errorSideAlert, successAlert } from "../alerts";
import Cookies from "universal-cookie";

const basePath = import.meta.env.VITE_API_BASE_URL;
const userPath = `${basePath}/users`;
const userProfileImagePath = `${basePath}/userimage`;

const cookies = new Cookies();

export const getUserData = createAsyncThunk(
  `${userStoreKey}/getUserData`,
  async (_, thunkApi) => {
    try {
      const response = await axios.get(`${userPath}/me`);

      const isAdmin = cookies.get('admin-token');

      return {
        response: response.data,
        isAdmin,
      };
    } catch (error) {
      thunkApi.dispatch(removeCookies('jwt'));
    }
  }
);

export const getUserProfileImage = createAsyncThunk(
  `${userStoreKey}/getUserProfileImage`,
  async (_, thunkApi) => {
    try {
      const response = await axios.get(`${userProfileImagePath}`);

      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorSideAlert('Error getting the user profile image. Please, try again later.'));
    }
  }
);

export const addUserProfileImage = createAsyncThunk(
  `${userStoreKey}/addUserProfileImage`,
  async (data: FormData, thunkApi) => {
    try {
      await axios.post(`${userProfileImagePath}/add-userimage`, data);
      
      thunkApi.dispatch(getUserProfileImage());
      thunkApi.dispatch(successAlert('Profile image added successfully'));
      return { success: true }
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error adding the user profile image. Please, try again later.'));
    }
  }
);

export const deleteUserProfileImage = createAsyncThunk(
  `${userStoreKey}/deleteUserProfileImage`,
  async (userId: string, thunkApi) => {
    try {
      await axios.post(`${userProfileImagePath}/delete-userimage`, userId);

      thunkApi.dispatch(getUserProfileImage());
      thunkApi.dispatch(successAlert('Profile image removed successfully'));
      return { success: true }
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error removing the user profile image. Please, try again later.'));
    }
  }
);