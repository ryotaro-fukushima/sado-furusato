import { Suspense } from 'react'
import PostList from './components/PostList'

export default function PostsPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">投稿一覧</h1>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h2 className="font-semibold text-blue-800">💡 学習ポイント</h2>
                <p className="text-blue-700 mt-1">
                    このページは手動で`Suspense`を使用しています。
                    複数のコンポーネントを異なるタイミングで読み込めます。
                </p>
            </div>

            <div className="space-y-8">
                <PostList category="技術" delay={1000} />
                <PostList category="日常" delay={2000} />
            </div>
        </div>
    )
}
