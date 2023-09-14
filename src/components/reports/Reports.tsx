import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getOutreachActivity } from '../../redux/reports';
import { LatestActivity, DailyReports, OutreachSummary } from './components';
import { reportsSelectors } from '../../redux/reports';
import { userSelectors } from '../../redux/user';
import styles from './Reports.module.css';

export const Reports = () => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector(userSelectors.userData);
  const activityData = useAppSelector(reportsSelectors.activityData);
  const summaryData = useAppSelector(reportsSelectors.summaryData);
  const updatedSummaryData = useAppSelector(reportsSelectors.updatedSummaryData);
  const summarySubtitle = useAppSelector(reportsSelectors.getSummarySubtitle);
  const amountTimePeriod = useAppSelector(reportsSelectors.getAmountTimePeriod);
  const amountData = useAppSelector(reportsSelectors.amountData);
  const updatedAmountData = useAppSelector(reportsSelectors.updatedAmountData);
  const maxAmountValue = useAppSelector(reportsSelectors.maxAmountValue);

  useEffect(() => {
    if (userData) {
      dispatch(getOutreachActivity());
    }
  }, [dispatch, userData]);

  return (
    <div className={styles.reportsWrapper}>
      <Typography variant="h3" color="text.primary" m="2rem 0">
        Reports
      </Typography>
      <div className={styles.reportsModulesWrapper}>
        <LatestActivity activityData={activityData} />
        <OutreachSummary summaryData={summaryData} summarySubtitle={summarySubtitle} />
        <DailyReports
          amountData={amountData}
          updatedData={updatedAmountData}
          maxAmountValue={maxAmountValue}
        />
      </div>
    </div>
  );
};
