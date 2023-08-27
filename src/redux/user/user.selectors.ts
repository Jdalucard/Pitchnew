import { type RootState } from '../store';

const isLoading = (state: RootState) => state.user.isLoading;
const userData = (state: RootState) => state.user.userData;
const userProfileImage = (state: RootState) => state.user.userProfileImage;
const isAdmin = (state: RootState) => state.user.isAdmin;

export const userSelectors = { isLoading, userData, userProfileImage, isAdmin };
