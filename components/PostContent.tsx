import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

// UI component for main post content
export default function PostContent({ post }: { post: any }) {
    const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();

    return (
        <div className="card">
            <h1>{post?.title}</h1>    
            <ReactMarkdown>{post?.content}</ReactMarkdown>
            <span className="text-sm">
                Written by{' '}
                <Link href={`/${post.username}/`}>
                    <p className="text-info">@{post.username}</p>
                </Link>{' '}
                on {createdAt.toISOString()}
            </span>
  
        </div>
    );
}