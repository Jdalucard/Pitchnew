import { type RootState } from '../store';

const isLoading = (state: RootState) => state.subscription.isLoading;
const userSubscription = (state: RootState) => state.subscription.userSubscription;
const credits = (state: RootState) => state.subscription.credits;

export const subscriptionSelectors = { isLoading, userSubscription, credits };
