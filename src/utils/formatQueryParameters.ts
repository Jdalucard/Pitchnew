import { Dayjs } from 'dayjs';

export interface ISearchParameters {
  type: string;
  genre?: string;
  language?: string;
  keywords?: string;
  publishedBefore?: Dayjs | null;
  publishedAfter?: Dayjs | null;
  resultsPerPage?: number;
  offset?: number;
  pagination?: string;
}

export function formatQueryParameters(searchParameters: ISearchParameters) {
  const parameterKeys = Object.keys(searchParameters);
  let formatted = '';

  parameterKeys.map(
    (key) => (formatted += `&${key}=${searchParameters[key as keyof ISearchParameters]}`),
  );

  return formatted.slice(1);
}
