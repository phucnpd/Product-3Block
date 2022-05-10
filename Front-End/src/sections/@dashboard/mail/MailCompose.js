import { Backdrop, Box, Button, Divider, IconButton, Portal, Typography } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import { m } from 'framer-motion';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Editor from '../../../components/editor';
// components
import Iconify from '../../../components/Iconify';
// hooks
import useResponsive from '../../../hooks/useResponsive';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 1999,
  minHeight: 440,
  outline: 'none',
  display: 'flex',
  position: 'fixed',
  overflow: 'hidden',
  flexDirection: 'column',
  margin: theme.spacing(3),
  boxShadow: theme.customShadows.z20,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundColor: theme.palette.background.paper,
}));

// const InputStyle = styled(Input)(({ theme }) => ({
//   padding: theme.spacing(0.5, 3),
//   borderBottom: `solid 1px ${theme.palette.divider}`,
// }));

// ----------------------------------------------------------------------

MailCompose.propTypes = {
  isOpenCompose: PropTypes.bool,
  onCloseCompose: PropTypes.func,
};

export default function MailCompose({ isOpenCompose, onCloseCompose, getMail }) {
  const { enqueueSnackbar } = useSnackbar();

  const [fullScreen, setFullScreen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isDesktop = useResponsive('up', 'sm');

  const handleChangeMessage = (value) => {
    setMessage(value);
  };

  const handleExitFullScreen = () => {
    setFullScreen(false);
  };

  const handleEnterFullScreen = () => {
    setFullScreen(true);
  };

  const handleClose = () => {
    onCloseCompose();
    setFullScreen(false);
  };

  if (!isOpenCompose) {
    return null;
  }

  const handOnSubmit = () => {
    var messageAPI = message;
    // messageAPI = message
    //   .replaceAll('</p><p>', '.')
    //   .replaceAll('</p>', ' ')
    //   .replaceAll('<p>', ' ')
    //   .replaceAll('<h1>', ' ')
    //   .replaceAll('</h1>', ' ')
    //   .replaceAll('<h2>', ' ')
    //   .replaceAll('</h2>', ' ')
    //   .replaceAll('<h3>', ' ')
    //   .replaceAll('</h3>', ' ')
    //   .replaceAll('<h4>', ' ')
    //   .replaceAll('</h4>', ' ')
    //   .replaceAll('<h5>', ' ')
    //   .replaceAll('</h5>', ' ')
    //   .replaceAll('<h6>', ' ')
    //   .replaceAll('</h6>', ' ')
    //   .replaceAll('<br>', ' ');
    setIsLoading(true);
    var nameUser = JSON.parse(localStorage.getItem('user'));
    const listDisplay = JSON.parse(localStorage.getItem('displayName'));
    // console.log(listDisplay);
    if (nameUser != null && nameUser?.email) {
      for (let i of listDisplay) {
        if (i.email === nameUser.email) {
          nameUser.displayName = i.displayName;
        }
      }
    }
    // console.log(nameUser);
    nameUser = nameUser?.displayName || nameUser?.email;
    fetch('https://api3blockserver.herokuapp.com/api/3block/system/postMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: nameUser,
        content: messageAPI,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(async (json) => {
        // console.log(json);
        // console.log('thành công');
        await getMail();
        setIsLoading(false);
        enqueueSnackbar('Send Message Successfully!', { variant: 'success' });
      })
      .catch(() => {
        setIsLoading(false);
        enqueueSnackbar('Error to Send Message. Try again!', { variant: 'error' });
      });
  };

  return (
    <Portal>
      <Backdrop open={fullScreen || !isDesktop} sx={{ zIndex: 1998 }} />
      <RootStyle
        sx={{
          ...(fullScreen && {
            top: 0,
            left: 0,
            zIndex: 1999,
            margin: 'auto',
            width: {
              xs: `calc(100% - 24px)`,
              md: `calc(100% - 80px)`,
            },
            height: {
              xs: `calc(100% - 24px)`,
              md: `calc(7% - 80px)`,
            },
          }),
        }}
      >
        <Box
          sx={{
            pl: 3,
            pr: 1,
            height: 60,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Send message to Admin 3Block</Typography>
          <Box sx={{ flexGrow: 1 }} />

          <IconButton onClick={fullScreen ? handleExitFullScreen : handleEnterFullScreen}>
            <Iconify icon={fullScreen ? 'eva:collapse-fill' : 'eva:expand-fill'} width={20} height={20} />
          </IconButton>

          <IconButton onClick={handleClose}>
            <Iconify icon={'eva:close-fill'} width={20} height={20} />
          </IconButton>
        </Box>

        <Divider />

        {/* <InputStyle disableUnderline placeholder="To" />

        <InputStyle disableUnderline placeholder="Subject" /> */}

        <Editor
          simple
          id="compose-mail"
          value={message}
          onChange={handleChangeMessage}
          placeholder="Type a message"
          sx={{
            borderColor: 'transparent',
            flexGrow: 1,
          }}
        />

        <Divider />

        <Box sx={{ py: 2, px: 3, display: 'flex', alignItems: 'center' }}>
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
              <Button variant="contained" onClick={handOnSubmit}>
                Send
              </Button>
            </m.div>
          )}

          {!isLoading && (
            <Button variant="contained" onClick={handOnSubmit}>
              Send
            </Button>
          )}

          {/* <IconButton size="small" sx={{ ml: 2, mr: 1 }}>
            <Iconify icon={'ic:round-add-photo-alternate'} width={24} height={24} />
          </IconButton>

          <IconButton size="small">
            <Iconify icon={'eva:attach-2-fill'} width={24} height={24} />
          </IconButton> */}
        </Box>
      </RootStyle>
    </Portal>
  );
}
