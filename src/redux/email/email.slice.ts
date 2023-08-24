import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';
import { emailStoreKey } from './email.const';

import {
    getEmailSignature
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
        fetchEmailTemplates: (_, action: PayloadAction<string>) => {
            //lo que sea
        },
        addEmailtemplate: (_, action: PayloadAction<string>) => {
            //lo que sea
        },
        editEmailtemplate: (_, action: PayloadAction<string>) => {
            //lo que sea
        },
        removeEmailtemplate: (_, action: PayloadAction<string>) => {
            //lo que sea
        },
        sendEmailtemplate: (_, action: PayloadAction<string>) => {
            //lo que sea
        },

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

    },
});

export const {
    fetchEmailTemplates,
    addEmailtemplate,
    removeEmailtemplate,
    sendEmailtemplate
  } = emailSlice.actions;