import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { templateStoreKey } from ".";
import { errorAlert } from "../alerts";


interface IIsSignIn {
    isSignIn: boolean,
}

interface IEditEmailTemplate {
    isSignIn: boolean,
    id: string,
    idNote: string,
    editDate: Date,
    note: IEmail
}

interface IRemoveEmailTemplate {
    isSignIn: boolean,
    id: string,
    idNote: string,
}

interface IEmail {
    subject: string,
    content: string,
    date: Date
}

interface IAddEmailTemplate{
    isSignIn: boolean,
    id: boolean,
    note: IEmail,
}




const basePath = import.meta.env.VITE_API_BASE_URL;

const ADD_TEMPLATE_ENDPOINT = '/email-templates/';

export const addEmailTemplate = createAsyncThunk(
    `${templateStoreKey}/addemailtemplate`,
    async (params: IAddEmailTemplate, thunkApi) => {
        const { id, note, isSignIn } = params;
        let requestPath: string | undefined;

        if (isSignIn) {
            requestPath = basePath + ADD_TEMPLATE_ENDPOINT + id + "/add-template";
        } else {
            requestPath = basePath + ADD_TEMPLATE_ENDPOINT;
        }
        try {
            const response = await axios.put(requestPath, note);

            return response.data;

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

export const getEmaildata = createAsyncThunk(
    `${templateStoreKey}/getEmaildata`,
    async (params: IIsSignIn, thunkApi) => {
        const { isSignIn } = params;
        let requestPath: string | undefined;
    
        if (isSignIn) {
          requestPath = basePath + ADD_TEMPLATE_ENDPOINT;
        } else {
          requestPath = ``;
        }
  
      try {
        const response = await axios.get(requestPath);
  
        return response.data;
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


export const editEmailTemplate = createAsyncThunk(
    `${templateStoreKey}/editemailtemplate`,
    async (params: IEditEmailTemplate, thunkApi) => {
        const { id, idNote, note, isSignIn } = params;
        let requestPath: string | undefined;

        if (isSignIn) {
            requestPath = basePath + ADD_TEMPLATE_ENDPOINT  + id + "/edit-template/" + idNote;
        } else {
            requestPath = basePath + ADD_TEMPLATE_ENDPOINT;
        }
        try {
            const response = await axios.put(requestPath, note);

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

export const removeEmailTemplate = createAsyncThunk(
    `${templateStoreKey}/removeemailtemplate`,
    async (params: IRemoveEmailTemplate, thunkApi) => {
        const { id, idNote, isSignIn } = params;
        let requestPath: string | undefined;

        if (isSignIn) {
            requestPath = basePath + ADD_TEMPLATE_ENDPOINT + id + "/remove-template/" + idNote;
        } else {
            requestPath = basePath + ADD_TEMPLATE_ENDPOINT;
        }
        try {
            const response = await axios.delete(requestPath);

            return response.data;

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