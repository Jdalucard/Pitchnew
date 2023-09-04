import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { teamsStoreKey } from './teams.const'
import { errorAlert } from '../alerts'
import { RootState } from '../store'
import { Team } from './teams.slice'

const basePath = import.meta.env.VITE_API_BASE_URL
const TEAMS_ENDPOINT = '/teams/'

interface IIussueInvitation{
  team: string | null
  emails: string [];
  teamId: string | null
}

export const createTeam = createAsyncThunk(
  `${teamsStoreKey}/createTeam`,
  async (_, thunkApi) => {
    try {
      const response = await axios.post(basePath + TEAMS_ENDPOINT, {});

      const { teamId, team, } = response.data;
      const newTeam: Team = {
        teamId,
        team,
        emails: [],
      };
      return newTeam
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error creating the team. Try again later.'))
    }
  }
)

export const issueInvitation = createAsyncThunk(
  `${teamsStoreKey}/issueInvitation`,
  async (params: IIussueInvitation, thunkApi) => {
    try {
      const response = await axios.post(
        `${basePath}${TEAMS_ENDPOINT}/invitation`,
        params
      );

      const { teamId, emails } = response.data;
      const updateEmails: string[] = [];
      const state = thunkApi.getState() as RootState;

      if (state.teams.team && state.teams.team.teamId === teamId) {
        state.teams.team.emails.map((existingEmail) => {
          if (existingEmail !== emails) {
            updateEmails.push(emails);
          }
        }
      }

      return updateEmails;
    } catch (error) {
      thunkApi.dispatch(
        errorAlert('Error issuing an invitation. Try again later.')
      );
      throw error; // Rethrow the error to inform the caller that an error occurred.
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
        errorAlert('Error retrieving the specified team. Try again later.')
      );
    }
  }
);
export const removeUserTeam = createAsyncThunk(
  `${teamsStoreKey}/removeUserTeam`,
  async (params: IIussueInvitation, thunkApi) => {
    try {
      const { team, emails } = params;
      const url = `${basePath}${TEAMS_ENDPOINT}/${team}/users/${email}`;
      await axios.delete(url); 
      return { team, emails }; 
    } catch (error) {
      thunkApi.dispatch(
        errorAlert('Error deleting the specified team. Try again later.')
      );
    }
  }
);