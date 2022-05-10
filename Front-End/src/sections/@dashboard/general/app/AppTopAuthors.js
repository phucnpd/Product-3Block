import { Avatar, Box, Card, CardHeader, Stack, Typography } from '@mui/material';
// @mui
import { alpha, styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
}));

// ----------------------------------------------------------------------

export default function AppTopAuthors({ asn, country, description, name }) {
  var indexAuthor = 0;
  var displayAuthor = [
    {
      id: asn + '' + indexAuthor++,
      avatar: 'https://votuenam.github.io/image-hosting/ans/name.png',
      favourite: 'Name',
      name: name,
      icon: 'logos:namecheap',
    },
    {
      id: asn + '' + indexAuthor++,
      avatar: 'https://votuenam.github.io/image-hosting/ans/description.png',
      favourite: 'Description',
      name: description,
      icon: 'flat-color-icons:info',
    },
    {
      id: asn + '' + indexAuthor++,
      avatar: 'https://votuenam.github.io/image-hosting/ans/image.png',
      favourite: 'Country',
      name: country,
      icon: 'emojione:cityscape-at-dusk',
    },
  ];
  return (
    <Card>
      <CardHeader title={'ASN: ' + asn} />
      <Stack spacing={3} sx={{ p: 3 }}>
        {displayAuthor.map((author, index) => (
          <AuthorItem key={author.id} author={author} index={index} />
        ))}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

AuthorItem.propTypes = {
  author: PropTypes.shape({
    avatar: PropTypes.string,
    favourite: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string,
  }),
  index: PropTypes.number,
};

function AuthorItem({ author, index }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={author.name} src={author.avatar} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{author.name}</Typography>
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
          <Iconify icon={'emojione:fountain-pen'} sx={{ width: 16, height: 16, mr: 0.5 }} />
          {author.favourite}
        </Typography>
      </Box>

      <IconWrapperStyle
        sx={{
          ...(index === 1 && {
            color: 'info.main',
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
          }),
          ...(index === 2 && {
            color: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          }),
        }}
      >
        <Iconify icon={author.icon} width={20} height={20} />
      </IconWrapperStyle>
    </Stack>
  );
}
