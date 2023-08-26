import { createSlice } from '@reduxjs/toolkit';
import { templateStoreKey } from './template.const';
import { IEmail } from "../../types"

import swal from 'sweetalert';
import {
    getAllTemplates,
    getEmailTemplateById,
    editEmailTemplate,
    addEmailTemplate,
    removeEmailTemplate,
  } from '.';

interface IState {
  isLoading: boolean;
  emailTemplates: IEmail[];
}



const initialState: IState = {
  isLoading: false,
  emailTemplates: [],
};


export const templateSlice = createSlice({
    name: templateStoreKey,
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {

        //getEmailTemplateById
        builder.addCase(getEmailTemplateById.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(getEmailTemplateById.fulfilled, (state, action) => {
            state.isLoading = false;

            // **AQUI** RETORNAR EL TEMPLATE OBTENIDO EN EL FRONT

        }),
        builder.addCase(getEmailTemplateById.rejected, (state) => {
            state.isLoading = false;

            swal("Error", "An error has occured, please try again later");
        });

        //addEmailTemplate
        builder.addCase(addEmailTemplate.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(addEmailTemplate.fulfilled, (state, action) => {
            state.isLoading = false;

            state.emailTemplates.push(action.payload)

            swal("Success", action.payload.success, "Email Template added succesfully");
        }),
        builder.addCase(addEmailTemplate.rejected, (state) => {
            state.isLoading = false;
        });

        //getAllTemplates
        builder.addCase(getAllTemplates.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(getAllTemplates.fulfilled, (state, action) => {
            state.isLoading = false;
            state.emailTemplates = action.payload;
        }),
        builder.addCase(getAllTemplates.rejected, (state) => {
            state.isLoading = false;
        });

        //editEmailtemplate
        builder.addCase(editEmailTemplate.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(editEmailTemplate.fulfilled, (state) => {
            state.isLoading = false;
            //tengo que llamar a getAllTemplates here
        }),
        builder.addCase(editEmailTemplate.rejected, (state) => {
            state.isLoading = false;
        });

        //deleteEmailtemplate
        builder.addCase(removeEmailTemplate.pending, (state) => {
            state.isLoading = true;
        }),
        builder.addCase(removeEmailTemplate.fulfilled, (state, action) => {
            state.isLoading = false;
            //tengo que llamar a getAllTemplates here
            swal("Success", action.payload.success, "Email Template removed succesfully");
        }),
        builder.addCase(removeEmailTemplate.rejected, (state) => {
            state.isLoading = false;
        });

    },
});
