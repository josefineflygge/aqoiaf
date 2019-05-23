import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAvPYbAwAxYp268zSnob2KMEjxkH6sGPvc",
    authDomain: "wiki-of-thrones-app.firebaseapp.com",
    databaseURL: "https://wiki-of-thrones-app.firebaseio.com",
    projectId: "wiki-of-thrones-app",
    storageBucket: "wiki-of-thrones-app.appspot.com",
    messagingSenderId: "312622269927",
    appId: "1:312622269927:web:e6a9c57ec369bc91"
  };

  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //firebase.firestore();

  export default firebase;