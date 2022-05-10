import { Box, Button, Card, CardContent, Typography } from '@mui/material';
// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { CarouselDots } from '../../../../components/carousel';
// components
import Image from '../../../../components/Image';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

export default function EcommerceNewProducts({ countriesName }) {
  const theme = useTheme();
  const countries = [];
  for (var i of countriesName) {
    if (i == null) {
      continue;
    }
    var obj = {
      name: i,
      image: 'https://countryflagsapi.com/png/' + i,
    };
    countries.push(obj);
  }
  // console.log(countries);
  const settings = {
    speed: 1000,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({ position: 'absolute', right: 24, bottom: 24 }),
  };

  return (
    <Card>
      <Slider {...settings}>
        {countries.map((item) => (
          <CarouselItem key={item.name} item={item} />
        ))}
      </Slider>
    </Card>
  );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
  }),
};

function CarouselItem({ item }) {
  const { image, name } = item;

  return (
    <Box sx={{ position: 'relative' }}>
      <CardContent
        sx={{
          left: 0,
          bottom: 0,
          zIndex: 9,
          maxWidth: '80%',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <Typography variant="overline" sx={{ opacity: 0.48 }}>
          Countries
        </Typography>
        <Typography noWrap variant="h5" sx={{ mt: 1, mb: 3 }}>
          {name}
        </Typography>
        <a href={'https://en.wikipedia.org/wiki/.' + name.toLowerCase()} target="_blank" rel="noreferrer">
          <Button variant="contained">More Info</Button>
        </a>
      </CardContent>
      <OverlayStyle />
      <Image alt={name} src={image} sx={{ height: { xs: 280, xl: 320 } }} />
    </Box>
  );
}
