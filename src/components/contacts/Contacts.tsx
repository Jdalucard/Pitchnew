import { useEffect, useState } from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IContactListItemDetail, contactListSelectors } from '../../redux/contactList';
import { useAppSelector } from '../../redux/hooks';
import {
  ContactItems,
  ContactsFiltering,
  DetailedItem,
  IFilterContactsOptions,
} from './components';
import { contactCategories } from '../../constants';
import styles from './Contacts.module.css';

export function Contacts() {
  const userContactLists = useAppSelector(contactListSelectors.contactLists);
  const userContactItems = useAppSelector(contactListSelectors.contactListsItems);

  const [displayingItems, setDisplayingItems] = useState<IContactListItemDetail[]>([]);
  const [displayingDetailItem, setDisplayingDetailItem] = useState<IContactListItemDetail | null>(
    null,
  );

  useEffect(() => {
    setDisplayingItems(userContactItems);
  }, [userContactItems]);

  const handleProcessFiltering = (filters: IFilterContactsOptions) => {
    const { category, pitchState, contactList, keyword } = filters;

    let newItemsDisplaying = userContactItems;
    if (category !== 'all') {
      newItemsDisplaying = newItemsDisplaying.filter((item) => {
        if (
          category === contactCategories.podcast ||
          category === contactCategories.podcastEpisode
        ) {
          return (
            item.baseInfo.category === contactCategories.podcast ||
            item.baseInfo.category === contactCategories.podcastEpisode
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
      const selectedContactList = userContactLists.find((list) => list.name === contactList);

      newItemsDisplaying = newItemsDisplaying.filter(
        (item) => item.baseInfo.listId === selectedContactList?._id,
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
          <DetailedItem info={displayingDetailItem} userContactLists={userContactLists} />
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
