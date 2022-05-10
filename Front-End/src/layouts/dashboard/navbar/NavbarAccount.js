import { Box, Link, Typography } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
// components
import MyAvatar from '../../../components/MyAvatar';
// hooks
// import useAuth from '../../../hooks/useAuth';
import { useAuth } from '../../../firebaseLogin/contexts/AuthContext';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse }) {
  const { currentUser } = useAuth();
  // const [user, setUser] = useState(users);
  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem('user')));
  // });
  // var user = JSON.parse(localStorage.getItem('user'));
  const user = currentUser;

  return (
    <Link underline="none" color="inherit" to={'#'}>
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: 'transparent',
          }),
        }}
      >
        <MyAvatar />

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {(() => {
              if (user?.displayName) {
                if (user?.displayName?.length >= 20) {
                  return user?.displayName.slice(0, 17).concat('...');
                } else {
                  return user?.displayName;
                }
              } else {
                if (user?.email?.length >= 20) {
                  return user?.email.slice(0, 17).concat('...');
                } else {
                  return user?.email;
                }
              }
            })()}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {(function () {
              if (user?.email) {
                if (user?.email?.length >= 20) {
                  return user?.email.slice(0, 17).concat('...');
                } else {
                  return user?.email;
                }
              }
              return undefined;
            })()}
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
}
