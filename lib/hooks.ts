//auth HOOK to live firebase data
import { useEffect, useRef, useState } from 'react';
//import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@lib/firebase';
import {
    doc,
    DocumentData,
    DocumentReference,
    getDoc,
    getFirestore,
    onSnapshot,
    Query,
    QueryDocumentSnapshot,
    QuerySnapshot
} from 'firebase/firestore';
import { Auth, onIdTokenChanged, User } from 'firebase/auth';

// returns user and username
export function useUserData(): {
// we need to have a user object before we reference the firestore

  //grab current user from firebase
    user: User | null, username: string | null } {
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
            const ref = doc(getFirestore(), 'users', user.uid);
         //our subscription ends when we call onSnapshot, it will provide me with latest info on database

            unsubscribe = onSnapshot(ref, (doc) => {
            // when the document updates we will get the latest data

                if (doc) setUsername(doc.data()?.username);
            });
        } else {
         //if we don't have a username we set it to null

            setUsername(null);
        }

        return unsubscribe;
    }, [user]);
  // _app will get values
    return { user, username };
}

// added this due to problems with react-firebase-hooks

export function useAuthState(auth: Auth): (User | null)[] {
    const [user, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        return onIdTokenChanged(auth, (_user) => {
            setCurrentUser(_user ?? null);
        });
    }, [auth]);
    return [user];
}

export function useDocument(ref: DocumentReference): (QueryDocumentSnapshot | null)[] {
    const [_doc, _setDoc] = useState<QueryDocumentSnapshot | null>(null);

    const docRef = useRef(ref);

    useEffect(() => {
        return onSnapshot(docRef.current, (snap) => {
            _setDoc(snap.exists() ? snap : null);
        });
    }, [docRef]);
    return [_doc];
}

export function useDocumentData(ref: DocumentReference): (DocumentData | null)[] {
    const [_doc, setDoc] = useState<DocumentData | null>(null);

    const docRef = useRef(ref);

    useEffect(() => {
        return onSnapshot(docRef.current, (snap) => {
            setDoc(snap.exists() ? snap.data() : null);
        });
    }, [docRef]);
    return [_doc];
}

export function useDocumentDataOnce(ref: DocumentReference): (DocumentData | null)[] {
    const [_doc, setDoc] = useState<DocumentData | null>(null);

    const docRef = useRef(ref);

    useEffect(() => {
        getDoc(docRef.current).then(snap => {
            setDoc(snap.exists() ? snap.data() : null);
        });
        return;
    }, [docRef]);
    return [_doc];
}

export function useCollection(ref: Query): (QuerySnapshot<DocumentData> | null)[] {
    const [_col, setCol] = useState<QuerySnapshot | null>(null);

    const colRef = useRef(ref);

    useEffect(() => {
        return onSnapshot(colRef.current, (snap) => {
            setCol(!snap.empty ? snap : null);
        });
    }, [colRef]);
    return [_col];
}