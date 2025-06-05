export default function Loading() {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-48 mb-6"></div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-24 mt-4"></div>
                </div>
            </div>
        </div>
    )
}
