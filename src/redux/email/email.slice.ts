import { createSlice } from '@reduxjs/toolkit';
import { emailStoreKey } from './email.const';

import {
    getEmailSignature,
    sendEmail,    
    getEmailReport
  } from '.';

interface IState {
    isLoading: boolean;
    emailSignatureData: string;
  }

const initialState: IState = {
    isLoading: false,
    emailSignatureData: '',
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
        builder.addCase(sendEmail.fulfilled, (state) => {
            state.isLoading = false;
        }),
        builder.addCase(sendEmail.rejected, (state) => {
            state.isLoading = false;
        });


        /*********************************** REPORTS AREA*****************************************/

        //getEmailReport
        builder.addCase(getEmailReport.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(getEmailReport.fulfilled, (state, action) => {
            state.isLoading = false;
        }),
        builder.addCase(getEmailReport.rejected, (state) => {
            state.isLoading = false;
        });

    },
});