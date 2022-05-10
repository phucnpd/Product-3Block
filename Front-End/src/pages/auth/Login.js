import { Box, Card, Container, Link, Stack, Tooltip, Typography } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FacebookLoginButton, GithubLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import Image from '../../components/Image';
import Logo from '../../components/Logo';
// components
import Page from '../../components/Page';
import { useAuth } from '../../firebaseLogin/contexts/AuthContext';
// hooks
// import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// routes
import { PATH_AUTH } from '../../routes/paths';
// sections
import { LoginForm } from '../../sections/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const navigate = useNavigate();
  // const { method } = useAuth();
  //! ################

  const { signInWithGoogle, signInWithGithub, signInWithFacebook } = useAuth();
  // console.log('login', currentUser?.email);

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const location = useLocation();

  //todo #############

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Have you logged in yet? {''}
              <Link variant="subtitle2" component={RouterLink} to={'/dashboard/analytics'}>
                Let's GO!
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <Image alt="login" src="https://votuenam.github.io/image-hosting/login.png" />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Sign in to 3Block
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
              </Box>

              <Tooltip
                title={
                  'Login'
                  // capitalCase(method)
                }
                placement="right"
              >
                <>
                  <Image
                    disabledEffect
                    src={`https://votuenam.github.io/image-hosting/ic_jwt.png`}
                    sx={{ width: 32, height: 32 }}
                  />
                </>
              </Tooltip>
            </Stack>
            {/* <Alert severity="info" sx={{ mb: 3 }}>
              Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
            </Alert> */}
            {/* //! Login FORM here!!! */}
            <LoginForm />
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <GoogleLoginButton
                onClick={() =>
                  signInWithGoogle()
                    .then((user) => {
                      localStorage.setItem('user', JSON.stringify(user.user));
                      navigate('/dashboard/analytics');
                      // console.log(user);
                    })
                    .catch((e) => console.log(e.message))
                }
              />
              <FacebookLoginButton
                onClick={() =>
                  signInWithFacebook()
                    .then((user) => {
                      localStorage.setItem('user', JSON.stringify(user.user));
                      navigate('/dashboard/analytics');
                    })
                    .catch((e) => console.log(e.message))
                }
              />
              <GithubLoginButton
                onClick={() =>
                  signInWithGithub()
                    .then((user) => {
                      localStorage.setItem('user', JSON.stringify(user.user));
                      navigate('/dashboard/analytics');
                    })
                    .catch((e) => console.log(e.message))
                }
              />
            </Stack>
            {smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                  Register now
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
