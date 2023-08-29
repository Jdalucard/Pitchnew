import { createSlice } from '@reduxjs/toolkit';
import { emailStoreKey } from './email.const';

import { IEmail } from '../../types';

import swal from 'sweetalert';

import {
    getEmailSignature,
    sendEmail,    
    getEmailReport
  } from '.';

interface IState {
    isLoading: boolean;
    emailSignatureData: string;
    //email: IEmail //** AQUI / este se podria obviar y obtener directo del resultado del api*/
  }

const initialState: IState = {
    isLoading: false,
    emailSignatureData: '',
    /*email: {
        subject: '',
        content: '',
        date: new Date()
    },*/
};

export const emailSlice = createSlice({
    name: emailStoreKey,
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        

        //getEmailSignature
        builder.addCase(getEmailSignature.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(getEmailSignature.fulfilled, (state, action) => {
            state.isLoading = false;
            state.emailSignatureData = action.payload;
        }),
        builder.addCase(getEmailSignature.rejected, (state) => {
            state.isLoading = false;
        });

        //sendEmail
        builder.addCase(sendEmail.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(sendEmail.fulfilled, (state, action) => {
            state.isLoading = false;

            swal("Success", action.payload.success, "Mail Sent Successfully");
        }),
        builder.addCase(sendEmail.rejected, (state) => {
            state.isLoading = false;

            swal("Error", "An error has occured, please try again later");
        });


        /*********************************** REPORTS AREA*****************************************/

        //getEmailReport
        builder.addCase(getEmailReport.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(getEmailReport.fulfilled, (state, action) => {
            state.isLoading = false;

            //** AQUI / este se podria obviar y obtener directo del resultado del api*/

            /*state.email.subject = action.payload.emailtemplate[0].subject
            state.email.content = action.payload.emailtemplate[0].content*/

        }),
        builder.addCase(getEmailReport.rejected, (state) => {
            state.isLoading = false;

            swal("Error", "An error has occured, please try again later");
        });

    },
});