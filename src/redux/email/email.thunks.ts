import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { emailStoreKey } from ".";
import { errorAlert } from "../alerts";

interface IGetEmailSignature {
    isSignIn: boolean,
    userId: string,
}

interface IEditEmail {
    isSignIn: boolean,
    id: boolean,
    idNote: string,
    note: IEmail
}

interface IEmail {
    subject: string,
    content: string,
    date: Date,
    editDate: Date
}

const basePath = import.meta.env.VITE_API_BASE_URL;

const EMAIL_ACCOUNTS_ENDPOINT = '/email-accounts/';


export const getEmailSignature = createAsyncThunk(
    `${emailStoreKey}/getemailsignature`,
    async (params: IGetEmailSignature, thunkApi) => {
        const { isSignIn, userId } = params;
        let requestPath: string | undefined;

        if (isSignIn) {
            requestPath = basePath + EMAIL_ACCOUNTS_ENDPOINT + userId + '/getemailsignature';
        } else {
            requestPath = ``;
        }
        try {
            const response = await axios.get(requestPath);

            return response.data[0].emailsignature;

        } catch (error) {

            const err = error as AxiosError<string>;
            if (err.response) {
                thunkApi.dispatch(
                    errorAlert({ error: (err.response.data ?? 'Error, please try again later.') })
                );
            } else {
                throw error;
            }

        }
    }
);
