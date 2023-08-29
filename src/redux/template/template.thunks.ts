import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { templateStoreKey } from ".";
import { errorAlert } from "../alerts";
import { IEmail, IEditEmail } from "../../types"

interface IEditEmailTemplate {
    id: string,
    idNote: string,
    note: IEditEmail
}

interface IRemoveEmailTemplate {
    id: string,
    idNote: string,
}


interface IAddEmailTemplate{
    id: boolean,
    note: IEmail,
}

interface IGetEmailById{
    id : string,
    withStages: string
}


/* const basePath = import.meta.env.VITE_API_BASE_URL;

const ADD_TEMPLATE_ENDPOINT = '/email-templates/';

export const getEmailTemplateById = createAsyncThunk(
    `${templateStoreKey}/getemailtemplatebyid`,
    async (params: IGetEmailById) => {
        const { id, withStages } = params;

        try {
            const requestPath = basePath + ADD_TEMPLATE_ENDPOINT + id + '?withStages=' + withStages;

            const response = await axios.get(requestPath);

            return response.data;

        } catch (error) {

            errorAlert('Error, please try again later.')

        }
    }
);


export const addEmailTemplate = createAsyncThunk(
    `${templateStoreKey}/addemailtemplate`,
    async (params: IAddEmailTemplate, { dispatch }) => {
        const { id, note } = params;

        try {
            const requestPath = basePath + ADD_TEMPLATE_ENDPOINT + id + "/add-template";

            //add the email template
            const response = await axios.put(requestPath, note);

            //recover all the templates again
            dispatch(getAllTemplates());

            return response.data;

        } catch (error) {

            errorAlert('Error, please try again later.')

        }
    }
);

export const getAllTemplates = createAsyncThunk(
    `${templateStoreKey}/getemaildata`,
    async () => {
  
      try {

        const requestPath = basePath + ADD_TEMPLATE_ENDPOINT;

        const response = await axios.get(requestPath);
  
        return response.data;
      } catch (error) {

        errorAlert('Error, please try again later.')

      }
    }
);


export const editEmailTemplate = createAsyncThunk(
    `${templateStoreKey}/editemailtemplate`,
    async (params: IEditEmailTemplate, { dispatch }) => {
        const { id, idNote, note } = params;
        
        try {

            const requestPath = basePath + ADD_TEMPLATE_ENDPOINT  + id + "/edit-template/" + idNote;

            const response = await axios.put(requestPath, note);

            //recover all the templates again
            dispatch(getAllTemplates());

            return response.data[0].emailsignature;

        } catch (error) {

            errorAlert('Error, please try again later.')

        }
    }
);

export const removeEmailTemplate = createAsyncThunk(
    `${templateStoreKey}/removeemailtemplate`,
    async (params: IRemoveEmailTemplate, {dispatch}) => {
        const { id, idNote } = params;

        try {
            const requestPath = basePath + ADD_TEMPLATE_ENDPOINT + id + "/remove-template/" + idNote;

            const response = await axios.delete(requestPath);

            //recover all the templates again
            dispatch(getAllTemplates());

            return response.data;

        } catch (error) {

            errorAlert('Error, please try again later.')

        }
    }
); */