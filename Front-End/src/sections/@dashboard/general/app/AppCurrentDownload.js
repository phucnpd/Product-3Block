import { Card } from '@mui/material';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
//
import { BaseOptionChart } from '../../../../components/chart';
// utils
import { fNumber } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 350;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

var CHART_DATA = [12244, 53345, 44313];

export default function AppCurrentDownload({ data }) {
  const theme = useTheme();
  CHART_DATA = data;
  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.success.main,
      theme.palette.warning.light,
      theme.palette.info.lighter,
      theme.palette.success.dark,
    ],
    labels: ['Verification', 'Reject', 'None'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '90%',
          labels: {
            value: {
              formatter: (val) => fNumber(val),
            },
            total: {
              formatter: (w) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return fNumber(sum);
              },
            },
          },
        },
      },
    },
  });

  return (
    <Card>
      {/* <CardHeader title="Current Download" /> */}
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="donut" series={CHART_DATA} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
