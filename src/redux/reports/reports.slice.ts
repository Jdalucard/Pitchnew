import { createSlice } from '@reduxjs/toolkit';
import { reportsStoreKey } from './reports.const';
import {
  outreachActivity,
  fetchStageSummary,
  fetchStageAmounts,
  fetchStageAmountsPodcast,
  fetchStageAmountsSpeaker,
  fetchStageAmountsMedia,
  fetchStageAmountsConference,
  fetchStageAmountsAsscoaition,
  fetchStageAmountsbookedPodcast,
  fetchStageAmountsbookedSpeaker,
  fetchStageAmountsbookedMedia,
  fetchStageAmountsbookedAsscoaition,
} from './reports.thunks';

interface ActivityData {
  date: Date;
  message: string;
}

interface ReportsState {
  isLoading: boolean;
  summaryData: { name: string; y: number }[] | null;
  updatedSummaryData: { name: string; y: number }[] | null;
  dateTo: Date | null;
  dateStart: Date | null;
  amountData: { name: string; y: number }[] | null;
  updatedAmountData: { name: string; y: number }[] | null;
  maxAmountValue: number;
  summaryTimePeriod: string;
  amountTimePeriod: string;
  activityData: ActivityData[] | null;
  baseOptions: object | null;
  ready: boolean;
  seriesData: { name: string; y: number }[] | null;
}

const initialState: ReportsState = {
  isLoading: false,
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
    // outreachActivity
    builder.addCase(outreachActivity.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(outreachActivity.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(outreachActivity.fulfilled, (state, action) => {
      state.isLoading = false;
      state.activityData = action.payload?.activityData ?? null;
    });
    //fetchStageSummary
    builder.addCase(fetchStageSummary.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStageSummary.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(fetchStageSummary.fulfilled, (state, action) => {
      state.isLoading = false;
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

      state.updatedAmountData = Array.isArray(updatedAmountData)
        ? updatedAmountData
        : null;
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
    //fetchStageAmountsAsscoaition
    builder.addCase(fetchStageAmountsAsscoaition.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStageAmountsAsscoaition.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchStageAmountsAsscoaition.fulfilled, (state) => {
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
    //fetchStageAmountsbookedAsscoaition
    builder.addCase(fetchStageAmountsbookedAsscoaition.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStageAmountsbookedAsscoaition.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchStageAmountsbookedAsscoaition.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const {
  getbaseOptions,
  setsubtitles,
  setamountTimePeriod,
  getlineReady,
} = reportsSlice.actions;
