import { createSlice } from "@reduxjs/toolkit";
import { teamsStoreKey } from "./teams.const";

import {
  createTeam,
  issueInvitation,
  getTeam,
  removeUserTeam,
} from "./teams.thunks";

//interfaz del equipo
interface Team {
  team: string | null;
  teamId: string | null;
  users: { email: string }[];
}

//  estado del equipo
interface TeamState {
  isLoading: boolean;
  team: Team | null;
  teamId: string;
  users: Team["users"];
}

export const initialState: TeamState = {
  isLoading: false,
  team: null,
  teamId: "",
  users: [],
};

export const teamsSlice = createSlice({
  name: teamsStoreKey,
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    /* CREATE TEAMS  */
    builder.addCase(createTeam.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(createTeam.rejected, (state) => {
        state.isLoading = false;
      });
    builder.addCase(createTeam.fulfilled, (state, action) => {
      state.isLoading = false;
      const newUsers = [...state.users, ...action.payload];
      state.users = newUsers;
    }),
      /* ISSUE INVITATION  */
      builder.addCase(issueInvitation.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(issueInvitation.fulfilled, (state, action) => {
        const { teamId, email } = action.payload;
        if (state.team && state.team.teamId === teamId) {
          const updatedUsers = state.team.users.map((existingUser) =>
            existingUser.email === email
              ? { ...existingUser, email: email }
              : existingUser
          );

          state.team = {
            ...state.team,
            users: updatedUsers,
          };
        }
      });
    builder.addCase(issueInvitation.rejected, (state) => {
      state.isLoading = false;
    });

    /* GETTEAM */
    builder.addCase(getTeam.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTeam.fulfilled, (state, action) => {
      state.isLoading = false;
      state.team = action.payload;
    });
    builder.addCase(getTeam.rejected, (state) => {
      state.isLoading = false;
    });

    /* REMOVE USERTEAM*/
    builder.addCase(removeUserTeam.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeUserTeam.fulfilled, (state, action) => {
      state.isLoading = false;
      const { teamId, email } = action.payload;
      const currentTeam = state.team;

      if (currentTeam && currentTeam.teamId === teamId) {
        const updatedUsers = currentTeam.users.filter(
          (existingUser) => existingUser.email !== email
        );

        state.team = {
          ...currentTeam,
          users: updatedUsers,
        };
      }
    });
    builder.addCase(removeUserTeam.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
