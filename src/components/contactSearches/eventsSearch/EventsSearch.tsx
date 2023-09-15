import { Typography } from '@mui/material';
import styles from '../ContactSearches.module.css';

export function EventsSearch() {
  return (
    <div className={styles.contactSearchesWrapper}>
      <Typography variant="h3" color="text.primary" sx={{ m: '2rem 0' }}>
        Local associations search
      </Typography>
    </div>
  );
}
