import { type RootState } from '../store';

const isLoading = (state: RootState) => state.contactList.isLoading;
const contactLists = (state: RootState) => state.contactList.userContactLists;

export const contactListSelectors = { isLoading, contactLists };
