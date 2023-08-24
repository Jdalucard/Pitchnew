import { type RootState } from '../store';

const isLoading = (state: RootState) => state.template.isLoading;

export const templateSelectors = { isLoading };
