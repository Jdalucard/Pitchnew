import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userStoreKey } from ".";
import { removeCookies } from "../cookies";

const userPath = `${import.meta.env.VITE_API_BASE_URL}/users`;

export const getUserData = createAsyncThunk(
  `${userStoreKey}/getUserData`,
  async (token: string, thunkApi) => {
    try {
      const response = await axios.get(`${userPath}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      thunkApi.dispatch(removeCookies('jwt'));
    }
  }
)