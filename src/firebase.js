import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAq2Chi82-1yT27V8s-ETTG-cgigfbqOrc",
  authDomain: "dogbuddy-f7389.firebaseapp.com",
  databaseURL: "https://dogbuddy-f7389.firebaseio.com",
  projectId: "dogbuddy-f7389",
  storageBucket: "dogbuddy-f7389.appspot.com",
  messagingSenderId: "927150260567"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
