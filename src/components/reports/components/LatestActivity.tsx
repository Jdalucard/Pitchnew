import { FC } from 'react';
import { Display } from '../Reports';
import { Typography } from '@mui/material';
import { LoadingIcon } from './LoadingIcon';
import { commonDataParsing } from '../../../utils/dataParsing';
import styles from './Reports.module.css';

interface LatestActivityProps {
  activityData: ActivityData[] | null;
}

interface ActivityData {
  date: Date;
  message: string;
}

export const LatestActivity: FC<LatestActivityProps> = ({ activityData }) => (
  <div className="LatestActivity">
    {activityData ? (
      activityData.map((activity, index) => (
        <div key={index} className={`row ${styles.activityItem}`}>
          <div className="col-auto">
            <Typography variant="h3" color="text.secondary">
              {`${commonDataParsing.parseJSDateHuman(activity.date)}:`}
              {Display.DISPLAY_SUB_SUBTITLE}
            </Typography>
          </div>
          <div className="col-lg-auto col-12">
            <Typography variant="body1">
              {activity.message}
              {Display.DISPLAY_NORMAL}
            </Typography>
          </div>
        </div>
      ))
    ) : (
      <div className="loading-activity">
        <LoadingIcon size="loading-huge" />
      </div>
    )}
  </div>
);
