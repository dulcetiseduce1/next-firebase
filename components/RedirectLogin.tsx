import { useEffect} from 'react';
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