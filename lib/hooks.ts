//auth HOOK to live firebase data

import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import { auth, firestore } from "../lib/firebase";
import { useEffect, useState } from "react";
// listen to firestore document

import { useAuthState } from "react-firebase-hooks/auth";

// Custom hook to read  auth record and user profile doc
// returns user and username
export function useUserData() {
  // we need to have a user object before we reference the firestore

  //grab current user from firebase
  const [user] = useAuthState(auth);
  //initialize state for username (initial value of null)
  const [username, setUsername] = useState(null);
  //useEffect hook listens to changes on user object we can fetch new user document from firestore
  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      // if we have a user we reference the firestore user collection with document matching uid of user
      // const ref = firestore.collection('users').doc(user.uid);
      const ref = doc(getFirestore(), "users", user.uid);
      //our subscription ends when we call onSnapshot, it will provide me with latest info on database
      unsubscribe = onSnapshot(ref, (doc) => {
        // when the document updates we will get the latest data
        setUsername(doc.data()?.username);
      });
    }
    //if we don't have a username we set it to null
    else {
      setUsername(null);
    }
    //call unsubscribe when user document not needed

    return unsubscribe;
  }, [user]);
  // _app will get values

  return { user, username };
}
