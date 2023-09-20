import { useCallback, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import {
  IFilterPodcastsSearchsOptions,
  PodcastsSearchFiltering,
} from './components/PodcastsSearchFiltering';
import { contactCategories } from '../../../constants';
import { formatQueryParameters } from '../../../utils';
import { podcastsSocket } from '../../../sockets/podcastsSocket';
import { IContactListItemDetail, contactListSelectors } from '../../../redux/contactList';
import { SearchResultsWrapper } from '../common';
import { Dayjs } from 'dayjs';
import { LoadingDisplay } from '../../../common';
import { loadingDisplayTypes } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { errorSideAlert } from '../../../redux/alerts';
import styles from '../ContactSearches.module.css';
import { PodcastItem } from './components';

interface IReview {
  rating: number;
  date: string;
  title: string;
  author: string;
  comment: string;
}

export interface IPodcastsCategory {
  _id?: string;
  label: string;
  value: string;
}

export interface IPodcastsGenre {
  _id?: string;
  label: string;
  value: number;
  parentId?: number;
}

interface IListTag {
  listName: string;
  listId: string;
}

export interface IPodcastResult {
  description: string;
  done?: boolean;
  failed?: boolean;
  feedUrl: string;
  genres: IPodcastsGenre[];
  iTunesId: number;
  image: string;
  listenNotesId: string;
  publisherName: string;
  rating: number;
  ratingsAmount: number;
  reviewsArray: IReview[];
  title: string;
  type: string;
  // filling fields post getting result:
  connected?: boolean;
  tags?: IListTag[];
}

interface ISearchResults {
  results: IPodcastResult[];
  totalInDB: number;
  offset: number;
  page: number;
}

interface ISearchTransformedParameters {
  type: string;
  genresId?: string[];
  language?: string;
  keywords?: string;
  publishedBefore?: Dayjs | null;
  publishedAfter?: Dayjs | null;
  resultsPerPage?: number;
  offset?: number;
  pagination?: string;
}

const totalForPodcasts = 3131282;
const totalForEpisodes = 168863851;

export function PodcastsSearch() {
  const dispatch = useAppDispatch();
  const contactListsItems = useAppSelector(contactListSelectors.contactListsItems);

  const [loadingView, setLoadingView] = useState<'loadMore' | 'pagination'>('loadMore');
  const [currentResults, setCurrentResults] = useState<ISearchResults>({
    results: [],
    totalInDB: 0,
    offset: 0,
    page: 0,
  });
  const [selectedItems, setSelectedItems] = useState<IPodcastResult[]>([]);
  const [mainCategorySelected, setMainCategorySelected] = useState<string>(
    contactCategories.podcast,
  );
  const [isLoading, setIsLoading] = useState(false);

  const getContactListInfoIfExists = useCallback((results: IPodcastResult[]) => {
    const itemsThatMatch: IPodcastResult[] = [];
    const itemsThatDontMatch: IPodcastResult[] = [];

    results.map((result) => {
      let matched = false;
      const listsPerResult: IListTag[] = [];

      contactListsItems.items.map((item) => {
        if (result.listenNotesId === item.details?.listenNotesId) {
          console.log('tag found!');
          listsPerResult.push(item.baseInfo.tag);
          matched = true;
        }
      });

      if (!matched) {
        itemsThatDontMatch.push(result);
      } else {
        itemsThatMatch.push({
          ...result,
          connected: true,
          tags: listsPerResult,
        });
      }
    });

    return [...itemsThatMatch, ...itemsThatDontMatch];
  }, []);

  const getPodcasts = useCallback(
    (offset: number, filters?: IFilterPodcastsSearchsOptions) => {
      setIsLoading(true);
      const searchParameters: ISearchTransformedParameters = {
        type: contactCategories.podcast,
        resultsPerPage: 10, // useless. The socket brings 10 regardless
        keywords: 'business',
      };

      if (loadingView === 'pagination') {
        searchParameters.pagination = 'true';
        searchParameters.offset = offset + 20;
      } else {
        searchParameters.pagination = 'false';
        searchParameters.offset = offset;
      }

      if (filters) {
        const { keywords, genre, language, publishedBefore, publishedAfter } = filters;

        if (keywords) searchParameters.keywords = keywords;
        if (genre._id && genre.value !== 0) searchParameters.genresId = [genre._id];
        if (language && language.value !== 'all') searchParameters.language = language.value;
        if (publishedBefore) searchParameters.publishedBefore = publishedBefore;
        if (publishedAfter) searchParameters.publishedAfter = publishedAfter;
      }

      const formattedSearchParameters = formatQueryParameters(searchParameters);

      const searchSocket = podcastsSocket.searchPodcasts(formattedSearchParameters);

      searchSocket.on(podcastsSocket.events.RESULTS_FIRST, (response: any) => {
        if (response?.results) {
          setCurrentResults((prev) => {
            return {
              results: [...prev.results, ...response.results],
              totalInDB: response.total,
              offset: response.offset,
              page: response.page ?? 0,
            };
          });
        }
        setIsLoading(false);
      });
      searchSocket.on(podcastsSocket.events.RESULTS_COMPLETE, () => {
        setIsLoading(false);
      });
      searchSocket.on(podcastsSocket.events.SEARCH_ERROR, () => {
        setIsLoading(false);
        dispatch(errorSideAlert('Error performing the search. Please, try again later.'));
      });
    },
    [dispatch, loadingView],
  );

  useEffect(() => {
    getPodcasts(0);
  }, [getPodcasts]);

  useEffect(() => {
    if (currentResults.results.length) {
      const resultsMatchedWithContacts = getContactListInfoIfExists(currentResults.results);
      setCurrentResults((prev) => {
        return {
          ...prev,
          results: resultsMatchedWithContacts,
        };
      });
    }
  }, [currentResults.offset]);

  const handleProcessFiltering = (filters: IFilterPodcastsSearchsOptions) => {
    getPodcasts(0, filters);
    setCurrentResults((prev) => {
      return {
        ...prev,
        offset: 0,
      };
    });
    setMainCategorySelected(filters.mainCategory.value);
  };

  const totalItemsForMainCategory = () => {
    if (mainCategorySelected === contactCategories.podcast) {
      return totalForPodcasts;
    } else {
      return totalForEpisodes;
    }
  };

  const handleOpenAddContactsModal = () => {
    console.log('add to contacts!');
  };

  const handleToggleLoadingView = (view: 'loadMore' | 'pagination') => {
    setLoadingView(view);
  };

  const handleToggleSelectAll = () => {
    let newItemsSelected: IPodcastResult[] = [];

    if (selectedItems.length < currentResults.results.length) {
      newItemsSelected = currentResults.results;
    }

    setSelectedItems(newItemsSelected);
  };

  const handleItemSelection = (item: IPodcastResult) => {
    const selectedItemsWithoutExtraSelection = selectedItems.filter(
      (selectedItem) => selectedItem.listenNotesId !== item.listenNotesId,
    );

    if (selectedItemsWithoutExtraSelection.length === selectedItems.length) {
      setSelectedItems((prev) => [item, ...prev]);
    } else {
      setSelectedItems(selectedItemsWithoutExtraSelection);
    }
  };

  return (
    <div className={styles.contactSearchesWrapper}>
      <Typography variant="h3" color="primary.main" sx={{ m: '2rem 0' }}>
        Podcasts search
      </Typography>
      <PodcastsSearchFiltering handleProcessFiltering={handleProcessFiltering} />
      {currentResults.results.length ? (
        <SearchResultsWrapper
          itemsTypeLabel={mainCategorySelected}
          totalItems={totalItemsForMainCategory()}
          selectedItemsTotal={selectedItems.length}
          totalResultsInDB={currentResults.totalInDB}
          loadingView={loadingView}
          allItemsAreSelected={currentResults.results.length === selectedItems.length}
          handleOpenAddContactsModal={handleOpenAddContactsModal}
          handleToggleLoadingView={handleToggleLoadingView}
          handleToggleSelectAll={handleToggleSelectAll}
        >
          <>
            {currentResults.results.map((result, index) => {
              return (
                <PodcastItem
                  key={index}
                  selectedItems={selectedItems}
                  itemInfo={result}
                  handleItemSelection={handleItemSelection}
                />
              );
            })}
          </>
        </SearchResultsWrapper>
      ) : (
        <>
          {isLoading ? (
            <div className={styles.isLoadingWrapper}>
              <LoadingDisplay type={loadingDisplayTypes.entireComponent} />
            </div>
          ) : (
            <div className={styles.isLoadingWrapper}>
              <Typography variant="body1" color="text.secondary">
                No results to show.
              </Typography>
            </div>
          )}
        </>
      )}
    </div>
  );
}
