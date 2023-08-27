import { type RootState } from '../store';

const isLoading = (state: RootState) => state.subscription.isLoading;
const userSubscription = (state: RootState) => state.subscription.userSubscription;
const remainingCredits = (state: RootState) => state.subscription.remainingCredits;

export const subscriptionSelectors = { isLoading, userSubscription, remainingCredits };
