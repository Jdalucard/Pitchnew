import { useState } from "react"
import { Button, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { closeLoadingModal, errorAlert, openLoadingModal } from "../../../redux/alerts";
import { processResetPassword } from "../../../redux/authentication";
import styles from './ForgotPasswordDisplay.module.css';

interface IProps {
  toggleForgotPassword: () => void,
}

export function ForgotPasswordDisplay({ toggleForgotPassword }: IProps) {
  const dispatch = useAppDispatch();

  const [userEmail, setUserEmail] = useState('');
  const [emailIsSent, setEmailIsSet] = useState(false);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  }

  const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(openLoadingModal('Sending email'));

    await dispatch(processResetPassword({ email: userEmail }));

    setEmailIsSet(true);
    
    dispatch(closeLoadingModal());
  }

  return (
    <>
      <Typography variant="h5" color="text.primary">
        Reset password
      </Typography>
      {!emailIsSent ? (
        <form onSubmit={resetPassword}>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ m: '1rem 0', textAlign: 'center' }}
          >
            Enter your account's email address and we will reset and send you a provisional password.
          </Typography>
          <TextField
            type="email"
            name="email"
            label="Email"
            onChange={handleInputChange}
            value={userEmail}
            placeholder={"someone@email.com"}
            inputProps={{ min: 3, max: 40 }}
            fullWidth
            required
          />
          <div className={styles.buttonWrapper}>
            <Button variant="outlined" color="primary" onClick={toggleForgotPassword}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={toggleForgotPassword}
              disabled={!userEmail}
            >
              Reset Password
            </Button>
          </div>
        </form>
      ) : (
        <>
          <Typography variant="body1" color="text.primary">
            An email has been sent to the address you provided if there is a user account associated with it
          </Typography>
          <div className={styles.buttonWrapper}>
            <Button variant="outlined" color="primary" onClick={toggleForgotPassword}>
              Back to sign in screen
            </Button>
          </div>
        </>
      )}
    </>
  );
}