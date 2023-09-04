import { type RootState } from "../store";

const teamsid = (state: RootState) => state.teams.teamId;
const teams = (state: RootState) => state.teams.team;
const teamsUser = (state: RootState) => state.teams.users;

export const teamsSelectors = { teamsid, teams, teamsUser };
