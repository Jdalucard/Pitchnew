import { useCallback, useEffect, useState } from "react";
import { Token, loadStripe } from "@stripe/stripe-js";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getBundlePlans, payBundle, subscriptionSelectors } from "../../../redux/subscription";
import { IBuyingItem } from "../BuyCredits";
import styles from '../BuyCredits.module.css';
import { Button, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentForm } from ".";

export interface IBundle {
  _id: string,
  type: string,
  amount: number,
  price: number,
}

interface IProps {
  isLoading: boolean,
  beginTransaction: boolean,
  toggleBeginTransaction: (beginTransaction: boolean) => void,
  toggleSuccessItem: (item: IBuyingItem) => void,
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export function Bundles({
  isLoading,
  beginTransaction,
  toggleBeginTransaction,
  toggleSuccessItem,
}: IProps) {
  const dispatch = useAppDispatch();
  
  const userPlan = useAppSelector(subscriptionSelectors.userSubscription);

  const [plans, setPlans] = useState<IBundle[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<IBundle | null>(null);

  const fetchPlans = useCallback(async () => {
    if (!plans.length) {
      const response = await dispatch(getBundlePlans()).unwrap();
  
      if (response) {
        setPlans(response);
      }
    }
  }, [dispatch, plans]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleSelectPlan = (selectedPlan: IBundle) => {
    toggleBeginTransaction(true);
    setSelectedPlan(selectedPlan);
  }

  const processPayBundle = async (token: Token) => {
    const bundleId = selectedPlan?._id;

    if (bundleId) {
      const response = await dispatch(payBundle({
        token,
        bundleId,
      })).unwrap();

      if (response?.success) {
        toggleSuccessItem({
          selectedBundle: selectedPlan,
        });
      }
    }
  }
  
  return (
    <>
      {!beginTransaction ? (
        <div className={styles.planOptions}>
          <Typography variant="h3" color="text.primary">
            Pitch refills
          </Typography>
          {plans.map((plan, index) => {
            return (
              <div className={styles.bundleItem} key={index}>
                <div className="header">
                  <Typography variant="h5" color="text.primaryInverted">{plan.type}</Typography>
                </div>
                <Typography variant="body1" color="text.primary">{plan.amount} pitch{plan.amount > 1 ? 'es' : ''}</Typography>
                <Typography variant="body1" color="text.primary">{`$ ${plan.price}`}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSelectPlan(plan)}
                >
                  Purchase bundle
                </Button>
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
              setSelectedPlan(null);
              toggleBeginTransaction(false);
            }}
          >
            Go back   
          </Button>
          <Elements stripe={stripePromise}>
            <PaymentForm
              userPlan={userPlan}
              selectedBundle={selectedPlan ?? undefined}
              processPayBundle={processPayBundle}
            />
          </Elements>
        </div>
      )}
    </>
  );
}