import { Typography } from '@mui/material';
import {
  IFilterPodcastsSearchsOptions,
  PodcastsSearchFiltering,
} from './components/PodcastsSearchFiltering';
import styles from '../ContactSearches.module.css';

export function PodcastsSearch() {
  const handleProcessFiltering = (filters: IFilterPodcastsSearchsOptions) => {
    console.log('filter!');
  };

  return (
    <div className={styles.contactSearchesWrapper}>
      <Typography variant="h3" color="text.primary" sx={{ m: '2rem 0' }}>
        Podcasts search
      </Typography>
      <PodcastsSearchFiltering handleProcessFiltering={handleProcessFiltering} />
    </div>
  );
}
