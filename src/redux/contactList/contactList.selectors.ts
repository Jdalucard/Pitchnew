import { type RootState } from '../store';

const isLoading = (state: RootState) => state.contactList.isLoading;
const contactLists = (state: RootState) => state.contactList.userContactLists;
const contactListsWithItems = (state: RootState) => state.contactList.contactListsWithItems;

export const contactListSelectors = {
  isLoading,
  contactLists,
  contactListsWithItems,
};
