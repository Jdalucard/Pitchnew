import { useState } from 'react';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import { Button, InputAdornment, MenuItem, SelectChangeEvent, TextField } from '@mui/material';
import { IFilterOptions } from '../Contacts';
import { useAppSelector } from '../../../redux/hooks';
import { contactListSelectors } from '../../../redux/contactList';
import styles from '../Contacts.module.css';

interface IProps {
  handleProcessFiltering: (filters: IFilterOptions) => void;
}

export function ContactsFiltering({ handleProcessFiltering }: IProps) {
  const userLists = useAppSelector(contactListSelectors.contactLists);

  const [filtersEvaluated, setFiltersEvaluated] = useState(true);
  const [filterOptions, setFilerOptions] = useState<IFilterOptions>({
    category: 'all',
    pitchState: 'all',
    contactList: 'all',
    keyword: '',
  });

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

  return (
    <div className={styles.filtersWrapper}>
      <div>
        <div className={styles.selectWrappers}>
          <TextField
            name="category"
            label="Category"
            value={filterOptions.category}
            onChange={handleFiltersChange}
            select
            className={styles.filterInputSelectWrapper}
          >
            <MenuItem value="all">All categories</MenuItem>
            <MenuItem value="podcast">Podcasts</MenuItem>
            <MenuItem value="eventOrganization">Local associations</MenuItem>
            <MenuItem value="speaker">Speakers</MenuItem>
            <MenuItem value="mediaOutlet">Media outlets</MenuItem>
            <MenuItem value="conference">Conferences</MenuItem>
          </TextField>
          {userLists?.length && (
            <TextField
              name="contactList"
              label="Contact list"
              value={filterOptions.contactList}
              onChange={handleFiltersChange}
              select
              className={styles.filterInputSelectWrapper}
            >
              <MenuItem value="all">All lists</MenuItem>
              {userLists.map((list, index) => {
                return (
                  <MenuItem key={index} value={list._id}>
                    {list.name}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
          <TextField
            name="pitchState"
            label="Pitch State"
            value={filterOptions.pitchState}
            onChange={handleFiltersChange}
            select
            className={styles.filterInputSelectWrapper}
          >
            <MenuItem value="all">All states</MenuItem>
            <MenuItem value="pitched">Pitched</MenuItem>
            <MenuItem value="new">New</MenuItem>
          </TextField>
        </div>
        <TextField
          type="text"
          label="Keyword search"
          name="keyword"
          value={filterOptions.keyword}
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
  );
}
