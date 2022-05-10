// @mui
import { Container, Grid, Typography } from '@mui/material';
import Iconify from '../../components/Iconify';
// components
import Page from '../../components/Page';
// hooks
import useSettings from '../../hooks/useSettings';
// sections
import { AnalyticsCurrentVisits, AnalyticsTrafficBySite } from '../../sections/@dashboard/general/analytics';
import { AppTopRelated, AppWidget } from '../../sections/@dashboard/general/app';
import { BankingInviteFriends } from '../../sections/@dashboard/general/banking';
import { typeOfCategories } from './getTypeOfCategories/types';

// ----------------------------------------------------------------------

function resetURL() {
  result = {
    url: 'http://example.com/',
    level: 'medium',
    result: {
      clean: '91.40',
      unrated: '8.60',
    },
    detail: {
      Lumu: 'malicious',
      Netcraft: 'phishing',
      NotMining: 'malware',
      SafeToOpen: 'suspicious',
    },
    title: 'This domain is for use in illustrative examples in documents.',
    categories: [
      'adult content',
      'blogs and personal sites',
      'onlineshop',
      'games',
      'Ads/Analytics, Marketing/Merchandising',
      'computersandsoftware',
      'Malware Sites',
      'online brokerage and trading',
      'kids sites',
      'hahahahaha',
    ],
  };
}
try {
  var result = JSON.parse(localStorage.getItem('virusTotal'));
  if (result?.error || result == null) {
    resetURL();
  }
} catch {
  resetURL();
}

// Level
let colorLevel = 'primary';
const props = {
  chartData: [],
  label: [],
};

switch (result.level) {
  case 'none':
    colorLevel = 'success';
    break;
  case 'low':
    colorLevel = 'info';
    break;
  case 'medium':
    colorLevel = 'warning';
    break;
  case 'high':
    colorLevel = 'error';
    break;
  default:
    break;
}

// categories
const typeCategory = [];
result.categories.forEach((i) =>
  typeCategory.push({
    name: typeOfCategories(i).name,
    value: i,
    icon: <Iconify icon={typeOfCategories(i).icon} color="#1877F2" width={32} height={32} />,
  })
);

// Percent result
const propsDetails = [];
Object.keys(result.result).forEach((i) => props.label.push(i));
Object.values(result.result).forEach((i) => props.chartData.push(Number(i)));
try {
  Object.keys(result?.detail).forEach((i) => {
    propsDetails.push({ [i]: result.detail[i] });
  });
} catch (error) {}

// console.log(typeCategory.length);
// console.log(propsDetails.length);

export default function GeneralAnalytics() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Analytics URL">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Welcome, Analytics URL
        </Typography>

        {/* URL and Title */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <BankingInviteFriends url={result.url} title={result.title} virusTotal={false} />
          </Grid>

          {/* Biểu đồ tròn */}
          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentVisits props={props} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            {/* Level */}
            <AppWidget
              title="Level"
              total={result.level.charAt(0).toUpperCase() + result.level.slice(1)}
              color={colorLevel}
              icon={'ant-design:bug-filled'}
              chartData={(100 - Number(result.result.clean)).toFixed(2)}
            />
            <br />
            {/* Detail */}
            {propsDetails.length !== 0 && <AppTopRelated props={propsDetails} />}
          </Grid>

          {/* categories */}
          {typeCategory.length !== 0 && (
            <Grid item xs={12} md={6} lg={12}>
              <AnalyticsTrafficBySite props={typeCategory} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
