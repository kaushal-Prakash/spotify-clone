export default function PlayListViewSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-3 bg-gray-800 rounded-lg"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-700 rounded mr-4"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
          <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
        </div>
      ))}
    </div>
  );
}
