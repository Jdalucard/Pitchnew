import { type RootState } from '../store';

const isLoading = (state: RootState) => state.email.isLoading;

export const emailSelectors = { isLoading };
