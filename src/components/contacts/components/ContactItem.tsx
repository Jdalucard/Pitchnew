import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconButton, ListItem, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import defaultImage from '../../../assets/logos/pitchdb-logo-short.png';
import { IContactListItemDetailBaseInfo } from '../../../redux/contactList';
import { formatToTitleCase } from '../../../utils';
import styles from '../Contacts.module.css';

interface IProps {
  info: IContactListItemDetailBaseInfo;
  handleShowItemDetail: (itemId: string) => void;
}

export function ContactItem({ info, handleShowItemDetail }: IProps) {
  const { id, image, name, tag, email, category, position, eventType } = info;

  const [displayActionButtons, setDisplayActionButtons] = useState(false);

  const isPodcasts = category === 'podcast' || category === 'podcastEpisode';

  return (
    <ListItem
      className={styles.listItemWrapper}
      onMouseEnter={() => setDisplayActionButtons(true)}
      onMouseLeave={() => setDisplayActionButtons(false)}
      sx={{
        backgroundColor: '#f1f2f3',
        ':nth-of-type(even)': {
          backgroundColor: '#fff',
        },
        p: '0.5rem',
      }}
    >
      <div className={styles.itemImageWrapper}>
        <img
          src={image ?? defaultImage}
          alt="Contact profile"
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
          width="100%"
          height="100%"
        />
      </div>
      <div className={styles.itemText}>
        <Typography variant="body1" color="text.primary">
          {formatToTitleCase(name)}
        </Typography>
        {email && (
          <Typography variant="body2" color="text.secondary">
            {email}
          </Typography>
        )}
        {isPodcasts && (
          <Typography variant="body2" color="text.secondary">
            {category === 'podcastEpisode' ? 'Episode' : 'Podcast'}
          </Typography>
        )}
        {position && (
          <Typography variant="body2" color="text.secondary">
            {formatToTitleCase(position)}
          </Typography>
        )}
        {eventType && (
          <Typography variant="body2" color="text.secondary">
            <b>{formatToTitleCase(eventType)}</b>
          </Typography>
        )}
      </div>
      <div className={styles.tagWrapper}>
        <Typography
          variant="caption"
          color="text.secondary"
          maxWidth="7rem"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          display="block"
          fontWeight="bold"
        >
          {tag.listName}
        </Typography>
      </div>

      <div className={styles.visibilityButton}>
        <AnimatePresence>
          {displayActionButtons && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ backgroundColor: '#fff', borderRadius: '50%' }}
            >
              <IconButton aria-label="Details" onClick={() => handleShowItemDetail(id)}>
                <VisibilityIcon color="primary" />
              </IconButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ListItem>
  );
}
