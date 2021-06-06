import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAdSM3c1jYgq_EmrqtP6_uffNOroeoDQyk',
  authDomain: 'catch-of-the-day-5tocode.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-5tocode-default-rtdb.firebaseio.com',
  // projectId: 'catch-of-the-day-5tocode',
  // storageBucket: 'catch-of-the-day-5tocode.appspot.com',
  // messagingSenderId: '560551408448',
  // appId: '1:560551408448:web:5220454720bb51783200a5',
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;