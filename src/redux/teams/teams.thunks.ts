import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { teamsStoreKey } from './teams.const'
import { errorAlert } from '../alerts'
import { RootState } from '../store'
import { Team } from './teams.slice'
const basePath = import.meta.env.VITE_API_BASE_URL
const TEAMS_ENDPOINT = '/teams/'



export const createTeam = createAsyncThunk(
  `${teamsStoreKey}/createTeam`,
  async (_, thunkApi) => {
    try {
      const response = await axios.post(basePath + TEAMS_ENDPOINT, {});

      const { teamId, team, } = response.data;
      const newTeam: Team = {
        teamId,
        team,
        email: [],
      };
      // Obtiene el estado actual
      const state = thunkApi.getState() as RootState;
    
      state.teams.team = newTeam;

      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error creating the team. Try again later.'))
    }
  }
)

export const issueInvitation = createAsyncThunk(
  `${teamsStoreKey}/issueInvitation`,
  async (params: { team: string | null; email: string[] }, thunkApi) => {
    try {
      const response = await axios.post(
        `${basePath}${TEAMS_ENDPOINT}/invitation`,
        params
      );
      // Si la solicitud es exitosa, actualiza el estado aquí
      const { teamId, email } = response.data;
      const state = thunkApi.getState() as RootState;
      
      if (state.teams.team && state.teams.team.teamId === teamId) {
        const updatedEmails = state.teams.team.email.map((existingEmail) =>
          existingEmail === email
            ? email // Actualiza el correo electrónico del usuario
            : existingEmail
        );
      
        state.teams.team = {
          ...state.teams.team,
          email: updatedEmails,
        };
      }
      return response.data;
    } catch (error) {
      thunkApi.dispatch(
        errorAlert('Error issuing an invitation. Try again later.')
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
        errorAlert('Error retrieving the specified team. Try again later.')
      );
    }
  }
);
export const removeUserTeam = createAsyncThunk(
  `${teamsStoreKey}/removeUserTeam`,
  async (params: { team: string | null; email: string[] }, thunkApi) => {
    try {
      const { team, email } = params;
      const url = `${basePath}${TEAMS_ENDPOINT}/${team}/users/${email}`;
      await axios.delete(url); 
      return { team, email }; 
    } catch (error) {
      thunkApi.dispatch(
        errorAlert('Error deleting the specified team. Try again later.')
      );
    }
  }
);