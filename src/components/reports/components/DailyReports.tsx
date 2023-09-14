import { LineChart } from '../../charts/LineChart';
import { LoadingDisplay } from '../../../common';
import { IAmountData } from '../../../redux/reports';
import { loadingDisplayTypes } from '../../../types';
import styles from '../Reports.module.css';

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
      <div className="row">
        <div className="col-12 col-xl-6">
          <div className={`m-2 p-1 ${styles.stageLineChartContainer}`}>
            {amountData ? (
              <LineChart
                title="Outreach sequences created"
                toolTipText="created"
                seriesData={isDailyData(amountData) && amountData.created}
                maxYAxis={maxAmountValue}
                updatedData={isDailyData(updatedData) ? updatedData.created : updatedData}
                yAxisTitle=""
              />
            ) : (
              <div className="loading-chart">
                <LoadingDisplay type={loadingDisplayTypes.entireComponent} />
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
                <LoadingDisplay type={loadingDisplayTypes.entireComponent} />
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
                updatedData={isDailyData(updatedData) ? updatedData.opened : null}
                yAxisTitle=""
              />
            ) : (
              <div className="loading-chart">
                <LoadingDisplay type={loadingDisplayTypes.entireComponent} />
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
                updatedData={isDailyData(updatedData) ? updatedData.replied : null}
                yAxisTitle=""
              />
            ) : (
              <div className="loading-chart">
                <LoadingDisplay type={loadingDisplayTypes.entireComponent} />
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
                updatedData={isDailyData(updatedData) ? updatedData.booked : null}
                yAxisTitle=""
              />
            ) : (
              <div className="loading-chart">
                <LoadingDisplay type={loadingDisplayTypes.entireComponent} />
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
                seriesData={isDailyData(amountData) ? amountData.postponed : null}
                maxYAxis={maxAmountValue}
                updatedData={isDailyData(updatedData) ? updatedData.postponed : null}
                yAxisTitle=""
              />
            ) : (
              <div className="loading-chart">
                <LoadingDisplay type={loadingDisplayTypes.entireComponent} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
