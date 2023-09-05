import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { emailStoreKey } from ".";
import { errorAlert, successAlert } from "../alerts";
import { ISendEmail } from '../../types';


interface IGetEmailSignature {
    userId: string,
}

interface IGetEmailReport {
    id: string,
}



const basePath = import.meta.env.VITE_API_BASE_URL;

const EMAIL_ACCOUNTS_ENDPOINT = '/email-accounts/';

const ADD_TEMPLATE_ENDPOINT = '/email-templates/';

export const sendEmail = createAsyncThunk(
    `${emailStoreKey}/sendemail`,
    async (params: ISendEmail, thunkApi) => {

        const { emailData } = params;

        try {
            const requestPath = basePath + ADD_TEMPLATE_ENDPOINT + "sendemail";

            const response = await axios.post(requestPath, emailData)

            if(response.status == 200){

                thunkApi.dispatch(successAlert('The email was sended successfully.'))
            }else{
                thunkApi.dispatch(errorAlert('Oops, something went wrong. Please try again later.'))
            }

            return response.data;

        } catch (error) {
            
            thunkApi.dispatch(errorAlert('Oops, something went wrong. Please try again later.'))

        }
    }
);

//not used yet
export const getEmailSignature = createAsyncThunk(
    `${emailStoreKey}/getemailsignature`,
    async (params: IGetEmailSignature) => {
        const { userId } = params;

        try {
            const requestPath = basePath + EMAIL_ACCOUNTS_ENDPOINT + userId + '/getemailsignature';
            const response = await axios.get(requestPath);

            return response.data[0].emailsignature;

        } catch (error) {

        }
    }
);



/****************************************REPORT AREA*****************************************/

//not used yet
export const getEmailReport = createAsyncThunk(
    `${emailStoreKey}/getemailreport`,
    async (params: IGetEmailReport) => {
        const { id } = params;

        try {
            const requestPath = basePath + ADD_TEMPLATE_ENDPOINT + id + "/email-validity";
            const response = await axios.get(requestPath);

            return response.data;

        } catch (error) {

        }
    }
);
