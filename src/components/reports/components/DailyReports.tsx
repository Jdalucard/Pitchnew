import { LineChart } from '../../charts/LineChart';
import { LoadingDisplay } from '../../../common';
import { IAmountData, reportsSelectors } from '../../../redux/reports';
import { loadingDisplayTypes } from '../../../types';
import styles from '../Reports.module.css';
import { outreachSequenceStates } from '../../../constants';
import { Typography } from '@mui/material';
import { formatToTitleCase } from '../../../utils';
import { useAppSelector } from '../../../redux/hooks';

interface IDailyData {
  created: IAmountData[] | null;
  sent: IAmountData[] | null;
  opened: IAmountData[] | null;
  replied: IAmountData[] | null;
  booked: IAmountData[] | null;
  postponed: IAmountData[] | null;
}

interface IProps {
  updatedData: IAmountData[] | null;
  amountData: IAmountData[] | null;
  maxAmountValue: number;
}

export const DailyReports: React.FC<IProps> = ({ amountData, updatedData, maxAmountValue }) => {
  const isLoading = useAppSelector(reportsSelectors.isLoading);
  const sequencesStates = Object.keys(outreachSequenceStates);

  const isDailyData = (data: any) => {
    return (
      data &&
      typeof data === 'object' &&
      'created' in data &&
      'sent' in data &&
      'opened' in data &&
      'replied' in data &&
      'booked' in data &&
      'postponed' in data
    );
  };

  return (
    <>
      {sequencesStates.map((state) => {
        <div className={styles.reportsModuleWrapper}>
          <div className={styles.reportsModuleHeader}>
            <Typography variant="body1" color="text.secondary" fontWeight="bold">
              {formatToTitleCase(state)}
            </Typography>
          </div>
          <div className={styles.reportsModuleBody}>
            {isLoading ? (
              <LoadingDisplay type={loadingDisplayTypes.entireComponent} />
            ) : (
              <>
                {amountData ? (
                  <LineChart
                    toolTipText={state}
                    seriesData={isDailyData(amountData) && amountData[state]}
                    maxYAxis={maxAmountValue}
                    updatedData={isDailyData(updatedData) ? updatedData[state] : updatedData}
                    yAxisTitle=""
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No sequences to show
                  </Typography>
                )}
              </>
            )}
          </div>
        </div>;
      })}
    </>
  );
};
