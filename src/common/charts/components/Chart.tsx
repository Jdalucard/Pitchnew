import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import styles from './Chart.module.css';
import { LoadingDisplay } from '../..';
import { loadingDisplayTypes } from '../../../types';

interface ChartProps {
  ready: boolean;
  options: Highcharts.Options;
  highcharts: any;
}

export const Chart: React.FC<ChartProps> = ({ options, highcharts, ready }) => (
  <>
    {ready ? (
      <HighchartsReact highcharts={highcharts} constructorType={'chart'} options={options} />
    ) : (
      <div className={styles.loadingChart}>
        <LoadingDisplay type={loadingDisplayTypes.entireComponent} />
      </div>
    )}
  </>
);
