import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const basePath = import.meta.env.VITE_API_BASE_URL;
const TEAMS_ENDPOINT = "/teams/";

export const createTeamAsync = createAsyncThunk(
  "teams/createTeam",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(basePath + TEAMS_ENDPOINT, {});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const issueInvitationAsync = createAsyncThunk(
  "teams/issueInvitation",
  async ({ team, email }, thunkAPI) => {
    try {
      const response = await axios.post(
        basePath + TEAMS_ENDPOINT + "/invitation",
        {
          team: team,
          email: email,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTeamAsync = createAsyncThunk(
  "teams/getTeam",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(basePath + TEAMS_ENDPOINT + id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
