import { Box, Card, Stack, Typography } from '@mui/material';
// @mui
import { useTheme } from '@mui/material/styles';
import merge from 'lodash/merge';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
//
import { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

export default function BookingRoomAvailable({ product }) {
  const CHART_DATA = [];
  const labels = [];

  for (let i in product) {
    labels.push(i);
    CHART_DATA.push(Number(product[i]));
  }

  const theme = useTheme();
  const chartOptions = merge(BaseOptionChart(), {
    legend: { show: false },
    labels,
    grid: {
      padding: { top: -3, bottom: -3 },
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          [
            { offset: 0, color: theme.palette.primary.light },
            { offset: 100, color: theme.palette.primary.main },
          ],
          [
            { offset: 0, color: theme.palette.warning.dark },
            { offset: 100, color: theme.palette.warning.main },
          ],
          [
            { offset: 0, color: theme.palette.error.light },
            { offset: 100, color: theme.palette.error.main },
          ],
          [
            { offset: 0, color: theme.palette.info.light },
            { offset: 100, color: theme.palette.info.main },
          ],

          [
            { offset: 0, color: theme.palette.error.dark },
            { offset: 100, color: theme.palette.error.darker },
          ],
          [
            { offset: 0, color: theme.palette.success.light },
            { offset: 100, color: theme.palette.success.dark },
          ],
        ],
      },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '50%' },
        dataLabels: {
          name: { offsetY: -16 },
          value: { offsetY: 8 },
          total: {
            label: 'Not Clean',
            formatter: () => Math.round((100 - Number(product.clean)) * 100) / 100 + '%',
          },
        },
      },
    },
  });

  return (
    <Card>
      {/* <CardHeader title="Room Available" sx={{ mb: 8 }} /> */}
      <ReactApexChart type="donut" series={CHART_DATA} options={chartOptions} height={310} />

      {/* 
      <Stack spacing={2} sx={{ p: 5 }}>
        <Legend label="Sold out" number={SOLD_OUT} />
        <Legend label="Available" number={AVAILABLE} />
      </Stack> */}
    </Card>
  );
}

// ----------------------------------------------------------------------

Legend.propTypes = {
  label: PropTypes.string,
  number: PropTypes.number,
};

function Legend({ label, number }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            width: 16,
            height: 16,
            bgcolor: 'grey.50016',
            borderRadius: 0.75,
            ...(label === 'Sold out' && {
              bgcolor: 'primary.main',
            }),
          }}
        />
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
      </Stack>
      <Typography variant="subtitle1">{number} Rooms</Typography>
    </Stack>
  );
}
