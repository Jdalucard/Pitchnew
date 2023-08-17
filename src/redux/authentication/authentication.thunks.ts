import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { socialNetworks } from "../../constants";
import { authenticationStoreKey } from ".";
import { errorAlert } from "../alerts";

interface IRequestSocialAuthentication {
  socialSite: socialNetworks,
  isSignIn: boolean,
  isEmailConfiguration?: boolean,
}

export interface IProcessSocialAuthenticationBody {
  code: string,
  isSignIn: boolean,
  invitationToken?: string, // TODO: This should be a boolean and the backend should expect so
}

interface IProcessSignConfiguration {
  jwt: string,
  authNetwork: socialNetworks,
  sendBody: IProcessSocialAuthenticationBody,
}

interface IProcessProcessSocialAuthentication {
  authNetwork: socialNetworks,
  sendBody: IProcessSocialAuthenticationBody,
}

interface IProcessEmailConfiguration {
  jwt: string,
  emailAuthNetwork: socialNetworks,
  sendBody: {
    code: string,
    state?: string,
  }
}

const basePath = import.meta.env.REACT_APP_API_BASE_URL;
const authPath = `${basePath}/auth`;
const emailConfigPath = `${basePath}/email-accounts`;

export const requestSocialAuthentication = createAsyncThunk(
  `${authenticationStoreKey}/requestSocialAuthentication`,
  async (params: IRequestSocialAuthentication, thunkApi) => {
    const { socialSite, isSignIn, isEmailConfiguration } = params;
    let requestPath: string | undefined;

    if (isEmailConfiguration) {
      requestPath = `${basePath}/email-accounts/${socialSite}`;
    } else {
      requestPath = `${authPath}/${socialSite}?isSignIn=${isSignIn}`;
    }

    try {
      const response = await axios.get(requestPath);

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        thunkApi.dispatch(errorAlert({ error: error.message }));
        // TODO: Validate this is working
      }
    }
  }
);

export const processSocialAuthentication = createAsyncThunk(
  `${authenticationStoreKey}/processSocialAuthentication`,
  async (params: IProcessProcessSocialAuthentication, thunkApi) => {
    const { authNetwork, sendBody } = params;
    
    try {
      const response = await axios.post(`${authPath}/${authNetwork}/login`, sendBody);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;

      if (err.response) {
        return thunkApi.rejectWithValue(err.response.data);
      } else {
        throw error;
      }
      // TODO: Validate this is working
      // TODO: Create a common catch error handler so we don't repeat code
    }
  }
);

export const processSignConfiguration = createAsyncThunk(
  `${authenticationStoreKey}/processSignConfiguration`,
  async (params: IProcessSignConfiguration, thunkApi) => {
    const { jwt, authNetwork, sendBody } = params;

    try {
      const response = await axios.put(`${basePath}/users/social-login/${authNetwork}`, sendBody, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;

      if (err.response) {
        return thunkApi.rejectWithValue(err.response.data);
      } else {
        throw error;
      }
    }
  }
);

export const processEmailConfiguration = createAsyncThunk(
  `${authenticationStoreKey}/processEmailConfiguration`,
  async (params: IProcessEmailConfiguration, thunkApi) => {
    const { jwt, emailAuthNetwork, sendBody } = params;
    let requestPath: string | undefined;

    if (emailAuthNetwork === socialNetworks.GMAIL) {
      requestPath = `${emailConfigPath}/gmail-activation`;
    } else {
      requestPath = `${emailConfigPath}/${emailAuthNetwork}/configure`;
    }

    try {
      const response = await axios.post(requestPath, sendBody, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });

      return response.data;
    } catch (error) {
      const err = error as AxiosError;

      if (err.response) {
        return thunkApi.rejectWithValue(err.response.data);
      } else {
        throw error;
      }
    }
  }
)