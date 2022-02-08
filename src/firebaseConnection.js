import firebase from "firebase/compat/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsDVZZHHbbvJ3ynErz_VsoS2YKjrhoLg4",
  authDomain: "primeiro-teste-810cd.firebaseapp.com",
  projectId: "primeiro-teste-810cd",
  storageBucket: "primeiro-teste-810cd.appspot.com",
  messagingSenderId: "181114697546",
  appId: "1:181114697546:web:2df64f72c470051808b3b3",
  measurementId: "G-MXKJVFQPN7"
};

// Initialize Firebase

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
