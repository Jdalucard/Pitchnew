import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import { type PayloadAction } from '@reduxjs/toolkit';
import { type ContentOptions } from 'sweetalert/typings/modules/options/content';
import { type ButtonList } from 'sweetalert/typings/modules/options/buttons';
import { alertsStoreKey } from './alerts.const';
import spinnerGif from '../../assets/gifts/spinner.gif';

interface IState {
  alerts: null,
}

const initialState: IState = {
  alerts: null,
};

interface IOpenConfirmation {
  message: string,
  title?: string,
  confirmMessage?: string,
  content: ContentOptions,
  isInEditor?: boolean,
  isInMailbox?: boolean,
}

interface IOpenDualConfirmation {
  message: string,
  title?: string,
  button1: string,
  button2: string,
}

interface IOpenRemovalConfirmation {
  item: string,
  message: string,
}

interface IOpenError {
  error: string,
}

interface IOpenSuccess {
  success: string,
}

interface ISwalOptions {
  title: string,
  text: string,
  icon?: string,
  dangerMode?: boolean,
  content: ContentOptions,
  buttons?: ButtonList | (string | boolean)[],
  closeOnClickOutside?: boolean,
  className?: string,
}

export const alertsSlice = createSlice({
  name: alertsStoreKey,
  initialState,
  reducers: {
    openLoadingModal: (_, action: PayloadAction<string | undefined>) => {
      if (swal.getState && !swal.getState().isOpen) {
        swal({
          title: "",
          text: (action || 'Loading') + ', please wait...',
          icon: spinnerGif,
          closeOnClickOutside: false
        });
      }
    },
    closeLoadingModal: () => {
      if ((swal.getState && swal.close) && swal.getState().isOpen) {
        swal.close();
      }
    },
    openConfirmation: (_, action: PayloadAction<IOpenConfirmation>) => {
      const { title, message, content, confirmMessage, isInEditor, isInMailbox } = action.payload;

      const options: ISwalOptions = {
        title: title || "Confirm",
        text: message,
        content: content,
        buttons: ["Cancel", (confirmMessage || "Confirm")],
      }
      if (!isInEditor) {
        options.icon = 'warning';
        options.dangerMode = true;
      }
      if (isInMailbox) {
        options.className = "mailbox_editor";
      }

      swal(options);
    },
    openDualActionConfirmation: (_, action: PayloadAction<IOpenDualConfirmation>) => {
      const { title, message, button1, button2 } = action.payload;

      swal({
        title: title || "Confirm",
        text: message,
        icon: "warning",
        dangerMode: true,
        buttons: {
          cancel: true,
          button1: {
            text: button1,
            value: button1,
          },
          button2: {
            text: button2,
            value: button2,
          },
        },
      })
    },
    openDeleteConfirmation: (_, action: PayloadAction<IOpenRemovalConfirmation>) => {
      const { item, message } = action.payload;

      swal({
        title: "Remove " + item + "?",
        text: message ? message : "Once removed, you will not be able to recover this " + item,
        icon: "warning",
        dangerMode: true,
        buttons: ["Cancel", "Remove"],
      })
    },
    errorAlert: (_, action: PayloadAction<IOpenError>) => {
      const { error} = action.payload;
      swal("Error", error, "error");
    },
    successAlert: (_, action: PayloadAction<IOpenSuccess>) => {
      swal("Success", action.payload.success, "success");
    }
  },
});

export const {
  openLoadingModal,
  closeLoadingModal,
  openConfirmation,
  openDualActionConfirmation,
  openDeleteConfirmation,
  errorAlert,
  successAlert,
} = alertsSlice.actions;
