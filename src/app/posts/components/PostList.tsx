import { Suspense } from 'react'
import PostSkeleton from './PostSkeleton'

interface Post {
    id: number
    title: string
    content: string
    category: string
}

async function getPosts(category: string, delay: number): Promise<Post[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, delay))
    
    // エラーをシミュレート（技術カテゴリーの場合）
    if (category === '技術') {
        throw new Error('技術カテゴリーのデータ取得に失敗しました')
    }
    
    // Mock data
    return [
        {
            id: 1,
            title: `${category}の投稿1`,
            content: 'これはサンプルの投稿内容です。',
            category
        },
        {
            id: 2,
            title: `${category}の投稿2`,
            content: 'これはサンプルの投稿内容です。',
            category
        }
    ]
}

interface PostListProps {
    category: string
    delay: number
}

export default function PostList({ category, delay }: PostListProps) {
    return (
        <Suspense fallback={<PostSkeleton />}>
            <PostListContent category={category} delay={delay} />
        </Suspense>
    )
}

async function PostListContent({ category, delay }: PostListProps) {
    const posts = await getPosts(category, delay)

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">{category}の投稿</h2>
            <div className="space-y-4">
                {posts.map(post => (
                    <div key={post.id} className="border rounded-lg p-4">
                        <h3 className="font-medium">{post.title}</h3>
                        <p className="text-gray-600 mt-2">{post.content}</p>
                    </div>
                ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">
                読み込み時間: {delay}ms
            </p>
        </div>
    )
}
