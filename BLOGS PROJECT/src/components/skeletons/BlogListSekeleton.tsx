const BlogListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden 
                     animate-pulse"
        >
          {/* Image skeleton */}
          <div className="w-full h-48 bg-gray-700" />

          {/* Content skeleton */}
          <div className="p-4 flex flex-col gap-3">
            <div className="h-5 w-3/4 bg-gray-700 rounded" />
            <div className="h-3 w-1/3 bg-gray-600 rounded" />
            <div className="h-4 bg-gray-700 rounded" />
            <div className="h-4 w-5/6 bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default BlogListSkeleton
