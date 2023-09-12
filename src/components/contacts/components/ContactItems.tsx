import { useCallback, useEffect, useState } from 'react';
import { List, Typography } from '@mui/material';
import { IContactListItemDetail } from '../../../redux/contactList';
import { ContactItem } from '.';
import styles from '../Contacts.module.css';

interface IContactListsItemsByCategory {
  podcasts: IContactListItemDetail[];
  podcastEpisodes: IContactListItemDetail[];
  eventOrganizations: IContactListItemDetail[];
  speakers: IContactListItemDetail[];
  mediaOutlets: IContactListItemDetail[];
  conferences: IContactListItemDetail[];
}

interface IProps {
  displayingItems: IContactListItemDetail[];
  handleShowItemDetail: (item: IContactListItemDetail) => void;
}

export function ContactItems({ displayingItems, handleShowItemDetail }: IProps) {
  const [itemsByCategory, setItemsByCategory] = useState<IContactListsItemsByCategory>({
    podcasts: [],
    podcastEpisodes: [],
    eventOrganizations: [],
    speakers: [],
    mediaOutlets: [],
    conferences: [],
  });

  const filterByCategories = useCallback((items: IContactListItemDetail[]) => {
    const categories = [
      'podcast',
      'podcastEpisode',
      'eventOrganization',
      'speaker',
      'mediaOutlet',
      'conference',
    ];

    const podcasts: IContactListItemDetail[] = [];
    const podcastEpisodes: IContactListItemDetail[] = [];
    const eventOrganizations: IContactListItemDetail[] = [];
    const speakers: IContactListItemDetail[] = [];
    const mediaOutlets: IContactListItemDetail[] = [];
    const conferences: IContactListItemDetail[] = [];

    categories.map((category) => {
      const filteredItems = items.filter((item) => item.baseInfo.category === category);

      switch (category) {
        case 'podcast':
          podcasts.push(...filteredItems);
          break;
        case 'podcastEpisode':
          podcastEpisodes.push(...filteredItems);
          break;
        case 'eventOrganization':
          eventOrganizations.push(...filteredItems);
          break;
        case 'speaker':
          speakers.push(...filteredItems);
          break;
        case 'mediaOutlet':
          mediaOutlets.push(...filteredItems);
          break;
        case 'conference':
          conferences.push(...filteredItems);
          break;
        default:
          break;
      }
    });

    setItemsByCategory({
      podcasts,
      podcastEpisodes,
      eventOrganizations,
      speakers,
      mediaOutlets,
      conferences,
    });
  }, []);

  useEffect(() => {
    if (displayingItems.length) {
      filterByCategories(displayingItems);
    }
  }, [displayingItems, filterByCategories]);

  const getTotalContactsDisplaying = () => {
    if (!displayingItems.length) {
      return 'No contacts to show';
    } else {
      return `${displayingItems.length} CONTACT${displayingItems.length > 1 ? 'S' : ''}`;
    }
  };

  return (
    <div className={styles.contactItemsWrapper}>
      <div className={styles.totalWrapper}>
        <Typography variant="body1" color="text.secondary" fontWeight="bold">
          {getTotalContactsDisplaying()}
        </Typography>
      </div>
      {!!displayingItems.length && (
        <div className={styles.listBody}>
          {!!itemsByCategory.speakers.length && (
            <>
              <Typography variant="body2" color="text.secondary" fontWeight="bold" mt="2rem">
                {`${itemsByCategory.speakers.length} SPEAKER${
                  itemsByCategory.speakers.length > 1 ? 'S' : ''
                }`}
              </Typography>
              <List>
                {itemsByCategory.speakers.map((item) => {
                  return (
                    <ContactItem
                      key={item.baseInfo.id}
                      info={item.baseInfo}
                      handleShowItemDetail={() => handleShowItemDetail(item)}
                    />
                  );
                })}
              </List>
            </>
          )}
          {(!!itemsByCategory.podcasts.length || !!itemsByCategory.podcastEpisodes.length) && (
            <>
              <Typography variant="body2" color="text.secondary" fontWeight="bold" mt="2rem">
                {`${
                  itemsByCategory.podcasts.length + itemsByCategory.podcastEpisodes.length
                } PODCAST${
                  itemsByCategory.podcasts.length + itemsByCategory.podcastEpisodes.length > 1
                    ? 'S'
                    : ''
                }`}
              </Typography>
              <List>
                {itemsByCategory.podcasts.map((item) => {
                  return (
                    <ContactItem
                      key={item.baseInfo.id}
                      info={item.baseInfo}
                      handleShowItemDetail={() => handleShowItemDetail(item)}
                    />
                  );
                })}
                {itemsByCategory.podcastEpisodes.map((item) => {
                  return (
                    <ContactItem
                      key={item.baseInfo.id}
                      info={item.baseInfo}
                      handleShowItemDetail={() => handleShowItemDetail(item)}
                    />
                  );
                })}
              </List>
            </>
          )}
          {!!itemsByCategory.mediaOutlets.length && (
            <>
              <Typography variant="body2" color="text.secondary" fontWeight="bold" mt="2rem">
                {`${itemsByCategory.mediaOutlets.length} MEDIA OUTLET${
                  itemsByCategory.mediaOutlets.length > 1 ? 'S' : ''
                }`}
              </Typography>
              <List>
                {itemsByCategory.mediaOutlets.map((item) => {
                  return (
                    <ContactItem
                      key={item.baseInfo.id}
                      info={item.baseInfo}
                      handleShowItemDetail={() => handleShowItemDetail(item)}
                    />
                  );
                })}
              </List>
            </>
          )}
          {!!itemsByCategory.conferences.length && (
            <>
              <Typography variant="body2" color="text.secondary" fontWeight="bold" mt="2rem">
                {`${itemsByCategory.conferences.length} CONFERENCE${
                  itemsByCategory.conferences.length > 1 ? 'S' : ''
                }`}
              </Typography>
              <List>
                {itemsByCategory.conferences.map((item) => {
                  return (
                    <ContactItem
                      key={item.baseInfo.id}
                      info={item.baseInfo}
                      handleShowItemDetail={() => handleShowItemDetail(item)}
                    />
                  );
                })}
              </List>
            </>
          )}
          {!!itemsByCategory.eventOrganizations.length && (
            <>
              <Typography variant="body2" color="text.secondary" fontWeight="bold" mt="2rem">
                {`${itemsByCategory.eventOrganizations.length} LOCAL ASSOCIATION${
                  itemsByCategory.eventOrganizations.length > 1 ? 'S' : ''
                }`}
              </Typography>
              <List>
                {itemsByCategory.eventOrganizations.map((item) => {
                  return (
                    <ContactItem
                      key={item.baseInfo.id}
                      info={item.baseInfo}
                      handleShowItemDetail={() => handleShowItemDetail(item)}
                    />
                  );
                })}
              </List>
            </>
          )}
        </div>
      )}
    </div>
  );
}
