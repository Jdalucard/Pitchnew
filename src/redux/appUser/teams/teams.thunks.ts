import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { teamsStoreKey } from "./teams.const";
import { errorAlert } from "../../alerts";
const basePath = import.meta.env.VITE_API_BASE_URL;
const TEAMS_ENDPOINT = "/teams/";

export const createTeam = createAsyncThunk(
  `${teamsStoreKey}/createTeam`,
  async (_, thunkApi) => {
    try {
      const response = await axios.post(basePath + TEAMS_ENDPOINT, {});
      return response.data;
    } catch (error) {
      thunkApi.dispatch(
        errorAlert("Error creating the team. Try again later.")
      );
    }
  }
);

export const issueInvitation = createAsyncThunk(
  `${teamsStoreKey}/issueInvitation`,
  async ({ team, email }, thunkApi) => {
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
      thunkApi.dispatch(
        errorAlert("Error issuing an invitation. Try again later.")
      );
    }
  }
);

export const getTeam = createAsyncThunk(
  `${teamsStoreKey}/getTeam`,
  async (id, thunkApi) => {
    try {
      const response = await axios.get(basePath + TEAMS_ENDPOINT + id);
      return response.data;
    } catch (error) {
      thunkApi.dispatch(
        errorAlert("Error  the specified team. Try again later.")
      );
    }
  }
);

export const removeUserTeam = createAsyncThunk(
  `${teamsStoreKey}/removeUserTeam`,
  async ({ teamId, email }, thunkApi) => {
    try {
      const response = await axios.delete(
        basePath + TEAMS_ENDPOINT + teamId + "/users/" + email
      );
      return response.data;
    } catch (error) {
      thunkApi.dispatch(
        errorAlert("Error deleting the specified team. Try again later.")
      );
    }
  }
); 

