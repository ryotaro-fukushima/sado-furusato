import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Suspense & Loading.tsx 学習</h1>

      <div className="space-y-6">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">🔍 学習項目</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• React.Suspenseの基本概念</li>
            <li>• loading.tsxファイルの使い方</li>
            <li>• Server Componentでのデータ取得</li>
            <li>• ローディング状態の管理</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">📝 実習ページ</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/users"
              className="block p-4 border rounded hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium">ユーザー一覧</h3>
              <p className="text-sm text-gray-600">loading.tsx使用例</p>
            </Link>
            <Link
              href="/posts"
              className="block p-4 border rounded hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium">投稿一覧</h3>
              <p className="text-sm text-gray-600">手動Suspense使用例</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
