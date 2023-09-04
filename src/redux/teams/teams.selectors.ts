import { type RootState } from '../store';

const teams = (state: RootState) => state.teams.team;

export const teamsSelectors = { teams };
