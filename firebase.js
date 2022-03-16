// Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
import firebase from 'firebase/app';
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const app = firebase.initializeApp({

  apiKey: "AIzaSyAHntUErdHGQ4AZNZxy3tIaSQlgnFMrNXs",
  authDomain: "wuzzuf-fb871.firebaseapp.com",
  projectId: "wuzzuf-fb871",
  storageBucket: "wuzzuf-fb871.appspot.com",
  messagingSenderId: "380814336054",
  appId: "1:380814336054:web:c653aec45f68e0b5be7897",
  measurementId: "G-RSG3SY9KLR"

})
export const db = app.firestore();
export const auth = app.auth()
export const storage = app.storage()
export default app