// @mui
import { Container, Grid } from '@mui/material';
import { useState } from 'react';
// assets
import { BookingIllustration } from '../../assets';
import LoadingScreen from '../../components/LoadingScreen';
// components
import Page from '../../components/Page';
// hooks
import useSettings from '../../hooks/useSettings';
import { BankingInviteFriends } from '../../sections/@dashboard/general/banking';
// sections
import {
  BookingCheckInWidgets,
  BookingDetails,
  BookingNewestBooking,
  BookingWidgetSummary,
} from '../../sections/@dashboard/general/booking';

// ----------------------------------------------------------------------
var grays;

if (!localStorage.getItem('grayList')) {
  getGrayLists();
  // alert('Wait Updating GrayList!');
} else {
  grays = JSON.parse(localStorage.getItem('grayList'));
  // console.log(gray);
}

export default function GeneralBooking() {
  const { themeStretch } = useSettings();

  const [gray, setGray] = useState(grays);

  //! If Grays NULL
  if (grays == null) return <LoadingScreen />;
  return (
    <Page title="Gray Lists">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <BankingInviteFriends
              virusTotal={true}
              url={'Enter your suggestion'}
              title={'The URL you want to add to the blacklist is here:'}
              setGray={setGray}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <br />
            <br />
            <BookingWidgetSummary
              title="Total URL"
              total={gray.length}
              icon={<BookingIllustration />}
              setGray={setGray}
            />
            {/* <Grid item xs={12} md={4}> */}
            <br />
            <BookingCheckInWidgets gray={gray} size={gray.length} />
            {/* </Grid> */}
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <BookingWidgetSummary title="Verification" total={isChecked} icon={<CheckInIllustration />} />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingWidgetSummary title="Reject" total={notChecked} icon={<CheckOutIllustration />} />
          </Grid> */}

          {/* 
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <BookingTotalIncomes />
              </Grid>

              <Grid item xs={12} md={6}>
                <BookingBookedRoom />
              </Grid>

              <Grid item xs={12} md={12}>
                <BookingCheckInWidgets />
              </Grid>
            </Grid>
          </Grid> */}

          {/* <Grid item xs={12} md={4}>
            <BookingRoomAvailable />
          </Grid> */}

          {/* <Grid item xs={12} md={8}>
            <BookingReservationStats />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingCustomerReviews />
          </Grid> */}

          <Grid item xs={12}>
            <BookingNewestBooking grayList={gray} />
          </Grid>

          <Grid item xs={12}>
            <BookingDetails grayList={gray} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
function getGrayLists() {
  fetch('https://api3blockserver.herokuapp.com/user/gray/system/3block/getAll', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      localStorage.setItem('grayList', JSON.stringify(json));
      window.location.reload();
    });
}
