import Head from 'next/head';

export default function Metatags({
    title = 'Podas',
    description = 'Social Test',
    image = 'https://i.imgur.com/BKQjtJL.png',
}): JSX.Element {
    return (
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
        </Head>
    );
}