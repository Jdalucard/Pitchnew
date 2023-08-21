import React, { useState } from "react"
import { Button, TextField } from '@mui/material';
import { socialNetworks } from "../../../constants";
import { getFromQueryParams } from "../../../common";
import { useAppDispatch } from "../../../redux/hooks";
import { setCookies, setUserJWT } from "../../../redux/cookies";
import { requestSocialAuthenticationHelper } from "../../../redux/authentication/components";
import { closeLoadingModal, openLoadingModal } from "../../../redux/alerts";
import { processRegularAuthentication } from "../../../redux/authentication";
import { useNavigate } from "react-router-dom";
import { SocialAuthenticationButton } from ".";

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
      key: 'authNetWork',
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
      <div className="col-12 social justify-content-center">
        <SocialAuthenticationButton
          network={socialNetworks.LINKEDIN}
          onClick={() => signInOrUpWithSocial(socialNetworks.LINKEDIN)}
        />
      </div>
      <div className="col-12 social justify-content-center">
        <SocialAuthenticationButton
          network={socialNetworks.GOOGLE}
          onClick={() => signInOrUpWithSocial(socialNetworks.GOOGLE)}
        />
      </div>
      <div className="col-12 social justify-content-center">
        <SocialAuthenticationButton
          network={socialNetworks.FACEBOOK}
          onClick={() => signInOrUpWithSocial(socialNetworks.FACEBOOK)}
        />
      </div>
      <div className="col-12 social justify-content-center">
        <SocialAuthenticationButton
          network={socialNetworks.MICROSOFT}
          onClick={() => signInOrUpWithSocial(socialNetworks.MICROSOFT)}
        />
      </div>
      {isSignIn &&
        <div className="col-12">
          <form onSubmit={regularSignIn}>
            <div className="row regular-auth-section">
              <div className="col-12 regular-auth-label">
                <h5>Sign In with PitchDB's credentials</h5>
              </div>
            </div>
            <div className="row credentials-cont">
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
              <div className="lower-links-wrapper forgot-password">
                <p onClick={toggleForgotPassword}>
                  Forgot your password?
                </p>
              </div>
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
            <div className="privacy-links">
              <a href="data-usage-policy" target="_blank">Data Usage Policy</a>
            </div>
          </form>
        </div>
      }
    </>
  );
} 