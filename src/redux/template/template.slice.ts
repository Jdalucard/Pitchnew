import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';
import { templateStoreKey } from './template.const';
import swal from 'sweetalert';
import {
    getEmaildata,
    editEmailTemplate,
    addEmailTemplate,
    removeEmailTemplate
  } from '.';

interface IState {
  isLoading: boolean;
  emailTemplatedata: [];
}

const initialState: IState = {
  isLoading: false,
  emailTemplatedata: [],
};

export const templateSlice = createSlice({
    name: templateStoreKey,
    initialState,
    reducers: {
        fetchEmailTemplates: (_, action: PayloadAction<string>) => {
            //lo que sea
        },

    },
    extraReducers: (builder) => {

        //addEmailTemplate
        builder.addCase(addEmailTemplate.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(addEmailTemplate.fulfilled, (state, action) => {
            state.isLoading = false;

            //tengo que llamar a getEmaildata here

            swal("Success", action.payload.success, "Email Template added succesfully");
        }),
        builder.addCase(addEmailTemplate.rejected, (state, action) => {
            state.isLoading = true;
        });

        //getEmaildata
        builder.addCase(getEmaildata.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(getEmaildata.fulfilled, (state, action) => {
            state.isLoading = false;
            state.emailTemplatedata = action.payload;
        }),
        builder.addCase(getEmaildata.rejected, (state, action) => {
            state.isLoading = true;
        });

        //editEmailtemplate
        builder.addCase(editEmailTemplate.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(editEmailTemplate.fulfilled, (state, action) => {
            state.isLoading = false;
            //tengo que llamar a getEmaildata here
        }),
        builder.addCase(editEmailTemplate.rejected, (state, action) => {
            state.isLoading = true;
        });

        //deleteEmailtemplate
        builder.addCase(removeEmailTemplate.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(removeEmailTemplate.fulfilled, (state, action) => {
            state.isLoading = false;
            //tengo que llamar a getEmaildata here
            swal("Success", action.payload.success, "Email Template removed succesfully");
        }),
        builder.addCase(removeEmailTemplate.rejected, (state, action) => {
            state.isLoading = true;
        });

        
    },
});

//to review
export const {
    fetchEmailTemplates,
    removeEmailtemplate,
    sendEmailtemplate
  } = templateSlice.actions;