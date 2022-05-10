import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Box, Button, Card, CardHeader, Stack, Typography } from '@mui/material';
// @mui
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Iconify from '../../../../components/Iconify';
import Image from '../../../../components/Image';
// components
import Label from '../../../../components/Label';
import Scrollbar from '../../../../components/Scrollbar';
// _mock_
// import { _appRelated } from '../../../../_mock';
import _mock from '../../../../_mock';
import { engineDetail } from './engineDetail';

// ----------------------------------------------------------------------

function getLogo(Engine) {
  const logo = engineDetail.find((detail) => detail.Engine === Engine);
  try {
    if (logo) {
      return logo.logo();
    }
  } catch {
    return 'https://votuenam.github.io/image-hosting/logoDetail/VirusTotal.svg';
  }
  return 'https://votuenam.github.io/image-hosting/logoDetail/VirusTotal.svg';
}
function getLink(Engine) {
  const link = engineDetail.find((detail) => detail.Engine === Engine);
  try {
    if (link) {
      return link.link;
    }
  } catch {
    return 'https://support.virustotal.com/hc/en-us/articles/115002146809-Contributors';
  }
  return 'https://support.virustotal.com/hc/en-us/articles/115002146809-Contributors';
}

let _appRelated = [];
export default function AppTopRelated({ props = [] }) {
  _appRelated = props.map((appName, index) => ({
    id: _mock.id(index),
    name: Object.keys(appName)[0],
    system: JSON.stringify(Object.values(appName)[0]),
    price: index === 0 || index === 2 || index === 4 ? 0 : _mock.number.price(index),
    linkEngine: getLink(Object.keys(appName)[0]),
    review: 9,
    logo: getLogo(Object.keys(appName)[0]),
  }));

  const [sizeLink, setSizeLink] = useState(2);
  const detailView = _appRelated.slice(0, sizeLink);

  function ButtonView() {
    if (sizeLink < _appRelated.length) {
      return (
        <Button
          onClick={() => {
            setSizeLink(_appRelated.length);
          }}
          size="small"
          color="primary"
          endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
        >
          View All
        </Button>
      );
    } else if (sizeLink > 2) {
      return (
        <Button
          onClick={() => {
            setSizeLink(2);
          }}
          size="small"
          color="primary"
          endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
        >
          View Less
        </Button>
      );
    }
  }

  return (
    <Card>
      <CardHeader title="Detail Result" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {detailView.map((app) => (
            <ApplicationItem key={app.id} app={app} />
          ))}
        </Stack>
        <Box sx={{ p: 1, textAlign: 'right' }}>{ButtonView()}</Box>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

ApplicationItem.propTypes = {
  app: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    linkEngine: PropTypes.string,
    review: PropTypes.number,
    logo: PropTypes.string,
    system: PropTypes.string,
  }),
};

function ApplicationItem({ app }) {
  const theme = useTheme();
  const { logo, system, price, linkEngine, name } = app;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        sx={{
          width: 48,
          height: 48,
          flexShrink: 0,
          display: 'flex',
          borderRadius: 1.5,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.neutral',
        }}
      >
        <Image src={logo} alt={name} sx={{ width: 28, height: 28 }} />
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 160 }}>
        <Typography variant="subtitle2">{name}</Typography>
        <Stack direction="row" alignItems="center" sx={{ mt: 0.5, color: 'text.secondary' }}>
          <Iconify
            width={16}
            height={16}
            icon={system === 'Malicious' ? 'ant-design:code-sandbox-outlined' : 'ant-design:code-twotone'}
          />
          <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
            Type:
          </Typography>
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={price === 0 ? 'primary' : 'error'}
          >
            {system}
          </Label>
        </Stack>
      </Box>

      <Stack alignItems="flex-end" sx={{ pr: 3 }}>
        <a href={linkEngine} target="_blank" rel="noreferrer">
          <ReadMoreIcon />
        </a>
        <a href={linkEngine} target="_blank" rel="noreferrer">
          <Typography variant="caption" sx={{ mt: 0.5, color: 'text.secondary' }}>
            {'see more'}
          </Typography>
        </a>
      </Stack>
    </Stack>
  );
}
