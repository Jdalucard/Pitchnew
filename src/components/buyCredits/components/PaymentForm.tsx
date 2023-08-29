import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Token } from "@stripe/stripe-js";
import { IBundle, ISubscription } from ".";
import styles from '../BuyCredits.module.css';
import { Button, Typography } from "@mui/material";
import { formatToTitleCase } from "../../../common";
import { IUserSubscription } from "../../../redux/subscription";

interface IProps {
  userPlan: IUserSubscription | null,
  selectedPlan?: ISubscription,
  selectedBundle?: IBundle,
  processPaySubscription?: (token: Token) => void,
  processPayBundle?: (token: Token) => void,
  upgradePlan?: () => void,
  
}

export function PaymentForm({
  userPlan,
  selectedPlan,
  selectedBundle,
  processPaySubscription,
  processPayBundle,
  upgradePlan,
}: IProps) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cardElement = elements?.getElement(CardElement);

    if (cardElement) {
      const response = await stripe?.createToken(cardElement);

      if (response?.token) {
        if (processPaySubscription) {
          processPaySubscription(response.token);
        } else if (processPayBundle) {
          processPayBundle(response.token);
        }
      }
    }
  }

  return (
    <div className={styles.paymentForm}>
      {processPaySubscription ? (
        <>
          <Typography variant="body1" color="text.primary" fontWeight="bold">
            Upgrade to {selectedPlan?.name} plan.
          </Typography>
          {selectedPlan?.description && (
            <Typography variant="body1" color="text.primary">
              Upgrade to {selectedPlan?.name} plan.
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            Note: If you already have a plan, purchasing this new plan will replace the previous one.
            You will be credited/debited the proration changes at the start of the next billing month.
          </Typography>
        </>
      ) : (
        <Typography variant="body1" color="text.primary">
          You selected the {formatToTitleCase(selectedBundle?.type ?? '')} bundle.
        </Typography>
      )}
      <Typography variant="body1" color="text.primary">
        Total to pay: {`${selectedPlan ? selectedPlan.price : selectedBundle?.price}`} {`${selectedPlan ? `/ ${selectedPlan.interval}` : ''}`}
      </Typography>      
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" color="text.primary">
          Enter your payment information:
        </Typography>
        <CardElement />
        {selectedPlan ? (
          <>
            {userPlan ? (
              <Button
                variant="contained"
                color="primary"
                onClick={upgradePlan}
              >
                Change plan
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Pay upgrade
              </Button>
            )}
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Pay bundle
          </Button>
        )}
      </form>
    </div>
  )
}