import { useCallback, useContext, useEffect, useState } from 'react';
import { auth, googleAuthProvider } from '@lib/firebase';
import { useRouter } from "next/router";

export default function Redirect() {
    const router = useRouter();

    useEffect(() => {
      setTimeout(() => {
        router.push('/')
      }, 0)
    },[])
    return (<></>)
  }