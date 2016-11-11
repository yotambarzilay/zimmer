import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAZv1mQzclT6EhqpKlhP3WfoT9wIC_XDiU",
  authDomain: "zimmer-655f7.firebaseapp.com",
  databaseURL: "https://zimmer-655f7.firebaseio.com",
  storageBucket: "zimmer-655f7.appspot.com",
  messagingSenderId: "1019916631266"
};
firebase.initializeApp(config);
window.db = firebase.database();
export default firebase;
