import '@styles/globals.css'
import type { AppProps } from 'next/app'

import Navbar from '@components/Navbar';
import { Toaster } from 'react-hot-toast';
// context.ts
import { UserContext } from '@lib/context';
// hook for user and username
import { useUserData } from '@lib/hooks';

function MyApp({ Component, pageProps }: AppProps) {
  //get user data
  const userData = useUserData();
// UserContext.Provider overrides defaults with userData from firebase so any of the children can access user and username
  return (
    <>
      <UserContext.Provider value={userData}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </>
  );
}

export default MyApp
