import { type RootState } from '../store';

const isLoading = (state: RootState) => state.user.isLoading;
const userData = (state: RootState) => state.user.userData;

export const userSelectors = { isLoading, userData };
