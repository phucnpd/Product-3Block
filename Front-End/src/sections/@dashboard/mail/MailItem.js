import { Box, Link, Typography } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Avatar from '../../../components/Avatar';
// components
import Label from '../../../components/Label';
import createAvatar from '../../../utils/createAvatar';
// utils
import { fDate } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(0, 2),
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up('md')]: { display: 'flex', alignItems: 'center' },
  '&:hover': {
    zIndex: 999,
    position: 'relative',
    boxShadow: theme.customShadows.z24,
    '& .showActions': { opacity: 1 },
  },
}));

const WrapStyle = styled(Link)(({ theme }) => ({
  minWidth: 0,
  display: 'flex',
  padding: theme.spacing(2, 0),
  transition: theme.transitions.create('padding'),
}));

// ----------------------------------------------------------------------

// const linkTo = (params, mailId) => {
//   const { systemLabel, customLabel } = params;

//   const baseUrl = PATH_DASHBOARD.mail.root;

//   if (systemLabel) {
//     return `${baseUrl}/${systemLabel}/${mailId}`;
//   }
//   if (customLabel) {
//     return `${baseUrl}/label/${customLabel}/${mailId}`;
//   }
//   return baseUrl;
// };

MailItem.propTypes = {
  // mail: PropTypes.object.isRequired,
  isDense: PropTypes.bool,
  isSelected: PropTypes.bool.isRequired,
  onDeselect: PropTypes.func,
  onSelect: PropTypes.func,
};

export default function MailItem({
  isCheck,
  content,
  username,
  createdAt,
  mail,
  keys,
  isDense,
  isSelected,
  onSelect,
  onDeselect,
  ...other
}) {
  content = content
    .replaceAll('</p><p>', '.')
    .replaceAll('</p>', ' ')
    .replaceAll('<p>', ' ')
    .replaceAll('<h1>', ' ')
    .replaceAll('</h1>', ' ')
    .replaceAll('<h2>', ' ')
    .replaceAll('</h2>', ' ')
    .replaceAll('<h3>', ' ')
    .replaceAll('</h3>', ' ')
    .replaceAll('<h4>', ' ')
    .replaceAll('</h4>', ' ')
    .replaceAll('<h5>', ' ')
    .replaceAll('</h5>', ' ')
    .replaceAll('<h6>', ' ')
    .replaceAll('</h6>', ' ')
    .replaceAll('<br>', ' ');
  // const params = useParams();

  // const { labels } = useSelector((state) => state.mail);

  // const isDesktop = useResponsive('up', 'md');

  // const isAttached = mail?.files.length > 0;

  // const handleChangeCheckbox = (checked) => (checked ? onSelect() : onDeselect());

  // console.log(JSON.parse(localStorage.getItem('user')).photoURL);
  if (isCheck === 'true') {
    isCheck = true;
  } else {
    isCheck = false;
  }
  return (
    <RootStyle
      sx={{
        ...(!isCheck && {
          color: 'text.primary',
          backgroundColor: 'background.paper',
        }),
        ...(isSelected && { bgcolor: 'action.selected' }),
      }}
      {...other}
    >
      {/* {isDesktop && (
        <Box sx={{ mr: 2, display: 'flex' }}>
          <Checkbox checked={isSelected} onChange={(event) => handleChangeCheckbox(event.target.checked)} />
          <Tooltip title="Starred">
            <Checkbox
              color="warning"
              defaultChecked={mail.isStarred}
              icon={<Iconify icon={'eva:star-outline'} />}
              checkedIcon={<Iconify icon={'eva:star-fill'} />}
            />
          </Tooltip>
          <Tooltip title="Important">
            <Checkbox
              color="warning"
              defaultChecked={mail.isImportant}
              checkedIcon={<Iconify icon={'ic:round-label-important'} />}
              icon={<Iconify icon={'ic:round-label-important'} />}
            />
          </Tooltip>
        </Box>
      )} */}

      <WrapStyle
        color="inherit"
        underline="none"
        // component={RouterLink}
        // to={linkTo(params, keys)}
        sx={{ ...(isDense && { py: 1 }) }}
      >
        <Avatar
          alt={username}
          color={createAvatar(username).color}
          sx={{ width: 32, height: 32 }}
          src={JSON.parse(localStorage.getItem('user'))?.photoURL}
        >
          {createAvatar(username).name}
        </Avatar>

        <Box
          sx={{
            ml: 2,
            minWidth: 0,
            alignItems: 'center',
            display: { md: 'flex' },
          }}
        >
          <Typography
            variant="body2"
            noWrap
            sx={{
              // pr: 2,
              minWidth: 200,
              ...(!isCheck && { fontWeight: 'fontWeightBold' }),
            }}
          >
            {fDate(createdAt)}
          </Typography>
          {/* <Typography
            variant="caption"
            sx={{
              flexShrink: 0,
              minWidth: 120,
              textAlign: 'right',
              ...(!isCheck && { fontWeight: 'fontWeightBold' }),
            }}
          >
            {fDate(createdAt)}
          </Typography> */}

          <Box sx={{ display: 'flex' }}>
            {
              <Label
                key={keys}
                color={(function () {
                  if (isCheck) {
                    return 'primary';
                  } else {
                    return 'info';
                  }
                })()}
                sx={{
                  mx: 0.5,
                  textTransform: 'capitalize',
                  // color: 'primary',
                  // color: (theme) => theme.palette.getContrastText('green'),
                }}
              >
                {
                  // label.name
                  (function () {
                    if (isCheck) {
                      return 'Seen';
                    } else {
                      return 'Unseen';
                    }
                  })()
                }
              </Label>
            }
          </Box>

          <Typography
            noWrap
            variant="body2"
            sx={{
              pr: 2,
            }}
          >
            {/* <Box component="span" sx={{ ...(!isCheck && { fontWeight: 'fontWeightBold' }) }}>
              {'Send Admin - 3Block'}
            </Box> */}

            <Box
              component="span"
              sx={{
                ...(!isCheck && { color: 'text.secondary' }),
              }}
            >
              {content}
            </Box>
          </Typography>
        </Box>
      </WrapStyle>

      {/* <MailItemAction className="showActions" /> */}
    </RootStyle>
  );
}
