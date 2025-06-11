import Link from 'next/link'

// Server Component - データ取得にawaitを使用
async function getUsers() {
    // 遅延をシミュレート（2秒）
    await new Promise(resolve => setTimeout(resolve, 2000))

    // エラーをシミュレート（50%の確率で）
    if (Math.random() > 0.5) {
        throw new Error('ユーザーデータの取得に失敗しました')
    }

    // 実際のAPIコール例
    // const res = await fetch('http://localhost:3000/api/users')
    // return res.json()

    // ダミーデータ
    return [
        { id: 1, name: '田中太郎', email: 'tanaka@example.com' },
        { id: 2, name: '佐藤花子', email: 'sato@example.com' },
        { id: 3, name: '鈴木一郎', email: 'suzuki@example.com' },
    ]
}

export default async function UsersPage() {
    const users = await getUsers()

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">ユーザー一覧</h1>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h2 className="font-semibold text-yellow-800">💡 学習ポイント</h2>
                <p className="text-yellow-700 mt-1">
                    このページは`loading.tsx`でローディング状態が管理されています。
                    データ取得に2秒の遅延があるため、ローディングUIが表示されます。
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                    <div key={user.id} className="bg-white p-4 rounded-lg shadow">
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-gray-600 text-sm">{user.email}</p>
                        <Link
                            href={`/users/${user.id}`}
                            className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                        >
                            詳細を見る →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
