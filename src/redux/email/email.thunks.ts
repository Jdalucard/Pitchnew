import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { emailStoreKey } from ".";
import { errorAlert } from "../alerts";
import { IUserData } from '../../types';

interface IEmail {
    emailval: string,
    message: string,
    emaiAccountdata: IUserData,
    subject: string
}


interface IGetEmailSignature {
    userId: string,
}

interface ISendEmail {
    note: IEmail
}



const basePath = import.meta.env.VITE_API_BASE_URL;

const EMAIL_ACCOUNTS_ENDPOINT = '/email-accounts/';

const ADD_TEMPLATE_ENDPOINT = '/email-templates/';

export const sendEmail = createAsyncThunk(
    `${emailStoreKey}/sendemail`,
    async (params: ISendEmail, thunkApi) => {
        const { note } = params;

        try {
            const requestPath = basePath + ADD_TEMPLATE_ENDPOINT + "sendemail";

            const response = await axios.post(requestPath, note)

            return response.data;

        } catch (error) {
            
            errorAlert('Error, please try again later.')

        }
    }
);

export const getEmailSignature = createAsyncThunk(
    `${emailStoreKey}/getemailsignature`,
    async (params: IGetEmailSignature, thunkApi) => {
        const { userId } = params;

        try {
            const requestPath = basePath + EMAIL_ACCOUNTS_ENDPOINT + userId + '/getemailsignature';
            const response = await axios.get(requestPath);

            return response.data[0].emailsignature;

        } catch (error) {

            errorAlert('Error, please try again later.')

        }
    }
);


