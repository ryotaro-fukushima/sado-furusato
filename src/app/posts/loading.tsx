export default function Loading() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="h-6 bg-blue-200 rounded w-1/3 mb-2 animate-pulse"></div>
                <div className="h-4 bg-blue-200 rounded w-2/3 animate-pulse"></div>
            </div>

            <div className="space-y-8">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="space-y-4">
                            {[1, 2].map((j) => (
                                <div key={j} className="border rounded-lg p-4">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
} 
