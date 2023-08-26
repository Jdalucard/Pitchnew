import { type RootState } from '../store';

const isLoading = (state: RootState) => state.email.isLoading;
const emailTemplateData = (state: RootState) => state.email.emailTemplateData;
const emailSignatureData = (state: RootState) => state.email.emailSignatureData;
const email = (state: RootState) => state.email.email;

export const emailSelectors = { isLoading, emailTemplateData, emailSignatureData, email };
