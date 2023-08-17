import Cookies from "universal-cookie";
import { getFromQueryParams, verifyStateFromQueryParams } from "../../../common";
import { processEmailConfiguration } from "..";
import { setCookies } from "../../cookies";
import { authMessages } from "../../../constants";
import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";

interface IProps {
  dispatch: ThunkDispatch<{
    cookies: null;
    alerts: null;
    authentication: { isLoading: boolean };
}, undefined, AnyAction> & Dispatch<AnyAction>
}

export async function processEmailConfigurationHelper({ dispatch }: IProps) {
  const cookies = new Cookies();
  const jwt = cookies.get('jwt');
  
  //TODO: check this out. It previously used substr(1)
  const queryParams = window.location.search.substring(1).split('&');

  if (verifyStateFromQueryParams(queryParams)) {
    const emailAuthNetwork = cookies.get('emailAuthNetwork');
    
    const sendBody = {
      code: getFromQueryParams(queryParams, 'code') || '',
      state: getFromQueryParams(queryParams, 'state'),
    }

    const response = await dispatch(processEmailConfiguration({ jwt, emailAuthNetwork, sendBody })).unwrap();

    // TODO: test this. For sure it's not working properly. I need to check the console.log
    console.log(JSON.stringify(response))
    if (response.error) {
      dispatch(setCookies({
        key: authMessages.COOKIES_EMAIL_ERROR,
        value: response.error,
      }));

      window.opener.postMessage(authMessages.POST_EMAIL_ERROR, window.opener.origin);
    } else {
      window.opener.postMessage("email-config", window.opener.origin);
    }

    setTimeout(window.close, 400);
  } else {
    dispatch(setCookies({
      key: authMessages.COOKIES_AUTH_ERROR,
      value: "There was a problem performing the " + (cookies.get('isSignIn') === "true" ? "sign-in" : "sign-out") + ", please try again."
    }))
    window.opener.postMessage(authMessages.POST_AUTH_ERROR, window.opener.origin);

    setTimeout(window.close, 400);
  }
}