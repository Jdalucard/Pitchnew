import { useEffect, useCallback } from 'react';
import { setSelectedDate, setCategoryName } from '../../redux/dashboard/dashboard.slice';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { subscriptionSelectors } from '../../redux/subscription';
import { LatestActivity, DailyReports } from '../reports/components';
import { reportsSelectors } from '../../redux/reports';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SendIcon from '@mui/icons-material/Send';
import styles from './Dashboard.module.css';
import { getOutreachActivity } from '../../redux/reports/index';
import { dashboardSelectors } from '../../redux/dashboard/dashboard.selectors';
import { OutreachSummary } from '../reports/components/OutreachSummary';

export const Dashboard: React.FC = () => {
  const summarySubtitle = useAppSelector(reportsSelectors.getSummarySubtitle);
  const summaryData = useAppSelector(reportsSelectors.summaryData);
  const Credist = useAppSelector(subscriptionSelectors.credits);
  const activityData = useAppSelector(reportsSelectors.activityData);
  const selectedDate = useAppSelector(dashboardSelectors.selectedDate);
  const amountData = useAppSelector(reportsSelectors.amountData);
  const maxAmountValue = useAppSelector(reportsSelectors.maxAmountValue);
  /*   const category = useAppSelector(dashboardSelectors.categoryName); */
  const dispatch = useAppDispatch();

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
    dispatch<any>(getOutreachActivity(selectedDate));
  };

  useEffect(() => {
    dispatch<any>(getOutreachActivity(selectedDate));
  }, [dispatch, selectedDate]);

  /*   const setCategoryNameInRedux = useCallback(() => {
    let categoryName;
    switch (category) {
      case 'waiting':
        categoryName = 'Waiting';
        break;
      case 'sent':
        categoryName = 'Email sent';
        break;
      case 'opened':
        categoryName = 'Email opened';
        break;
      case 'replied':
        categoryName = 'Email replied';
        break;
      case 'booked':
        categoryName = 'Booked';
        break;
      case 'postponed':
        categoryName = 'Not now';
        break;
      default:
        break;
    }

    dispatch(setCategoryName(categoryName));
  }, [category, dispatch]); */

  /*  useEffect(() => {
    setCategoryNameInRedux();
  }, [category, setCategoryNameInRedux]); */

  return (
    <div className={styles.containerDashboard}>
      <Typography variant="h2" color="text.primary" m="1rem 2rem">
        Dashboard
      </Typography>

      <div className={styles.containerPiches}>
        <div className={styles.PichesUsed}>
          <MailOutlineIcon />
          <Typography variant="h4" color="text.primary" m="0.8rem 0">
            {Credist ? JSON.stringify(Credist.used) : null}
            Piches Used
          </Typography>
        </div>

        <div className={styles.PichesSent}>
          <SendIcon />
          <Typography variant="h4" color="text.primary" m="0.8rem 0">
            {Credist ? JSON.stringify(Credist.remaining) : null}
            Piches Sent
          </Typography>
        </div>
      </div>

      <div className={styles.containerWrapper}>
        <div className={styles.moduleWarpers}>
          <LatestActivity activityData={activityData} />
          <div className={styles.selecButton}>
            <select className={styles.select} value={selectedDate} onChange={handleDateChange}>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 Months</option>
            </select>
          </div>
          <OutreachSummary summaryData={summaryData} summarySubtitle={summarySubtitle} />
          <DailyReports amountData={amountData} maxAmountValue={maxAmountValue} />
        </div>
      </div>
    </div>
  );
};
