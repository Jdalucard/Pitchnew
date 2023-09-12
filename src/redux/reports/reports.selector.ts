import { type RootState } from '../store';

const isLoading = (state: RootState) => state.reports.isLoading;
const activityData = (state: RootState) => state.reports.activityData;
const updatedSummaryData = (state: RootState) =>
  state.reports.updatedSummaryData;
const summaryData = (state: RootState) => state.reports.summaryData;
const maxAmountValue = (state: RootState) => state.reports.maxAmountValue;
const updatedAmountData = (state: RootState) => state.reports.updatedAmountData;
const ready = (state: RootState) => state.reports.ready;
const setsubtitles = (state: RootState) => state.reports.summaryTimePeriod;
const setamountTimePeriod = (state: RootState) =>
  state.reports.amountTimePeriod;
const amountData = (state: RootState) => state.reports.amountData;

export const reportsSelector = {
  isLoading,
  activityData,
  updatedSummaryData,
  summaryData,
  maxAmountValue,
  updatedAmountData,
  ready,
  setsubtitles,
  setamountTimePeriod,
  amountData,
};
