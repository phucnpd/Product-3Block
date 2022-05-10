import { Box, Card, Container, Stack, Typography } from '@mui/material';
// @mui
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import Slider from 'react-slick';
import { MotionInView, varFade } from '../../components/animate';
import { CarouselArrows } from '../../components/carousel';
// components
import Image from '../../components/Image';
import SocialsButton from '../../components/SocialsButton';
// _mock_
import { _carouselsMembers } from '../../_mock';

// ----------------------------------------------------------------------

export default function AboutTeam() {
  const carouselRef = useRef(null);
  const theme = useTheme();

  const settings = {
    arrows: false,
    slidesToShow: 5,
    centerMode: true,
    centerPadding: '0px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  const linkSocial = [
    {
      facebook: 'https://www.facebook.com/namdo.eut/',
      github: 'https://github.com/VoTueNam',
      linkedin: 'https://www.linkedin.com/in/namdo-eut/',
    },
    {
      facebook: 'https://www.facebook.com/LongNMCE/',
      github: 'https://github.com/Nguyen-Minh-Long',
    },
    {
      facebook: 'https://www.facebook.com/vunguyen260803.trying/',
      github: 'https://github.com/NguyenVu1310',
      linkedin: 'https://www.linkedin.com/in/nguyenvu2608/',
    },
    {
      facebook: 'https://www.facebook.com/thaile2710/',
      github: 'https://github.com/Thailee2710',
      linkedin: 'https://www.linkedin.com/in/thaile2710/',
    },
    {
      facebook: 'https://www.facebook.com/profile.php?id=100014552829644',
    },
  ];
  for (let i in _carouselsMembers) {
    _carouselsMembers[i].link = linkSocial[i];
    console.log(_carouselsMembers[i]);
  }
  console.log(_carouselsMembers);

  return (
    <Container sx={{ pb: 10, textAlign: 'center' }}>
      <MotionInView variants={varFade().inDown}>
        <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
          Dream team
        </Typography>
      </MotionInView>

      <MotionInView variants={varFade().inUp}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Great team is the key
        </Typography>
      </MotionInView>

      <MotionInView variants={varFade().inUp}>
        <Typography
          sx={{
            mx: 'auto',
            maxWidth: 630,
            color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'),
          }}
        >
          3Blocks will provide you support if you have any problems, our support team will reply within a day and we
          also have detailed documentation.
        </Typography>
      </MotionInView>

      <Box sx={{ position: 'relative' }}>
        <CarouselArrows filled onNext={handleNext} onPrevious={handlePrevious}>
          <Slider ref={carouselRef} {...settings}>
            {_carouselsMembers.map((member) => (
              <MotionInView key={member.id} variants={varFade().in} sx={{ px: 1.5, py: 10 }}>
                <MemberCard member={member} />
              </MotionInView>
            ))}
          </Slider>
        </CarouselArrows>
      </Box>
      {/* <Button
        variant="outlined"
        color="inherit"
        size="large"
        endIcon={<Iconify icon={'ic:round-arrow-right-alt'} width={24} height={24} />}
        sx={{ mx: 'auto' }}
      >
        View all team members
      </Button> */}
    </Container>
  );
}

// ----------------------------------------------------------------------

MemberCard.propTypes = {
  member: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    link: PropTypes.object,
  }),
};

function MemberCard({ member }) {
  const { name, role, avatar, link } = member;

  return (
    <Card key={name} sx={{ p: 1 }}>
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        {role}
      </Typography>
      <Image src={avatar} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      <Stack alignItems="center" sx={{ mt: 2, mb: 1 }}>
        <SocialsButton sx={{ color: 'action.active' }} links={link} />
      </Stack>
    </Card>
  );
}
