import { createSlice } from '@reduxjs/toolkit';
import { subscriptionStoreKey } from './subscription.const';
import {
  addSubscriptionPlanToStripe,
  addUserSubscriptionPlan,
  cancelUserSubscriptionPlan,
  getStripeSubscriptionPlansData,
  getSubscriptionPlans,
  getUserCreditCounter,
  getUserSubscriptionPlan,
  payBundle,
  paySubscription,
  updateUserSubscriptionPlan
} from '.';


interface IState {
  isLoading: boolean,
  userSubscription: string | null,
  remainingCredits: number | null,
}

const initialState: IState = {
  isLoading: false,
  userSubscription: null,
  remainingCredits: null,
};

export const subscriptionSlice = createSlice({
  name: subscriptionStoreKey,
  initialState,
  reducers: {},
  extraReducers(builder) {
    // getSubscriptionPlans
    builder.addCase(getSubscriptionPlans.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(getSubscriptionPlans.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(getSubscriptionPlans.fulfilled, (state) => {
      state.isLoading = false;
    }),
    // paySubscription
    builder.addCase(paySubscription.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(paySubscription.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(paySubscription.fulfilled, (state) => {
      state.isLoading = false;
    }),
    // payBundle
    builder.addCase(payBundle.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(payBundle.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(payBundle.fulfilled, (state) => {
      state.isLoading = false;
    }),
    // getUserCreditCounter
    builder.addCase(getUserCreditCounter.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(getUserCreditCounter.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(getUserCreditCounter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.remainingCredits = action.payload.remaining;
    }),
    // getUserSubscriptionPlan
    builder.addCase(getUserSubscriptionPlan.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(getUserSubscriptionPlan.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(getUserSubscriptionPlan.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload?.type) {
        state.userSubscription = action.payload.type;
      } else {
        state.userSubscription = 'Pay as you pitch';
      }
    }),
    // updateUserSubscriptionPlan
    builder.addCase(updateUserSubscriptionPlan.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(updateUserSubscriptionPlan.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(updateUserSubscriptionPlan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userSubscription = action.payload;
    }),
    // cancelUserSubscriptionPlan
    builder.addCase(cancelUserSubscriptionPlan.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(cancelUserSubscriptionPlan.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(cancelUserSubscriptionPlan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userSubscription = action.payload;
    }),
    // addUserSubscriptionPlan
    builder.addCase(addUserSubscriptionPlan.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(addUserSubscriptionPlan.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(addUserSubscriptionPlan.fulfilled, (state) => {
      state.isLoading = false;
    }),
    // addSubscriptionPlanToStripe
    builder.addCase(addSubscriptionPlanToStripe.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(addSubscriptionPlanToStripe.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(addSubscriptionPlanToStripe.fulfilled, (state) => {
      state.isLoading = false;
    }),
    // getStripeSubscriptionPlansData
    builder.addCase(getStripeSubscriptionPlansData.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(getStripeSubscriptionPlansData.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(getStripeSubscriptionPlansData.fulfilled, (state) => {
      state.isLoading = false;
    })
  },
});