import Head from 'next/head';

export default function Metatags({
    title = 'Podas',
    description = 'Social Test',
    image = 'https://imgur.com/a/VO9yTMk',
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