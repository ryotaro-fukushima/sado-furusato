export default function Loading() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-48 mb-6"></div>

                <div className="bg-yellow-100 rounded-lg p-4 mb-6">
                    <div className="h-4 bg-yellow-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-yellow-200 rounded w-full"></div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white p-4 rounded-lg shadow">
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-20"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
