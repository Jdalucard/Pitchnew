import { createSlice } from "@reduxjs/toolkit";
import {
  createTeamAsync,
  issueInvitationAsync,
  getTeamAsync,
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

const initialState: TeamState = {
  isLoading: false,
  team: null,
  teamId: "",
  users: [],
};

export const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    /* CREATE TEAMS  */
    builder.addCase(createTeamAsync.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(createTeamAsync.rejected, (state, action) => {
        state.isLoading = false;
      });
    builder.addCase(createTeamAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users.push(action.payload);
    }),
      /* ISSUE INVITATION  */
      builder.addCase(issueInvitationAsync.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(issueInvitationAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const { teamId, email } = action.payload;
        if (state.team && state.team.teamId === teamId) {
          state.team.users = state.team.users.map((existingUser) =>
            existingUser.email === email
              ? { ...existingUser, email: email }
              : existingUser
          );
        }
      });
    builder.addCase(issueInvitationAsync.rejected, (state, action) => {
      state.isLoading = false;
    });

    /* GETTEAMASYNC */
    builder.addCase(getTeamAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTeamAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.team = action.payload;
    });
    builder.addCase(getTeamAsync.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
