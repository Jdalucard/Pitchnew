import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { emailStoreKey } from ".";
import { errorAlert } from "../alerts";
import { IUserData } from '../../types';

interface IEmailAccountData {
    emailval: string,
    message: string,
    emailAccountData: IUserData,
    subject: string
}


interface IGetEmailSignature {
    userId: string,
}

interface ISendEmail {
    note: IEmailAccountData
}

interface IGetEmailReport {
    id: string,
}



const basePath = import.meta.env.VITE_API_BASE_URL;

const EMAIL_ACCOUNTS_ENDPOINT = '/email-accounts/';

const ADD_TEMPLATE_ENDPOINT = '/email-templates/';

export const sendEmail = createAsyncThunk(
    `${emailStoreKey}/sendemail`,
    async (params: ISendEmail) => {
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
    async (params: IGetEmailSignature) => {
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



/****************************************REPORT AREA*****************************************/


export const getEmailReport = createAsyncThunk(
    `${emailStoreKey}/getemailreport`,
    async (params: IGetEmailReport) => {
        const { id } = params;

        try {
            const requestPath = basePath + ADD_TEMPLATE_ENDPOINT + id + "/email-validity";
            const response = await axios.get(requestPath);

            return response.data;

        } catch (error) {

            errorAlert('Error, please try again later.')

        }
    }
);
