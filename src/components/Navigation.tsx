import Link from 'next/link'

export default function Navigation() {
    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="font-bold text-xl">
                        Suspense Learning
                    </Link>

                    <div className="flex space-x-6">
                        <Link
                            href="/users"
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            ユーザー
                        </Link>
                        <Link
                            href="/posts"
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            投稿
                        </Link>
                        <Link
                            href="/use-effect-demo"
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            useEffectデモ
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
