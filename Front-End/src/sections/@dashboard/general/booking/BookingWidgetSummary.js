import PropTypes from 'prop-types';
import { m } from 'framer-motion';

// @mui
import { styled } from '@mui/material/styles';
import { Card, Typography, Box, Button } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 2, 3),
}));

// ----------------------------------------------------------------------

BookingWidgetSummary.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string,
  total: PropTypes.number,
};

export default function BookingWidgetSummary({ title, total, icon, setGray }) {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  function getGrayList() {
    setIsLoading(true);
    fetch('https://api3blockserver.herokuapp.com/user/gray/system/3block/getAll', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        // throw 'Err';
        return response.json();
      })
      .then((json) => {
        localStorage.setItem('grayList', JSON.stringify(json));
        setGray(json);
        setIsLoading(false);
        enqueueSnackbar('Update Gray Lists Successfully!', { variant: 'success' });
      })
      .catch((err) => {
        setIsLoading(false);
        enqueueSnackbar('Update Gray Lists Failure!', { variant: 'error' });
      });
  }
  return (
    <RootStyle>
      <div>
        <Typography variant="h3">{fShortenNumber(total)}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </div>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          // console.log('Reset Data');
          getGrayList();
        }}
      >
        Update Data
      </Button>

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
          <Box
            sx={{
              width: 120,
              height: 120,
              lineHeight: 0,
              borderRadius: '50%',
              bgcolor: 'background.neutral',
            }}
          >
            {icon}
          </Box>
        </m.div>
      )}
      {!isLoading && (
        <Box
          sx={{
            width: 120,
            height: 120,
            lineHeight: 0,
            borderRadius: '50%',
            bgcolor: 'background.neutral',
          }}
        >
          {icon}
        </Box>
      )}
    </RootStyle>
  );
}
