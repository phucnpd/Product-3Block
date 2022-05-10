// @mui
import {
  // Button,
  Card,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
// components
import Image from '../../../../components/Image';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
// ----------------------------------------------------------------------

const ContentStyle = styled(Card)(({ theme }) => ({
  marginTop: -120,
  boxShadow: 'none',
  padding: theme.spacing(5),
  paddingTop: theme.spacing(16),
  color: theme.palette.common.white,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.info.dark} 100%)`,
}));

// ----------------------------------------------------------------------

export default function BankingInviteFriends({
  url = 'example.com',
  title = 'None',
  virusTotal = true,
  setGray,
  setIs18Plus,
  setIsLoading18,
}) {
  var Update = 'Update';
  if (url === 'Please enter domain you suspect has 18+ content') Update = 'Check!';
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const currentUser = JSON.parse(localStorage.getItem('user'));
  if (url !== 'Enter your suggestion' && url !== 'Please enter domain you suspect has 18+ content')
    url = url.slice(7, -1);
  // console.log('image = ' + currentUser?.photoURL);

  const [submitValue, setSubmitValue] = useState('');

  function onSubmit() {
    if (!validURL(submitValue)) {
      enqueueSnackbar('Please Enter Valid URL!', { variant: 'error' });
      return;
    }
    setIsLoading(true);
    if (url === 'Please enter domain you suspect has 18+ content') {
      setIsLoading18(true);
      callAPICheck18(submitValue);
      return;
    }
    // console.log('submit ' + submitValue);
    // console.log(currentUser.displayName);
    fetch('https://api3blockserver.herokuapp.com/user/gray/system/3block/createNew', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: submitValue,
        user: currentUser.displayName || currentUser.email,
        image: currentUser?.photoURL,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.result === 'failURL') {
          throw new Error('failURL');
        }
        setSubmitValue('');
        (function getGrayList() {
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
              // console.log(err);
              setIsLoading(false);
              enqueueSnackbar('Update Gray Lists Failure!', { variant: 'error' });
            });
        })();
        setIsLoading(false);
        enqueueSnackbar('Submit Gray Lists Successfully!', { variant: 'success' });
        // console.log(json);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.message === 'failURL') {
          enqueueSnackbar('Your submit was in Our Lists!', { variant: 'error' });
        } else {
          enqueueSnackbar('Submit Gray Lists Failure!', { variant: 'error' });
        }
      });
  }

  function callAPICheck18(url) {
    fetch('https://api3blockserver.herokuapp.com/api/3block/system/is18Plus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: url,
        isCheck: true,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.result === 'success') {
          setIs18Plus(true);
        } else {
          setIs18Plus(false);
        }
        setIsLoading(false);
        enqueueSnackbar('Check successfully!', { variant: 'success' });
        setSubmitValue('');
        setIsLoading18(false);
        // console.log(json);
      })
      .catch((err) => {
        console.log(err);
        setIs18Plus(false);
        enqueueSnackbar('Check failure!', { variant: 'error' });
        setIsLoading18(false);
      });
  }

  return (
    <div>
      <Image
        visibleByDefault
        disabledEffect
        src={(function () {
          if (url === 'Please enter domain you suspect has 18+ content') {
            return 'https://votuenam.github.io/image-hosting/BackGroud3block18.png';
          } else {
            return 'https://votuenam.github.io/image-hosting/BackGroud3Block' + virusTotal + '.png';
          }
        })()}
        // src="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_invite.png"
        sx={{
          left: 45,
          zIndex: 9,
          width: 160,
          position: 'relative',
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.24))',
        }}
      />
      <ContentStyle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" noWrap>
            {url}
          </Typography>
        </Stack>

        <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
          {title}
        </Typography>

        {virusTotal && (
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            <OutlinedInput
              size="small"
              placeholder="https://3block.systems/"
              value={submitValue}
              onChange={(e) => {
                setSubmitValue(e.target.value.toLowerCase().trim());
              }}
              onKeyPress={(e) => {
                // console.log(e.key);
                if (e.key === 'Enter') {
                  onSubmit();
                }
              }}
              sx={{
                width: 1,
                color: 'common.white',
                fontWeight: 'fontWeightMedium',
                bgcolor: (theme) => alpha(theme.palette.common.black, 0.16),
                '& input::placeholder': {
                  color: (theme) => alpha(theme.palette.common.white, 0.48),
                },
                '& fieldset': { display: 'none' },
              }}
            />
            {/* <Button color="warning" variant="contained" onClick={onSubmit}>
              Submit
            </Button> */}
            <LoadingButton
              color="warning"
              loading={isLoading}
              loadingPosition="start"
              startIcon={<SendIcon />}
              variant="contained"
              sx={{ fontWeight: 'fontWeightBold' }}
              onClick={onSubmit}
            >
              {Update}
            </LoadingButton>
          </Stack>
        )}
      </ContentStyle>
    </div>
  );
}
function validURL(str) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
}
