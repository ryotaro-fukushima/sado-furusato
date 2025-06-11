'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // エラーをログに記録
        console.error('Posts page error:', error)
    }, [error])

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-red-800 mb-4">
                    エラーが発生しました
                </h2>
                <p className="text-red-700 mb-4">
                    投稿データの取得中に問題が発生しました。
                    しばらく時間をおいて再度お試しください。
                </p>
                <button
                    onClick={reset}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                    もう一度試す
                </button>
            </div>
        </div>
    )
} 
