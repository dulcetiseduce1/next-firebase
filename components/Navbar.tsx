import Link from 'next/link';

export default function Navbar() {
    const user = true;
    const username = true;
    
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link href ="/">
                    <button className="btn-logo">FEED</button>
                    </Link>
                </li>

                {/*user is signed in*/}
                {username &&(
                    <>
                    <li className="push-left">
                        <Link href="/admin">
                            <button className= "btn-blue">Write Post</button>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/${username}`}>
                            <img src={user?.photoURL}/>
                        </Link>
                    </li>
                    </>

                )}

                {/*user is not signed in*/}
                {!username &&(
                    <li>
                        <Link href="/enter">
                            <button>Log in</button>
                        </Link>
                    </li>
                    )}
                
            </ul>
        </nav>
    )
}