import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Divider } from '@mui/material';
import { outreachActivity } from '../../redux/reports';
import { LatestActivity, DailyReports } from './components';
import { reportsSelector } from '../../redux/reports';
import { PieChart } from '../charts/PieChart';
import { Typography } from '@mui/material';
import { LoadingIcon } from './components/';
import styles from './components/Reports.module.css';

export enum Display {
  DISPLAY_BIG_TITLE = 'display-big-title',
  DISPLAY_TITLE = 'display-title',
  DISPLAY_CONTENT_TITLE = 'display-content-title',
  DISPLAY_SUBTITLE = 'display-subtitle',
  DISPLAY_SUB_SUBTITLE = 'display-sub-subtitle',
  DISPLAY_NORMAL = 'display-normal',
}

export const Reports = () => {
  const dispatch = useAppDispatch();

  const activityData = useAppSelector(reportsSelector.activityData);
  const summaryData = useAppSelector(reportsSelector.summaryData);
  const updatedSummaryData = useAppSelector(reportsSelector.updatedSummaryData);
  const setsubtitles = useAppSelector(reportsSelector.setsubtitles);
  const amountTimePeriod = useAppSelector(reportsSelector.setamountTimePeriod);
  const amountData = useAppSelector(reportsSelector.amountData);
  const updatedAmountData = useAppSelector(reportsSelector.updatedAmountData);
  const maxAmountValue = useAppSelector(reportsSelector.maxAmountValue);

  useEffect(() => {
    dispatch(outreachActivity());
  }, [dispatch]);

  return (
    <>
      <div className="ReportsPanel col-lg-12 content-padding">
        <div className="col content-title-cont">
          <Typography variant="h2" color="text.primary">
            Reports
          </Typography>
          <Divider className={styles.divider} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Typography variant="h3" color="text.secondary">
            Latest Activity
          </Typography>
        </div>
        <div className="col-lg-6">
          <LatestActivity activityData={activityData} />
        </div>
      </div>

      <div className="col-lg-6 pie-start">
        <div className={`m-2 p-1 ${styles.stageLineChartContainer}`}>
          {summaryData ? (
            <PieChart
              title="Outreach sequences summary"
              subtitle={setsubtitles}
              seriesData={summaryData}
              updatedData={updatedSummaryData}
            />
          ) : (
            <div className={styles.loadingChart}>
              <LoadingIcon size="loading-huge" />
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <DailyReports
            amountTimePeriod={amountTimePeriod}
            amountData={amountData}
            updatedData={updatedAmountData}
            maxAmountValue={maxAmountValue}
          />
        </div>
      </div>
    </>
  );
};
