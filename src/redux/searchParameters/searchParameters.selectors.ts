import { type RootState } from '../store';

const isLoading = (state: RootState) => state.searchParameters.isLoading;

export const searchParametersSelectors = { isLoading };
