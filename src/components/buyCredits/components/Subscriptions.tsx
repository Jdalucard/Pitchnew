import { useCallback, useEffect, useState } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { Token, loadStripe } from '@stripe/stripe-js';
import { Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  cancelUserSubscriptionPlan,
  getSubscriptionPlans,
  paySubscription,
  subscriptionSelectors,
  updateUserSubscriptionPlan,
} from "../../../redux/subscription";
import { IBuyingItem } from "../BuyCredits";
import { openConfirmation } from "../../../redux/alerts/alerts.thunks";
import styles from '../BuyCredits.module.css';
import { PaymentForm } from ".";

export interface ISubscription {
  id: string,
  price: number,
  interval: string,
  name?: string,
  description?: string,
}

interface IProps {
  isLoading: boolean,
  beginTransaction: boolean,
  toggleBeginTransaction: (beginTransaction: boolean) => void,
  toggleSuccessItem: (item: IBuyingItem) => void,
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export function Subscriptions({
  isLoading,
  beginTransaction,
  toggleBeginTransaction,
  toggleSuccessItem
}: IProps) {
  const dispatch = useAppDispatch();

  const userPlan = useAppSelector(subscriptionSelectors.userSubscription);

  const [plans, setPlans] = useState<ISubscription[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<ISubscription | null>(null);

  const fetchPlans = useCallback(async () => {
    const response = await dispatch(getSubscriptionPlans()).unwrap();

    if (response) {
      setPlans(response);
    }
  }, [ dispatch]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleSelectPlan = (selectedPlan: ISubscription) => {
    toggleBeginTransaction(true);
    setSelectedPlan(selectedPlan);
  }

  const processPaySubscription = async (token: Token) => {
    const planId = selectedPlan?.id;

    if (planId) {
      const response = await dispatch(paySubscription({
        token,
        planId,
      })).unwrap();

      if (response?.success) {
        toggleSuccessItem({
          selectedPlan,
        });
      }
    }
  }

  const upgradePlan = async () => {
    const planId = selectedPlan?.id;

    if (planId) {
      const response = await dispatch(updateUserSubscriptionPlan(planId)).unwrap();

      if (response) {
        toggleSuccessItem({ selectedPlan });        
      }
    }
  }
  
  const cancelPlan = async () => {
    const confirmation = await dispatch(openConfirmation({
      message: 'Cancel your current plan?',
      confirmMessage: 'Cancel plan',
    })).unwrap();

    if (confirmation) {
      dispatch(cancelUserSubscriptionPlan());
    }
  }

  return (
    <>
      {!beginTransaction ? (
        <div className={styles.planOptions}>
          <Typography variant="h3" color="text.primary">
            Subscription plans
          </Typography>
          {userPlan && (
            <>
              <div className={styles.userPlanWrapper}>
                <Typography variant="h5" color="text.primary">Your current plan:</Typography>
                <Typography variant="body1" color="text.primary">{userPlan.type}</Typography>
                <Typography variant="body1" color="text.primary">
                  Credits per month: {userPlan.credits ?? 'Infinite!'}
                </Typography>
              </div>
              {!userPlan?.scheduledToCancel ? (
                <>
                  <Typography variant="body1" color="text.primary">
                    Canceling your current plan will remove all the pitches that you gained from it when the current billing month ends.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={cancelPlan}
                  >
                    Cancel plan
                  </Button>
                </>
              ) : (
                <Typography variant="body1" color="text.primary">
                  You have scheduled to cancel your subscription at the end of the month.
                </Typography>
              )}
            </>
          )}
          {plans.map((plan, index) => {
            return (
              <div className={styles.planItem} key={index}>
                <div className="header">
                  <Typography variant="h5" color="text.primaryInverted">{plan.name ?? `Plan #${index}`}</Typography>
                </div>
                <Typography variant="body1" color="text.primary">{plan.description ?? ''}</Typography>
                <Typography variant="body1" color="text.primary">{`${plan.price} / ${plan.interval}`}</Typography>
                {userPlan?.planId === plan.id ? (
                  <Typography variant="body2" color="text.primary">Selected</Typography>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSelectPlan(plan)}
                  >
                    Purchase plan
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <Button
            variant="outlined"
            color="primary"  
            onClick={() => {
              toggleBeginTransaction(false);
              setSelectedPlan(null);
            }}
          >
            Go back   
          </Button>
          <Elements stripe={stripePromise}>
            <PaymentForm
              upgradePlan={upgradePlan}
              userPlan={userPlan}
              selectedPlan={selectedPlan ?? undefined}
              processPaySubscription={processPaySubscription}
            />
          </Elements>
        </div>
      )}
    </>
  );
}