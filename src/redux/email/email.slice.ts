import { createSlice } from '@reduxjs/toolkit';
import { emailStoreKey } from './email.const';

import {
    getEmailSignature,
    sendEmail
  } from '.';

interface IState {
    isLoading: boolean;
    error: string;
    emailTemplatedata: [];
    emailSignatureDatas: string;
  }

const initialState: IState = {
  isLoading: false,
  error: '',
  emailTemplatedata: [],
  emailSignatureDatas: ''
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
            state.emailSignatureDatas = action.payload;
        }),
        builder.addCase(getEmailSignature.rejected, (state, action) => {
            state.isLoading = true;
        });

        //sendEmail
        builder.addCase(sendEmail.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(sendEmail.fulfilled, (state, action) => {
            state.isLoading = false;
        }),
        builder.addCase(sendEmail.rejected, (state, action) => {
            state.isLoading = true;
        });

    },
});