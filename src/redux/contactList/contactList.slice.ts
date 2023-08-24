
import { createSlice } from '@reduxjs/toolkit';
import { contactListStoreKey } from './contactList.const';
import { IUserContactList } from '../../types';
import {
  createUserContactList,
  getUserContactList,
  getUserContactLists,
  getUserContactListCountSummary,
  addUserContactListItems,
  getContactListItems,
  getContactListItemsCount,
  deleteUserContactListItems,
  getUserContactListItemSequence,
  activateUserContactListItemSequence,
  connectContacts,
  connectContactsNew,
  getListContactItems,
} from './contactList.thunks';

interface IState {
  isLoading: boolean;
  userContactLists: IUserContactList[]; 
}

const initialState: IState = {
  isLoading: false,
  userContactLists: [],
};

export const contactListSlice = createSlice({
  name: contactListStoreKey,
  initialState,
  reducers: {},
  extraReducers(builder) {
    // getUserContactLists
    builder.addCase(getUserContactLists.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(getUserContactLists.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(getUserContactLists.fulfilled, (state, action) => {
      state.userContactLists = action.payload;
      state.isLoading = false;
    }),
    // getUserContactList
    builder.addCase(getUserContactList.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(getUserContactList.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(getUserContactList.fulfilled, (state) => {
      state.isLoading = false;
    }),
    // getUserContactListCountSummary
    builder.addCase(getUserContactListCountSummary.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(getUserContactListCountSummary.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(getUserContactListCountSummary.fulfilled, (state) => {
      state.isLoading = false;
    }),
    // createUserContactList
    builder.addCase(createUserContactList.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(createUserContactList.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(createUserContactList.fulfilled, (state, action) => {
      const newListsArray = [action.payload, ...state.userContactLists];

      state.userContactLists = newListsArray;
      state.isLoading = false;
    }),
    // getContactListItems
    builder.addCase(getContactListItems.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(getContactListItems.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(getContactListItems.fulfilled, (state) => {
      state.isLoading = false;
    }),      
    // getContactListItemsCount
    builder.addCase(getContactListItemsCount.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(getContactListItemsCount.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(getContactListItemsCount.fulfilled, (state) => {
      state.isLoading = false;
    }),      
    // addUserContactListItems
    builder.addCase(addUserContactListItems.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(addUserContactListItems.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(addUserContactListItems.fulfilled, (state) => {
      state.isLoading = false;
    }),
    // deleteUserContactListItems
    builder.addCase(deleteUserContactListItems.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(deleteUserContactListItems.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(deleteUserContactListItems.fulfilled, (state) => {
      state.isLoading = false;
    }),
    // getUserContactListItemSequence
    builder.addCase(getUserContactListItemSequence.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(getUserContactListItemSequence.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(getUserContactListItemSequence.fulfilled, (state) => {
      state.isLoading = false;
    }),
    // activateUserContactListItemSequence
    builder.addCase(activateUserContactListItemSequence.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(activateUserContactListItemSequence.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(activateUserContactListItemSequence.fulfilled, (state) => {
      state.isLoading = false;
    }),
    // connectContacts
    builder.addCase(connectContacts.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(connectContacts.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(connectContacts.fulfilled, (state) => {
      state.isLoading = false;
    }),
    // connectContactsNew
    builder.addCase(connectContactsNew.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(connectContactsNew.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(connectContactsNew.fulfilled, (state) => {
      state.isLoading = false;
    }),
    // getListContactItems
    builder.addCase(getListContactItems.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(getListContactItems.rejected, (state) => {
      state.isLoading = false;
    }),
    builder.addCase(getListContactItems.fulfilled, (state) => {
      state.isLoading = false;
    })
  },
});