import { Typography } from '@mui/material';
import { IAmountData, reportsSelectors } from '../../../redux/reports';
import styles from '../Reports.module.css';
import { useAppSelector } from '../../../redux/hooks';
import { LoadingDisplay } from '../../../common';
import { loadingDisplayTypes } from '../../../types';
import { PieChart } from '../../charts/PieChart';

interface IProps {
  summarySubtitle: string;
  summaryData: IAmountData[] | null;
}

export function OutreachSummary({ summarySubtitle, summaryData }: IProps) {
  const isLoading = useAppSelector(reportsSelectors.isLoadingSumamry);

  return (
    <div className={styles.reportsModuleWrapper}>
      <div className={styles.reportsModuleHeader}>
        <Typography variant="body1" color="text.secondary" fontWeight="bold">
          Outreach sequences summary
        </Typography>
      </div>
      <div className={styles.reportsModuleBody}>
        {isLoading ? (
          <LoadingDisplay type={loadingDisplayTypes.entireComponent} />
        ) : (
          <>
            {summaryData ? (
              <PieChart subtitle={summarySubtitle} seriesData={summaryData} />
            ) : (
              <Typography variant="body2" color="text.secondary">
                No data to display
              </Typography>
            )}
          </>
        )}
      </div>
    </div>
  );
}
