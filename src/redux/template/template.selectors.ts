import { type RootState } from '../store';

const isLoading = (state: RootState) => state.template.isLoading;
const emailTemplatedata = (state: RootState) => state.template.emailTemplatedata;

export const templateSelectors = { isLoading, emailTemplatedata };
