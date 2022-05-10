import { Box, Card, CardContent, Typography } from '@mui/material';
// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import { MotionContainer, varFade } from '../../../../components/animate';
import { CarouselArrows, CarouselDots } from '../../../../components/carousel';
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
const URL = 'https://votuenam.github.io/image-hosting/';
export default function AppFeatured({ country, city, server, ip, asn, asnname }) {
  const image = [`${URL}AppFeatured/City.jpg`, `${URL}AppFeatured/server.jpg`, `${URL}AppFeatured/asn.jpg`];
  const _appFeatured = [...Array(3)].map((_, index) => ({
    id: image[index],
    title: [city, ip, asnname][index],
    description: ['Country: ' + country, 'Server: ' + server, 'Asn: ' + asn][index],
    image: image[index],
    header: ['City', 'IP', 'Asnname'][index],
  }));

  const theme = useTheme();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? _appFeatured.length - 1 : 0);

  const settings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next),
    ...CarouselDots({
      zIndex: 9,
      top: 24,
      left: 24,
      position: 'absolute',
    }),
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <Card>
      <Slider ref={carouselRef} {...settings}>
        {_appFeatured.map((app, index) => (
          <CarouselItem key={app.id} item={app} isActive={index === currentIndex} />
        ))}
      </Slider>

      <CarouselArrows
        onNext={handleNext}
        onPrevious={handlePrevious}
        spacing={0}
        sx={{
          top: 16,
          right: 16,
          position: 'absolute',
          '& .arrow': {
            p: 0,
            width: 32,
            height: 32,
            opacity: 0.48,
            color: 'common.white',
            '&:hover': { color: 'common.white', opacity: 1 },
          },
        }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  isActive: PropTypes.bool,
  item: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    header: PropTypes.string,
  }),
};

function CarouselItem({ item, isActive }) {
  const { image, title, description, header } = item;

  return (
    <Box sx={{ position: 'relative' }}>
      <CardContent
        component={MotionContainer}
        animate={isActive}
        action
        sx={{
          bottom: 0,
          width: 1,
          zIndex: 9,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <m.div variants={varFade().inRight}>
          <Typography variant="overline" component="div" sx={{ mb: 1, opacity: 0.48 }}>
            {header}
          </Typography>
        </m.div>
        <m.div variants={varFade().inRight}>
          <Typography variant="h5" gutterBottom noWrap>
            {title}
          </Typography>
        </m.div>
        <m.div variants={varFade().inRight}>
          <Typography variant="body2" noWrap>
            {description}
          </Typography>
        </m.div>
      </CardContent>
      <OverlayStyle />
      <Image alt={title} src={image} sx={{ height: { xs: 280, xl: 320 } }} />
    </Box>
  );
}
