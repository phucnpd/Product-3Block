import { Box, Card, Stack, Typography } from '@mui/material';
// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// components
import Iconify from '../../../../components/Iconify';
// utils
import { fNumber } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  chartColor: PropTypes.string.isRequired,
  chartData: PropTypes.arrayOf(PropTypes.number).isRequired,
  percent: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
};

export default function AppWidgetSummary({ title, percent, total, chartColor, chartData, number = -1 }) {
  const theme = useTheme();
  const chartOptions = {
    colors: [chartColor],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
      marker: { show: false },
    },
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <IconWrapperStyle
            sx={{
              ...(number < 0 && {
                color: 'error.main',
                bgcolor: alpha(theme.palette.error.main, 0.16),
              }),
            }}
          >
            <Iconify width={16} height={16} icon={number >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'} />
          </IconWrapperStyle>
          <Typography component="span" variant="subtitle2">
            {number > 0 && ''}
            {percent}
          </Typography>
        </Stack>

        <Typography variant="h3">{total}</Typography>
      </Box>

      <ReactApexChart type="bar" series={[{ data: chartData }]} options={chartOptions} width={60} height={36} />
    </Card>
  );
}
