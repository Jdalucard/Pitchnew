import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { emailStoreKey } from '.';
import { errorAlert, errorSideAlert, successAlert } from '../alerts';
import { ISendEmail } from '../../types';

const basePath = import.meta.env.VITE_API_BASE_URL;
const EMAIL_ACCOUNTS_ENDPOINT = '/email-accounts/';
const ADD_TEMPLATE_ENDPOINT = '/email-templates/';

export const sendEmail = createAsyncThunk(
  `${emailStoreKey}/sendEmail`,
  async (params: ISendEmail, thunkApi) => {
    const { emailData } = params;

    try {
      const requestPath = basePath + ADD_TEMPLATE_ENDPOINT + 'sendemail';

      const response = await axios.post(requestPath, emailData);

      if (response.status == 200) {
        thunkApi.dispatch(successAlert('The email was sended successfully.'));
      }
      return response.data;
    } catch (error) {
      thunkApi.dispatch(
        errorAlert('Error sending email. Please, try again later.'),
      );
    }
  },
);

//not used yet
export const getEmailSignature = createAsyncThunk(
  `${emailStoreKey}/getEmailSignature`,
  async (userId: string, thunkApi) => {
    try {
      const requestPath =
        basePath + EMAIL_ACCOUNTS_ENDPOINT + userId + '/getemailsignature';
      const response = await axios.get(requestPath);

      return response.data[0].emailsignature;
    } catch (error) {
      thunkApi.dispatch(
        errorSideAlert(
          'Error getting email signature. Please, try again later.',
        ),
      );
    }
  },
);

//not used yet
export const getEmailReport = createAsyncThunk(
  `${emailStoreKey}/getEmailReport`,
  async (id: string, thunkApi) => {
    try {
      const requestPath =
        basePath + ADD_TEMPLATE_ENDPOINT + id + '/email-validity';
      const response = await axios.get(requestPath);

      return response.data;
    } catch (error) {
      thunkApi.dispatch(
        errorSideAlert('Error getting email report. Please, try again later.'),
      );
    }
  },
);
