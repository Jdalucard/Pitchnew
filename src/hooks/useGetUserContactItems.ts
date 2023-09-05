import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  IContactListsWithItems,
  contactListSelectors,
  getListContactItems,
  storeContactListItems,
} from '../redux/contactList';

export function useGetUserContactItems() {
  const dispatch = useAppDispatch();
  const userLists = useAppSelector(contactListSelectors.contactLists);
  const contactListsWithItems = useAppSelector(
    contactListSelectors.contactListsWithItems,
  );

  const getListItems = useCallback(
    async (listId: string) => {
      return await dispatch(getListContactItems(listId)).unwrap();
    },
    [dispatch],
  );

  useEffect(() => {
    if (contactListsWithItems) {
      const contactListsWithItems: IContactListsWithItems = {
        podcasts: [],
        podcastEpisodes: [],
        eventOrganizations: [],
        speakers: [],
        mediaOutlets: [],
        conferences: [],
      };

      if (userLists.length) {
        userLists.map(async (list) => {
          const listItems = await getListItems(list._id);

          if (listItems.length) {
            listItems.map((item: any) => {
              if (item.userPodcast) {
                const { userPodcast, _id, listId } = item;
                const { podcast, connected } = userPodcast;

                contactListsWithItems.podcasts.push(
                  ...contactListsWithItems.podcasts,
                  {
                    id: _id,
                    name: podcast.title,
                    image: podcast.image,
                    cat: 'podcast',
                    pitched: !!(connected && podcast.hasEmail),
                    tag: listId,
                    listenNotesId: podcast.listenNotesId,
                  },
                );
              } else if (item.userPodcastEpisode) {
                const { userPodcastEpisode, _id, listId } = item;
                const { episode, connected } = userPodcastEpisode;

                contactListsWithItems.podcastEpisodes.push(
                  ...contactListsWithItems.podcastEpisodes,
                  {
                    id: _id,
                    name: episode.title,
                    image: episode.image,
                    cat: 'episode',
                    pitched: !!(connected && episode.hasEmail),
                    tag: listId,
                    listenNotesId: episode.podcastListenNotesId,
                  },
                );
              } else if (item.userEventOrganization) {
                const { userEventOrganization, _id, listId } = item;
                const { eventOrganization } = userEventOrganization;
                const {
                  connected,
                  hasEmail,
                  dataFileType,
                  organization,
                  schoolName,
                  enrichment,
                  website,
                } = eventOrganization;

                const itemName = dataFileType === 2 ? organization : schoolName;
                const logo = enrichment
                  ? enrichment.logo
                  : `https://logo.clearbit.com/${website}`;

                contactListsWithItems.eventOrganizations.push(
                  ...contactListsWithItems.eventOrganizations,
                  {
                    id: _id,
                    name: itemName,
                    image: logo,
                    cat: 'events',
                    pitched: !!(connected && hasEmail),
                    tag: listId,
                  },
                );
              } else if (item.userSpeaker) {
                const { userSpeaker, _id, listId } = item;
                const { speaker, connected } = userSpeaker;

                const itemName = speaker.name ?? speaker.email;
                const logo = speaker.image ?? '';

                contactListsWithItems.speakers.push(
                  ...contactListsWithItems.speakers,
                  {
                    id: _id,
                    name: itemName,
                    image: logo,
                    cat: 'speaker',
                    pitched: !!(connected && speaker.email),
                    tag: listId,
                  },
                );
              } else if (item.userMediaOutlet) {
                const { userMediaOutlet, _id, listId } = item;
                const { mediaOutlet, connected } = userMediaOutlet;

                contactListsWithItems.mediaOutlets.push(
                  ...contactListsWithItems.mediaOutlets,
                  {
                    id: _id,
                    name: mediaOutlet.companyName ?? '',
                    image: null,
                    cat: 'media',
                    pitched: !!(connected && mediaOutlet.email),
                    tag: listId,
                  },
                );
              } else if (item.userConference) {
                const { userConference, _id, listId } = item;
                const { conference, connected } = userConference;

                const logo =
                  conference.enrichment.logo ??
                  `https://logo.clearbit.com/${conference.website}`;

                contactListsWithItems.conferences.push(
                  ...contactListsWithItems.conferences,
                  {
                    id: _id,
                    name: conference.eventName,
                    image: logo,
                    cat: 'conference',
                    pitched: !!(connected && conference.hasEmail),
                    tag: listId,
                  },
                );
              }
            });
          }
        });
      }

      dispatch(storeContactListItems(contactListsWithItems));
    }
  }, [contactListsWithItems, dispatch, getListItems, userLists]);
}
