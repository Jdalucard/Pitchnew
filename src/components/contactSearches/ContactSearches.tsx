import { Route, Routes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import EventsSearch from './eventsSearch';
import SpeakersSearch from './speakersSearch';
import MediaOutletsSearch from './mediaOutletsSearch';
import ConferencesSearch from './conferencesSearch';
import PodcastsSearch from './podcastsSearch';

export function ContactSearches() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path={'podcast-search'} element={<PodcastsSearch />} />
        <Route path={'events-search'} element={<EventsSearch />} />
        <Route path={'experts-search'} element={<SpeakersSearch />} />
        <Route path={'media-search'} element={<MediaOutletsSearch />} />
        <Route path={'conference-search'} element={<ConferencesSearch />} />
      </Routes>
    </LocalizationProvider>
  );
}
