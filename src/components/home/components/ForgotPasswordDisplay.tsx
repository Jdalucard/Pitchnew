import { useState } from "react"
import { Button, TextField } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { closeLoadingModal, errorAlert, openLoadingModal } from "../../../redux/alerts";
import { processResetPassword } from "../../../redux/authentication";

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

    const response = await dispatch(processResetPassword({ email: userEmail })).unwrap();

    if (!response.success) {
      dispatch(errorAlert({ error: 'An unexpected error occured, please try again later' }))
    } else {
      setEmailIsSet(true);
    }

    dispatch(closeLoadingModal());
  }

  return (
    <>
      <div className="col-12">
        <h3>Reset password</h3>
      </div>
      {!emailIsSent ?
        <div className="col-12">
          <form onSubmit={resetPassword}>
            <div className="row">
              <div className="col-12 password-explain-text">
                <p>
                  Enter your account's email address and we will reset and send you a provisional password
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 forgot-email-input">
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  onChange={handleInputChange}
                  value={userEmail}
                  placeholder={"someone@email.com"}
                  inputProps={{ min: 3, max: 40 }}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6">
                <Button variant="outlined" color="primary" onClick={toggleForgotPassword}>
                  Cancel
                </Button>
              </div>
              <div className="col-12 col-sm-6">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={toggleForgotPassword}
                >
                  Reset Password
                </Button>
              </div>
            </div>
          </form>
        </div>
        :
        <>
          <div className="col-12 password-explain-text">
            <p>
              An email has been sent to the address you provided if there is a user account associated with it
            </p>              
          </div>
          <div className="col-12 offset-0 offset-sm-2 col-sm-8">
            <div className="col-12 col-sm-6">
              <Button variant="outlined" color="primary" onClick={toggleForgotPassword}>
                Back to sign in screen
              </Button>
            </div>
          </div>
        </>
      }
    </>
  );
}