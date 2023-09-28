import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchStageAmounts, fetchStageSummary, getOutreachActivity } from '../../redux/reports';
import { LatestActivity, DailyReports, OutreachSummary } from './components';
import { reportsSelectors } from '../../redux/reports';
import styles from './Reports.module.css';

export const Reports = () => {
  const dispatch = useAppDispatch();

  const activityData = useAppSelector(reportsSelectors.activityData);
  const summaryData = useAppSelector(reportsSelectors.summaryData);
  const summarySubtitle = useAppSelector(reportsSelectors.getSummarySubtitle);
  const amountData = useAppSelector(reportsSelectors.amountData);
  const maxAmountValue = useAppSelector(reportsSelectors.maxAmountValue);
  // const updatedSummaryData = useAppSelector(reportsSelectors.updatedSummaryData);
  // const amountTimePeriod = useAppSelector(reportsSelectors.getAmountTimePeriod);
  // const updatedAmountData = useAppSelector(reportsSelectors.updatedAmountData);

  useEffect(() => {
<<<<<<< HEAD
    dispatch(getOutreachActivity());
    dispatch(fetchStageSummary({ updated: false }));
    dispatch(fetchStageAmounts({ updated: false }));
  }, [dispatch]);
=======
    if (userData) {
      dispatch(getOutreachActivity(userData._id));
      dispatch(fetchStageSummary({ updated: false }));
      dispatch(fetchStageAmounts({ updated: false }));
    }
  }, [dispatch, userData]);
>>>>>>> feature/dashboard-module-refactoring

  return (
    <div className={styles.reportsWrapper}>
      <Typography variant="h3" color="primary" m="2rem 0">
        Reports
      </Typography>
      <div className={styles.reportsModulesWrapper}>
        <LatestActivity activityData={activityData} />
        <OutreachSummary summaryData={summaryData} summarySubtitle={summarySubtitle} />
        <DailyReports amountData={amountData} maxAmountValue={maxAmountValue} />
      </div>
    </div>
  );
};
