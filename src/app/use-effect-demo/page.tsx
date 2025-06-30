'use client'

import { useEffect, useState, useRef } from 'react'

export default function UseEffectDemo() {
    // データフェッチングの状態
    const [posts, setPosts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    // タイマーの状態
    const [count, setCount] = useState(0)
    const [isTimerRunning, setIsTimerRunning] = useState(false)

    // DOM操作のためのref
    const boxRef = useRef<HTMLDivElement>(null)

    // アニメーションの状態
    const [isAnimating, setIsAnimating] = useState(false)

    // イベントリスナーの状態
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
    const [scrollPosition, setScrollPosition] = useState(0)

    // 外部システムとの同期の状態
    const [localStorageValue, setLocalStorageValue] = useState('')
    const [inputValue, setInputValue] = useState('')

    // ロギングの状態
    const [logs, setLogs] = useState<string[]>([])

    // ログを追加する関数
    const addLog = (message: string) => {
        const timestamp = new Date().toLocaleTimeString()
        setLogs(prev => [...prev, `${timestamp}: ${message}`])
    }

    // 1. データフェッチングの例
    useEffect(() => {
        const fetchData = async () => {
            try {
                addLog('データフェッチング開始')
                const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
                const data = await response.json()
                setPosts(data)
                addLog('データフェッチング完了')
            } catch (error) {
                console.error('データの取得に失敗しました:', error)
                addLog('データフェッチングエラー')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, []) // 空の依存配列で初回のみ実行

    // 2. タイマーの例
    useEffect(() => {
        let timerId: NodeJS.Timeout

        if (isTimerRunning) {
            addLog('タイマー開始')
            timerId = setInterval(() => {
                setCount(prev => prev + 1)
            }, 1000)
        }

        // クリーンアップ関数
        return () => {
            if (timerId) {
                clearInterval(timerId)
                addLog('タイマー停止')
            }
        }
    }, [isTimerRunning]) // isTimerRunningが変更された時のみ実行

    // 3. DOM操作の例
    useEffect(() => {
        if (boxRef.current) {
            boxRef.current.style.backgroundColor = 'lightblue'
            addLog('DOM操作実行: 背景色変更')
        }
    }, []) // 初回のみ実行

    // 4. アニメーションの例
    useEffect(() => {
        if (isAnimating && boxRef.current) {
            addLog('アニメーション開始')
            const animation = boxRef.current.animate(
                [
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(100px)' },
                    { transform: 'translateX(0)' }
                ],
                {
                    duration: 1000,
                    iterations: 1
                }
            )

            animation.onfinish = () => {
                setIsAnimating(false)
                addLog('アニメーション完了')
            }
        }
    }, [isAnimating])

    // 5. イベントリスナーの例 - ウィンドウサイズ監視
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
            addLog(`ウィンドウサイズ変更: ${window.innerWidth}x${window.innerHeight}`)
        }

        // 初期値を設定
        handleResize()

        window.addEventListener('resize', handleResize)

        // クリーンアップ関数
        return () => {
            window.removeEventListener('resize', handleResize)
            addLog('リサイズイベントリスナー解除')
        }
    }, [])

    // 6. イベントリスナーの例 - スクロール監視
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll)

        // クリーンアップ関数
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // 7. 外部システムとの同期 - ローカルストレージ
    useEffect(() => {
        // ローカルストレージから値を読み込み
        const savedValue = localStorage.getItem('demoInput')
        if (savedValue) {
            setInputValue(savedValue)
            setLocalStorageValue(savedValue)
            addLog('ローカルストレージから値を復元')
        }
    }, [])

    // 8. ローカルストレージへの保存
    useEffect(() => {
        if (inputValue) {
            localStorage.setItem('demoInput', inputValue)
            setLocalStorageValue(inputValue)
            addLog('ローカルストレージに値を保存')
        } else {
            localStorage.removeItem('demoInput')
            setLocalStorageValue('')
            addLog('ローカルストレージの値を削除')
        }
    }, [inputValue])

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-8">useEffect デモ</h1>

            {/* データフェッチングのデモ */}
            <section className="mb-8 p-4 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">1. データフェッチング</h2>
                {loading ? (
                    <p>読み込み中...</p>
                ) : (
                    <div className="space-y-2">
                        {posts.map(post => (
                            <div key={post.id} className="p-2 bg-gray-50 rounded">
                                <h3 className="font-medium">{post.title}</h3>
                                <p className="text-sm text-gray-600">{post.body}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* タイマーのデモ */}
            <section className="mb-8 p-4 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">2. タイマー</h2>
                <div className="flex items-center gap-4">
                    <p className="text-2xl font-bold">{count}</p>
                    <button
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {isTimerRunning ? '停止' : '開始'}
                    </button>
                </div>
            </section>

            {/* DOM操作とアニメーションのデモ */}
            <section className="mb-8 p-4 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">3. DOM操作とアニメーション</h2>
                <div className="flex items-center gap-4">
                    <div
                        ref={boxRef}
                        className="w-20 h-20 bg-gray-200 rounded"
                    />
                    <button
                        onClick={() => setIsAnimating(true)}
                        disabled={isAnimating}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                    >
                        アニメーション開始
                    </button>
                </div>
            </section>

            {/* イベントリスナーのデモ */}
            <section className="mb-8 p-4 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">4. イベントリスナー</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <h3 className="font-medium mb-2">ウィンドウサイズ</h3>
                        <p className="text-sm text-gray-600">
                            幅: {windowSize.width}px, 高さ: {windowSize.height}px
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            ウィンドウサイズを変更してみてください
                        </p>
                    </div>
                    <div>
                        <h3 className="font-medium mb-2">スクロール位置</h3>
                        <p className="text-sm text-gray-600">
                            Y位置: {scrollPosition}px
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            ページをスクロールしてみてください
                        </p>
                    </div>
                </div>
            </section>

            {/* 外部システムとの同期のデモ */}
            <section className="mb-8 p-4 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">5. 外部システムとの同期（ローカルストレージ）</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            入力値（自動保存）:
                        </label>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="何か入力してください..."
                        />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">
                            ローカルストレージの値: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{localStorageValue || 'なし'}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            ページをリロードしても値が保持されます
                        </p>
                    </div>
                </div>
            </section>

            {/* ロギングのデモ */}
            <section className="mb-8 p-4 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">6. ロギング・アナリティクス</h2>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">イベントログ:</p>
                        <button
                            onClick={() => setLogs([])}
                            className="text-xs text-red-600 hover:text-red-800"
                        >
                            クリア
                        </button>
                    </div>
                    <div className="bg-gray-50 p-3 rounded max-h-40 overflow-y-auto">
                        {logs.length === 0 ? (
                            <p className="text-sm text-gray-500">ログがありません</p>
                        ) : (
                            <div className="space-y-1">
                                {logs.map((log, index) => (
                                    <div key={index} className="text-xs text-gray-700 font-mono">
                                        {log}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 注意点の説明 */}
            <section className="p-4 border rounded-lg bg-yellow-50">
                <h2 className="text-xl font-semibold mb-4">useEffectの注意点</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>依存配列を適切に設定する（空配列[]で初回のみ実行）</li>
                    <li>クリーンアップ関数を必要に応じて実装する（タイマー、イベントリスナーの例を参照）</li>
                    <li>無限ループを防ぐ（依存配列の適切な設定）</li>
                    <li>パフォーマンスを考慮する（不要な再レンダリングを避ける）</li>
                    <li>外部システムとの同期は慎重に行う（ローカルストレージの例を参照）</li>
                </ul>
            </section>
        </div>
    )
} 
