import PropTypes from 'prop-types';
// @mui
import { Typography, Box, Paper } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionInView, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const CATEGORIES = [
  {
    label: 'Custom your URL Blocking',
    icon: 'https://votuenam.github.io/image-hosting/faqs/custom.svg',
    href: '#',
  },
  {
    label: 'Easy operation ',
    icon: 'https://votuenam.github.io/image-hosting/faqs/operation.svg',
    href: '#',
  },
  {
    label: 'Kids feature',
    icon: 'https://votuenam.github.io/image-hosting/faqs/Kid.svg',
    href: '#',
  },
  {
    label: 'Security and Convenience',
    icon: 'https://votuenam.github.io/image-hosting/faqs/Agile.svg',
    href: '#',
  },
  {
    label: 'Administrator Supporting',
    icon: 'https://votuenam.github.io/image-hosting/faqs/support.svg',
    href: '#',
  },
  {
    label: 'Guarantees and assurances',
    icon: 'https://votuenam.github.io/image-hosting/faqs/asurranse.svg',
    href: '#',
  },
];

// ----------------------------------------------------------------------

export default function FaqsCategory() {
  return (
    <Box
      sx={{
        mb: 15,
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(6, 1fr)',
        },
      }}
    >
      {CATEGORIES.map((category) => (
        <MotionInView key={category.label} variants={varFade().in}>
          <CategoryCard category={category} />
        </MotionInView>
      ))}
    </Box>
  );
}

// ----------------------------------------------------------------------

CategoryCard.propTypes = {
  category: PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string,
  }),
};

function CategoryCard({ category }) {
  const { label, icon } = category;

  return (
    <Paper
      variant="outlined"
      sx={{
        px: 2,
        height: 260,
        borderRadius: 2,
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.z24,
        },
      }}
    >
      <Image visibleByDefault disabledEffect src={icon} sx={{ mb: 2, width: 80, height: 80 }} />
      <Typography variant="subtitle2">{label}</Typography>
    </Paper>
  );
}
