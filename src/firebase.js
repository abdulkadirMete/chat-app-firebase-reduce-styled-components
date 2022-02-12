import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDhVEHQQts1sZyFWIk-KiKHxUusPoSCPK4",
    authDomain: "chatify-cde14.firebaseapp.com",
    projectId: "chatify-cde14",
    storageBucket: "chatify-cde14.appspot.com",
    messagingSenderId: "428042626866",
    appId: "1:428042626866:web:ead2b7f061e1b7420d192b"
  };
// Initialize Firebase
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;


