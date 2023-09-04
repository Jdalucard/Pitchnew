import { createSlice } from "@reduxjs/toolkit";
import { teamsStoreKey } from "./teams.const";
import {
  createTeam,
  getTeam,
  removeUserTeam,
  issueInvitation
} from "./teams.thunks";

//interfaz del equipo
 export interface Team {
  team: string | null;
  teamId: string | null;
  emails: string[]
}

//  estado del equipo
interface TeamState {
  isLoading: boolean;
  team: Team | null;

}

export const initialState: TeamState = {
  isLoading: false,
  team: null,
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
    builder.addCase(createTeam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.team=action.payload ?? null;
      }),
    builder.addCase(createTeam.rejected, (state) => {
        state.isLoading = false;
      });
      /*ISSUEINVITATION*/
    builder.addCase(issueInvitation.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(issueInvitation.fulfilled, (state, action) => {
      state.isLoading = false;
      if (state.team) {
        state.team = {
          ...state.team,
          emails: action.payload
        };
      } else {
        state.team = {
          teamId: null,
          team: null,
          emails: action.payload
        };
      }
    });
    builder.addCase(issueInvitation.rejected, (state) => {
      state.isLoading = false;
    })
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
   
    builder.addCase(removeUserTeam.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
