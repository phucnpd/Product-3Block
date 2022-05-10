import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// components
import LoadingScreen from '../components/LoadingScreen';
// hooks
import useAuth from '../hooks/useAuth';
// pages
import Login from '../pages/auth/Login';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);
  // const navigate = useNavigate();
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    // console.log('Văng ở đây nè');
    var user = JSON.parse(localStorage.getItem('user'));
    // if (pathname !== requestedLocation) {
    //   setRequestedLocation(pathname);
    // }

    if (!user) {
      return <Login />;
    }
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
