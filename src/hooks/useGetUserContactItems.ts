import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  contactListSelectors,
  getListContactItems,
  setItemsEvaluated,
  storeContactListItem,
} from '../redux/contactList';
import { contactCategories } from '../constants';

export function useGetUserContactItems() {
  const dispatch = useAppDispatch();
  const userLists = useAppSelector(contactListSelectors.contactLists);
  const contactListsItems = useAppSelector(contactListSelectors.contactListsItems);

  const getListItems = useCallback(
    async (listId: string) => {
      return await dispatch(getListContactItems(listId)).unwrap();
    },
    [dispatch],
  );

  useEffect(() => {
    if (!contactListsItems.evaluated && userLists.length) {
      userLists.map(async (list) => {
        const listItems = await getListItems(list._id);

        if (listItems.length) {
          listItems.map((item: any) => {
            if (item.userPodcast) {
              const { userPodcast, _id, listId } = item;
              const { podcast, connected } = userPodcast;

              dispatch(
                storeContactListItem({
                  baseInfo: {
                    id: _id,
                    name: podcast.title,
                    image: podcast.image,
                    category: contactCategories.podcast,
                    pitched: !!(connected && podcast.hasEmail),
                    tag: { listId, listName: list.name },
                  },
                  details: {
                    id: userPodcast._id,
                    connected,
                    email: podcast.hasEmail,
                    listenNotesId: podcast.listenNotesId,
                    publisherName: podcast.publisherName,
                    categories: podcast.genres,
                    rating: {
                      value: podcast.rating,
                      reviewsAmount: podcast.ratingsAmount,
                    },
                    description: podcast.description,
                  },
                }),
              );
            } else if (item.userPodcastEpisode) {
              const { userPodcastEpisode, _id, listId } = item;
              const { episode, connected } = userPodcastEpisode;

              dispatch(
                storeContactListItem({
                  baseInfo: {
                    id: _id,
                    name: episode.title,
                    image: episode.image,
                    category: contactCategories.podcastEpisode,
                    pitched: !!(connected && episode.hasEmail),
                    tag: { listId, listName: list.name },
                  },
                  details: {
                    id: userPodcastEpisode._id,
                    connected,
                    email: episode.hasEmail,
                    listenNotesId: episode.podcastListenNotesId,
                    publisherName: episode.publisherName,
                    categories: episode.genres,
                    rating: {
                      value: episode.rating,
                      reviewsAmount: episode.ratingsAmount,
                    },
                    description: episode.description,
                    publishDate: episode.publishDate,
                    episodeDuration: episode.duration,
                    episodeKeywords: episode.keywords,
                  },
                }),
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
                position,
                description,
                firstName,
                lastName,
                phone,
                personPhone,
                address,
                zipCode,
                organizationWebsite,
                city,
                state,
                country,
                budget,
                places,
              } = eventOrganization;

              const itemName = dataFileType === 2 ? organization : schoolName;
              const logo = enrichment ? enrichment.logo : `https://logo.clearbit.com/${website}`;

              dispatch(
                storeContactListItem({
                  baseInfo: {
                    id: _id,
                    name: itemName,
                    image: logo,
                    category: contactCategories.eventOrganization,
                    pitched: !!(connected && hasEmail),
                    tag: { listId, listName: list.name },
                    position,
                    eventType: dataFileType === 1 ? 'School' : 'Event',
                  },
                  details: {
                    id: userEventOrganization._id,
                    connected,
                    email: hasEmail,
                    description,
                    contactName: {
                      firstName,
                      lastName,
                    },
                    phoneNumber: personPhone || phone,
                    eventAddress: {
                      value: address,
                      zipCode,
                    },
                    website: organizationWebsite,
                    foundedYear: enrichment?.foundedYear,
                    employeesRange: enrichment?.metrics?.employeesRange,
                    sector: enrichment?.category?.sector,
                    industry: enrichment?.category?.industry,
                    location: {
                      city,
                      state,
                      country,
                    },
                    budget,
                    places,
                    socialLinks: {
                      facebook: enrichment?.facebook?.handle,
                      linkedin: enrichment?.linkedin?.handle,
                      crunchbase: enrichment?.crunchbase?.handle,
                    },
                  },
                }),
              );
            } else if (item.userSpeaker) {
              const { userSpeaker, _id, listId } = item;
              const { speaker, connected } = userSpeaker;

              const itemName = speaker.name ?? speaker.email;
              const logo = speaker.image ?? '';

              dispatch(
                storeContactListItem({
                  baseInfo: {
                    id: _id,
                    name: itemName,
                    image: logo,
                    category: contactCategories.speaker,
                    pitched: !!(connected && speaker.email),
                    tag: { listId, listName: list.name },
                    email: speaker.email,
                  },
                  details: {
                    id: userSpeaker._id,
                    businessName: speaker.businessname,
                    website: speaker.website,
                    socialMediaLink1: speaker.socialMediaLink1,
                    socialMediaLink2: speaker.socialMediaLink2,
                    socialMediaLink3: speaker.socialMediaLink3,
                    equipment: speaker.Equipment,
                    additionalInfo: speaker.additionalinfo,
                    optionalContactMethod: speaker.optionalcontactmethod,
                    categories: speaker.searchGenres,
                    subCategories: speaker.subcategories,
                    shortBio: speaker.shortbio,
                    topics: speaker.topics,
                    detailedProfile: speaker.detailedprofile,
                    qualification: speaker.qualification,
                    audience: speaker.audience,
                    promotionPlan: speaker.promotionPlan,
                    sampleQuestion: speaker.sampleQuestion,
                    ownPodcast: speaker.ownpodcast,
                    pastAppereance1: speaker.past_appereance1?.title,
                    pastAppereance2: speaker.past_appereance2?.title,
                    pastAppereance3: speaker.past_appereance3?.title,
                  },
                }),
              );
            } else if (item.userMediaOutlet) {
              const { userMediaOutlet, _id, listId } = item;
              const { mediaOutlet, connected } = userMediaOutlet;

              dispatch(
                storeContactListItem({
                  baseInfo: {
                    id: _id,
                    name: mediaOutlet.companyName ?? '',
                    image: null,
                    category: contactCategories.mediaOutlet,
                    pitched: !!(connected && mediaOutlet.email),
                    tag: { listId, listName: list.name },
                    position: mediaOutlet.position,
                  },
                  details: {
                    id: userMediaOutlet._id,
                    connected,
                    email: mediaOutlet.hasEmail,
                    magazineGenre: mediaOutlet.magazineGenre,
                    contactName: {
                      firstName: mediaOutlet.firstName,
                      lastName: mediaOutlet.lastName,
                    },
                    phoneNumber: mediaOutlet.phone,
                    location: {
                      city: mediaOutlet.city,
                      state: mediaOutlet.state,
                    },
                  },
                }),
              );
            } else if (item.userConference) {
              const { userConference, _id, listId } = item;
              const { conference, connected } = userConference;

              const logo =
                conference.enrichment?.logo ?? `https://logo.clearbit.com/${conference.website}`;

              dispatch(
                storeContactListItem({
                  baseInfo: {
                    id: _id,
                    name: conference.eventName,
                    image: logo,
                    category: contactCategories.conference,
                    pitched: !!(connected && conference.hasEmail),
                    tag: { listId, listName: list.name },
                  },
                  details: {
                    id: userConference._id,
                    connected,
                    email: conference.hasEmail,
                    description: conference.eventDescription,
                    contactName: {
                      firstName: conference.contactName,
                    },
                    location: {
                      city: conference.location,
                    },
                    conferenceCategory: conference.category,
                    estimatedAudience: conference.estAudience,
                    date: conference.date,
                  },
                }),
              );
            }
          });
        }
      });

      dispatch(setItemsEvaluated());
    }
  }, [userLists]);
}
