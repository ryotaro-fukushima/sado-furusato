import Link from 'next/link'

async function getUser(id: string) {
    // 遅延をシミュレート（1.5秒）
    await new Promise(resolve => setTimeout(resolve, 1500))

    // ダミーデータ
    const users = [
        { id: 1, name: '田中太郎', email: 'tanaka@example.com', bio: 'フロントエンド開発者' },
        { id: 2, name: '佐藤花子', email: 'sato@example.com', bio: 'バックエンド開発者' },
        { id: 3, name: '鈴木一郎', email: 'suzuki@example.com', bio: 'デザイナー' },
    ]

    return users.find(u => u.id === parseInt(id))
}

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function UserDetailPage({ params }: PageProps) {
    const { id } = await params
    const user = await getUser(id)

    if (!user) {
        return <div>ユーザーが見つかりません</div>
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">ユーザー詳細</h1>

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">{user.name}</h2>
                <div className="space-y-2">
                    <p><span className="font-medium">メール:</span> {user.email}</p>
                    <p><span className="font-medium">プロフィール:</span> {user.bio}</p>
                </div>

                <Link
                    href="/users"
                    className="inline-block mt-4 text-blue-600 hover:underline"
                >
                    ← ユーザー一覧に戻る
                </Link>
            </div>
        </div>
    )
}
