import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { contactListStoreKey } from "./contactList.const";
import { errorAlert, warningAlert } from "../alerts";
import { IContactListItem } from "../../types";
import { IContactSequence } from "../../types";

const contactListsPath = `${import.meta.env.VITE_API_BASE_URL}/lists`;

interface IGetUserContactLists {
  page: number,
  noLimit: boolean
}

interface ICreateUserContactList {
  name: string,
  podcasts: [],
  episodes: [],
}

interface IAddItemsToUserContactList {
  listId: string,
  itemType: string, // TODO: define this properly! for now idk wtf
  items: IContactListItem[],
}

interface IGetContactListItems {
  listId: string,
  itemType: string,
  page: number,
}

interface IGetContactListItemsCount {
  listId: string,
  itemType: string,
}

interface IDeleteUserContactListItems {
  listId: string,
  listItemIds: string[],
}

interface IGetUserContactListItemSequence {
  listId: string,
  listItemId: string,
}

export const getUserContactLists = createAsyncThunk(
  `${contactListStoreKey}/getUserContactLists`,
  async (query: IGetUserContactLists, thunkApi) => {
    try {
      const response = await axios.get(`${contactListsPath}?page=${query.page}${query.noLimit ? '&noLimit=1' : ''}`);
      
      return response.data;  
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error getting the user lists. Please, try again later.'));
    }
  }
);

export const getUserContactList = createAsyncThunk(
  `${contactListStoreKey}/getUserContactList`,
  async (listId: string, thunkApi) => {
    try {
      const response = await axios.get(`${contactListsPath}/${listId}`);
      
      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error getting the list specified. Please, try again later.'));
    }
  }
);

export const getUserContactListCountSummary = createAsyncThunk(
  `${contactListStoreKey}/getUserContactListsCountSummary`,
  async (listId: string, thunkApi) => {
    try {
      const response = await axios.get(`${contactListsPath}/${listId}/count-summary`);
      
      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error getting the count of contacts in a list. Please, try again later.'));
    }
  }
);

export const createUserContactList = createAsyncThunk(
  `${contactListStoreKey}/createUserContactList`,
  async (listData: ICreateUserContactList, thunkApi) => {
    try {
      const response = await axios.post(contactListsPath, listData);

      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('There is already a list with that name. Please, choose another name.'));
    }
  }
);

export const deleteUserContactList = createAsyncThunk(
  `${contactListStoreKey}/deleteUserContactList`,
  async (listId: string, thunkApi) => {
    try {
      const response = await axios.delete(`${contactListsPath}/${listId}`)
      
      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error deleting the list specified. Please, try again later.'));
    }
  }
);

export const getContactListItems = createAsyncThunk(
  `${contactListStoreKey}/getContactListItems`,
  async (data: IGetContactListItems, thunkApi) => {
    const { listId, itemType, page } = data;
    try {
      const response = await axios.get(`${contactListsPath}/${listId}/items?type=${itemType}&page=${page}`);

      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error getting the items in the list specified. Please, try again later.'));
    }
  }
);

export const getContactListItemsCount = createAsyncThunk(
  `${contactListStoreKey}/getContactListItemsCount`,
  async (data: IGetContactListItemsCount, thunkApi) => {
    const { listId, itemType } = data;
    try {
      const response = await axios.get(`${contactListsPath}/${listId}/items/count?type=${itemType}`);

      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error getting the count of items in the list specified. Please, try again later.'));
    }
  }
);

export const addUserContactListItems = createAsyncThunk(
  `${contactListStoreKey}/addUserContactListItems`,
  async (data: IAddItemsToUserContactList, thunkApi) => {
    const { listId, itemType, items } = data;
    try {
      const response = await axios.post(`${contactListsPath}/${listId}/items?type=${itemType}`, items);

      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error adding the contact to the list specified. Please, try again later.'));
    }
  }
);

export const deleteUserContactListItems = createAsyncThunk(
  `${contactListStoreKey}/deleteUserContactListItems`,
  async (data: IDeleteUserContactListItems, thunkApi) => {
    const { listId, listItemIds } = data;
    try {
      await axios.delete(`${contactListsPath}/${listId}/items`, { data: listItemIds });

      return { success: true };
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error deleting the contact from the list specified. Please, try again later.'));
    }
  }
);

export const getUserContactListItemSequence = createAsyncThunk(
  `${contactListStoreKey}/getUserContactListItemSequence`,
  async (data: IGetUserContactListItemSequence, thunkApi) => {
    const { listId, listItemId } = data;
    try {
      const response = await axios.get(`${contactListsPath}/${listId}/items/${listItemId}/sequence`);

      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error getting the contact list item sequence. Please, try again later.'));
    }
  }
);

export const activateUserContactListItemSequence = createAsyncThunk(
  `${contactListStoreKey}/activateUserContactListItemSequence`,
  async (data: IGetUserContactListItemSequence, thunkApi) => {
    const { listId, listItemId } = data;
    try {
      const response = await axios.put(`${contactListsPath}/${listId}/items/${listItemId}/sequence`);

      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error activating the contact list item sequence. Please, try again later.'));
    }
  }
);

export const connectContacts = createAsyncThunk(
  `${contactListStoreKey}/connectContacts`,
  async (newSequences: IContactSequence[], thunkApi) => {
    try {
      await axios.put(`${contactListsPath}/items/contact`, newSequences);

      return { success: true }
    } catch (error) {
      thunkApi.dispatch(warningAlert({
        title: 'Not validated',
        message: "We couldn't validate the recipient's able to recieve messages, the outreach sequence has been removed",
      }));
      thunkApi.dispatch(deleteUserContactListItems({
        listId: newSequences[0].listId,
        listItemIds: [newSequences[0].listItemId],
      }))
    }
  }
);

export const connectContactsNew = createAsyncThunk(
  `${contactListStoreKey}/connectContactsNew`,
  async (newSequence: IContactSequence, thunkApi) => {
    try {
      await axios.put(`${contactListsPath}/items/contactnew`, newSequence);

      return { success: true }
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error connecting to the new contact specified. Please, try again later.'));
    }
  }
);

export const getListContactItems = createAsyncThunk(
  `${contactListStoreKey}/getContactListsItems`,
  async (listId: string, thunkApi) => {
    try {
      const response = await axios.get(`${contactListsPath}/${listId}/contactitems`);

      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error getting the contact items in the list specified. Please, try again later.'));
    }
  }
)