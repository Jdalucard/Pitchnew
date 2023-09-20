import { useCallback, useEffect, useState } from 'react';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import {
  Button,
  ButtonGroup,
  InputAdornment,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppDispatch } from '../../../../redux/hooks';
import { contactCategories, mediaOutletCategories } from '../../../../constants';
import type { Dayjs } from 'dayjs';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { getGenres, getLanguages } from '../../../../redux/searchParameters';
import styles from '../../ContactSearches.module.css';
import { IPodcastsCategory, IPodcastsGenre } from '../PodcastsSearch';

// const mainCategoriesForMediaOutlets: ICategorySelect[] = [
//   { label: 'Magazines', value: mediaOutletCategories.magazine },
//   { label: 'Newspapers', value: mediaOutletCategories.newspaper },
//   { label: 'Radio stations', value: mediaOutletCategories.radio },
//   { label: 'TV stations', value: mediaOutletCategories.tv },
//   { label: 'Newspapers', value: mediaOutletCategories.newspaper },
// ];

export interface IFilterPodcastsSearchsOptions {
  mainCategory: IPodcastsCategory;
  keywords: string;
  genre: IPodcastsGenre;
  language: IPodcastsCategory;
  publishedBefore: Dayjs | null;
  publishedAfter: Dayjs | null;
}

interface IProps {
  handleProcessFiltering: (filters: IFilterPodcastsSearchsOptions) => void;
}

export function PodcastsSearchFiltering({ handleProcessFiltering }: IProps) {
  const dispatch = useAppDispatch();

  const [filtersEvaluated, setFiltersEvaluated] = useState(true);
  const [displayingMoreFilters, setDisplayingMoreFilter] = useState(false);
  const [genresList, setGenresList] = useState<IPodcastsGenre[]>([]);
  const [languagesList, setLanguagesList] = useState<IPodcastsCategory[]>([]);
  const [filterOptions, setFilerOptions] = useState<IFilterPodcastsSearchsOptions>({
    mainCategory: { label: 'Podcasts', value: contactCategories.podcast },
    keywords: '',
    genre: { label: 'All genres', value: 0 },
    language: { label: 'All languages', value: 'all' },
    publishedBefore: null,
    publishedAfter: null,
  });

  const fetchParameters = useCallback(async () => {
    const genresResponse = await dispatch(getGenres()).unwrap();
    const languagesResponse = await dispatch(getLanguages()).unwrap();

    if (genresResponse?.length) {
      setGenresList(genresResponse);
    }
    if (languagesResponse?.length) {
      setLanguagesList(languagesResponse);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchParameters();
  }, [fetchParameters]);

  const handleFiltersChange = (
    event: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFilerOptions((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    setFiltersEvaluated(false);
  };

  const handleDateFiltersChange = (newValue: Dayjs | null, fieldName: string) => {
    setFilerOptions((prev) => {
      return {
        ...prev,
        [fieldName]: newValue,
      };
    });

    setFiltersEvaluated(false);
  };

  const handleFiltersMainCategoryChange = (selected: IPodcastsCategory) => {
    setFilerOptions((prev) => {
      return {
        ...prev,
        mainCategory: selected,
      };
    });

    setFiltersEvaluated(false);
  };

  return (
    <div className={styles.filtersWrapper}>
      <ButtonGroup variant="text" sx={{ border: '1px solid #f1f2f3' }}>
        <Button
          onClick={() =>
            handleFiltersMainCategoryChange({
              label: 'Podcasts',
              value: contactCategories.podcast,
            })
          }
          sx={(theme) => ({
            backgroundColor:
              filterOptions.mainCategory?.value === contactCategories.podcast
                ? theme.palette.text.secondary
                : 'auto',
            color:
              filterOptions.mainCategory?.value === contactCategories.podcast
                ? theme.palette.text.primaryInverted
                : theme.palette.text.primary,
            ':hover': {
              backgroundColor:
                filterOptions.mainCategory?.value === contactCategories.podcast
                  ? theme.palette.text.secondary
                  : 'auto',
            },
          })}
          size="small"
        >
          Podcasts
        </Button>
        <Button
          onClick={() =>
            handleFiltersMainCategoryChange({
              label: 'Episodes',
              value: contactCategories.podcastEpisode,
            })
          }
          sx={(theme) => ({
            backgroundColor:
              filterOptions.mainCategory?.value === contactCategories.podcastEpisode
                ? theme.palette.text.secondary
                : 'auto',
            color:
              filterOptions.mainCategory?.value === contactCategories.podcastEpisode
                ? theme.palette.text.primaryInverted
                : theme.palette.text.primary,
            ':hover': {
              backgroundColor:
                filterOptions.mainCategory?.value === contactCategories.podcastEpisode
                  ? theme.palette.text.secondary
                  : 'auto',
            },
          })}
          size="small"
        >
          Episodes
        </Button>
      </ButtonGroup>
      <div className={styles.filtersAndButtonWrapper}>
        <div className={styles.regularFiltersWrapper}>
          <Button
            variant="text"
            color="primary"
            size="small"
            endIcon={
              displayingMoreFilters ? (
                <ArrowDropUpIcon fontSize="small" />
              ) : (
                <ArrowDropDownIcon fontSize="small" />
              )
            }
            onClick={() => setDisplayingMoreFilter((prev) => !prev)}
          >
            {displayingMoreFilters ? 'Less filters' : 'More filters'}
          </Button>
          <div
            className={styles.selectWrappers}
            style={{ marginTop: displayingMoreFilters ? '1rem' : '' }}
          >
            {displayingMoreFilters && (
              <>
                {!!genresList?.length && (
                  <TextField
                    name="genre"
                    label="Genres"
                    value={filterOptions.genre}
                    onChange={handleFiltersChange}
                    className={styles.filterInputSelectWrapper}
                    select
                  >
                    <MenuItem value="all">All genres</MenuItem>
                    {genresList.map((genre, index) => {
                      return (
                        <MenuItem key={index} value={genre.label}>
                          {genre.label}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
                {!!languagesList?.length && (
                  <TextField
                    name="language"
                    label="Languages"
                    value={filterOptions.language}
                    onChange={handleFiltersChange}
                    className={styles.filterInputSelectWrapper}
                    select
                  >
                    <MenuItem value="all">All locations</MenuItem>
                    {languagesList.map((language, index) => {
                      return (
                        <MenuItem key={index} value={language.label}>
                          {language.value}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
                <div className={styles.filterInputSelectWrapper}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label="Published before"
                      value={filterOptions.publishedBefore}
                      onChange={(newValue) => handleDateFiltersChange(newValue, 'publishedBefore')}
                    />
                  </DemoContainer>
                </div>
                <div className={styles.filterInputSelectWrapper}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label="Published after"
                      value={filterOptions.publishedAfter}
                      onChange={(newValue) => handleDateFiltersChange(newValue, 'publishedAfter')}
                    />
                  </DemoContainer>
                </div>
              </>
            )}
          </div>
          <TextField
            type="text"
            label="Keyword search"
            name="keyword"
            value={filterOptions.keywords}
            onChange={handleFiltersChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SavedSearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleProcessFiltering(filterOptions);
            setFiltersEvaluated(true);
          }}
          disabled={filtersEvaluated}
        >
          Filter
        </Button>
      </div>
    </div>
  );
}
