import { initializeApp, getApps, getApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore, collection, where, getDocs, query, limit } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAJLBUG6n2Wz8fYMvSo01LTgZ2rW1jgfZk",
    authDomain: "next-social-43ba7.firebaseapp.com",
    projectId: "next-social-43ba7",
    storageBucket: "next-social-43ba7.appspot.com",
    messagingSenderId: "455131325650",
    appId: "1:455131325650:web:c07139ac05d7bd2748790b",
    measurementId: "G-YFHWBJ9VJS"
  };

  
function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

export const firestore = getFirestore(firebaseApp);

export const storage = getStorage(firebaseApp);
export const STATE_CHANGED = 'state_changed';