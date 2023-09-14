import { createSlice } from '@reduxjs/toolkit';
import { reportsStoreKey } from './reports.const';
import {
  getOutreachActivity,
  fetchStageSummary,
  fetchStageAmounts,
  fetchStageAmountsPodcast,
  fetchStageAmountsSpeaker,
  fetchStageAmountsMedia,
  fetchStageAmountsConference,
  fetchStageAmountsAssociation,
  fetchStageAmountsbookedPodcast,
  fetchStageAmountsbookedSpeaker,
  fetchStageAmountsbookedMedia,
  fetchStageAmountsbookedAssociation,
} from './reports.thunks';

interface IActivityData {
  date: string;
  message: string;
}

export interface IAmountData {
  name: string;
  y: number;
  created?: string;
}

interface ReportsState {
  isLoading: boolean;
  summaryData: IAmountData[] | null;
  updatedSummaryData: IAmountData[] | null;
  dateTo: string | null;
  dateStart: string | null;
  amountData: IAmountData[] | null;
  updatedAmountData: IAmountData[] | null;
  maxAmountValue: number;
  summaryTimePeriod: string;
  amountTimePeriod: string;
  activityData: IActivityData[] | null;
  baseOptions: any | null;
  ready: boolean;
  seriesData: IAmountData[] | null;
  isLoadingLastestActivityData: boolean;
  isLoadingSummaryData: boolean;
}

const initialState: ReportsState = {
  isLoading: false,
  isLoadingLastestActivityData: false,
  isLoadingSummaryData: false,
  summaryData: null,
  updatedSummaryData: null,
  dateTo: null,
  dateStart: null,
  amountData: null,
  updatedAmountData: null,
  maxAmountValue: 0,
  summaryTimePeriod: '',
  amountTimePeriod: '',
  activityData: null,
  baseOptions: null,
  ready: false,
  seriesData: null,
};

export const reportsSlice = createSlice({
  name: reportsStoreKey,
  initialState,
  reducers: {
    getbaseOptions: (state, action) => {
      state.ready = true;
      state.baseOptions = action.payload;
    },

    getlineReady: (state, action) => {
      state.ready = action.payload && action.payload.length > 0;
      state.baseOptions = action.payload;
    },

    setsubtitles: (state, action) => {
      state.summaryTimePeriod =
        action.payload.length > 0
          ? state.summaryTimePeriod
          : 'No activity for the time period ' + state.summaryTimePeriod;
    },
    setamountTimePeriod: (state, action) => {
      state.amountTimePeriod = action.payload;
    },
  },
  extraReducers: (builder) => {
    // getOutreachActivity
    builder.addCase(getOutreachActivity.pending, (state) => {
      state.isLoadingLastestActivityData = true;
    });
    builder.addCase(getOutreachActivity.rejected, (state) => {
      state.isLoadingLastestActivityData = false;
    });
    builder.addCase(getOutreachActivity.fulfilled, (state, action) => {
      state.isLoadingLastestActivityData = false;
      state.activityData = action.payload ?? null;
    });
    //fetchStageSummary
    builder.addCase(fetchStageSummary.pending, (state) => {
      state.isLoadingSummaryData = true;
    });
    builder.addCase(fetchStageSummary.rejected, (state) => {
      state.isLoadingSummaryData = false;
    });

    builder.addCase(fetchStageSummary.fulfilled, (state, action) => {
      state.isLoadingSummaryData = false;
      state.updatedSummaryData = action.payload?.updatedSummaryData ?? null;
      state.summaryData = action.payload?.summaryData ?? null;
    });
    //fetchStageAmounts
    builder.addCase(fetchStageAmounts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStageAmounts.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchStageAmounts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.maxAmountValue = action.payload?.maxAmountValue ?? 0;

      const updatedAmountData = action.payload?.updatedAmountData;
      const amountData = action.payload?.amountData;

      state.updatedAmountData = Array.isArray(updatedAmountData) ? updatedAmountData : null;
      state.amountData = Array.isArray(amountData) ? amountData : null;
    });
    //fetchStageAmountsPodcast
    builder.addCase(fetchStageAmountsPodcast.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStageAmountsPodcast.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchStageAmountsPodcast.fulfilled, (state) => {
      state.isLoading = false;
    });
    //fetchStageAmountsSpeaker
    builder.addCase(fetchStageAmountsSpeaker.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStageAmountsSpeaker.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchStageAmountsSpeaker.fulfilled, (state) => {
      state.isLoading = false;
    });
    //fetchStageAmountsMedia
    builder.addCase(fetchStageAmountsMedia.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStageAmountsMedia.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchStageAmountsMedia.fulfilled, (state) => {
      state.isLoading = false;
    });
    //fetchStageAmountsConference
    builder.addCase(fetchStageAmountsConference.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStageAmountsConference.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchStageAmountsConference.fulfilled, (state) => {
      state.isLoading = false;
    });
    //fetchStageAmountsAssociation
    builder.addCase(fetchStageAmountsAssociation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStageAmountsAssociation.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchStageAmountsAssociation.fulfilled, (state) => {
      state.isLoading = false;
    });
    //fetchStageAmountsbookedPodcast
    builder.addCase(fetchStageAmountsbookedPodcast.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchStageAmountsbookedPodcast.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchStageAmountsbookedPodcast.fulfilled, (state) => {
      state.isLoading = false;
    });
    //fetchStageAmountsbookedSpeaker
    builder.addCase(fetchStageAmountsbookedSpeaker.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStageAmountsbookedSpeaker.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchStageAmountsbookedSpeaker.fulfilled, (state) => {
      state.isLoading = false;
    });
    //fetchStageAmountsbookedMedia
    builder.addCase(fetchStageAmountsbookedMedia.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStageAmountsbookedMedia.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchStageAmountsbookedMedia.fulfilled, (state) => {
      state.isLoading = false;
    });
    // fetchStageAmountsbookedAssociation
    builder.addCase(fetchStageAmountsbookedAssociation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStageAmountsbookedAssociation.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchStageAmountsbookedAssociation.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const { getbaseOptions, setsubtitles, setamountTimePeriod, getlineReady } =
  reportsSlice.actions;
