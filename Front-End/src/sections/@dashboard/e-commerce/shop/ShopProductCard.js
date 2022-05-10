// @mui
import { Box, Card, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { ColorPreview } from '../../../../components/color-utils';
// components
import Label from '../../../../components/Label';
import { BookingRoomAvailable } from '../../general/booking';

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  var { url, updatedAt } = product;

  const colors = [];
  var randomNumber = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
  for (let i = 0; i <= randomNumber; i += 1) {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    colors.push('#' + randomColor);
  }

  // const linkTo = `/dashboard/analytics`;
  const status = product.level;

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={
              (status === 'high' && 'error') ||
              (status === 'medium' && 'warning') ||
              (status === 'low' && 'info') ||
              'success'
            }
            sx={{
              top: 6,
              right: 6,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        {/* <EcommerceSaleByGender /> */}
        <BookingRoomAvailable product={product.result} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        {/* <Link
          to={linkTo}
          color="inherit"
          component={RouterLink}
          onClick={() => {
            localStorage.setItem('virusTotal', JSON.stringify(product));
          }}
        > */}
        <a
          href={'/dashboard/analytics'}
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            localStorage.setItem('virusTotal', JSON.stringify(product));
          }}
        >
          <Typography variant="subtitle1" noWrap>
            {validURL(url)}
          </Typography>
        </a>
        {/* </Link> */}

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />

          <Stack direction="row" spacing={0.5}>
            {/* {updatedAtSale && (
              <Typography component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {fCurrency(updatedAtSale)}
              </Typography>
            )} */}

            <Typography variant="subtitle2">{'Updated: ' + format(new Date(updatedAt), 'dd MMM yyyy')}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
function validURL(url) {
  var match;
  // eslint-disable-next-line
  if ((match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im))) {
    return match[1];
  }
}
