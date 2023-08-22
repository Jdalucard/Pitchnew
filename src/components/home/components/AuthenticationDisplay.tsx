import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import { socialNetworks } from "../../../constants";
import { getFromQueryParams } from "../../../common";
import { useAppDispatch } from "../../../redux/hooks";
import { setCookies, setUserJWT } from "../../../redux/cookies";
import { requestSocialAuthenticationHelper } from "../../../redux/authentication/components";
import { closeLoadingModal, openLoadingModal } from "../../../redux/alerts";
import { processRegularAuthentication } from "../../../redux/authentication";
import { SocialAuthenticationButton } from ".";
import styles from './AuthenticationDisplay.module.css';

interface IProps {
  isInvite: boolean,
  toggleForgotPassword: () => void,
}

export function AuthenticationDisplay({ isInvite, toggleForgotPassword }: IProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    isSignIn: !isInvite,
  });

  const { email, password, isSignIn } = userData;
  const loginDisabled = !email || !password;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const signInOrUpWithSocial = (network: socialNetworks) => {
    const queryParams = window.location.search.substring(1).split('&');

    const inviteToken = getFromQueryParams(queryParams, 'inv');
    
    dispatch(setCookies({
      key: 'inviteToken',
      value: inviteToken || '',
    }));

    dispatch(setCookies({
      key: 'authNetwork',
      value: network,
    }));

    requestSocialAuthenticationHelper({
      socialSite: network,
      isSignIn,
      dispatch,
    });
  }

  const regularSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(openLoadingModal('Authenticating'));

    const loginData = { email, password }

    const token = await dispatch(processRegularAuthentication(loginData)).unwrap();

    if (token) {
      dispatch(setUserJWT(token));
      dispatch(closeLoadingModal());
      navigate('/main/academy');
    }
  }

  return (
    <>
      <div className={styles.socialButtons}>
        <SocialAuthenticationButton
          network={socialNetworks.LINKEDIN}
          onClick={() => signInOrUpWithSocial(socialNetworks.LINKEDIN)}
        />
        <SocialAuthenticationButton
          network={socialNetworks.GOOGLE}
          onClick={() => signInOrUpWithSocial(socialNetworks.GOOGLE)}
        />
        <SocialAuthenticationButton
          network={socialNetworks.FACEBOOK}
          onClick={() => signInOrUpWithSocial(socialNetworks.FACEBOOK)}
        />
        <SocialAuthenticationButton
          network={socialNetworks.MICROSOFT}
          onClick={() => signInOrUpWithSocial(socialNetworks.MICROSOFT)}
        />
      </div>
      <h5 className={styles.credentialsTitle}>Log in with credentials</h5>
      {isSignIn &&
        <form onSubmit={regularSignIn} style={{ width: '100%' }}>
          <div className={styles.credentialsContent}>
            <TextField
              type="email"
              name="email"
              label="Email"
              onChange={handleInputChange}
              value={email}
              placeholder={"someone@email.com"}
              inputProps={{ min: 3, max: 40 }}
              fullWidth
              required
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              onChange={handleInputChange}
              value={password}
              placeholder="myPassword123"
              inputProps={{ min: 6, max: 40 }}
              fullWidth
              required
            />
          </div>
          <div className={styles.forgotPasswordClick}>
            <p onClick={toggleForgotPassword}>
              Forgot your password?
            </p>
          </div>
          <div className="main-action-button-wrapper">
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={loginDisabled}
              fullWidth
            >
              Log in
            </Button>
          </div>
          <div className={styles.usagePolicyClick}>
            <a href="data-usage-policy" target="_blank">Data Usage Policy</a>
          </div>
        </form>
      }
    </>
  );
} 