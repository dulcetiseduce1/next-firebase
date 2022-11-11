import Link from 'next/link';
import ReactMarkdown from 'react-markdown';


export default function PostFeed({ posts, admin = false }: { posts: any[], admin?: boolean }) {
    return posts && posts.length ? <>{posts.map((post: any, i: number) => <PostItem post={post} key={i} admin={admin} />)}</> : <></>;
}

function PostItem({ post, admin }: { post: any, admin: boolean }) {
    // Naive method to calc word count and read time
    const wordCount = post?.content.trim().split(/\s+/g).length;
    const minutesToRead = (wordCount / 100 + 1).toFixed(0);

    return (
        <div className="card">
            <Link passHref href={`/${post.username}/${post.slug}`}>
                <h1>
                    {post.title}
                    <ReactMarkdown>{post?.content}</ReactMarkdown>

                </h1>
            </Link>
            
            <Link href={`/${post.username}`}>
                <h2>
                    By @{post.username}
                </h2>
            </Link>
            <footer>
                <span>
                    {wordCount} words. {minutesToRead} min read
                </span>
                <span className="push-left">💗 {post.heartCount || 0} Hearts</span>
            </footer>

            {/* If admin view, show extra controls for user */}
            {admin && (
                <>
                    <Link passHref href={`/admin/${post.slug}`}>
                        <h3>
                            <button className="btn-blue">Edit</button>
                        </h3>
                    </Link>

                    {post.published ? <p className="text-success">Live</p> : <p className="text-danger">Unpublished</p>}
                </>
            )}
        </div>
    );
}