import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAJLBUG6n2Wz8fYMvSo01LTgZ2rW1jgfZk",
    authDomain: "next-social-43ba7.firebaseapp.com",
    projectId: "next-social-43ba7",
    storageBucket: "next-social-43ba7.appspot.com",
    messagingSenderId: "455131325650",
    appId: "1:455131325650:web:c07139ac05d7bd2748790b",
    measurementId: "G-YFHWBJ9VJS"
  };

  if (!firebase.getApps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const storage = firebase.storage();
