import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
// @mui
import { Alert, IconButton, InputAdornment, Link, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FormProvider, RHFCheckbox, RHFTextField } from '../../../components/hook-form';
// components
import Iconify from '../../../components/Iconify';
// hooks
// import useAuth from '../../../hooks/useAuth';
import { useAuth } from '../../../firebaseLogin/contexts/AuthContext';
// routes
import { PATH_AUTH } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isSubmittings, setIsSubmittings] = useState(false);

  // const isMountedRef = useIsMountedRef();

  const [showError, setShowError] = useState(true);
  const [errorsNe, setErrorsNe] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    // setError,
    handleSubmit,
    // formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    setIsSubmittings(true);
    login(data.email, data.password)
      .then((res) => {
        // console.log(res);
        localStorage.setItem('user', JSON.stringify(res.user));
        setIsSubmittings(false);
        fetch('https://api3blockserver.herokuapp.com/user/gray/system/3block/getName', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((resp) => {
            // console.log(resp);
            localStorage.setItem('displayName', JSON.stringify(resp));
            navigate('/dashboard/analytics');
          })
          .catch((err) => {
            enqueueSnackbar(err.message, { variant: 'error' });
          });

        // handleRedirectToOrBack();
      })
      .catch((error) => {
        console.log(error.message);
        reset();
        setShowError(false);
        setIsSubmittings(false);
        // const loiNe = ;

        const newErr = error.message
          .slice(22, -2)
          .replace(/-/g, ' ')
          .split(' ')
          .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
          .join(' ');

        setErrorsNe(newErr);
        // if (isMountedRef.current) {

        // }
        // toast({
        //   description: error.message,
        //   status: 'error',
        //   duration: 9000,
        //   isClosable: true,
        // });
      });

    // try {
    //   await login(data.email, data.password);
    // } catch (error) {
    //   console.error(error);
    //   reset();
    //   if (isMountedRef.current) {
    //     setError('afterSubmit', error);
    //   }
    // }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!showError && <Alert severity="error">{errorsNe}</Alert>}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmittings}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
