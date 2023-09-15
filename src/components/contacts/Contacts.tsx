import { useEffect, useState } from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useGetUserContactItems } from '../../hooks';
import { IContactListItemDetail, contactListSelectors } from '../../redux/contactList';
import { useAppSelector } from '../../redux/hooks';
import { ContactItems, ContactsFiltering, DetailedItem } from './components';
import styles from './Contacts.module.css';
import { contactCategories } from '../../constants';

export interface IFilterOptions {
  category: string;
  pitchState: string;
  contactList: string;
  keyword: string;
}

export function Contacts() {
  const userContactItems = useAppSelector(contactListSelectors.contactListsWithItems);

  useGetUserContactItems();

  const [displayingItems, setDisplayingItems] = useState<IContactListItemDetail[]>(
    userContactItems.items,
  );
  const [displayingDetailItem, setDisplayingDetailItem] = useState<IContactListItemDetail | null>(
    null,
  );

  useEffect(() => {
    setDisplayingItems(userContactItems.items);
  }, [userContactItems]);

  const handleProcessFiltering = (filters: IFilterOptions) => {
    const { category, pitchState, contactList, keyword } = filters;

    let newItemsDisplaying = userContactItems.items;
    if (category !== 'all') {
      newItemsDisplaying = newItemsDisplaying.filter((item) => {
        if (
          category === contactCategories.podcast ||
          category === contactCategories.podcastEpisde
        ) {
          return (
            item.baseInfo.category === contactCategories.podcast ||
            item.baseInfo.category === contactCategories.podcastEpisde
          );
        } else {
          return item.baseInfo.category === category;
        }
      });
    }

    if (pitchState !== 'all') {
      const transformValue = (oldPitchState: string) =>
        oldPitchState === 'pitched' ? true : false;
      newItemsDisplaying = newItemsDisplaying.filter(
        (item) => item.baseInfo.pitched === transformValue(pitchState),
      );
    }

    if (contactList !== 'all') {
      newItemsDisplaying = newItemsDisplaying.filter(
        (item) => item.baseInfo.tag.listId === contactList,
      );
    }

    if (keyword) {
      newItemsDisplaying = newItemsDisplaying.filter(
        (item) =>
          item.baseInfo.name.includes(keyword) ||
          item.baseInfo.email?.includes(keyword) ||
          item.baseInfo.position?.includes(keyword),
      );
    }

    setDisplayingItems(newItemsDisplaying);
  };

  return (
    <div className={styles.mainWrapper}>
      {displayingDetailItem ? (
        <>
          <div className={styles.goBackAndTitle}>
            <div>
              <Tooltip title="Go back" placement="right">
                <IconButton onClick={() => setDisplayingDetailItem(null)}>
                  <ArrowBackIcon color="primary" fontSize="large" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <DetailedItem info={displayingDetailItem} />
        </>
      ) : (
        <>
          <Typography variant="h3" color="text.primary" m="2rem 0">
            Contacts
          </Typography>
          <ContactsFiltering handleProcessFiltering={handleProcessFiltering} />
          <ContactItems
            displayingItems={displayingItems}
            handleShowItemDetail={(item) => setDisplayingDetailItem(item)}
          />
        </>
      )}
    </div>
  );
}
