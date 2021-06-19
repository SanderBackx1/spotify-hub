import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  databaseURL: process.env.FIREBASE_databaseURL,
  projectId: process.env.FIREBASE_projectId,
  storageBucket: process.env.FIREBASE_storageBucket,
  messagingSenderId: process.env.FIREBASE_messagingSenderId,
  appId: process.env.FIREBASE_appId,
  measurementId: process.env.FIREBASE_measurementId
};
// Initialize Firebase
export let fb = null;

if (!firebase.apps.length) {
  fb = firebase.initializeApp(firebaseConfig);
} else {
  fb = firebase.app(); // if already initialized, use that one
}

export const db = fb.firestore();
export const rt = fb.database();
