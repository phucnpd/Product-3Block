import { Card, Typography } from '@mui/material';
// @mui
import { alpha, styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
// components
import Iconify from '../../../../components/Iconify';
import { m } from 'framer-motion';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AnalyticsWidgetSummary.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error']),
  icon: PropTypes.string,
  title: PropTypes.string,
  total: PropTypes.string,
};

export default function AnalyticsWidgetSummary({ title, total, icon, color = 'primary', isLoading }) {
  return (
    <RootStyle
      sx={{
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
      }}
    >
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        {isLoading && (
          <m.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 360 }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeatDelay: 1,
              repeat: Infinity,
            }}
          >
            <Iconify icon={icon} width={24} height={24} />
          </m.div>
        )}

        {!isLoading && <Iconify icon={icon} width={24} height={24} />}
        {/* <Iconify icon={icon} width={24} height={24} /> */}
      </IconWrapperStyle>
      <Typography variant="h3">{total}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </RootStyle>
  );
}
