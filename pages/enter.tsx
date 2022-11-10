import { auth, googleAuthProvider } from '@lib/firebase';
//context
import { UserContext } from '@lib/context';
import { useCallback, useContext, useEffect, useState } from 'react';
import { doc, getDoc, getFirestore, writeBatch } from 'firebase/firestore';
import { signInWithPopup, signOut } from 'firebase/auth';
// debounce so when we type we only check after input is done
import debounce from 'lodash.debounce';

export default function Enter(): JSX.Element {
    const { user, username } = useContext(UserContext);
          // 1. user signed out <SignInButton />
          // 2. user signed in, but missing username <UsernameForm />
          // 3. user signed in, has username <SignOutButton />
          return (
            <main>
              {user ? 
                !username ? <UsernameForm /> : <SignOutButton /> 
                : 
                <SignInButton />
              }
            </main>
          );
        }
        
        // Sign in with Google button
        function SignInButton() {
          const signInWithGoogle = async () => {
            await signInWithPopup(auth, googleAuthProvider)
          };
        
          return (
            <>
              <button className="btn-google" onClick={signInWithGoogle}>
                <img src={'/google.png'} width="30px" /> Sign in with Google
              </button>
            </>
          );
        }
        
        // Sign out button
        function SignOutButton() {
          return <button onClick={() => signOut(auth)}>Sign Out</button>;
        }
        
        // Username form
        function UsernameForm(): JSX.Element {
        //value typed by user in form 
          const [formValue, setFormValue] = useState('');
        //is the username valid?
          const [isValid, setIsValid] = useState(false);
        //check true async when we check if username exists
          const [loading, setLoading] = useState(false);
        //grab user and username from global context
          const { user, username } = useContext(UserContext);
        
          const onSubmit = async (e:any) => {
            //prevent refresh of page onsubmit of form
            e.preventDefault();
        
            // Create refs for both documents
            const userDoc = doc(getFirestore(), 'users', user.uid);
            const usernameDoc = doc(getFirestore(), 'usernames', formValue);
        
            // Commit both docs together as a batch write.
            const batch = writeBatch(getFirestore());
            batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
            batch.set(usernameDoc, { uid: user.uid });
        
            await batch.commit();
          };
        
        //checks when we type
          const onChange = (e:any) => {
            // Force form value typed in form to match correct format
            const val = e.target.value.toLowerCase();
            const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
        
            // Only set form value if length is < 3 OR it passes regex
            if (val.length < 3) {
              setFormValue(val);
              setLoading(false);
              setIsValid(false);
            }
        
            if (re.test(val)) {
              setFormValue(val);
              setLoading(true);
              setIsValid(false);
            }
          };
        
          // listen to form value when it changes
          // it executes a read on database
        
          useEffect(() => {
            //runs checkUsername
            checkUsername(formValue);
          }, [formValue]);
        
          // Hit the database for username match after each debounced change
          
          // useCallback is required for debounce to work
          const checkUsername = useCallback(
            // lodash debounce 
            debounce(async (username:any) => {
              if (username.length >= 3) {
                //check username in databse
                const ref = doc(getFirestore(), 'usernames', username);
                const snap = await getDoc(ref);
                console.log('Firestore read executed!', snap.exists());
                setIsValid(!snap.exists());
                setLoading(false);
              }
            }, 500),
            []
          );
        
          //form onSubmit we monitor the value
          //value is formValue handler for change onChange
          //button submit disabled if its not valid
          return (
            !username && (
              <section>
                <h3>Choose Username</h3>
        
                <form onSubmit={onSubmit}>
        
                  <input name="username" placeholder="myname" value={formValue} onChange={onChange} />
        
                  <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
        
                  <button type="submit" className="btn-green" disabled={!isValid}>
                    Choose
                  </button>
        
                  <h3>Debug State</h3>
                  <div>
                    Username: {formValue}
                    <br />
                    Loading: {loading.toString()}
                    <br />
                    Username Valid: {isValid.toString()}
                  </div>
                </form>
              </section>
            )
          ) ;
        }
        
        
        //error messages
        function UsernameMessage({ username, isValid, loading }: {username:any, isValid:boolean, loading: boolean}) {
          if (loading) {
            return <p>Checking...</p>;
          } else if (isValid) {
            return <p className="text-success">{username} is available!</p>;
          } else if (username && !isValid) {
            return <p className="text-danger">That username is taken!</p>;
          } else {
            return <p></p>;
          }
        }