import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { reportsStoreKey } from './reports.const';
import { errorAlert } from '../alerts';
import { RootState } from '../store';
import { formatSummary, formatAmounts } from './utils/data.formatter';
import querystring from 'querystring';
import moment from 'moment';

const CHARTS_ENDPOINT = '/charts/';
const ACTIVITY_ENDPOINT = '/activity/';
const basePath = import.meta.env.VITE_API_BASE_URL;

interface FetchStageSummaryParams {
  updated: boolean;
}
interface Chart {
  CHART_SUMMARY: string;
  CHART_AMOUNT: string;
  CHART_DATE_FORMAT: string;
}
export const typeChart: Chart = {
  CHART_SUMMARY: 'summary',
  CHART_AMOUNT: 'amount',
  CHART_DATE_FORMAT: 'YYYY-MM-DD',
};

export const outreachActivity = createAsyncThunk(
  `${reportsStoreKey}activity/outreachActivity`,
  async (_, thunkApi) => {
    try {
      const response = await axios.get(basePath + ACTIVITY_ENDPOINT);
      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error Please ,Try again later.'));
    }
  },
);

export const fetchStageSummary = createAsyncThunk(
  `${reportsStoreKey}charts/fetchStageSummary`,
  async (params: FetchStageSummaryParams, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;

      const queryParams = {
        dateStart: moment(state.reports.dateStart).format(
          typeChart.CHART_DATE_FORMAT,
        ),
        dateTo: moment(state.reports.dateTo).format(
          typeChart.CHART_DATE_FORMAT,
        ),
      };

      const response = await axios.get(
        basePath +
          CHARTS_ENDPOINT +
          'stages/summary?' +
          querystring.stringify(queryParams),
      );

      const date = formatSummary(response.data);

      const updateObject = {
        updatedSummaryData: params.updated
          ? date
          : state.reports.updatedSummaryData,
        summaryData: params.updated ? state.reports.summaryData : date,
      };

      return updateObject;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error. Please, try again later.'));
    }
  },
);

function getValidDate(date: Date | undefined | null): Date {
  if (date instanceof Date) {
    return date;
  }
  return new Date();
}
export const fetchStageAmounts = createAsyncThunk(
  `${reportsStoreKey}charts/fetchStageAmounts`,
  async (params: FetchStageSummaryParams, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;

      const queryParams = {
        dateStart: moment(getValidDate(state.reports.dateStart)).format(
          typeChart.CHART_DATE_FORMAT,
        ),
        dateTo: moment(getValidDate(state.reports.dateTo)).format(
          typeChart.CHART_DATE_FORMAT,
        ),
        period: 'daily',
      };

      const response = await axios.get(
        basePath +
          CHARTS_ENDPOINT +
          'stages/amounts?' +
          querystring.stringify(queryParams),
      );

      const seriesData = formatAmounts(
        response.data,
        getValidDate(state.reports.dateStart),
        getValidDate(state.reports.dateTo),
      );

      const updateObject = {
        maxAmountValue: seriesData.maxAmount + 1,
        [params.updated ? 'updatedAmountData' : 'amountData']:
          seriesData.series,
      };

      return updateObject;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error Please, Try again later.'));
    }
  },
);

export const fetchStageAmountsPodcast = createAsyncThunk(
  `${reportsStoreKey}charts/fetchStageAmountsPodcast`,
  async (queryParams, thunkApi) => {
    try {
      const response = await axios.get(
        basePath + CHARTS_ENDPOINT + 'stages/amountspodcast?' + queryParams,
      );
      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error Please ,Try again later.'));
    }
  },
);

export const fetchStageAmountsSpeaker = createAsyncThunk(
  `${reportsStoreKey}charts/fetchStageAmountsSpeaker`,
  async (queryParams, thunkApi) => {
    try {
      const response = await axios.get(
        basePath + CHARTS_ENDPOINT + 'stages/amountsspeaker?' + queryParams,
      );
      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error Please ,Try again later.'));
    }
  },
);

export const fetchStageAmountsMedia = createAsyncThunk(
  `${reportsStoreKey}charts/fetchStageAmountsMedia`,
  async (queryParams, thunkApi) => {
    try {
      const response = await axios.get(
        basePath + CHARTS_ENDPOINT + 'stages/amountsmedia?' + queryParams,
      );
      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error Please ,Try again later.'));
    }
  },
);

export const fetchStageAmountsConference = createAsyncThunk(
  `${reportsStoreKey}charts/fetchStageAmountsConference`,
  async (queryParams, thunkApi) => {
    try {
      const response = await axios.get(
        basePath + CHARTS_ENDPOINT + 'stages/amountsconference?' + queryParams,
      );
      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error Please ,Try again later.'));
    }
  },
);

export const fetchStageAmountsAsscoaition = createAsyncThunk(
  `${reportsStoreKey}charts/fetchStageAmountsAsscoaition`,
  async (queryParams, thunkApi) => {
    try {
      const response = await axios.get(
        basePath + CHARTS_ENDPOINT + 'stages/amountsassociation?' + queryParams,
      );
      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error Please ,Try again later.'));
    }
  },
);

export const fetchStageAmountsbookedPodcast = createAsyncThunk(
  `${reportsStoreKey}charts/fetchStageAmountsbookedPodcast`,
  async (queryParams, thunkApi) => {
    try {
      const response = await axios.get(
        basePath +
          CHARTS_ENDPOINT +
          'stages/amountsbookedpodcast?' +
          queryParams,
      );
      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error Please ,Try again later.'));
    }
  },
);

export const fetchStageAmountsbookedSpeaker = createAsyncThunk(
  `${reportsStoreKey}charts/fetchStageAmountsbookedSpeaker`,
  async (queryParams, thunkApi) => {
    try {
      const response = await axios.get(
        basePath +
          CHARTS_ENDPOINT +
          'stages/amountsbookedpodcast?' +
          queryParams,
      );
      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error Please ,Try again later.'));
    }
  },
);

export const fetchStageAmountsbookedMedia = createAsyncThunk(
  `${reportsStoreKey}charts/fetchStageAmountsbookedMedia`,
  async (queryParams, thunkApi) => {
    try {
      const response = await axios.get(
        basePath + CHARTS_ENDPOINT + 'stages/amountsbookedmedia?' + queryParams,
      );
      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error Please ,Try again later.'));
    }
  },
);

export const fetchStageAmountsbookedAsscoaition = createAsyncThunk(
  `${reportsStoreKey}charts/fetchStageAmountsbookedAsscoaition`,
  async (queryParams, thunkApi) => {
    try {
      const response = await axios.get(
        basePath +
          CHARTS_ENDPOINT +
          'stages/amountsbookedassociation?' +
          queryParams,
      );
      return response.data;
    } catch (error) {
      thunkApi.dispatch(errorAlert('Error Please ,Try again later.'));
    }
  },
);
