import { LineChart } from '../../charts/LineChart';
import Typography from '@mui/material/Typography';
/* import { Display } from '../Reports'; */
import { LoadingIcon } from './LoadingIcon';
import styles from './Reports.module.css';

interface IseriesData {
  name: string;
  y: number;
}
interface DailyData {
  created: IseriesData[] | null;
  sent: IseriesData[] | null;
  opened: IseriesData[] | null;
  replied: IseriesData[] | null;
  booked: IseriesData[] | null;
  postponed: IseriesData[] | null;
}

interface DailyReportsProps {
  amountTimePeriod: string;
  updatedData: IseriesData[] | null;
  amountData: IseriesData[] | null;
  maxAmountValue: number;
}

export const DailyReports: React.FC<DailyReportsProps> = ({
  amountTimePeriod,
  amountData,
  updatedData,
  maxAmountValue,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isDailyData = (data: any): data is DailyData => {
    return (
      data !== null &&
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
      <div className="col content-title-cont">
        <Typography variant="h3" color="text.secondary">
          {'Daily report (' + amountTimePeriod + ') '}
        </Typography>
      </div>
      <div className="row">
        <div className="col-12 col-xl-6">
          <div className={`m-2 p-1 ${styles.stageLineChartContainer}`}>
            {amountData ? (
              <LineChart
                title="Outreach sequences created"
                toolTipText="created"
                seriesData={
                  isDailyData(amountData) ? amountData.created : amountData
                }
                maxYAxis={maxAmountValue}
                updatedData={
                  isDailyData(updatedData) ? updatedData.created : updatedData
                }
                yAxisTitle=""
              />
            ) : (
              <div className="loading-chart">
                <LoadingIcon size="loading-huge" />
              </div>
            )}
          </div>
        </div>
        <div className="col-12 col-xl-6">
          <div className={`m-2 p-1 ${styles.stageLineChartContainer}`}>
            {amountData ? (
              <LineChart
                title="Outreach emails sent"
                toolTipText="sent"
                seriesData={isDailyData(amountData) ? amountData.sent : null}
                maxYAxis={maxAmountValue}
                updatedData={isDailyData(updatedData) ? updatedData.sent : null}
                yAxisTitle=""
              />
            ) : (
              <div className="loading-chart">
                <LoadingIcon size="loading-huge" />
              </div>
            )}
          </div>
        </div>
        <div className="col-12 col-xl-6">
          <div className={`m-2 p-1 ${styles.stageLineChartContainer}`}>
            {amountData ? (
              <LineChart
                title="Outreach emails opened"
                toolTipText="opened"
                seriesData={isDailyData(amountData) ? amountData.opened : null}
                maxYAxis={maxAmountValue}
                updatedData={
                  isDailyData(updatedData) ? updatedData.opened : null
                }
                yAxisTitle=""
              />
            ) : (
              <div className="loading-chart">
                <LoadingIcon size="loading-huge" />
              </div>
            )}
          </div>
        </div>
        <div className="col-12 col-xl-6">
          <div className={`m-2 p-1 ${styles.stageLineChartContainer}`}>
            {amountData ? (
              <LineChart
                title="Outreach emails replied"
                toolTipText="replied"
                seriesData={isDailyData(amountData) ? amountData.replied : null}
                maxYAxis={maxAmountValue}
                updatedData={
                  isDailyData(updatedData) ? updatedData.replied : null
                }
                yAxisTitle=""
              />
            ) : (
              <div className="loading-chart">
                <LoadingIcon size="loading-huge" />
              </div>
            )}
          </div>
        </div>
        <div className="col-12 col-xl-6">
          <div className={`m-2 p-1 ${styles.stageLineChartContainer}`}>
            {amountData ? (
              <LineChart
                title="Outreach sequences booked"
                toolTipText="booked"
                seriesData={isDailyData(amountData) ? amountData.booked : null}
                maxYAxis={maxAmountValue}
                updatedData={
                  isDailyData(updatedData) ? updatedData.booked : null
                }
                yAxisTitle=""
              />
            ) : (
              <div className="loading-chart">
                <LoadingIcon size="loading-huge" />
              </div>
            )}
          </div>
        </div>
        <div className="col-12 col-xl-6">
          <div className={`m-2 p-1 ${styles.stageLineChartContainer}`}>
            {amountData ? (
              <LineChart
                title="Outreach sequences postponed"
                toolTipText="postponed"
                seriesData={
                  isDailyData(amountData) ? amountData.postponed : null
                }
                maxYAxis={maxAmountValue}
                updatedData={
                  isDailyData(updatedData) ? updatedData.postponed : null
                }
                yAxisTitle=""
              />
            ) : (
              <div className="loading-chart">
                <LoadingIcon size="loading-huge" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
