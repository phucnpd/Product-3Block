import { Button, InputAdornment, Toolbar, Typography } from '@mui/material';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
// components
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import { m } from 'framer-motion';
import { useState } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

ProductListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDeleteProducts: PropTypes.func,
};

export default function ProductListToolbar({ numSelected, filterName, onFilterName, onDeleteProducts, setWhite }) {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  function getWhiteList() {
    setIsLoading(true);
    fetch('https://api3blockserver.herokuapp.com/db/api/system/3block/getAllWhitePublic', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        // throw 'Err';
        return response.json();
      })
      .then((json) => {
        localStorage.setItem('whiteList', JSON.stringify(json));
        setWhite(json);
        setIsLoading(false);
        enqueueSnackbar('Update White Lists Successfully!', { variant: 'success' });
      })
      .catch((err) => {
        setIsLoading(false);
        enqueueSnackbar('Update White Lists Failure!', { variant: 'error' });
      });
  }

  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: isLight ? 'primary.main' : 'text.primary',
          bgcolor: isLight ? 'primary.lighter' : 'primary.dark',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <InputStyle
          stretchStart={240}
          value={filterName}
          onChange={(event) => onFilterName(event.target.value)}
          placeholder="Search URL..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
        />
      )}

      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDeleteProducts}>
            <Iconify icon={'eva:trash-2-outline'} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon={'ic:round-filter-list'} />
          </IconButton>
        </Tooltip>
      )} */}
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
          <Button color="primary" variant="contained" onClick={getWhiteList}>
            Update Data
          </Button>
        </m.div>
      )}

      {!isLoading && (
        <Button color="primary" variant="contained" onClick={getWhiteList}>
          Update Data
        </Button>
      )}
    </RootStyle>
  );
}
