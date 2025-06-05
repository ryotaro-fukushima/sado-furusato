import { Suspense } from 'react'

interface Post {
    id: number
    title: string
    content: string
    category: string
}

async function getPosts(category: string, delay: number): Promise<Post[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, delay))
    
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

export default async function PostList({ category, delay }: PostListProps) {
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
