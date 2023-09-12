import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { getbaseOptions } from '../../redux/reports/reports.slice';
import { Chart } from './components/Chart';
import { reportsSelector } from '../../redux/reports';

HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

interface PieProps {
  title: string;
  subtitle: string;
  seriesData?: { name: string; y: number }[];
  updatedData: { name: string; y: number }[] | null;
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

function generatePieColors(): string[] {
  const baseColor: Highcharts.ColorType | undefined =
    Highcharts.getOptions()?.colors?.[0];
  const pieColors: string[] = [];

  if (baseColor !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    for (let i: number = 0; i < 10; i += 1) {
      const color: Highcharts.Color = Highcharts.color(baseColor).brighten(
        (i - 3) / 7,
      );
      if (typeof color === 'string') {
        const colorString: string = color;
        pieColors.push(colorString);
      } else {
        console.error('color no es una cadena');
      }
    }
  } else {
    console.error('baseColor es undefined');
  }

  return pieColors;
}

const pieColorsResult = generatePieColors();

export const PieChart: React.FC<PieProps> = (props: PieProps) => {
  const dispatch = useAppDispatch();
  const ready = useAppSelector(reportsSelector.ready);

  useEffect(() => {
    dispatch(getbaseOptions(true));
  }, [dispatch]);

  const baseOptions: Highcharts.Options = {
    ...commonOptions.general,
    chart: {
      plotBackgroundColor: null ?? '#fff',
      plotBorderWidth: null ?? 0,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: props.title,
    },
    subtitle: {
      text: props.subtitle,
    },
    tooltip: {
      pointFormat: 'Total: <b>{point.y}</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        colors: pieColorsResult,
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
          distance: -50,
          filter: {
            property: 'percentage',
            operator: '>',
            value: 4,
          },
        },
      },
    },
    series: [
      {
        type: 'pie',
        data: props.seriesData,
      },
    ],
  };

  return (
    <div>
      <Chart highcharts={Highcharts} options={baseOptions} ready={ready} />
    </div>
  );
};
