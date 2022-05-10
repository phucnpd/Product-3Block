import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCJgyWOPITjIg-s4wDjcubWq43de-PwUwE',
  authDomain: 'react-login-3block.firebaseapp.com',
  projectId: 'react-login-3block',
  storageBucket: 'react-login-3block.appspot.com',
  messagingSenderId: '245069606140',
  appId: '1:245069606140:web:5db28efa6869dcfb0a3b79',
  measurementId: 'G-EEGTK5P97P',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
