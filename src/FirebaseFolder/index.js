import firebase from "firebase";
import "firebase/storage";

const app = firebase.initializeApp({
  projectId: "image-repository-3e3f2",
  appId: "1:518247415077:web:45e0afc89b6c9c274e2ecc",
  storageBucket: "image-repository-3e3f2.appspot.com",
  locationId: "us-central",
  apiKey: "AIzaSyAcKfBkaN7ZTpGMdi4GNwEn-kqAUKhsuiM",
  authDomain: "image-repository-3e3f2.firebaseapp.com",
  messagingSenderId: "518247415077",
  measurementId: "G-38ZDFE8LK0",
});

export { app, firebase };
