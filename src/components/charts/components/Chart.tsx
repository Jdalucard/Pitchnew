import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import styles from './Chart.module.css';
import { LoadingIcon } from '../../reports/components';

interface ChartProps {
  ready: boolean;
  options: Highcharts.Options;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  highcharts: any;
}

export const Chart: React.FC<ChartProps> = ({ options, highcharts, ready }) => (
  <>
    {ready ? (
      <HighchartsReact
        highcharts={highcharts}
        constructorType={'chart'}
        options={options}
      />
    ) : (
      <div className={styles.loadingChart}>
        <LoadingIcon size="loading-huge" />
      </div>
    )}
  </>
);
