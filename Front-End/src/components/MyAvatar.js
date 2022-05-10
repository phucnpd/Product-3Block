// hooks
// import useAuth from '../hooks/useAuth';
import { useAuth } from '../firebaseLogin/contexts/AuthContext';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ alt, src, gray = false, ...other }) {
  const { currentUser } = useAuth();
  // var results = JSON.parse(localStorage.getItem('user'));
  const results = currentUser;
  const listDisplay = JSON.parse(localStorage.getItem('displayName'));
  // console.log(listDisplay);
  if (results != null && results?.email) {
    for (let i of listDisplay) {
      if (i.email === results.email) {
        results.displayName = i.displayName;
      }
    }
  }
  return (
    <>
      {!gray && (
        <Avatar
          src={
            // user?.photoURL
            results?.photoURL
          }
          alt={results?.displayName || results?.email}
          color={results?.photoURL ? 'default' : createAvatar(results?.displayName).color}
          {...other}
        >
          {createAvatar(results?.displayName || results?.email).name}
        </Avatar>
      )}
      {gray && (
        <Avatar src={src} alt={alt} color={src ? 'default' : createAvatar(alt).color} {...other}>
          {createAvatar(alt).name}
        </Avatar>
      )}
    </>
  );
}
