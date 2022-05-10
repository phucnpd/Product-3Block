// @mui
import { Container, Grid } from '@mui/material';
import { useState } from 'react';
// components
import Page from '../../components/Page';
// hooks
import useSettings from '../../hooks/useSettings';
import AnalyticsWidgetSummary from '../../sections/@dashboard/general/analytics/AnalyticsWidgetSummary';
import { BankingInviteFriends } from '../../sections/@dashboard/general/banking';

// ----------------------------------------------------------------------

export default function GeneralBooking() {
  const { themeStretch } = useSettings();

  const [is18Plus, setIs18Plus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(is18Plus);

  return (
    <Page title="Check 18+ URL ">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={8} md={7}>
            <BankingInviteFriends
              virusTotal={true}
              url={'Please enter domain you suspect has 18+ content'}
              title={' URL here:'}
              setIs18Plus={setIs18Plus}
              setIsLoading18={setIsLoading}
              // setGray={setGray}
            />
          </Grid>
          <Grid item xs={4} md={4}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <AnalyticsWidgetSummary
              isLoading={isLoading}
              title={(function () {
                if (is18Plus) {
                  return 'This is a 18+ URL';
                } else {
                  return 'This is not a 18+ URL';
                }
              })()}
              total={(function () {
                if (is18Plus) {
                  return 'Yes';
                } else {
                  return 'No';
                }
              })()}
              icon={(function () {
                if (is18Plus) {
                  return 'ant-design:bug-filled';
                } else {
                  return 'ant-design:safety-outlined';
                }
              })()}
              color={(function () {
                if (is18Plus) {
                  return 'error';
                } else {
                  return 'success';
                }
              })()}
            ></AnalyticsWidgetSummary>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
