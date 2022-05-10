// @mui
import { Box, Container, Link, Stack, Typography } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
//
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();

  const isHome = pathname === '/';

  return (
    <Stack sx={{ minHeight: 1 }}>
      <MainHeader />

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      {!isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default',
          }}
        >
          <Container>
            {/* <Logo sx={{ mb: 1, mx: 'auto' }} /> */}

            <Typography variant="caption" component="p">
              <br />© All rights reserved made by 3Block team
              <Link href="/"> 3block.systems</Link>
            </Typography>
          </Container>
        </Box>
      )}
    </Stack>
  );
}
