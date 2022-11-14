import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@lib/context";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "@lib/firebase";
import RedirectLogin from "./RedirectLogin";
// Top navbar
export default function Navbar(): JSX.Element {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOutNow = () => {
    signOut(auth);
    <RedirectLogin/>
  };

  return (
    <nav className="navbar">
      <ul>
        
        {/* user is signed-in and has username */}
        {username && (
          <> 
          <li>
          <Link passHref={true} href="/home">
            <button className="btn-logo">FEED</button>
          </Link>
          </li>
            <li className="push-left">
              <button onClick={signOutNow}>Sign Out</button>
            </li>
            <li>
              <Link passHref href="/admin">
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              {user?.photoURL && (
                <Link passHref href={`/${username}`}>
                  
                    <img src={user?.photoURL}/>
                  
                </Link>
              )}
            </li>
          </>
        )}


        {!username && (
          <li>
            <RedirectLogin/>
          </li>
        )}
      </ul>
    </nav>
  );
}
