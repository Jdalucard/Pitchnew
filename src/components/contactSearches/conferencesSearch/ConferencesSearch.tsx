import { useCallback, useEffect, useState } from 'react';
import { Button, IconButton, Pagination, Tooltip, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { AnimatePresence, motion } from 'framer-motion';
import { formatQueryParameters } from '../../../utils';
import {
  IContactListItemDetail,
  addUserContactListItems,
  contactListSelectors,
  getUserContactLists,
} from '../../../redux/contactList';
import { AddToContactsModal, SearchResultsWrapper } from '../common';
import { LoadingDisplay, LoadingIcon } from '../../../common';
import {
  IListTag,
  ISearchTransformedParameters,
  ISelectInputOption,
  contactSearchTypes,
  loadingDisplayTypes,
} from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { errorSideAlert, successSideAlert } from '../../../redux/alerts';
import {
  ConferenceItem,
  ConferencesSearchFiltering,
  IFilterConferencesSearchsOptions,
} from './components';
import styles from '../ContactSearches.module.css';
import {
  processGetConferences,
  processGetTotalConferences,
} from '../../../redux/searches/conferencesSearch';
import { saveUserSearch } from '../../../redux/searches/userSavedSearches';

export interface IConferenceResult {
  _id: string;
  website?: string;
  hasEmail: boolean;
  eventName: string;
  eventDescription: string;
  category: string;
  enrichment?: { logo?: string };
  date?: string;
  // filling fields post getting result:
  tags?: IListTag[];
}

interface ISearchResults {
  results: IConferenceResult[];
  totalInDB: number;
  offset: number;
}

const resultsPerPage = 10;

export function ConferencesSearch() {
  const dispatch = useAppDispatch();
  const contactLists = useAppSelector(contactListSelectors.contactLists);
  const contactListsItems = useAppSelector(contactListSelectors.contactListsItems);

  const [loadingView, setLoadingView] = useState<'loadMore' | 'pagination'>('loadMore');
  const [currentResults, setCurrentResults] = useState<ISearchResults>({
    results: [],
    totalInDB: 0,
    offset: 0,
  });
  const [selectedItems, setSelectedItems] = useState<IConferenceResult[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [isLoadingAddingContacts, setIsLoadingAddingContacts] = useState(false);
  const [displayingAddToContacts, setDisplayingAddToContacts] = useState(false);
  const [displayinScrollTop, setDisplayingScrollTop] = useState(false);
  const [resultsMatchShouldUpdate, setResultsMatchShouldUpdate] = useState(false);

  const getContactListInfoIfExists = useCallback(
    (results: IConferenceResult[]) => {
      const itemsThatMatch: IConferenceResult[] = [];
      const itemsThatDontMatch: IConferenceResult[] = [];

      results.map((result) => {
        let matched = false;
        const listsPerResult: IListTag[] = [];

        contactListsItems.map((item) => {
          if (
            result.eventName === item.baseInfo.name &&
            result.category === item.details?.conferenceCategory
          ) {
            const foundList = contactLists.find((list) => list._id === item.baseInfo.listId);
            if (foundList) {
              listsPerResult.push({ listId: foundList._id, listName: foundList.name });
              matched = true;
            }
          }
        });

        if (!matched) {
          itemsThatDontMatch.push(result);
        } else {
          itemsThatMatch.push({
            ...result,
            tags: listsPerResult,
          });
        }
      });

      return [...itemsThatMatch, ...itemsThatDontMatch];
    },
    [contactLists, contactListsItems],
  );

  const getConferences = useCallback(
    async (
      offset: number,
      isResettingValue: boolean,
      filters?: IFilterConferencesSearchsOptions,
    ) => {
      setIsLoadingResults(true);

      const searchParameters: ISearchTransformedParameters = {
        resultsPerPage: resultsPerPage,
        offset,
      };

      if (filters) {
        const { keywords, season, country, state, city } = filters;

        if (keywords) searchParameters.keywords = keywords;
        if (season && season !== 'all') searchParameters.season = season;
        if (country && country.value !== 'all') searchParameters.country = country.label;
        if (state && state.value !== 'all') searchParameters.state = state.label;
        if (city && city.value !== 'all') searchParameters.city = city.label;
      }

      const formattedSearchParameters = formatQueryParameters(searchParameters);

      const response = await dispatch(processGetConferences(formattedSearchParameters)).unwrap();
      const totalResponse = await dispatch(processGetTotalConferences()).unwrap();

      if (response?.results && totalResponse.total) {
        setCurrentResults((prev) => {
          let newResults: IConferenceResult[];

          if (isResettingValue) {
            setSelectedItems([]);

            newResults = response.results;
          } else {
            newResults = [...prev.results, ...response.results];
          }

          return {
            results: newResults,
            totalInDB: totalResponse.total,
            offset: response.offset ?? newResults.length,
          };
        });

        setResultsMatchShouldUpdate(true);

        if (isResettingValue) {
          dispatch(
            saveUserSearch({
              type: contactSearchTypes.conferenceSearch,
              keyword: filters?.keywords ?? '',
              results: response.total,
              filters: searchParameters,
            }),
          );
        }
      }
      setIsLoadingResults(false);
    },
    [dispatch],
  );

  useEffect(() => {
    getConferences(0, false);
  }, [getConferences]);

  useEffect(() => {
    if (resultsMatchShouldUpdate) {
      setTimeout(() => {
        const resultsMatchedWithContacts = getContactListInfoIfExists(currentResults.results);

        setCurrentResults((prev) => {
          return {
            ...prev,
            results: resultsMatchedWithContacts,
          };
        });

        setResultsMatchShouldUpdate(false);
      }, 1000);
    }
  }, [resultsMatchShouldUpdate, getContactListInfoIfExists, currentResults.results]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        if (!displayinScrollTop) setDisplayingScrollTop(true);
      } else {
        if (displayinScrollTop) setDisplayingScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayinScrollTop]);

  const handleProcessFiltering = (filters: IFilterConferencesSearchsOptions) => {
    getConferences(0, true, filters);
  };

  const handleToggleLoadingView = (view: 'loadMore' | 'pagination') => {
    setLoadingView(view);

    if (currentResults.offset > resultsPerPage * 1) {
      getConferences(0, true);
    }
  };

  const handleToggleSelectAll = () => {
    let newItemsSelected: IConferenceResult[] = [];

    if (selectedItems.length < currentResults.results.length) {
      newItemsSelected = currentResults.results;
    }

    setSelectedItems(newItemsSelected);
  };

  const handleItemSelection = (item: IConferenceResult) => {
    const selectedItemsWithoutExtraSelection = selectedItems.filter(
      (selectedItem) => selectedItem._id !== item._id,
    );

    if (selectedItemsWithoutExtraSelection.length === selectedItems.length) {
      setSelectedItems((prev) => [item, ...prev]);
    } else {
      setSelectedItems(selectedItemsWithoutExtraSelection);
    }
  };

  const handleLoadMore = () => {
    getConferences(currentResults.offset, false);
  };

  const handlePaginationChange = (_e: React.ChangeEvent<unknown>, page: number) => {
    getConferences(page * resultsPerPage - resultsPerPage * 1, true);

    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleGoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleAddItemsToLists = (listsSelected: ISelectInputOption[]) => {
    setIsLoadingAddingContacts(true);

    const itemsExistingInListsSelected: IContactListItemDetail[] = [];

    listsSelected.map((list) => {
      contactListsItems.map((item) => {
        if (item.baseInfo.listId === list._id) {
          itemsExistingInListsSelected.push(item);
        }
      });
    });

    let existingItem: string | null = null;
    let existingInList: string | null = null;

    selectedItems.map((selectedItem) => {
      if (existingItem && existingInList) return;

      itemsExistingInListsSelected.find((item) => {
        if (
          selectedItem.eventName === item.baseInfo.name &&
          selectedItem.category === item.details?.conferenceCategory
        ) {
          const foundList = contactLists.find((list) => list._id === item.baseInfo.listId);
          existingItem = item.baseInfo.name;
          existingInList = foundList?.name ?? '';
        }
      });
    });

    if (existingItem && existingInList) {
      setIsLoadingAddingContacts(false);
      dispatch(
        errorSideAlert(
          `The contact item named "${existingItem}" is already stored in the ${existingInList} contact lists.`,
        ),
      );

      return;
    }

    listsSelected.map((list) => {
      if (list._id) {
        dispatch(
          addUserContactListItems({
            listId: list._id,
            itemType: 'conference',
            items: selectedItems,
          }),
        );
      }
    });

    dispatch(getUserContactLists({ page: 0, noLimit: true }));
    setResultsMatchShouldUpdate(true);

    dispatch(successSideAlert('Contacts successfully added to lists'));
    setIsLoadingAddingContacts(false);
    setDisplayingAddToContacts(false);
  };

  return (
    <>
      <div className={styles.contactSearchesWrapper}>
        <Typography variant="h3" color="primary.main" sx={{ m: '2rem 0' }}>
          Conferences search
        </Typography>
        <ConferencesSearchFiltering handleProcessFiltering={handleProcessFiltering} />
        {currentResults.results.length ? (
          <>
            {isLoadingResults && (
              <div style={{ marginTop: '1rem' }}>
                <LoadingIcon />
              </div>
            )}
            <SearchResultsWrapper
              itemsTypeLabel="conference"
              totalItems={currentResults.totalInDB}
              selectedItemsTotal={selectedItems.length}
              totalResultsInDB={currentResults.results.length}
              loadingView={loadingView}
              allItemsAreSelected={currentResults.results.length === selectedItems.length}
              handleOpenAddContactsModal={() => setDisplayingAddToContacts(true)}
              handleToggleLoadingView={handleToggleLoadingView}
              handleToggleSelectAll={handleToggleSelectAll}
            >
              <>
                {currentResults.results.map((result, index) => {
                  return (
                    <ConferenceItem
                      key={index}
                      selectedItems={selectedItems}
                      itemInfo={result}
                      handleItemSelection={handleItemSelection}
                    />
                  );
                })}
              </>
            </SearchResultsWrapper>
            <div className={styles.loadingViewControlls}>
              {isLoadingResults ? (
                <LoadingIcon />
              ) : (
                <>
                  {loadingView === 'loadMore' ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleLoadMore}
                      disabled={currentResults.offset === currentResults.totalInDB}
                    >
                      Load more
                    </Button>
                  ) : (
                    <Pagination
                      variant="outlined"
                      shape="rounded"
                      color="primary"
                      count={Math.floor(currentResults.totalInDB / resultsPerPage)}
                      page={Math.floor(currentResults.offset / resultsPerPage)}
                      onChange={handlePaginationChange}
                    />
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <>
            {isLoadingResults ? (
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
        <AnimatePresence>
          {displayinScrollTop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.goTopWrapper}
            >
              <Tooltip title="Scroll top" placement="top">
                <IconButton
                  sx={(theme) => ({
                    border: '1px solid #f1f2f3',
                    boxShadow: theme.palette.primary.generalBoxShadow,
                    backgroundColor: theme.palette.text.secondaryInverted,
                  })}
                  onClick={handleGoTop}
                >
                  <ArrowUpwardIcon sx={(theme) => ({ color: theme.palette.text.secondary })} />
                </IconButton>
              </Tooltip>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AddToContactsModal
        isOpen={displayingAddToContacts}
        selectedItemsAmount={selectedItems.length}
        handleClose={() => setDisplayingAddToContacts(false)}
        handleAddItemsToLists={handleAddItemsToLists}
        isLoading={isLoadingAddingContacts}
      />
    </>
  );
}
