// @mui
import { Container, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
// sections
import { AppFeatured, AppTopAuthors, AppWelcome, AppWidgetSummary } from '../../sections/@dashboard/general/app';
import { BankingContacts } from '../../sections/@dashboard/general/banking';
import { EcommerceNewProducts } from '../../sections/@dashboard/general/e-commerce';

// ----------------------------------------------------------------------
var URLVar = JSON.parse(localStorage.getItem('URLScan'));
if (!localStorage.getItem('URLScanList')) {
  getURLScanList();
}
export default function GeneralApp() {
  // đặt ở ngoài function sẽ ko nhận đc giá trị của biến đâu
  if (URLVar == null) {
    URLVar = google;
  }

  // const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  // console.log(URLVar);

  return (
    <Page title="URL Detail">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {/* URL + domain */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome
              domain={convertUndefined(URLVar?.page?.domain)}
              url={convertUndefined(URLVar?.page?.url)}
              screenshot={URLVar?.screenshot}
              report={URLVar?.report}
            />
          </Grid>
          {/* page remaining */}
          <Grid item xs={12} md={4}>
            <AppFeatured
              country={convertUndefined(URLVar?.page?.country)}
              city={convertUndefined(URLVar?.page?.city)}
              server={convertUndefined(URLVar?.page?.server)}
              ip={convertUndefined(URLVar?.page?.ip)}
              asn={convertUndefined(URLVar?.page?.asn)}
              asnname={convertUndefined(URLVar?.page?.asnname)}
            />
          </Grid>
          {/* header */}
          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Date"
              percent={convertUndefined(URLVar?.headers?.date)}
              total={'Server: ' + convertUndefined(URLVar?.headers?.server)}
              chartColor={theme.palette.primary.main}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
              number={1}
            />
          </Grid>
          {/* port + ip */}
          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="IP Address"
              percent={convertUndefined(URLVar?.ipaddress)}
              total={'Port: ' + convertUndefined(URLVar?.port)}
              chartColor={theme.palette.chart.blue[0]}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
              number={1}
            />
          </Grid>
          {/* GeoIP */}
          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title={'GeoIP: ' + convertUndefined(URLVar?.geoip?.country_name)}
              total={'Country: ' + convertUndefined(URLVar?.geoip?.countries)}
              percent={'Timezone: ' + convertUndefined(URLVar?.geoip?.timezone)}
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
              number={1}
            />
          </Grid>
          {/* country */}
          <Grid item xs={12} md={4}>
            <EcommerceNewProducts countriesName={convertUndefined(URLVar?.countries)} />
          </Grid>
          {/* asn */}
          <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors
              asn={convertUndefined(URLVar?.asn?.asn)}
              country={convertUndefined(URLVar?.asn?.country)}
              description={convertUndefined(URLVar?.asn?.description)}
              name={convertUndefined(URLVar?.asn?.name)}
            />
          </Grid>
          {/* Links */}
          <Grid item xs={12} md={6} lg={4}>
            <BankingContacts links={convertUndefined(URLVar?.links)} />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTopInstalledCountries />
          </Grid> */}
          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled />
          </Grid> */}
          {/* <Grid item xs={12} lg={8}>
            <AppNewInvoice />
          </Grid> */}
          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated />
          </Grid> */}
          {/* <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidget title="Conversion" total={38566} icon={'eva:person-fill'} chartData={48} />
              <AppWidget title="Applications" total={55566} icon={'eva:email-fill'} color="warning" chartData={75} />
            </Stack>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
function convertUndefined(a) {
  if (a === undefined) return '🤔?';
  return a;
}
var google = {
  page: {
    url: 'https://www.google.com/?gws_rd=ssl',
    domain: 'www.google.com',
    country: 'DE',
    city: 'Frankfurt am Main',
    server: 'gws',
    ip: '2a00:1450:4001:810::2004',
    asn: 'AS15169',
    asnname: 'GOOGLE, US',
  },
  headers: {
    date: 'Wed, 16 Feb 2022 14:18:33 GMT',
    server: 'gws',
  },
  port: 443,
  ipaddress: '[2a00:1450:4001:810::2004]',
  asn: {
    asn: '15169',
    country: 'US',
    description: 'GOOGLE, US',
    name: 'GOOGLE',
  },
  geoip: {
    countries: 'DE',
    timezone: 'Europe/Berlin',
    country_name: 'Germany',
  },
  links: [
    {
      href: 'https://about.google/?fg=1&utm_source=google-DE&utm_medium=referral&utm_campaign=hp-header',
      text: 'Über Google',
    },
    {
      href: 'https://store.google.com/DE?utm_source=hp_header&utm_medium=google_ooo&utm_campaign=GS100042&hl=de-DE',
      text: 'Store',
    },
    {
      href: 'https://mail.google.com/mail/&ogbl',
      text: 'Gmail',
    },
    {
      href: 'https://www.google.de/imghp?hl=de&ogbl',
      text: 'Bilder',
    },
    {
      href: 'https://www.google.de/intl/de/about/products',
      text: '',
    },
    {
      href: 'https://accounts.google.com/ServiceLogin?hl=de&passive=true&continue=https://www.google.com/%3Fgws_rd%3Dssl&ec=GAZAmgQ',
      text: 'Anmelden',
    },
    {
      href: 'https://support.google.com/websearch/asnwer/106230?hl=de',
      text: 'Weitere Informationen',
    },
    {
      href: 'https://google.com/search/howsearchworks/?fg=1',
      text: 'Wie funktioniert die Google Suche?',
    },
    {
      href: 'https://sustainability.google/intl/de/commitments/?utm_source=googlehpfooter&utm_medium=housepromos&utm_campaign=bottom-footer&utm_content=',
      text: 'CO2-neutral seit 2007',
    },
    {
      href: 'https://policies.google.com/privacy?hl=de&fg=1',
      text: 'Datenschutzerklärung',
    },
    {
      href: 'https://policies.google.com/terms?hl=de&fg=1',
      text: 'Nutzungsbedingungen',
    },
    {
      href: 'https://support.google.com/websearch/?p=ws_results_help&hl=de&fg=1',
      text: 'Hilfe zur Suche',
    },
    {
      href: 'https://policies.google.com/technologies/cookies?utm_source=ucbs&hl=de',
      text: 'Cookies',
    },
    {
      href: 'https://policies.google.com/privacy?hl=de&fg=1&utm_source=ucbs',
      text: 'Datenschutz',
    },
    {
      href: 'https://policies.google.com/terms?hl=de&fg=1&utm_source=ucbs',
      text: 'Nutzungsbedingungen',
    },
  ],
  countries: ['DE'],
  linkDomains: [
    'about.google',
    'store.google.com',
    'mail.google.com',
    'www.google.de',
    'accounts.google.com',
    'support.google.com',
    'google.com',
    'sustainability.google',
    'policies.google.com',
  ],
  screenshot: 'https://urlscan.io/screenshots/769e46f1-2c9f-4423-81b7-90e93225b07a.png',
  report: 'https://urlscan.io/result/769e46f1-2c9f-4423-81b7-90e93225b07a/',
};
function getURLScanList() {
  fetch('https://api3blockserver.herokuapp.com/api/3block/system/GetAllURLScan', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      localStorage.setItem('URLScanList', JSON.stringify(json));
      console.log('Update URLScanList Success!');
    })
    .catch(() => {
      console.log('Update URLScanList Failure!');
    });
}
