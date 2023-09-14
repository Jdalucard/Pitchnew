import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getlineReady } from '../../redux/reports/reports.slice';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import { Chart } from './components/Chart';
import { reportsSelectors } from '../../redux/reports';

HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

interface IseriesData {
  name: string;
  y: number;
}

interface LineProps {
  title: string;
  seriesData?: IseriesData[] | null;
  updatedData?: IseriesData[] | null;
  maxYAxis?: number;
  yAxisTitle: string;
  toolTipText: string;
}

const commonOptions = {
  defaultLineMaxYAxis: 6,
  general: {
    credits: {
      enabled: false,
    },
  },
  lineSeries: {
    type: 'spline',
    showInLegend: false,
  },
};

let maxYAxis = commonOptions.defaultLineMaxYAxis;

export const LineChart: React.FC<LineProps> = (props: LineProps) => {
  const ready = useAppSelector(reportsSelectors.ready);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getlineReady(true));
  }, [dispatch]);

  if (props.maxYAxis && props.maxYAxis > maxYAxis) maxYAxis = props.maxYAxis;

  const baseOptions: Highcharts.Options = {
    ...commonOptions.general,
    title: {
      text: props.title,
    },
    yAxis: {
      title: {
        text: props.yAxisTitle,
      },
      max: maxYAxis,
    },
    tooltip: {
      pointFormat: `<b>{point.y}</b> ${props.toolTipText}`,
    },
    xAxis: {
      tickInterval: 1,
      labels: {
        enabled: true,
        formatter: function () {
          if (props.seriesData && props.seriesData[0]) {
            return props.seriesData[0].name || '';
          } else {
            return '';
          }
        },
      },
    },
    series: [
      {
        ...commonOptions.lineSeries,
        type: 'spline',
        data: props.seriesData || undefined,
      },
    ],
  };

  return <Chart highcharts={Highcharts} options={baseOptions} ready={ready} />;
};
